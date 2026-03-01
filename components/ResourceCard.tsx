
import React, { useState } from 'react';
import { Resource, ViewMode } from '../types';

interface ResourceCardProps {
  resource: Resource;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  viewMode?: ViewMode;
  lang: 'en' | 'zh';
}

const DARK_NAVY = '#111827';
const LIGHT_SLATE = '#94A3B8';
const THEME_BLUE = '#2563EB';

const translations = {
  en: {
    visit: "Visit Resource",
    added: "Added",
    uploaded: "UPLOADED",
    by: "by"
  },
  zh: {
    visit: "访问资源",
    added: "已添加",
    uploaded: "已上传",
    by: "贡献者"
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  resource, 
  index, 
  isBookmarked, 
  onToggleBookmark,
  viewMode = ViewMode.GRID,
  lang
}) => {
  const t = translations[lang];
  const [imgSrc, setImgSrc] = useState(`https://s0.wp.com/mshots/v1/${encodeURIComponent(resource.url)}?w=600`);
  const [hasFallback, setHasFallback] = useState(false);
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageError = () => {
    if (!hasFallback) {
      setImgSrc(resource.imageUrl);
      setHasFallback(true);
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark(resource.id);
  };

  const shouldHideContributor = 
    resource.contributor === 'Admin' || 
    resource.contributor === 'System Admin' || 
    resource.contributor === 'Anonymous';

  if (viewMode === ViewMode.LIST) {
    return (
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-[16px] border border-[#E5E7EB] flex items-center p-3 gap-4 group transition-all duration-300 hover:shadow-md hover:border-blue-200 cursor-pointer animate-card-entry w-full"
        style={{ animationDelay: `${index * 0.03}s` }}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-50">
          <img 
            src={imgSrc} 
            onError={handleImageError}
            alt={resource.title} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors" style={{ fontSize: '15px' }}>
              {resource.title}
            </h3>
          </div>
          <p className="text-slate-500 text-[12px] line-clamp-1">
            {resource.description}
          </p>
        </div>

        <div className="hidden md:flex flex-col items-end shrink-0 px-2 border-l border-slate-50">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{t.added}</span>
          <span className="text-[12px] font-bold text-slate-600">{resource.addedDate}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={toggleBookmark}
            className="p-2 rounded-xl hover:bg-slate-50 text-[#CBD5E1] transition-all hover:text-blue-500 active:scale-90"
          >
            <svg className={`w-5 h-5 transition-all duration-300 ${isBookmarked ? 'text-[#2563EB] fill-current' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" fill={isBookmarked ? "currentColor" : "none"} />
            </svg>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-[24px] border border-[#E5E7EB] flex flex-col overflow-hidden group transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 relative w-full max-w-[320px] mx-auto cursor-pointer animate-card-entry"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="h-48 relative overflow-hidden shrink-0 bg-slate-100">
        <img 
          src={imgSrc} 
          onError={handleImageError}
          alt={resource.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        
        <div className="absolute inset-0 bg-[#0F172A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#2563EB] px-6 py-3 rounded-full flex items-center justify-center gap-2.5 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 cubic-bezier(0.23, 1, 0.32, 1) z-10 shadow-2xl border border-white/20">
          <span className="text-white font-[900] text-[11px] tracking-[0.1em] uppercase antialiased whitespace-nowrap">{t.visit}</span>
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="p-[24px] flex flex-col flex-1">
        <h3 className="font-[800] leading-[1.3] mb-3 group-hover:text-[#2563EB] transition-colors duration-500" style={{ color: DARK_NAVY, fontSize: '19px' }}>
          {resource.title}
        </h3>
        
        <div 
          className="h-[84px] overflow-y-auto mb-6 scrollbar-hide cursor-text group/desc"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="leading-[1.6] font-normal transition-colors duration-500 text-slate-500" style={{ fontSize: '14px' }}>
            {resource.description}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] flex items-center justify-center text-[#94A3B8] group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-[#2563EB] transition-all duration-500 shadow-sm shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="flex flex-col">
              <span className="font-[800] uppercase tracking-[0.18em] leading-tight mb-0.5" style={{ color: LIGHT_SLATE, fontSize: '10px' }}>{t.uploaded}</span>
              <span className="font-[900] leading-tight text-[#0F172A] tracking-[-0.01em]" style={{ fontSize: '16px' }}>{resource.addedDate}</span>
              
              {!shouldHideContributor && (
                <div className="font-[700] antialiased mt-1" style={{ color: THEME_BLUE, fontSize: '11.5px' }}>
                  {t.by} {resource.contributor}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={toggleBookmark}
              className="focus:outline-none transition-all duration-300 hover:scale-110 p-2 rounded-xl hover:bg-slate-50 active:scale-90 shrink-0"
              title="Bookmark"
            >
              <svg className={`w-6 h-6 transition-all duration-500 ${isBookmarked ? 'text-[#2563EB]' : 'text-[#CBD5E1]'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
