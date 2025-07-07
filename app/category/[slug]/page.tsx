
import Link from 'next/link';

type CategorySlug = 'electric' | 'luxury' | 'sports' | 'suv';


interface CategoryPageProps {
  params: Promise<{
    slug: CategorySlug;
  }>;
}


export function generateStaticParams(): { slug: CategorySlug }[] {
  return [
    { slug: 'electric' },
    { slug: 'luxury' },
    { slug: 'sports' },
    { slug: 'suv' },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: 'white' }}>
      <h1>Category Page</h1>
      <p>Current Category: {slug}</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}

// Remove or correct any other global `PageProps` definitions that might be causing conflict.
// Search your project for 'interface PageProps' or 'type PageProps'
// and ensure there isn't another one defining 'params' as a Promise<any>.