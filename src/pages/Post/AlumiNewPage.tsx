import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Post = {
  id: number;
  title: string;
  imageUrl: string;
  publishedAt: string;
};

const AlumniNewsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const pageSize = 9;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchPosts = async (pageNum: number) => {
    const limit = pageSize;
    const offset = pageNum * pageSize;

    try {
      const res = await fetch(`https://fpt-admission-system.onrender.com/api/posts/latest?limit=${limit}&offset=${offset}&category=CUU_SINH_VIEN`);
      if (!res.ok) throw new Error('Fetch failed');

      const data: Post[] = await res.json();

      setPosts(prev => {
        const prevIds = new Set(prev.map(p => p.id));
        const uniquePosts = data.filter(p => !prevIds.has(p.id));
        return [...prev, ...uniquePosts];
      });

      setHasMore(data.length === limit);
    } catch (err) {
      console.error('Lỗi khi tải bài viết:', err);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Banner */}
      <div
        className="relative w-full h-[301px] bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: "url('https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/header-2024-png.avif')",
        }}
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-lg">
          Cựu sinh viên
        </h1>
      </div>

      {/* Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="cursor-pointer"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-4 font-semibold text-lg text-gray-800 hover:text-orange-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{formatDate(post.publishedAt)}</p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-100 transition-colors"
            >
              Xem thêm
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AlumniNewsPage;
