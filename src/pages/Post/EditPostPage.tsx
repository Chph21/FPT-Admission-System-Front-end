import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditPostPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const data = JSON.parse(localStorage.getItem("user") || "{}");

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const prevImageUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        if (!id) return;
        fetch(`https://fpt-admission-system.onrender.com/api/posts/${id}`)
            .then(res => res.json())
            .then(post => {
                setTitle(post.title);
                setCategory(post.category);
                setContent(post.content);
                prevImageUrlsRef.current = extractImageUrls(post.content);
            })
            .catch(() => alert("Không tải được bài viết."));
    }, [id]);

    const extractImageUrls = (html: string): string[] => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return Array.from(div.querySelectorAll("img"))
            .map(img => img.getAttribute("src") || "")
            .filter(Boolean);
    };

    class MyUploadAdapter {
        private loader: any;
        constructor(loader: any) {
            this.loader = loader;
        }

        async upload() {
            const data = new FormData();
            const file = await this.loader.file;
            data.append("upload", file);

            const res = await fetch("https://fpt-admission-system.onrender.com/api/upload-image", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: data,
            });

            const result = await res.json();
            return { default: result.url };
        }

        abort() { }
    }

    function MyCustomUploadAdapterPlugin(editor: any) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
            return new MyUploadAdapter(loader);
        };
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`https://fpt-admission-system.onrender.com/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                userId: data.id
            },
            body: JSON.stringify({ title, category, content })
        });

        if (res.ok) {
            alert("Cập nhật thành công!");
            navigate(`/posts/${id}`);
        } else {
            const error = await res.json();
            alert("Lỗi: " + (error?.error || "Không rõ"));
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xoá bài viết này?");
        if (!confirmed || !id) return;

        const res = await fetch(`https://fpt-admission-system.onrender.com/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            alert("Đã xoá bài viết.");
            navigate("/admin/posts"); // điều hướng về danh sách bài viết admin
        } else {
            const error = await res.json();
            alert("Lỗi xoá: " + (error?.error || "Không rõ"));
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-gray-800">
            <h1 className="text-2xl font-bold">Chỉnh sửa bài viết</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-4 py-2 rounded bg-white"
                    required
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border px-4 py-2 rounded bg-white"
                    required
                >
                    <option value="">-- Chọn danh mục --</option>
                    <option value="TIN_TUC_CHUNG">Tin tức chung</option>
                    <option value="BAO_CHI_NOI_VE_FPTU">Báo chí nói về FPTU</option>
                    <option value="HOC_THUAT">Học thuật</option>
                    <option value="TRACH_NHIEM_CONG_DONG">Trách nhiệm cộng đồng</option>
                    <option value="TRAI_NGHIEM_TOAN_CAU">Trải nghiệm toàn cầu</option>
                    <option value="CUU_SINH_VIEN">Cựu sinh viên</option>
                    <option value="KHOA_HOC">Khóa học</option>
                </select>

                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
                    onChange={(_, editor) => {
                        const newContent = editor.getData();
                        setContent(newContent);

                        const oldImages = prevImageUrlsRef.current;
                        const newImages = extractImageUrls(newContent);
                        const deletedImages = oldImages.filter(url => !newImages.includes(url));

                        deletedImages.forEach(url => {
                            fetch("https://fpt-admission-system.onrender.com/api/delete-image", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({ url })
                            });
                        });

                        prevImageUrlsRef.current = newImages;
                    }}
                />

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Lưu thay đổi
                    </button>

                    {data?.role === 'ADMIN' && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Xoá bài viết
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditPostPage;
