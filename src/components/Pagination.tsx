import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5; // Số nút trang tối đa cần hiển thị

    // Luôn hiển thị trang hiện tại và 2 trang trước/sau nếu có
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    // Điều chỉnh lại nếu cần
    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    // Thêm nút trang đầu nếu cần
    if (startPage > 1) {
      buttons.push(
        <button
          key="1"
          onClick={() => onPageChange(1)}
          className="px-3 py-1 text-neutral-700 hover:text-primary transition-colors"
        >
          1
        </button>
      );
      
      // Thêm dấu ba chấm nếu có khoảng cách
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="px-2 py-1 text-neutral-400">
            ...
          </span>
        );
      }
    }

    // Thêm các nút trang trong phạm vi
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            currentPage === i
              ? 'bg-primary text-white'
              : 'text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          {i}
        </button>
      );
    }

    // Thêm nút trang cuối nếu cần
    if (endPage < totalPages) {
      // Thêm dấu ba chấm nếu có khoảng cách
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="px-2 py-1 text-neutral-400">
            ...
          </span>
        );
      }
      
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 text-neutral-700 hover:text-primary transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentPage === 1
            ? 'text-neutral-400 cursor-not-allowed'
            : 'text-neutral-700 hover:bg-neutral-100'
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {getPageButtons()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentPage === totalPages
            ? 'text-neutral-400 cursor-not-allowed'
            : 'text-neutral-700 hover:bg-neutral-100'
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;