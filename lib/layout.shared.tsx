import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BotIcon } from 'lucide-react';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    themeSwitch: { enabled: false },
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
      {
        type: 'icon',
        text: 'llms.txt',
        label: 'llms.txt',
        url: 'https://vadepy.dev/llms-full.txt',
        icon: <BotIcon />,
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
