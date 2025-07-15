import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreatePostPage = () => {
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("user") || "{}");
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const prevImageUrlsRef = useRef<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Tự xác định basePath là "/admin" hay "/staff"
  const basePath = location.pathname.startsWith("/admin") ? "/admin" : "/staff";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Bạn cần đăng nhập để tạo bài viết.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        userId: data.id
      },
      body: JSON.stringify({ title, category, content })
    });

    if (res.ok) {
      alert("Tạo bài viết thành công!");
      setTitle('');
      setCategory('');
      setContent('');
      navigate(`${basePath}/posts`);
    } else {
      const error = await res.json();
      alert("Lỗi: " + (error?.error || "Không rõ"));
    }
  };

  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    async upload() {
      const data = new FormData();
      const file = await this.loader.file;
      data.append("upload", file);

      const response = await fetch("http://localhost:8080/api/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      const result = await response.json();
      return {
        default: result.url
      };
    }

    abort() { }
  }

  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  const extractImageUrls = (html: string): string[] => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return Array.from(div.querySelectorAll("img"))
      .map(img => img.getAttribute("src") || "")
      .filter(Boolean);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tạo bài viết mới</h1>
        <button
          type="button"
          onClick={() => navigate(`${basePath}/posts`)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded bg-white text-gray-900"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-4 py-2 rounded bg-white text-gray-900"
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Đăng bài
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
