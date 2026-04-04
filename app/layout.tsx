import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';


const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vadepy.dev'),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          defer
          data-id="ZV_ShS1CGGiOkIkIwFlg1W4F4wc"
          src="https://api.zenovay.com/z.js"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      
      </body>
    </html>
  );
}
