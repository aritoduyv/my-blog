import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Clock, Calendar, ChevronLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import PostCard from '../components/PostCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { getPostBySlug, getRelatedPosts, Post } from '../data/mock-data';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const PostDetailPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (postSlug) {
      const foundPost = getPostBySlug(postSlug);
      setPost(foundPost || null);
      
      if (foundPost) {
        setRelatedPosts(getRelatedPosts(foundPost));
      }
      
      window.scrollTo(0, 0);
    }
  }, [postSlug]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Bài viết không tồn tại</h1>
        <p className="text-neutral-600">Không tìm thấy bài viết này. Vui lòng kiểm tra lại đường dẫn.</p>
      </div>
    );
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.coverImage,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "image": post.author.avatar
    },
    "publisher": {
      "@type": "Organization",
      "name": "Atlassian Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/logo.png"
      }
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - Atlassian Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category.name} />
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <div className="w-full h-96 md:h-[500px] bg-neutral-800 relative overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
            <Link 
              to={`/category/${post.category.slug}`} 
              className="bg-primary text-white text-sm uppercase font-medium px-3 py-1 rounded-sm mb-4 inline-block hover:bg-primary-dark transition-colors"
            >
              {post.category.name}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-white gap-y-2">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-10 h-10 rounded-full mr-3 border-2 border-white"
              />
              <span className="mr-4 font-medium">{post.author.name}</span>
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{post.readTime} phút đọc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Social Sharing Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Link 
                  to={`/category/${post.category.slug}`} 
                  className="flex items-center text-neutral-600 hover:text-primary mb-6 group"
                >
                  <ChevronLeft size={16} className="mr-1 transform group-hover:-translate-x-1 transition-transform" />
                  <span>Quay lại {post.category.name}</span>
                </Link>
                
                <div className="space-y-4">
                  <h4 className="text-sm uppercase font-medium text-neutral-500">Chia sẻ</h4>
                  <div className="flex flex-col space-y-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-neutral-700 hover:text-[#4267B2] transition-colors"
                    >
                      <Facebook size={18} className="mr-2" />
                      <span>Facebook</span>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-neutral-700 hover:text-[#1DA1F2] transition-colors"
                    >
                      <Twitter size={18} className="mr-2" />
                      <span>Twitter</span>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-neutral-700 hover:text-[#0A66C2] transition-colors"
                    >
                      <Linkedin size={18} className="mr-2" />
                      <span>LinkedIn</span>
                    </a>
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: post.title,
                            url: window.location.href
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Đã sao chép liên kết vào clipboard!');
                        }
                      }}
                      className="flex items-center text-neutral-700 hover:text-primary transition-colors"
                    >
                      <Share2 size={18} className="mr-2" />
                      <span>Chia sẻ khác</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none mb-10">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Social Sharing - Mobile */}
              <div className="flex items-center justify-between border-t border-b border-neutral-200 py-4 mb-10 lg:hidden">
                <span className="text-sm font-medium">Chia sẻ bài viết:</span>
                <div className="flex space-x-4">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-700 hover:text-[#4267B2] transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-700 hover:text-[#1DA1F2] transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-700 hover:text-[#0A66C2] transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-neutral-50 p-6 rounded-lg flex flex-col md:flex-row gap-6 items-center md:items-start mb-10">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">Về tác giả</h3>
                  <h4 className="text-lg font-medium mb-3">{post.author.name}</h4>
                  <p className="text-neutral-600">
                    Là một chuyên gia trong lĩnh vực {post.category.name.toLowerCase()}, 
                    {post.author.name} đã có nhiều năm kinh nghiệm và đóng góp vào cộng đồng 
                    thông qua các bài viết chuyên sâu và nghiên cứu.
                  </p>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-6">Bài viết liên quan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <PostCard key={relatedPost.id} post={relatedPost} />
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;