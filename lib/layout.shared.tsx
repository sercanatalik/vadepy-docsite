import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-baseline gap-0 text-lg font-extrabold tracking-tight">
          <span>Vade</span>
          <span className="text-primary text-xl">Py</span>
        </span>
      ),
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
      },
      {
        text: 'Guides',
        url: '/docs/guides/quick-start',
      },
      {
        text: 'API',
        url: '/docs/api',
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
