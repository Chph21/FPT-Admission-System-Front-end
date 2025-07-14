import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PostLinkItem {
    name: string;
    icon: JSX.Element;
    category: string;
    title: string;
}

interface PostResponse {
    id: number;
    title: string;
}

const fetchPostUrl = async (category: string, title: string): Promise<string> => {
    const encodedTitle = encodeURIComponent(title);
    const res = await fetch(`http://localhost:8080/api/posts/${category}/${encodedTitle}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    const data: PostResponse = await res.json();
    return `/posts/${data.id}`;
};

const column1 = [
    {
        group: 'Công nghệ thông tin',
        items: [
            { name: 'An toàn thông tin', icon: <i className="icon icon-icon-chuyennganh-01" />, category: 'KHOA_HOC', title: 'An toàn thông tin' },
            { name: 'Công nghệ ô tô số', icon: <i className="icon icon-icon-chuyennganh-02" />, category: 'KHOA_HOC', title: 'Công nghệ ô tô số' },
            { name: 'Kỹ thuật phần mềm', icon: <i className="icon icon-icon-chuyennganh-03" />, category: 'KHOA_HOC', title: 'Kỹ thuật phần mềm' },
            { name: 'Chuyển đổi số', icon: <i className="icon icon-icon-chuyennganh-04" />, category: 'KHOA_HOC', title: 'Chuyển đổi số' },
            { name: 'Thiết kế mỹ thuật số', icon: <i className="icon icon-icon-chuyennganh-05" />, category: 'KHOA_HOC', title: 'Thiết kế mỹ thuật số' },
            { name: 'Thiết kế vi mạch bán dẫn', icon: <i className="icon icon-icon-chuyennganh-06" />, category: 'KHOA_HOC', title: 'Thiết kế vi mạch bán dẫn' },
            { name: 'Trí tuệ nhân tạo', icon: <i className="icon icon-icon-chuyennganh-07" />, category: 'KHOA_HOC', title: 'Trí tuệ nhân tạo' },
        ],
    },
    {
        group: 'Luật',
        items: [
            { name: 'Luật kinh tế', icon: <i className="icon icon-icon-chuyennganh-08" />, category: 'KHOA_HOC', title: 'Luật kinh tế' },
            { name: 'Luật thương mại quốc tế', icon: <i className="icon icon-icon-chuyennganh-09" />, category: 'KHOA_HOC', title: 'Luật thương mại quốc tế' },
        ],
    },
];

const column2 = [
    {
        group: 'Quản trị kinh doanh',
        items: [
            { name: 'Công nghệ tài chính (Fintech)', icon: <i className="icon icon-icon-chuyennganh-10" />, category: 'KHOA_HOC', title: 'Công nghệ tài chính (Fintech)' },
            { name: 'Digital Marketing', icon: <i className="icon icon-icon-chuyennganh-11" />, category: 'KHOA_HOC', title: 'Digital Marketing' },
            { name: 'Kinh doanh quốc tế', icon: <i className="icon icon-icon-chuyennganh-12" />, category: 'KHOA_HOC', title: 'Kinh doanh quốc tế' },
            { name: 'Logistics & quản lý chuỗi cung ứng toàn cầu', icon: <i className="icon icon-icon-chuyennganh-13" />, category: 'KHOA_HOC', title: 'Logistics & quản lý chuỗi cung ứng toàn cầu' },
            { name: 'Quản trị khách sạn', icon: <i className="icon icon-icon-chuyennganh-14" />, category: 'KHOA_HOC', title: 'Quản trị khách sạn' },
            { name: 'Quản trị dịch vụ du lịch & lữ hành', icon: <i className="icon icon-icon-chuyennganh-15" />, category: 'KHOA_HOC', title: 'Quản trị dịch vụ du lịch & lữ hành' },
            { name: 'Tài chính doanh nghiệp', icon: <i className="icon icon-icon-chuyennganh-16" />, category: 'KHOA_HOC', title: 'Tài chính doanh nghiệp' },
            { name: 'Ngân hàng số - Tài chính', icon: <i className="icon icon-icon-chuyennganh-17" />, category: 'KHOA_HOC', title: 'Ngân hàng số - Tài chính' },
            { name: 'Tài chính đầu tư', icon: <i className="icon icon-icon-chuyennganh-18" />, category: 'KHOA_HOC', title: 'Tài chính đầu tư' },
        ],
    },
];

const column3 = [
    {
        group: 'Ngôn ngữ & truyền thông',
        items: [
            { name: 'Quan hệ công chúng', icon: <i className="icon icon-icon-chuyennganh-20" />, category: 'KHOA_HOC', title: 'Quan hệ công chúng' },
            { name: 'Truyền thông đa phương tiện', icon: <i className="icon icon-icon-chuyennganh-21" />, category: 'KHOA_HOC', title: 'Truyền thông đa phương tiện' },
        ],
    },
    {
        group: 'Ngôn ngữ Anh',
        items: [
            { name: 'Ngôn ngữ Anh', icon: <i className="icon icon-icon-chuyennganh-22" />, category: 'KHOA_HOC', title: 'Ngôn ngữ Anh' },
        ],
    },
    {
        group: 'Ngôn ngữ Trung Quốc',
        items: [
            { name: 'Song ngữ Trung-Anh', icon: <i className="icon icon-icon-chuyennganh-23" />, category: 'KHOA_HOC', title: 'Song ngữ Trung-Anh' },
        ],
    },
    {
        group: 'Ngôn ngữ Nhật',
        items: [
            { name: 'Song ngữ Nhật-Anh', icon: <i className="icon icon-icon-chuyennganh-24" />, category: 'KHOA_HOC', title: 'Song ngữ Nhật-Anh' },
        ],
    },
    {
        group: 'Ngôn ngữ Hàn Quốc',
        items: [
            { name: 'Song ngữ Hàn-Anh', icon: <i className="icon icon-icon-chuyennganh-25" />, category: 'KHOA_HOC', title: 'Song ngữ Hàn-Anh' },
        ]
    },
];

const TrainingProgramsPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = async (category: string, title: string) => {
        try {
            const url = await fetchPostUrl(category, title);
            navigate(url);
        } catch (error) {
            console.error('Không tìm thấy bài viết phù hợp:', error);
        }
    };

    return (
        <div className="w-full">
            {/* Banner */}
            <div
                className="relative w-full h-[301px] bg-center bg-cover flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/header-2024-png.avif')",
                }}
            >
                <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-lg">
                    Chương trình đào tạo
                </h1>
            </div>

            {/* Danh sách chương trình */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[column1, column2, column3].map((column, colIdx) => (
                        <div key={colIdx} className="space-y-8">
                            {column.map((group, groupIdx) => (
                                <div key={groupIdx}>
                                    <h2 className="text-xl font-bold text-orange-600 mb-4 whitespace-nowrap">
                                        {group.group}
                                    </h2>
                                    <ul className="space-y-2">
                                        {group.items.map((item, index) => (
                                            <li key={index}>
                                                <button
                                                    onClick={() => handleNavigate(item.category, item.title)}
                                                    className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded px-4 py-2 hover:bg-orange-100 transition w-full text-left text-black"
                                                >
                                                    <span className="text-orange-500 text-xl">{item.icon}</span>
                                                    <span className="font-medium text-sm md:text-base">
                                                        {item.name}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <div className="elementor-element elementor-element-18ea7ce elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
                        <div className="elementor-widget-container">
                            <ul className="elementor-icon-list-items">
                                <li className="elementor-icon-list-item flex items-center gap-3 text-gray-700">
                                    <span className="elementor-icon-list-icon">
                                        <i aria-hidden="true" className="icon icon-icon-chuyennganh-26 text-orange-500 text-xl"></i>
                                    </span>
                                    <span className="elementor-icon-list-text font-medium text-base">
                                        Tổng quan chương trình đào tạo
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrainingProgramsPage;