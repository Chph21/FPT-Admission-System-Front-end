import React from 'react';
import CategorySection from '../../components/Post/CategorySection';

const NewsPage: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Banner */}
      <div
        className="relative w-full h-[301px] bg-cover flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://daihoc.fpt.edu.vn/wp-content/uploads/2025/01/header-2024-png.avif')",
          backgroundPosition: 'center 100%',
        }}
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-lg">
          Tin tức & sự kiện
        </h1>
      </div>

      {/* Các danh mục */}
      <CategorySection title="Tin tức chung" category="TIN_TUC_CHUNG" />
      <CategorySection title="Báo chí nói về FPTU" category="BAO_CHI_NOI_VE_FPTU" />
      <CategorySection title="Học thuật" category="HOC_THUAT" />
      <CategorySection title="Trách nhiệm cộng đồng" category="TRACH_NHIEM_CONG_DONG" />
    </div>
  );
};

export default NewsPage;
