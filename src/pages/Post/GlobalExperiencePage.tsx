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
            <div
                className="relative w-full h-[301px] bg-cover flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('/header-2024-png.avif')",
                    backgroundPosition: 'center 100%',
                }}
            >
                <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-lg">
                    TRẢI NGHIỆM TOÀN CẦU
                </h1>
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
