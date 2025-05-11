import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Post } from '../data/mock-data';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-80"></div>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ minHeight: '360px' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 text-white">
          <div className="mb-2">
            <Link 
              to={`/category/${post.category.slug}`} 
              className="text-sm uppercase font-medium bg-primary px-2 py-1 rounded-sm text-white inline-block hover:bg-primary-dark transition-colors"
            >
              {post.category.name}
            </Link>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">
            <Link to={`/post/${post.slug}`} className="hover:underline">{post.title}</Link>
          </h2>
          <p className="mb-4 line-clamp-2 text-neutral-100">{post.excerpt}</p>
          <div className="flex items-center text-sm text-neutral-200">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-8 h-8 rounded-full mr-2 object-cover border-2 border-white"
            />
            <span className="mr-3">{post.author.name}</span>
            <span className="mr-3">•</span>
            <span className="mr-3">{formatDate(post.publishedAt)}</span>
            <span className="mr-1">•</span>
            <Clock size={14} className="mx-1" />
            <span>{post.readTime} phút đọc</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden h-full transition-shadow hover:shadow-md flex flex-col">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-2">
          <Link 
            to={`/category/${post.category.slug}`} 
            className="text-xs uppercase font-medium text-primary hover:underline"
          >
            {post.category.name}
          </Link>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-2 text-sm flex-grow">{post.excerpt}</p>
        <div className="flex items-center text-xs text-neutral-500 mt-auto">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-6 h-6 rounded-full mr-2 object-cover"
          />
          <span className="mr-2">{post.author.name}</span>
          <span className="mr-2">•</span>
          <span className="mr-2">{formatDate(post.publishedAt)}</span>
          <span className="mr-1">•</span>
          <Clock size={12} className="mx-1" />
          <span>{post.readTime} phút đọc</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;