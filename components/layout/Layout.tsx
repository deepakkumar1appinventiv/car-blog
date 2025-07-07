import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}