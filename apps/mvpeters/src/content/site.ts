export const conceptPreview = false;
export const workPublished = false;
export const email = 'simon@mvpeters.com';
export const projectEmail = `mailto:${email}?subject=${encodeURIComponent('Let’s talk about a project')}&body=${encodeURIComponent('Hi Simon,\n\nHere’s what I’m working on:\n\nI could use help with:\n\nTiming:\n\nThanks,\n')}`;

export function pageHead(title: string, description: string) {
  return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }] };
}
