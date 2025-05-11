/**
 * Định nghĩa các kiểu dữ liệu cho blog
 */

/**
 * Thông tin tác giả
 */
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

/**
 * Danh mục bài viết
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  featuredImage?: string;
  parentId?: string; // Cho phép danh mục có danh mục cha
}

/**
 * Tag cho bài viết
 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

/**
 * Trạng thái bài viết
 */
export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

/**
 * Bài viết
 */
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  tags?: Tag[];
  status: PostStatus;
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // Thời gian đọc (phút)
  featured?: boolean;
  views?: number;
  likes?: number;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
  };
}

/**
 * Phản hồi phân trang
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Tham số cho phân trang
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Tham số lọc bài viết
 */
export interface PostFilters extends PaginationParams {
  categoryId?: string;
  authorId?: string;
  tagIds?: string[];
  status?: PostStatus;
  featured?: boolean;
  fromDate?: string;
  toDate?: string;
}

/**
 * Phản hồi cho Newsletter
 */
export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

/**
 * Thống kê cho bài viết
 */
export interface PostStatistics {
  postId: string;
  views: number;
  likes: number;
  shares: number;
  commentCount: number;
}

/**
 * Bình luận cho bài viết
 */
export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string; // Cho phép trả lời bình luận
  likes: number;
}