import type { LoaderConfig, LoaderOutput } from 'fumadocs-core/source';
import type { InferPageType } from 'fumadocs-core/source';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { ComponentProps, FC } from 'react';

const Link = defaultMdxComponents.a;

/**
 * Wraps fumadocs createRelativeLink to fix relative link resolution on index pages.
 *
 * Problem: For index pages (e.g. guides/fx/index.mdx), the URL is /docs/guides/fx
 * (no trailing slash). The browser treats "fx" as a leaf, so relative links like
 * "./cross-currency" resolve to /docs/guides/cross-currency (one level too high).
 *
 * Fix: Detect when on an index page and rewrite relative ./href and ../href links
 * by prepending the directory segment, so the browser resolves them correctly.
 */
export function createIndexAwareLink<C extends LoaderConfig>(
  source: LoaderOutput<C>,
  page: InferPageType<LoaderOutput<C>>,
): FC<ComponentProps<'a'>> {
  // Detect index pages: path ends with /index.mdx or /index.md
  const isIndex = /\/index\.\w+$/.test(page.path);
  const dirSegment = page.slugs[page.slugs.length - 1];

  return async function IndexAwareLink({
    href,
    ...props
  }: ComponentProps<'a'>) {
    if (!href) {
      return <Link href={href} {...props} />;
    }

    // First try fumadocs native resolution
    const resolved = source.resolveHref(href, page);
    if (resolved !== href) {
      return <Link href={resolved} {...props} />;
    }

    // For index pages, fix relative links that the browser would resolve incorrectly
    if (isIndex && dirSegment) {
      if (href.startsWith('./')) {
        // ./cross-currency → fx/cross-currency (browser resolves from parent dir)
        const fixedHref = `${dirSegment}/${href.slice(2)}`;
        return <Link href={fixedHref} {...props} />;
      }
      if (href.startsWith('../')) {
        // ../../api/fx → needs one fewer ../ on index pages
        // because browser is already one level higher than the file system
        // From /docs/guides/fx, browser base is /docs/guides/
        // So ../../api/fx goes to /api/fx (wrong, should be /docs/api/fx)
        // Fix: prepend dirSegment/ to counteract the off-by-one
        const fixedHref = `${dirSegment}/${href}`;
        return <Link href={fixedHref} {...props} />;
      }
    }

    return <Link href={href} {...props} />;
  };
}
