import Link from 'next/link';
import Image from 'next/image';
import { User, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <Link href={`/posts/${post.id}`}>
        <div className="bg-slate-800 border border-slate-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <div className="relative">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={800}
              height={600}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                <Tag className="w-3 h-3 mr-1" />
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-200 text-sm mb-4 line-clamp-3">
              {post.body.substring(0, 120)}...
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{post.user.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <span>{post.publishedAt}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}