import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vlog | MEATiN',
  description: 'Watch the latest MEATiN vlog video and stay tuned for exciting stories and guides.',
};

export default function VlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
