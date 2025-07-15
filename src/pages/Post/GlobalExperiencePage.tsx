import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    imageUrl: string;
    publishedAt: string;
}

const GlobalExperiencePage: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 9;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchPosts = async (currentPage: number) => {
        try {
            const offset = currentPage * pageSize;
            const res = await fetch(
                `https://fpt-admission-system.onrender.com/api/posts/latest?limit=${pageSize}&offset=${offset}&category=TRAI_NGHIEM_TOAN_CAU`
            );
            if (!res.ok) throw new Error('Failed to fetch posts');
            const data: Post[] = await res.json();

            setPosts(prev => {
                const ids = new Set(prev.map(p => p.id));
                const uniqueNewPosts = data.filter(p => !ids.has(p.id));
                return [...prev, ...uniqueNewPosts];
            });

            setHasMore(data.length === pageSize);
        } catch (error) {
            console.error('Error fetching global experience posts:', error);
        }
    };

    // Load trang đầu tiên
    useEffect(() => {
        setPage(0);
    }, []);

    // Tự động fetch khi page thay đổi
    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="w-full bg-orange-500 text-white font-bold text-xl px-6 py-3 rounded-md mb-8 text-center">
                <span className="inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 2a2 2 0 00-2 2v1.586L5.707 3.293A1 1 0 104.293 4.707L7.586 8H6a2 2 0 00-2 2v2a2 2 0 002 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L8 15.414V17a2 2 0 002 2h2a2 2 0 002-2v-1.586l3.293 3.293a1 1 0 001.414-1.414L15.414 14H17a2 2 0 002-2v-2a2 2 0 00-2-2h-1.586l3.293-3.293a1 1 0 00-1.414-1.414L14 6.586V5a2 2 0 00-2-2h-2z" />
                    </svg>
                    Trải nghiệm toàn cầu
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post.id} className="cursor-pointer">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-md"
                            onClick={() => navigate(`/posts/${post.id}`)}
                        />
                        <h3
                            onClick={() => navigate(`/posts/${post.id}`)}
                            className="mt-4 font-semibold text-lg text-gray-800 hover:text-orange-600 transition-colors"
                        >
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
    );
};

export default GlobalExperiencePage;
