import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import { paginatePosts, posts } from '../data/mock-data';

const LatestPostsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [paginatedData, setPaginatedData] = useState(paginatePosts(posts, currentPage));

  useEffect(() => {
    // Sắp xếp bài viết theo thời gian đăng (mới nhất lên đầu)
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Phân trang
    setPaginatedData(paginatePosts(sortedPosts, currentPage));
    
    // Scroll lên đầu trang khi chuyển trang
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Bài viết mới nhất</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Khám phá những bài viết mới nhất từ Atlassian Blog, nơi bạn có thể tìm thấy những thông tin 
            hữu ích và những xu hướng mới nhất trên nhiều lĩnh vực.
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedData.items.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={paginatedData.totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default LatestPostsPage;