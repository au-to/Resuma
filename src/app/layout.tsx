import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resuma - 现代化在线简历制作工具',
  description: '使用 Resuma 轻松创建专业的在线简历，支持多种模板，实时预览，一键导出PDF',
  keywords: ['简历制作', '在线简历', 'CV生成器', '简历模板'],
  authors: [{ name: 'Resuma Team' }],
  creator: 'Resuma',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://resuma.app',
    title: 'Resuma - 现代化在线简历制作工具',
    description: '使用 Resuma 轻松创建专业的在线简历，支持多种模板，实时预览，一键导出PDF',
    siteName: 'Resuma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resuma - 现代化在线简历制作工具',
    description: '使用 Resuma 轻松创建专业的在线简历，支持多种模板，实时预览，一键导出PDF',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={cn(
        inter.className,
        'min-h-screen bg-background font-sans antialiased'
      )}>
        {children}
      </body>
    </html>
  );
}