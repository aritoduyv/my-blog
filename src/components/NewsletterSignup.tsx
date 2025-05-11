import React, { useState } from 'react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra email đơn giản
    if (!email || !email.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }
    
    // Mock submission
    setIsSubmitted(true);
    setError('');
  };

  return (
    <div className="bg-primary-dark rounded-xl p-8 text-white">
      <h3 className="text-2xl font-bold mb-2">Đăng ký nhận bản tin</h3>
      <p className="mb-6 text-neutral-100">
        Nhận những bài viết mới nhất và thông tin hữu ích qua email hàng tuần.
      </p>
      
      {isSubmitted ? (
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-center">
          <h4 className="font-bold mb-2">Cảm ơn bạn đã đăng ký!</h4>
          <p>Chúng tôi đã gửi email xác nhận đến địa chỉ {email}.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className={`flex-grow px-4 py-3 rounded-lg bg-white bg-opacity-10 border ${
                error ? 'border-red-400' : 'border-transparent'
              } focus:border-white focus:outline-none placeholder-neutral-300`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Đăng ký
            </button>
          </div>
          {error && <p className="mt-2 text-red-300 text-sm">{error}</p>}
          <p className="mt-3 text-sm text-neutral-300">
            Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
          </p>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;