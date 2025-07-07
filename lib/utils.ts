import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCarImageUrl(seed: number): string {
  const carImages = [
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1561967774-7db5dba10d6e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&h=600&fit=crop',
  ];
  return carImages[seed % carImages.length];
}

export function getCarCategory(index: number): string {
  const categories = ['Electric', 'Luxury', 'SUV', 'Sports', 'Sedan', 'Hybrid', 'Compact', 'Truck'];
  return categories[index % categories.length];
}

export function getReadTime(body: string): string {
  const wordsPerMinute = 200;
  const words = body.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}