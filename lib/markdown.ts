// lib/markdown.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';

/**
 * Renders a markdown string to sanitised HTML.
 * - allowDangerousHtml: false — raw HTML in markdown is never passed through.
 * - External links get target="_blank" rel="noopener noreferrer" automatically.
 * - Headings get stable id="" attributes via rehype-slug.
 */
export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extracts h2 and h3 headings from raw markdown before rendering.
 * Generates slug IDs compatible with rehype-slug (github-slugger algorithm).
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];

  for (const line of markdown.split('\n')) {
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    const match = h2 ?? h3;
    if (!match) continue;

    const text = match[1].trim();
    // github-slugger compatible: lowercase, replace non-word chars with hyphen, trim hyphens
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');

    headings.push({ id, text, level: h2 ? 2 : 3 });
  }

  return headings;
}
