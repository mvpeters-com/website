export const conceptPreview = false;
export const workPublished = false;
export const email = 'simon@mvpeters.com';
export const projectEmail = `mailto:${email}`;

export function pageHead(title: string, description: string) {
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }] };
}
