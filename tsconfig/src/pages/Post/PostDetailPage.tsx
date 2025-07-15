import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Post = {
    id: number;
    title: string;
    content: string;
    publishedAt: string;
    category: string; 
};

const formatVietnameseDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};


const getCategoryBreadcrumb = (category?: string) => {
    switch (category) {
        case 'TIN_TUC_CHUNG':
            return { title: 'Tin tức & Sự kiện', href: '/tin-tuc' };
        case 'BAO_CHI_NOI_VE_FPTU':
            return { title: 'Báo chí nói về FPTU', href: '/tin-tuc' };
        case 'HOC_THUAT':
            return { title: 'Học Thuật', href: '/tin-tuc' };
        case 'TRAI_NGHIEM_CONG_DONG':
            return { title: 'Tin tức & Sự kiện', href: '/tin-tuc' };
        case 'KHOA_HOC':
            return { title: 'Ngành học', href: '/nganh-hoc' };
        case 'TRAI_NGHIEM_TOAN_CAU':
            return { title: 'Trải nghiệm toàn cầu', href: '/trai-nghiem-toan-cau' };
        case 'CUU_SINH_VIEN':
            return { title: 'Cựu sinh viên', href: '/cuu-sinh-vien' };
        default:
            return { title: '', href: '/' };
    }
};

const PostDetailPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:8080/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch((err) => console.error('Error fetching post detail:', err));
    }, [id]);


    if (!post) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-gray-500">
                Đang tải bài viết...
            </div>
        );
    }

    const { title: categoryTitle, href: categoryHref } = getCategoryBreadcrumb(post.category);

    return (
        <div className="max-w-4xl mx-auto px-4 py-5">
            <div className="max-w-6xl mx-auto px-4 pt-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-600">
                    <ol className="list-reset flex">
                        <li>
                            <a href="/" className="hover:underline text-blue-600">Trang chủ</a>
                        </li>
                        <li><span className="mx-2">›</span></li>
                        <li>
                            <a href={categoryHref} className="hover:underline text-blue-600">{categoryTitle}</a>
                        </li>
                        <li><span className="mx-2">›</span></li>
                        <li className="text-gray-800 font-medium truncate max-w-[70%]">
                            {post.title}
                        </li>
                    </ol>
                    <hr className="mt-2 border-gray-300" />
                </nav>
            </div>

            {/* Tiêu đề */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

            {post.category !== 'KHOA_HOC' && (
            <p className="text-sm text-gray-500 mb-8">
                {formatVietnameseDate(post.publishedAt)}
            </p>
            )}


            {/* Nội dung bài viết */}
            <div
                className="prose prose-lg text-black max-w-none md:max-w-3xl lg:max-w-4xl mx-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
};

export default PostDetailPage;
