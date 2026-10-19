import { expect, test } from '@playwright/test';

const mvpeters = 'http://localhost:3100';
const spaced = 'http://localhost:3101';

test('both sites render content and metadata on the server', async ({ request }) => {
  for (const [url, title, content, asset] of [
    [mvpeters, 'MVPeters', 'Hi, I’m Simon.', '/CV.pdf'],
    [spaced, 'Spaced - Menselijk Digitaal', 'Menselijk', '/images/start-illustration-02.svg'],
  ]) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<title>${title}</title>`);
    expect(html).toContain(content);
    expect(html).toContain('name="description"');
    expect((await request.get(url + asset)).status()).toBe(200);
  }
  const legacy = await request.get(`${spaced}/index.html`, { maxRedirects: 0 });
  expect(legacy.status()).toBe(301);
  expect(legacy.headers().location).toBe('/');
  const spacedHtml = await (await request.get(spaced)).text();
  expect(spacedHtml).toContain('href="https://www.commonsradio.eu/"');
  expect(spacedHtml).toContain('Ontdek Commons Radio');
  const sitemap = await request.get(`${mvpeters}/sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()['content-type']).toContain('xml');
  expect((await sitemap.text()).match(/<loc>.*?<\/loc>/g)).toEqual([
    '<loc>https://www.mvpeters.com/</loc>',
    '<loc>https://www.mvpeters.com/about</loc>',
    '<loc>https://www.mvpeters.com/contact</loc>',
  ]);
  const robots = await request.get(`${mvpeters}/robots.txt`);
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: https://www.mvpeters.com/sitemap.xml');
});

test('MVPeters hydrates, switches theme, navigates recommendations and opens video', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light');
  });
  await page.goto(mvpeters);
  await expect(page.getByRole('heading', { name: 'Hi, I’m Simon.' })).toBeVisible();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveClass('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveClass('dark');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  const next = page.getByRole('button', { name: 'Next testimonial' });
  await next.click();
  await expect(page.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute('aria-current', 'true');
  const carousel = await page.getByRole('region', { name: 'Recommendations' }).boundingBox();
  const slide = await page.getByRole('group', { name: 'Recommendation 2 of 4' }).boundingBox();
  expect(carousel).not.toBeNull();
  expect(slide).not.toBeNull();
  expect(Math.abs(slide!.x - carousel!.x)).toBeLessThan(1);
  await page.getByRole('button', { name: 'Watch the video', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Watch the video', exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => scrollTo(0, 0));
  if (process.env.CAPTURE_SCREENSHOTS) await page.screenshot({ path: testInfo.outputPath('mvpeters.png'), fullPage: true });
  expect(errors).toEqual([]);
});

test('Spaced project accordions, galleries and navigation work without Webflow', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(spaced);
  const announcement = page.getByRole('dialog', { name: 'Spaced is nu MVPeters.' });
  await expect(announcement).toBeVisible();
  await expect(announcement.getByRole('link', { name: 'Ontdek MVPeters' })).toHaveAttribute('href', 'https://mvpeters.com');
  expect(await announcement.evaluate((dialog) => dialog.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Tab');
  expect(await announcement.evaluate((dialog) => dialog.contains(document.activeElement))).toBe(true);
  if (process.env.CAPTURE_SCREENSHOTS) await page.screenshot({ path: testInfo.outputPath('spaced-announcement.png') });
  await announcement.getByRole('button', { name: 'Verder naar Spaced' }).click();
  await expect(announcement).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Spaced', exact: true })).toBeFocused();
  await page.reload();
  await expect(announcement).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Menselijk digitaal.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ontdek Commons Radio' })).toHaveAttribute('href', 'https://www.commonsradio.eu/');
  await expect(page.getByRole('link', { name: 'Ontdek Commons Radio' })).not.toHaveAttribute('rel', /nofollow/);
  await page.getByText('Meer mensen, meer toekomst', { exact: true }).click();
  const project = page.locator('details').filter({ has: page.getByText('Meer mensen, meer toekomst', { exact: true }) });
  await expect(project).toHaveAttribute('open', '');
  await expect(project.getByRole('link', { name: 'Live website' })).toBeVisible();
  const gallery = project.getByRole('region');
  await project.getByRole('button', { name: 'Volgende beelden van Meer mensen, meer toekomst' }).click();
  await expect.poll(() => gallery.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await page.getByText('Meer mensen, meer toekomst', { exact: true }).click();
  await expect(project).not.toHaveAttribute('open', '');
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(`${spaced}/#Contact`);
  await expect(page.getByRole('link', { name: 'Wij denken graag mee na!' })).toHaveAttribute('href', /^mailto:esther@spaced.be/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('script[src*="webflow"], script[src*="jquery"]').count()).toBe(0);
  await page.evaluate(() => scrollTo(0, 0));
  if (process.env.CAPTURE_SCREENSHOTS) await page.screenshot({ path: testInfo.outputPath('spaced.png'), fullPage: true });
  expect(errors).toEqual([]);
});

test('missing pages return 404 and offer a working route home', async ({ page }) => {
  for (const url of [mvpeters, spaced]) {
    const response = await page.goto(`${url}/missing-page`);
    expect(response?.status()).toBe(404);
    await page.locator('main').getByRole('link').click();
    await expect(page).toHaveURL(`${url}/`);
    if (url === spaced) await page.getByRole('button', { name: 'Verder naar Spaced' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});

test('MVPeters launch shows current projects and keeps unfinished cases hidden', async ({ page, request }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(mvpeters);
  await expect(page.getByRole('complementary', { name: 'Concept preview' })).toHaveCount(0);
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
  await expect(page.locator('a[href^="/work"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'interim CTO', exact: true })).toHaveCount(0);
  const projects = page.getByRole('region', { name: 'Client work.' });
  await expect(projects.getByRole('heading', { level: 3 })).toHaveText(['Shiperise', 'Club Gewoon', 'Niko', 'DCW', 'Calabi']);
  const sideProjects = page.locator('details').filter({ has: page.getByText('Side projects', { exact: true }) });
  await expect(sideProjects).not.toHaveAttribute('open');
  await expect(page.getByRole('link', { name: 'Visit Switch to EU', exact: true })).toHaveCount(0);
  const html = await (await request.get(mvpeters)).text();
  for (const href of ['https://www.switch-to.eu/en', 'https://www.commonsradio.eu/']) {
    expect(html).toContain(`href="${href}"`);
  }
  await page.evaluate(() => document.fonts.ready);
  if (process.env.CAPTURE_SCREENSHOTS) await page.locator('#currently-working-on').screenshot({ path: testInfo.outputPath('client-work-closed.png') });
  await sideProjects.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(sideProjects).toHaveAttribute('open', '');
  if (process.env.CAPTURE_SCREENSHOTS) await page.locator('#currently-working-on').screenshot({ path: testInfo.outputPath('side-projects-open.png') });
  await expect(sideProjects.getByRole('heading', { level: 3 })).toHaveText(['Switch to EU', 'Commons Radio']);
  for (const [label, href] of [
    ['Visit Shiperise', 'https://www.shiperise.com/'],
    ['Visit Club Gewoon', 'https://www.clubgewoon.be/'],
    ['Visit DCW', 'https://doccredit.world/'],
    ['Visit Calabi', 'https://calabi.be/'],
    ['See the configurator', 'https://www.niko.eu/en/inspiration/news/2026/rocker-toggle-configurator'],
    ['Visit Switch to EU', 'https://www.switch-to.eu/en'],
    ['Listen to Commons Radio', 'https://www.commonsradio.eu/'],
  ]) {
    const link = page.locator('#currently-working-on').getByRole('link', { name: label });
    await expect(link).toHaveAttribute('href', href);
    await expect(link).not.toHaveAttribute('rel', /nofollow/);
  }
  await page.getByRole('button', { name: 'Watch the video', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Simon as interim CTO' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Watch the video', exact: true })).toBeFocused();
  await sideProjects.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(sideProjects).not.toHaveAttribute('open');
  await page.getByRole('link', { name: 'What I’m working on', exact: true }).click();
  await expect(page).toHaveURL(`${mvpeters}/#currently-working-on`);
  for (const path of ['/work', '/work/', '/work/shiperise', '/work/club-gewoon-os', '/work/niko', '/work/dcw-platform', '/work/switch-to-eu', '/work/commons-radio']) {
    const response = await request.get(`${mvpeters}${path}`, { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe(path === '/work/' ? '/work' : '/#currently-working-on');
    expect(await response.text()).not.toContain('Draft story for review.');
  }
  await page.goto(`${mvpeters}/work/shiperise`);
  await expect(page).toHaveURL(`${mvpeters}/#currently-working-on`);
  await expect(projects).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A pragmatic builder.');
  await expect(page.locator('main')).not.toContainText(/Story slot|Draft story|placeholder/);
  await expect(page.getByRole('link', { name: 'Download my CV' })).toHaveAttribute('href', '/CV.pdf');
  await expect(page.locator('a[href^="/work"]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'From Spaced to MVPeters.' })).toHaveCount(0);
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('something useful.');
  await expect(page.getByRole('link', { name: 'Email me about a project' })).toHaveAttribute('href', /^mailto:simon@mvpeters.com\?subject=/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await request.get(`${mvpeters}/work/missing-project`)).status()).toBe(404);
  expect(errors).toEqual([]);
});
