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
  await page.getByRole('button', { name: 'interim CTO', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'interim CTO', exact: true })).toBeFocused();
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

test('MVPeters concept connects work, all cases, about and email contact', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(mvpeters);
  await expect(page.getByRole('complementary', { name: 'Concept preview' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Highlighted case' }).getByRole('heading', { name: 'Shiperise' })).toBeVisible();
  await expect(page.locator('details[open]')).toHaveCount(0);
  await expect(page.locator('details > summary').last()).toHaveAttribute('aria-label', 'Details about Commons Radio');
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Work' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Useful things.Built with care.');
  await expect(page.locator('details[open]')).toHaveCount(0);
  await expect(page.locator('details > summary')).toHaveCount(5);
  for (const [slug, title] of [['shiperise', 'Shiperise'], ['club-gewoon-os', 'Club Gewoon OS'], ['niko', 'Niko'], ['dcw-platform', 'DCW platform'], ['switch-to-eu', 'Switch to EU'], ['commons-radio', 'Commons Radio']]) {
    if (slug !== 'shiperise') await page.locator('summary').filter({ hasText: title }).click();
    await page.getByRole('link', { name: `View ${title} case study`, exact: true }).click();
    await expect(page).toHaveURL(`${mvpeters}/work/${slug}`);
    await expect(page.getByRole('heading', { name: title, exact: true, level: 1 })).toBeVisible();
    await expect(page.getByText('Draft story for review.', { exact: true })).toBeVisible();
    await expect(page.getByText('Video placeholder — footage to add', { exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { name: title, exact: true, level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('link', { name: 'All work', exact: true }).click();
  }
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A pragmatic builder.');
  await expect(page.getByRole('link', { name: 'Download my CV' })).toHaveAttribute('href', '/CV.pdf');
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('something useful.');
  await expect(page.getByRole('link', { name: 'Email me about a project' })).toHaveAttribute('href', /^mailto:simon@mvpeters.com\?subject=/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await request.get(`${mvpeters}/work/missing-project`)).status()).toBe(404);
  expect(errors).toEqual([]);
});
