// import { BlogCard } from '@/components/BlogCard'
// import { fetchPosts, fetchUsers } from '@/lib/api'
// import { getCarImageUrl, getCarCategory, getReadTime } from '@/lib/utils'
// import { BlogPost } from '@/types'
// import { notFound } from 'next/navigation'
// import Link from 'next/link'
// import { ArrowLeft, Car, Crown, Truck, Zap } from 'lucide-react'
// import { Button } from '@/components/ui/button'

// type CategorySlug = 'electric' | 'luxury' | 'sports' | 'suv'

// const categoryInfo = {
//   electric: {
//     name: 'Electric',
//     icon: Zap,
//     description:
//       'Discover the latest electric vehicle reviews, technology insights, and sustainable mobility solutions',
//     image:
//       'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1200&h=400&fit=crop',
//     bgColor: 'bg-green-500',
//   },
//   luxury: {
//     name: 'Luxury',
//     icon: Crown,
//     description:
//       'Explore premium vehicles, high-end automotive experiences, and luxury car reviews',
//     image:
//       'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=400&fit=crop',
//     bgColor: 'bg-yellow-500',
//   },
//   sports: {
//     name: 'Sports',
//     icon: Car,
//     description:
//       'High‑performance sports cars, racing technology, and adrenaline‑fueled automotive content',
//     image:
//       'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&h=400&fit=crop',
//     bgColor: 'bg-red-500',
//   },
//   suv: {
//     name: 'SUV',
//     icon: Truck,
//     description:
//       'Sport utility vehicles, off‑road capabilities, and family‑friendly automotive solutions',
//     image:
//       'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&h=400&fit=crop',
//     bgColor: 'bg-blue-500',
//   },
// } as const

// export function generateStaticParams(): { slug: CategorySlug }[] {
//   return Object.keys(categoryInfo).map((slug) => ({
//     slug: slug as CategorySlug,
//   }))
// }

// export default async function CategoryPage({
//   params,
// }: {
//   params: { slug: CategorySlug }
//   searchParams?: { [key: string]: string | string[] | undefined }
// }) {
//   const { slug } = params
//   const category = categoryInfo[slug]

//   if (!category) {
//     notFound()
//   }

//   let posts: BlogPost[] = []
//   let error: string | null = null

//   try {
//     const [postsData, users] = await Promise.all([fetchPosts(), fetchUsers()])
//     const userMap = new Map(users.map((u: any) => [u.id, u]))

//     const allPosts: BlogPost[] = postsData.map(
//       (post: any, idx: number): BlogPost => ({
//         ...post,
//         user: userMap.get(post.userId)!,
//         imageUrl: getCarImageUrl(post.id),
//         category: getCarCategory(idx),
//         readTime: getReadTime(post.body),
//         publishedAt: new Date(
//           2024,
//           Math.floor(Math.random() * 12),
//           Math.floor(Math.random() * 28) + 1,
//         ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       }),
//     )

//     posts = allPosts.filter(
//       (p) => p.category.toLowerCase() === category.name.toLowerCase(),
//     )
//   } catch (err) {
//     error = 'Failed to load blog posts'
//     console.error('Error fetching posts:', err)
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 py-16">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <Link href="/">
//           <Button variant="ghost" className="mb-8 text-white hover:bg-slate-800">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Home
//           </Button>
//         </Link>
//         <div className="relative mb-12 overflow-hidden rounded-lg">
//           <div
//             className="h-64 bg-cover bg-center md:h-80"
//             style={{ backgroundImage: `url(${category.image})` }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
//             <div className="relative z-10 flex h-full items-center">
//               <div className="max-w-3xl px-4 sm:px-6 lg:px-8">
//                 <div className="mb-4 flex items-center">
//                   <div
//                     className={`mr-4 flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor}`}
//                   >
//                     <category.icon className="h-6 w-6 text-white" />
//                   </div>
//                   <h1 className="text-4xl font-bold text-white md:text-5xl">
//                     {category.name} Cars
//                   </h1>
//                 </div>
//                 <p className="text-xl leading-relaxed text-slate-300">
//                   {category.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <p className="mb-8 text-slate-400">
//           Found {posts.length} {category.name.toLowerCase()} car{' '}
//           {posts.length === 1 ? 'article' : 'articles'}
//         </p>
//         {error ? (
//           <div className="py-12 text-center">
//             <p className="text-lg text-red-400">{error}</p>
//           </div>
//         ) : posts.length ? (
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {posts.map((post) => (
//               <BlogCard key={post.id} post={post} />
//             ))}
//           </div>
//         ) : (
//           <div className="py-12 text-center">
//              <div
//               className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg ${category.bgColor}`}
//             >
//               <category.icon className="h-8 w-8 text-white" />
//             </div>
//             <h3 className="mb-2 text-xl font-semibold text-white">
//               No {category.name} Articles Yet
//             </h3>
//             <p className="mb-6 text-slate-400">
//               We are working on bringing you the latest{' '}
//               {category.name.toLowerCase()} car content. Check back soon!
//             </p>
//             <Link href="/blog">
//               <Button
//                 className={`${category.bgColor} text-white hover:opacity-90`}
//               >
//                 Browse All Articles
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// app/category/[slug]/page.tsx
import Link from 'next/link';

type CategorySlug = 'electric' | 'luxury' | 'sports' | 'suv';

// Define the specific props for your CategoryPage
interface CategoryPageProps {
  params: Promise<{
    slug: CategorySlug;
  }>;
}

// Minimal generateStaticParams
export function generateStaticParams(): { slug: CategorySlug }[] {
  return [
    { slug: 'electric' },
    { slug: 'luxury' },
    { slug: 'sports' },
    { slug: 'suv' },
  ];
}

// Minimal Page Component using the specific interface
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