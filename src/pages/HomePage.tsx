import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PostCard from '../components/PostCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { getFeaturedPosts, getAllCategories, posts } from '../data/mock-data';

const HomePage: React.FC = () => {
  const featuredPosts = getFeaturedPosts(5);
  const categories = getAllCategories();
  
  // Lấy các bài viết mới nhất (không bao gồm featured posts)
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .filter(post => !featuredPosts.slice(0, 1).some(fp => fp.id === post.id))
    .slice(0, 6);

  // Lấy bài viết phổ biến từ mỗi danh mục
  const popularByCategory = categories.map(category => {
    const categoryPosts = posts.filter(post => post.category.id === category.id);
    return categoryPosts.length > 0 ? categoryPosts[0] : null;
  }).filter(Boolean);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-neutral-50 pt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Feature */}
            <div className="lg:col-span-7">
              <PostCard post={featuredPosts[0]} featured={true} />
            </div>
            
            {/* Secondary Features */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {featuredPosts.slice(1, 3).map(post => (
                <PostCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Bài viết mới nhất</h2>
            <Link 
              to="/latest" 
              className="flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              Xem tất cả
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Popular in Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Khám phá theo danh mục</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {categories.map(category => {
              const categoryPosts = posts.filter(post => post.category.id === category.id);
              const popularPost = categoryPosts.length > 0 ? categoryPosts[0] : null;
              
              if (!popularPost) return null;
              
              return (
                <div key={category.id} className="flex flex-col">
                  <div className="mb-4">
                    <Link 
                      to={`/category/${category.slug}`} 
                      className="text-lg font-bold text-primary hover:underline inline-flex items-center"
                    >
                      {category.name}
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                  
                  <div className="flex-grow">
                    <PostCard post={popularPost} />
                  </div>
                  
                  <ul className="mt-6 space-y-3">
                    {categoryPosts.slice(1, 4).map(post => (
                      <li key={post.id} className="group">
                        <Link 
                          to={`/post/${post.slug}`} 
                          className="text-neutral-700 hover:text-primary group-hover:text-primary transition-colors font-medium line-clamp-2"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Now Section (Featured posts 3-5) */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Đang thịnh hành</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.slice(2, 5).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;