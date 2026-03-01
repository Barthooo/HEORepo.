
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ResourceCard from './components/ResourceCard';
import AdminDashboard from './components/AdminDashboard';
import { COLLECTIONS as initialCollections, RESOURCES as initialResources, TAGLINE_WORDS as initialTaglines, REPO_VERSION } from './data';
import { Resource, Collection, Theme, ViewMode } from './types';

const BRAND_BLUE = '#2563EB';
const DARK_NAVY = '#121A26';

const t = {
  welcome: "Welcome to",
  intro: "The repository of open-source tools & resources for Health Economics and Outcomes Research",
  select: "Select a collection to begin 👇",
  contributeBtn: "Contribute to HEORepo.",
  archive: "Archive",
  vault: "Vault",
  deck: "Deck",
  search: "Search...",
  items: "ITEMS",
  adminPanel: "ADMIN CONTROL PANEL",
  fullRepo: "FULL REPOSITORY",
  exitAdmin: "Exit Admin",
  management: "Management",
  emptyTitle: "Empty Archive",
  emptyDesc: "Adjust your filters or try a different search term.",
  version: "VERSION",
  adminMode: "ADMIN MODE",
  adminPortal: "Admin Portal",
  adminPortalDesc: "Enter system password to access management tools.",
  password: "Password",
  incorrectPassword: "Incorrect Password",
  cancel: "Cancel",
  confirm: "Confirm",
  contributeTitle: "Contribute",
  contributeDesc: "Suggest high-quality HEOR resources. Please input your suggestions below, then click 'Export CSV' and email the resulting file to contact@heorepo.com for review.",
  title: "Title",
  url: "URL",
  suggestedCol: "Suggested Collection",
  description: "Description",
  yourName: "Your Name",
  creditName: "Credit my name",
  addToList: "Add to List",
  exportCsv: "Export CSV",
  subReceived: "Export Successful",
  subReceivedDesc: "CSV exported. Please email it to contact@heorepo.com",
  allResources: "All Resources",
  bookmarksTitle: "Your Bookmarks",
  bookmarksEmpty: "No bookmarks yet.",
  bookmarksEmptyDesc: "Save resources for quick access by clicking the bookmark icon on any card.",
  bookmarkAdded: "Book mark added",
  saved: "SAVED"
};

const sanitizeData = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const isValidLink = (url: string): boolean => {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const escapeCSV = (val: string | undefined): string => {
  if (!val) return '""';
  const str = val.toString().replace(/"/g, '""');
  return `"${str}"`;
};

const Toast: React.FC<{ message: string; show: boolean; onHide: () => void }> = ({ message, show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
      <div className="bg-[#2563EB] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20">
        <span className="text-[13px] font-black uppercase tracking-widest">{message}</span>
        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('landing');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDotDropped, setIsDotDropped] = useState(false);
  
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('heo_view_mode');
    return (saved as ViewMode) || ViewMode.GRID;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const shouldResetCache = useMemo(() => {
    const savedVersionStr = localStorage.getItem('heo_repo_version');
    const savedVersion = savedVersionStr ? parseInt(savedVersionStr) : 0;
    const currentVersion = REPO_VERSION || 0;
    return currentVersion > savedVersion;
  }, []);

  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      if (shouldResetCache) return initialCollections;
      const saved = localStorage.getItem('heo_collections');
      return saved ? JSON.parse(saved) : initialCollections;
    } catch { return initialCollections; }
  });
  
  const [resources, setResources] = useState<Resource[]>(() => {
    try {
      if (shouldResetCache) return initialResources;
      const saved = localStorage.getItem('heo_resources');
      return saved ? JSON.parse(saved) : initialResources;
    } catch { return initialResources; }
  });
  
  const [taglineWords, setTaglineWords] = useState<string[]>(() => {
    try {
      if (shouldResetCache) return initialTaglines;
      const saved = localStorage.getItem('heo_tagline');
      return saved ? JSON.parse(saved) : initialTaglines;
    } catch { return initialTaglines; }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('heo_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('heo_view_mode', viewMode);
  }, [viewMode]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkedIds(prev => {
      const isAdding = !prev.includes(id);
      const newList = isAdding ? [...prev, id] : prev.filter(bid => bid !== id);
      if (isAdding) setToast({ show: true, message: t.bookmarkAdded });
      localStorage.setItem('heo_bookmarks', JSON.stringify(newList));
      return newList;
    });
  }, []);

  const handleThemeSelect = useCallback((id: string) => {
    const collection = collections.find(c => c.id === id);
    let initialSub = 'all';
    if (id !== 'landing' && id !== Theme.BOOKMARKS && collection && collection.subCategories && collection.subCategories.length > 0) {
      initialSub = collection.subCategories[0];
    }
    setActiveTheme(id);
    setActiveSubCategory(initialSub);
    setSearchQuery('');
    if (id !== 'landing') setIsDotDropped(false);
  }, [collections]);

  const currentCollection = useMemo(() => collections.find(c => c.id === activeTheme), [activeTheme, collections]);

  useEffect(() => {
    if (searchQuery.toLowerCase() === 'admin') {
      setSearchQuery('');
      setShowLoginModal(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    try {
      localStorage.setItem('heo_collections', JSON.stringify(collections));
      localStorage.setItem('heo_resources', JSON.stringify(resources));
      localStorage.setItem('heo_tagline', JSON.stringify(taglineWords));
      localStorage.setItem('heo_repo_version', (REPO_VERSION || 0).toString());
    } catch (e) {}
  }, [collections, resources, taglineWords]);

  const handleLogin = () => {
    if (password.trim() === '123456') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setPassword('');
      setLoginError(false);
      handleThemeSelect('admin-deck');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    if (activeTheme === 'admin-deck') {
      handleThemeSelect('landing');
    }
  };

  const [showContributeModal, setShowContributeModal] = useState(false);
  const [suggestionList, setSuggestionList] = useState<any[]>([]);
  const [contributionData, setContributionData] = useState({ 
    title: '', 
    url: '', 
    description: '', 
    userName: '', 
    category: Theme.GENERAL, 
    wantsCredit: true 
  });
  const [contributionSuccess, setContributionSuccess] = useState(false);

  const handleAddSuggestionToList = () => {
    if (!contributionData.title || !contributionData.url) {
      alert("Please provide at least a title and a valid URL.");
      return;
    }
    if (!isValidLink(contributionData.url)) {
      alert("Please provide a secure and valid URL.");
      return;
    }
    setSuggestionList(prev => [...prev, {
      title: sanitizeData(contributionData.title),
      url: contributionData.url,
      description: sanitizeData(contributionData.description),
      userName: sanitizeData(contributionData.userName),
      category: contributionData.category,
      wantsCredit: contributionData.wantsCredit
    }]);
    setContributionData({ 
      title: '', 
      url: '', 
      description: '', 
      userName: contributionData.userName, 
      category: Theme.GENERAL, 
      wantsCredit: contributionData.wantsCredit 
    });
  };

  const handleRemoveFromList = (idx: number) => {
    setSuggestionList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleExportCSV = () => {
    if (suggestionList.length === 0) {
      alert("Add at least one suggestion to the list before exporting.");
      return;
    }
    const headers = ['Title', 'Description', 'URL', 'Contributor', 'Category', 'SubCategory'];
    const csvRows = suggestionList.map(item => [
      escapeCSV(item.title),
      escapeCSV(item.description),
      escapeCSV(item.url),
      escapeCSV(item.wantsCredit ? item.userName : 'Anonymous'),
      escapeCSV(item.category),
      escapeCSV('all')
    ].join(","));
    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `heorepo_suggestions_${new Date().getTime()}.csv`);
    link.click();
    setContributionSuccess(true);
    setTimeout(() => {
      setShowContributeModal(false);
      setContributionSuccess(false);
      setSuggestionList([]);
    }, 4000);
  };

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      if (activeTheme === Theme.BOOKMARKS) return bookmarkedIds.includes(res.id);
      const matchesTheme = activeTheme === 'all' || res.category === activeTheme;
      const matchesSubCategory = activeSubCategory === 'all' || res.subCategory?.toLowerCase() === activeSubCategory.toLowerCase();
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            res.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTheme && matchesSubCategory && matchesSearch;
    });
  }, [activeTheme, activeSubCategory, searchQuery, resources, bookmarkedIds]);

  const isAdminDeckActive = activeTheme === 'admin-deck' && isAdmin;
  const isLandingActive = activeTheme === 'landing';
  const isBookmarksActive = activeTheme === Theme.BOOKMARKS;

  const collectionName = isAdminDeckActive 
    ? t.management 
    : (isBookmarksActive ? t.bookmarksTitle : (activeTheme === 'all' ? t.archive : currentCollection?.name || t.archive));
  
  const subCategoryFilters = useMemo(() => {
    if (isBookmarksActive) return [];
    if (!currentCollection) return [];
    return [...(currentCollection.subCategories || []), 'All'];
  }, [currentCollection, isBookmarksActive]);

  return (
    <div className="flex h-screen bg-[#FCFDFF] text-slate-900 overflow-hidden font-['Inter'] antialiased relative">
      <Sidebar 
        collections={collections} activeTheme={activeTheme} onThemeSelect={handleThemeSelect} 
        isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
        onAdminClick={() => isAdmin ? handleLogout() : null} isAdminActive={isAdmin} taglineWords={taglineWords}
        bookmarkCount={bookmarkedIds.length}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {!isLandingActive && (
          <header className="bg-white px-4 md:px-8 pt-4 md:pt-8 pb-5 border-b border-[#F1F5F9]/60 relative z-30">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <div className="flex items-center font-[900] text-[26px] tracking-[-0.04em] leading-none select-none cursor-pointer" onClick={() => handleThemeSelect('landing')}>
                  <span style={{ color: DARK_NAVY }}>HEO</span>
                  <span style={{ backgroundImage: `linear-gradient(to right, ${DARK_NAVY} 50%, ${BRAND_BLUE} 50%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', position: 'relative', padding: '0 0.2em', margin: '0 -0.2em' }}>R</span>
                  <span style={{ color: BRAND_BLUE }}>epo</span>
                  <div className="ml-[2px] self-end" style={{ backgroundColor: BRAND_BLUE, width: '6.5px', height: '6.5px', marginBottom: '3px' }}></div>
                </div>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M4 6h16M4 12h16M4 18h16" /></svg></button>
              </div>

              <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 xl:gap-8 mb-6">
                <div className="flex flex-col gap-2 md:gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#2563EB]/20 text-[9px] md:text-[10px] font-[800] tracking-[0.12em] md:tracking-[0.15em] text-[#2563EB] uppercase">
                      {isAdminDeckActive ? t.adminPanel : (isBookmarksActive ? t.saved : (activeTheme === 'all' ? t.fullRepo : (currentCollection?.name.toUpperCase() || 'UNKNOWN')))}
                    </div>
                    {!isAdminDeckActive && <div className="text-[9px] md:text-[10px] font-[800] tracking-[0.12em] md:tracking-[0.15em] text-[#64748B] uppercase">{filteredResources.length} {t.items}</div>}
                  </div>
                  <h1 className="text-[28px] md:text-[36px] xl:text-[48px] font-[900] tracking-[-0.04em] leading-[0.9] text-[#0F172A]">{collectionName} <span className="text-[#D1D5DB] font-[900]">{isAdminDeckActive ? t.deck : t.vault}</span></h1>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 pb-1">
                  {!isAdminDeckActive && (
                    <>
                      {/* Search Bar */}
                      <div className="relative w-full sm:w-[200px] md:w-[240px] lg:w-[300px] xl:w-[350px]">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94A3B8]"><svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                        <input type="text" placeholder={t.search} className="block w-full pl-10 md:pl-12 pr-6 py-2.5 md:py-3.5 bg-[#F8FAFC] border border-[#F1F5F9] rounded-full text-[14px] md:text-[15px] font-medium text-[#1E293B] focus:ring-1 focus:ring-[#4F46E5] focus:bg-white outline-none shadow-sm transition-all placeholder-[#94A3B8]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                      </div>

                      {/* View Mode Toggle */}
                      <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
                        <button 
                          onClick={() => setViewMode(ViewMode.GRID)}
                          className={`p-2 md:p-2.5 rounded-full transition-all duration-300 ${viewMode === ViewMode.GRID ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="7" height="7" rx="1.5" />
                            <rect x="14" y="3" width="7" height="7" rx="1.5" />
                            <rect x="14" y="14" width="7" height="7" rx="1.5" />
                            <rect x="3" y="14" width="7" height="7" rx="1.5" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setViewMode(ViewMode.LIST)}
                          className={`p-2 md:p-2.5 rounded-full transition-all duration-300 ${viewMode === ViewMode.LIST ? 'bg-white shadow-md text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M3 6h18M3 12h18M3 18h18" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                  <button onClick={() => isAdmin ? handleLogout() : setShowContributeModal(true)} className={`flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3.5 ${isAdminDeckActive ? 'bg-[#0F172A]' : 'bg-[#2563EB]'} text-white text-[14px] md:text-[15px] font-[700] rounded-full hover:opacity-90 transition-all shadow-md active:scale-[0.96]`}><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d={isAdminDeckActive ? "M15 19l-7-7 7-7" : "M12 4v16m8-8H4"} /></svg><span className="whitespace-nowrap">{isAdminDeckActive ? t.exitAdmin : t.contributeBtn}</span></button>
                </div>
              </div>

              {!isAdminDeckActive && subCategoryFilters.length > 0 && (
                <div className="min-h-[48px] flex items-center overflow-hidden">
                  <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
                    {subCategoryFilters.map((sub) => {
                      const filterValue = sub.toLowerCase() === 'all' ? 'all' : sub;
                      const isSelected = activeSubCategory === filterValue;
                      return (
                        <button key={sub} onClick={() => setActiveSubCategory(filterValue)} className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-[800] tracking-[0.1em] uppercase whitespace-nowrap active:scale-95 border transition-all duration-300 snap-center ${isSelected ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg shadow-slate-200' : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1]'}`}>{sub}</button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-10 scroll-smooth">
          <div className="max-w-[1440px] mx-auto h-full">
            {isLandingActive ? (
              <div className="flex flex-col items-center justify-center h-full text-center animate-card-entry pb-20 select-none relative overflow-visible">
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                   <span className="absolute top-[20%] left-[15%] text-4xl animate-float opacity-40 md:opacity-100">🎉</span>
                   <span className="absolute top-[15%] right-[20%] text-4xl animate-float opacity-40 md:opacity-100">📊</span>
                   <span className="absolute bottom-[30%] left-[20%] text-4xl animate-float opacity-40 md:opacity-100">🚀</span>
                   <span className="absolute bottom-[40%] right-[15%] text-4xl animate-float opacity-40 md:opacity-100">💊</span>
                   <span className="absolute top-[45%] left-[5%] text-3xl animate-float opacity-30 md:opacity-80" style={{ animationDelay: '0.2s' }}>📈</span>
                   <span className="absolute top-[35%] right-[5%] text-3xl animate-float opacity-30 md:opacity-80" style={{ animationDelay: '0.7s' }}>💉</span>
                </div>
                <span className="text-lg md:text-2xl font-[600] text-slate-400 mb-2 md:mb-4 block tracking-tight relative z-10">{t.welcome}</span>
                <div className="flex flex-col items-center mb-6 md:mb-10 relative z-10">
                  <div className="flex items-center justify-center font-[900] text-[56px] md:text-[110px] tracking-[-0.04em] leading-none">
                    <span style={{ color: DARK_NAVY }}>HEO</span>
                    <span style={{ backgroundImage: `linear-gradient(to right, ${DARK_NAVY} 50%, ${BRAND_BLUE} 50%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', position: 'relative', padding: '0 0.2em', margin: '0 -0.2em' }}>R</span>
                    <span style={{ color: BRAND_BLUE }}>epo</span>
                    <div 
                      onClick={() => setIsDotDropped(true)}
                      className={`ml-[4px] md:ml-[10px] self-end cursor-pointer transition-transform hover:scale-125 ${isDotDropped ? 'animate-drop' : ''}`} 
                      style={{ backgroundColor: BRAND_BLUE, width: '14px', height: '14px', marginBottom: '8px' }}
                    ></div>
                  </div>
                  <div className="max-w-3xl flex flex-col items-center px-4">
                    <p className="text-[14px] md:text-[19px] text-slate-500 font-medium mt-4 md:mt-6 leading-relaxed">
                      The repository of open-source tools & resources <br /> for <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>H</span>ealth <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>E</span>conomics and <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>O</span>utcomes <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>R</span>esearch.
                    </p>
                  </div>
                  <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-xl px-4 relative z-10">
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">{t.select}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                      {collections.map(col => (
                        <button key={col.id} onClick={() => handleThemeSelect(col.id)} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-[24px] hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                          <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{col.icon}</span>
                          <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 group-hover:text-blue-600">{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : isAdminDeckActive ? (
              <AdminDashboard resources={resources} setResources={setResources} collections={collections} setCollections={setCollections} taglineWords={taglineWords} setTaglineWords={setTaglineWords} />
            ) : (
              <div 
                key={`${activeTheme}-${activeSubCategory}-${viewMode}`}
                className={`${viewMode === ViewMode.GRID 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 auto-rows-fr' 
                  : 'flex flex-col gap-4'
                } animate-card-entry`}
              >
                {filteredResources.length > 0 ? filteredResources.map((res, idx) => (
                  <ResourceCard 
                    key={res.id} 
                    resource={res} 
                    index={idx} 
                    isBookmarked={bookmarkedIds.includes(res.id)}
                    onToggleBookmark={toggleBookmark}
                    viewMode={viewMode}
                  />
                )) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d={isBookmarksActive ? "M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">{isBookmarksActive ? t.bookmarksEmpty : t.emptyTitle}</h3>
                    <p className="text-slate-500 max-w-md mx-auto">{isBookmarksActive ? t.bookmarksEmptyDesc : t.emptyDesc}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Toast show={toast.show} message={toast.message} onHide={() => setToast({ show: false, message: '' })} />

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] p-8 md:p-10 w-full max-w-md shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black text-slate-900 mb-2">{t.adminPortal}</h2>
            <div className="space-y-4">
              <div>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${loginError ? 'border-red-500' : 'border-slate-100'} focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition-all font-bold`} placeholder="Enter Password" autoFocus />
                {loginError && <p className="text-red-500 text-[11px] font-bold mt-2 ml-1">{t.incorrectPassword}</p>}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowLoginModal(false)} className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all">{t.cancel}</button>
                <button onClick={handleLogin} className="flex-1 px-6 py-4 rounded-2xl bg-[#2563EB] text-white font-bold hover:opacity-90 transition-all">{t.confirm}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContributeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
          <div className="bg-white rounded-[32px] p-8 md:p-10 w-full max-w-2xl shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300 my-8">
            {contributionSuccess ? (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg></div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">{t.subReceived}</h2>
                <p className="text-slate-500">{t.subReceivedDesc}</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">{t.contributeTitle}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">{t.contributeDesc}</p>
                  </div>
                  <button onClick={() => setShowContributeModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-slate-50/50 p-6 rounded-[24px] border border-slate-100 space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.title}</label>
                        <input className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-sm" value={contributionData.title} onChange={e => setContributionData({...contributionData, title: e.target.value})} placeholder="Resource name" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.url}</label>
                        <input className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-sm" value={contributionData.url} onChange={e => setContributionData({...contributionData, url: e.target.value})} placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.suggestedCol}</label>
                        <select className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-sm" value={contributionData.category} onChange={e => setContributionData({...contributionData, category: e.target.value as any})}>
                          {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.description}</label>
                        <textarea rows={2} className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-sm resize-none" value={contributionData.description} onChange={e => setContributionData({...contributionData, description: e.target.value})} placeholder="Briefly describe..." />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{t.yourName}</label>
                        <input className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 font-bold text-sm mb-2" value={contributionData.userName} onChange={e => setContributionData({...contributionData, userName: e.target.value})} placeholder="Your Name" />
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded" checked={contributionData.wantsCredit} onChange={e => setContributionData({...contributionData, wantsCredit: e.target.checked})} />
                          <span className="text-xs font-bold text-slate-500">{t.creditName}</span>
                        </label>
                      </div>
                      <button onClick={handleAddSuggestionToList} className="w-full bg-[#0F172A] text-white py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-black transition-all">Add to List</button>
                    </div>
                  </div>

                  <div className="flex flex-col h-full min-h-[400px]">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex justify-between">
                        <span>List of Suggestions</span>
                        <span className="text-blue-600">{suggestionList.length}</span>
                      </div>
                      {suggestionList.length === 0 ? (
                        <div className="h-full min-h-[200px] border-2 border-dashed border-slate-100 rounded-[24px] flex items-center justify-center text-slate-300 font-bold text-xs italic">Empty list.</div>
                      ) : (
                        suggestionList.map((item, idx) => (
                          <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm relative group">
                            <button onClick={() => handleRemoveFromList(idx)} className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
                            <div className="font-black text-slate-800 text-[13px] truncate pr-6">{item.title}</div>
                            <div className="text-[10px] text-blue-500 font-bold truncate">{item.url}</div>
                          </div>
                        ))
                      )}
                    </div>
                    <button onClick={handleExportCSV} disabled={suggestionList.length === 0} className={`w-full mt-6 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all ${suggestionList.length > 0 ? 'bg-[#2563EB] text-white shadow-blue-500/20 hover:opacity-90' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>Export CSV</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
