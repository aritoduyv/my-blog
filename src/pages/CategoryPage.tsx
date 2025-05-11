import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import { getPostsByCategory, categories } from '../data/mock-data';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [paginatedData, setPaginatedData] = useState(getPostsByCategory(categorySlug || '', currentPage));
  const category = categories.find(cat => cat.slug === categorySlug);

  useEffect(() => {
    if (categorySlug) {
      setPaginatedData(getPostsByCategory(categorySlug, currentPage));
      
      // Scroll lên đầu trang khi chuyển trang
      window.scrollTo(0, 0);
    }
  }, [categorySlug, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Danh mục không tồn tại</h1>
        <p className="text-neutral-600">Không tìm thấy danh mục này. Vui lòng kiểm tra lại đường dẫn.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-primary text-sm uppercase font-medium">Danh mục</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{category.name}</h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Khám phá những bài viết về {category.name} từ các chuyên gia trong lĩnh vực này.
          </p>
        </div>

        {/* Post Grid */}
        {paginatedData.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedData.items.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600">Không có bài viết nào trong danh mục này.</p>
          </div>
        )}

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

export default CategoryPage;