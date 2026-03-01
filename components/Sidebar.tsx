
import React, { useState, useEffect } from 'react';
import { Collection, Theme } from '../types';

interface SidebarProps {
  collections: Collection[];
  activeTheme: string;
  onThemeSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onAdminClick: () => void;
  isAdminActive: boolean;
  taglineWords: string[];
  bookmarkCount: number;
  lang: 'en' | 'zh';
}

const BRAND_BLUE = '#2563EB';
const DARK_NAVY = '#121A26';
const SLATE_LIGHTER = '#94A3B8'; 
const SLATE_EXTRA_LIGHTER = '#CBD5E1'; 

const translations = {
  en: {
    home: "Welcome",
    collections: "COLLECTIONS",
    adminConsole: "ADMIN CONSOLE",
    adminDeck: "Admin Deck",
    exitAdminMode: "Exit Admin Mode",
    adminPortal: "Admin Portal",
    repository: "REPOSITORY",
    for: "FOR",
    bookmarks: "Bookmarks",
    saved: "SAVED"
  },
  zh: {
    home: "欢迎",
    collections: "收藏",
    adminConsole: "管理员控制台",
    adminDeck: "管理面板",
    exitAdminMode: "退出管理模式",
    adminPortal: "管理员门户",
    repository: "资源库",
    for: "面向",
    bookmarks: "书签",
    saved: "已保存"
  }
};

const TypingTagline: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [pause, setPause] = useState(false);

  const TYPE_SPEED = 80;
  const DELETE_SPEED = 40;
  const PAUSE_TIME = 1500;

  useEffect(() => {
    if (!words || words.length === 0) return;
    if (index >= words.length) {
      setIndex(0);
      setSubIndex(0);
      setReverse(false);
      setPause(false);
      return;
    }
    if (pause) {
      const timeout = setTimeout(() => {
        setPause(false);
        setReverse(true);
      }, PAUSE_TIME);
      return () => clearTimeout(timeout);
    }
    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const currentWord = words[index];
    if (!reverse && subIndex === currentWord.length) {
      setPause(true);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? DELETE_SPEED : TYPE_SPEED);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, pause, words]);

  if (!words || words.length === 0) return null;
  const currentWord = words[index % words.length] || '';
  const displayText = currentWord.substring(0, subIndex);

  return (
    <div className="flex items-center gap-[3px] h-full">
      <span style={{ color: BRAND_BLUE, fontWeight: 900, display: 'inline-block' }}>
        {displayText || '\u00A0'}
      </span>
      <div style={{ backgroundColor: BRAND_BLUE, width: '4px', height: '4px', flexShrink: 0 }}></div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ 
  collections, 
  activeTheme, 
  onThemeSelect, 
  isOpen, 
  onClose, 
  onAdminClick, 
  isAdminActive, 
  taglineWords,
  bookmarkCount,
  lang
}) => {
  const t = translations[lang];
  const isLandingActive = activeTheme === 'landing';
  const isBookmarksActive = activeTheme === Theme.BOOKMARKS;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500" onClick={onClose} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] lg:w-1/6 lg:min-w-[240px] bg-white border-r border-[#E5E7EB] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) lg:relative lg:translate-x-0 will-change-transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col
      `}>
        <div className="p-6 xl:p-8 pb-4">
          <div className="flex flex-col items-start select-none cursor-pointer" onClick={() => onThemeSelect('landing')}>
            <div className="flex items-center font-[900] text-[28px] xl:text-[32px] tracking-[-0.04em] shadow-blue-500/10 leading-none antialiased">
              <span style={{ color: DARK_NAVY }}>HEO</span>
              <span style={{ 
                backgroundImage: `linear-gradient(to right, ${DARK_NAVY} 50%, ${BRAND_BLUE} 50%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                position: 'relative',
                padding: '0 0.2em',
                margin: '0 -0.2em'
              }}>R</span>
              <span style={{ color: BRAND_BLUE }}>epo</span>
              <div className="ml-[2px] self-end" style={{ backgroundColor: BRAND_BLUE, width: '8px', height: '8px', marginBottom: '4px' }}></div>
            </div>
            
            <div className="flex flex-col gap-[5px] uppercase mt-4 antialiased leading-none" style={{ fontSize: '10px' }}>
              <div className="flex items-center" style={{ height: '12px' }}>
                <span style={{ color: SLATE_LIGHTER, fontWeight: 900, letterSpacing: '0.45em' }}>{t.repository}</span>
              </div>
              <div className="flex items-center" style={{ height: '12px' }}>
                <span style={{ color: SLATE_EXTRA_LIGHTER, fontWeight: 900, letterSpacing: '0.25em' }}>{t.for}</span>
              </div>
              <div style={{ letterSpacing: '0.25em', height: '12px', display: 'flex', alignItems: 'center' }}>
                <TypingTagline words={taglineWords} />
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 mt-8 px-4 space-y-10 overflow-y-auto scrollbar-hide pb-10">
          <div>
            <div className="space-y-2.5">
               <button
                onClick={() => { onThemeSelect('landing'); onClose(); }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group ${
                  isLandingActive 
                  ? 'bg-[#05070a] text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]' 
                  : 'text-[#334155] hover:bg-[#f8fafc] hover:translate-x-1'
                }`}
              >
                <div className={`w-8 h-8 rounded-[11px] flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isLandingActive ? 'bg-white/15' : 'bg-[#f1f5f9] group-hover:bg-[#e2e8f0]'
                }`}>
                  <svg className={`w-4 h-4 ${isLandingActive ? 'text-white' : 'text-[#475569]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-[14.5px] font-[800] tracking-tight truncate">{t.home}</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="px-4 text-[11px] font-[800] text-[#64748B] uppercase tracking-[0.12em] mb-5">
              {t.collections}
            </h3>
            <div className="space-y-2.5">
              {collections.map((col) => {
                const isActive = activeTheme === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => { onThemeSelect(col.id); onClose(); }}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group ${
                      isActive 
                      ? 'bg-[#05070a] text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]' 
                      : 'text-[#334155] hover:bg-[#f8fafc] hover:translate-x-1'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-[11px] flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isActive ? 'bg-white/15' : 'bg-[#f1f5f9] group-hover:bg-[#e2e8f0]'
                    }`}>
                      {col.id === Theme.GENERAL ? (
                        <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#475569]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      ) : col.id === Theme.ECONOMIC_MODELING ? (
                        <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#475569]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      ) : col.id === Theme.SYSTEMATIC_REVIEWS ? (
                        <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#475569]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      ) : col.id === Theme.NEWS ? (
                        <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#475569]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      ) : (
                        <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#475569]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                      )}
                    </div>
                    <span className="text-[14.5px] font-[800] tracking-tight truncate">{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="px-4 text-[11px] font-[800] text-[#64748B] uppercase tracking-[0.12em] mb-5">
              {t.saved}
            </h3>
            <div className="space-y-2.5">
              <button
                onClick={() => { onThemeSelect(Theme.BOOKMARKS); onClose(); }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group relative ${
                  isBookmarksActive 
                  ? 'bg-[#05070a] text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]' 
                  : 'text-[#334155] hover:bg-[#f8fafc] hover:translate-x-1'
                }`}
              >
                <div className={`w-8 h-8 rounded-[11px] flex items-center justify-center shrink-0 transition-all duration-500 ${
                  isBookmarksActive ? 'bg-white/15' : 'bg-[#f1f5f9] group-hover:bg-[#e2e8f0]'
                }`}>
                  <svg className={`w-4 h-4 ${isBookmarksActive ? 'text-white' : 'text-[#475569]'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <span className="text-[14.5px] font-[800] tracking-tight truncate">{t.bookmarks}</span>
                {bookmarkCount > 0 && (
                  <div className={`absolute right-4 px-2 py-0.5 rounded-full text-[10px] font-black tracking-widest transition-all ${
                    isBookmarksActive ? 'bg-white text-[#05070a]' : 'bg-[#2563EB] text-white'
                  }`}>
                    {bookmarkCount}
                  </div>
                )}
              </button>
            </div>
          </div>

          {isAdminActive && (
            <div className="animate-card-entry">
              <h3 className="px-4 text-[11px] font-[800] text-[#64748b] uppercase tracking-[0.12em] mb-5">
                {t.adminConsole}
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => { onThemeSelect('admin-deck'); onClose(); }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) group relative ${
                    activeTheme === 'admin-deck' 
                    ? 'bg-[#2563EB] text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)]' 
                    : 'text-[#334155] hover:bg-slate-50 hover:translate-x-1'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                    activeTheme === 'admin-deck' ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <svg className={`w-4 h-4 ${activeTheme === 'admin-deck' ? 'text-white' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-[14.5px] font-[900] tracking-tight">{t.adminDeck}</span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {isAdminActive && (
          <div className="p-4 border-t border-[#E5E7EB]/40 bg-white">
            <button 
              onClick={onAdminClick}
              className="w-full flex items-center gap-2.5 px-4 py-3.5 text-red-500 hover:bg-red-50 cursor-pointer transition-all duration-300 group rounded-[20px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-[14px] font-[800] tracking-tight antialiased uppercase">
                {t.exitAdminMode}
              </span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
