import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaUpload, FaTrashAlt } from 'react-icons/fa';

interface PostListPageProps {
    basePath: string;
}

const PostListPage: React.FC<PostListPageProps> = ({ basePath }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [filter, setFilter] = useState({
        title: '',
        category: '',
        status: '',
        createdFrom: null as Date | null,
        createdTo: null as Date | null,
        publishedFrom: null as Date | null,
        publishedTo: null as Date | null
    });

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async (filterParam = filter) => {
        const toISOString = (date: Date | null) =>
            date ? format(date, "yyyy-MM-dd'T'HH:mm") : '';

        const params = new URLSearchParams({
            title: filterParam.title,
            category: filterParam.category,
            status: filterParam.status,
            createdFrom: toISOString(filterParam.createdFrom),
            createdTo: toISOString(filterParam.createdTo),
            publishedFrom: toISOString(filterParam.publishedFrom),
            publishedTo: toISOString(filterParam.publishedTo),
            page: String(page),
            size: String(size)
        });

        const res = await fetch(`https://fpt-admission-system.onrender.com/api/posts?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        setPosts(data.content || []);
        setTotalPages(data.totalPages || 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        if (filter.createdFrom && filter.createdTo && filter.createdFrom > filter.createdTo) {
            alert("'Từ ngày tạo' không được lớn hơn 'Đến ngày tạo'");
            return;
        }

        if (filter.publishedFrom && filter.publishedTo && filter.publishedFrom > filter.publishedTo) {
            alert("'Từ ngày đăng' không được lớn hơn 'Đến ngày đăng'");
            return;
        }

        const cleanedFilter = {
            ...filter,
            title: filter.title.trim()
        };

        setPage(0);
        fetchPosts(cleanedFilter);
        setShowModal(false);
    };

    const handleReset = () => {
        setFilter({
            title: '',
            category: '',
            status: '',
            createdFrom: null,
            createdTo: null,
            publishedFrom: null,
            publishedTo: null
        });
    };

    const handlePublish = async (id: number) => {
        if (!window.confirm("Bạn có chắc muốn đăng bài viết này không?")) return;

        try {
            const res = await fetch(`https://fpt-admission-system.onrender.com/api/posts/${id}/publish`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                alert("Bài viết đã được đăng");
                fetchPosts();
            } else {
                alert("Lỗi: " + (data.error || "Không rõ nguyên nhân"));
            }
        } catch {
            alert("Lỗi khi gọi API");
        }
    };

    const safeFormatDate = (value: string | null) => {
        const date = value ? new Date(value) : null;
        return date && !isNaN(date.getTime())
            ? format(date, 'dd/MM/yyyy HH:mm')
            : '---';
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-gray-800">
            <h1 className="text-3xl font-bold text-gray-800">Quản lý bài viết</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <input
                    type="text"
                    name="title"
                    value={filter.title}
                    onChange={handleChange}
                    placeholder="Tìm theo tiêu đề"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-orange-200 rounded-lg text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 md:w-1/3"
                />
                <div className="flex gap-2">
                    <button
                        onClick={handleSearch}
                        className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Tìm kiếm
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Bộ lọc
                    </button>
                </div>
                <button
                    onClick={() => navigate(`${basePath}/posts/new`)}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    ➕ Tạo bài viết
                </button>

            </div>

            {showModal && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Bộ lọc</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-600 hover:text-black text-xl">×</button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <select
                                name="category"
                                value={filter.category}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
                            >
                                <option value="">-- Danh mục --</option>
                                <option value="TIN_TUC_CHUNG">Tin tức chung</option>
                                <option value="BAO_CHI_NOI_VE_FPTU">Báo chí nói về FPTU</option>
                                <option value="HOC_THUAT">Học thuật</option>
                                <option value="TRACH_NHIEM_CONG_DONG">Trách nhiệm cộng đồng</option>
                                <option value="TRAI_NGHIEM_TOAN_CAU">Trải nghiệm toàn cầu</option>
                                <option value="CUU_SINH_VIEN">Cựu sinh viên</option>
                                <option value="KHOA_HOC">Khóa học</option>
                            </select>

                            {/* Ngày tạo */}
                            <div className="flex gap-2">
                                <div className="w-full">
                                    <label className="text-sm text-gray-600">Từ ngày tạo</label>
                                    <DatePicker
                                        selected={filter.createdFrom}
                                        onChange={(date) => setFilter(prev => ({ ...prev, createdFrom: date }))}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="text-sm text-gray-600">Đến ngày tạo</label>
                                    <DatePicker
                                        selected={filter.createdTo}
                                        onChange={(date) => setFilter(prev => ({ ...prev, createdTo: date }))}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>

                            {/* Ngày đăng */}
                            <div className="flex gap-2">
                                <div className="w-full">
                                    <label className="text-sm text-gray-600">Từ ngày đăng</label>
                                    <DatePicker
                                        selected={filter.publishedFrom}
                                        onChange={(date) => setFilter(prev => ({ ...prev, publishedFrom: date }))}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="text-sm text-gray-600">Đến ngày đăng</label>
                                    <DatePicker
                                        selected={filter.publishedTo}
                                        onChange={(date) => setFilter(prev => ({ ...prev, publishedTo: date }))}
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>

                            <select
                                name="status"
                                value={filter.status}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-900"
                            >
                                <option value="">-- Trạng thái --</option>
                                <option value="DRAFT">Nháp</option>
                                <option value="PUBLISHED">Đã đăng</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={handleReset} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                                Reset
                            </button>
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                                Hủy
                            </button>
                            <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                🧪 Áp dụng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200 text-sm bg-white rounded-lg overflow-hidden">
                    <thead className="bg-orange-50 text-gray-800 font-semibold">
                        <tr>
                            <th className="px-4 py-3 text-left">Tiêu đề</th>
                            <th className="px-4 py-3 text-left">Danh mục</th>
                            <th className="px-4 py-3 text-left">Ngày tạo</th>
                            <th className="px-4 py-3 text-left">Trạng thái</th>
                            <th className="px-4 py-3 text-left">Ngày đăng</th>
                            <th className="px-4 py-3 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {posts.map((post: any) => (
                            <tr key={post.id} className="hover:bg-gray-50 border-t">
                                <td className="px-4 py-3 max-w-[220px] truncate">{post.title}</td>
                                <td className="px-4 py-3">{post.category}</td>
                                <td className="px-4 py-3">{safeFormatDate(post.createdAt)}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
              ${post.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                        {post.status === 'DRAFT' ? 'Bản nháp' : 'Đã đăng'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{safeFormatDate(post.publishedAt)}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center items-center gap-3">
                                        <button
                                            title="Chi tiết"
                                            onClick={() => navigate(`${basePath}/posts/${post.id}/edit`)}
                                            className="text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <FaEdit />
                                        </button>
                                        {post.status === 'DRAFT' && (
                                            <button
                                                title="Đăng bài"
                                                onClick={() => handlePublish(post.id)}
                                                className="text-orange-500 hover:text-orange-700 transition"
                                            >
                                                <FaUpload />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end items-center space-x-2 pt-4">
                <button
                    disabled={page <= 0}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Trước
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`px-4 py-2 rounded-md font-medium ${page === i
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Tiếp
                </button>
            </div>

        </div>
    );
};

export default PostListPage;
