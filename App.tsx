import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ResourceCard from './components/ResourceCard';
import AdminDashboard from './components/AdminDashboard';
import { COLLECTIONS as initialCollections, RESOURCES as initialResources, TAGLINE_WORDS as initialTaglines } from './data';
import { Resource, Collection, Theme, Submission } from './types';

const BRAND_BLUE = '#2563EB';
const DARK_NAVY = '#121A26';

const t = {
  welcome: "Welcome to",
  intro: "The repository of open-source tools & resources for Health Economics and Outcomes Research",
  select: "Select a collection to begin",
  contributeBtn: "Contribute to HEORepo",
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
  contributeDesc: "Suggest a high-quality HEOR resource.",
  title: "Title",
  url: "URL",
  suggestedCol: "Suggested Collection",
  description: "Description",
  yourName: "Your Name",
  creditName: "Credit my name",
  submit: "Submit",
  subReceived: "Submission Received",
  subReceivedDesc: "Thank you! Our curators will review your contribution shortly.",
  allResources: "All Resources"
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

const App: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<string>('landing');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      const saved = localStorage.getItem('heo_collections');
      return saved ? JSON.parse(saved) : initialCollections;
    } catch { return initialCollections; }
  });
  
  const [resources, setResources] = useState<Resource[]>(() => {
    try {
      const saved = localStorage.getItem('heo_resources');
      return saved ? JSON.parse(saved) : initialResources;
    } catch { return initialResources; }
  });
  
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    try {
      const saved = localStorage.getItem('heo_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  
  const [taglineWords, setTaglineWords] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('heo_tagline');
      return saved ? JSON.parse(saved) : initialTaglines;
    } catch { return initialTaglines; }
  });

  // Magic Keyword Trigger for Admin Portal
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
      localStorage.setItem('heo_submissions', JSON.stringify(submissions));
      localStorage.setItem('heo_tagline', JSON.stringify(taglineWords));
    } catch (e) {
      console.error("Storage Error: Local persistence failed.", e);
    }
  }, [collections, resources, submissions, taglineWords]);

  // Handle category changes - select the first subcategory by default if available
  useEffect(() => {
    const col = collections.find(c => c.id === activeTheme);
    if (col && col.subCategories && col.subCategories.length > 0) {
      setActiveSubCategory(col.subCategories[0]);
    } else {
      setActiveSubCategory('all');
    }
  }, [activeTheme, collections]);

  const handleLogin = () => {
    if (password.trim() === '123456') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setPassword('');
      setLoginError(false);
      setActiveTheme('admin-deck');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    if (activeTheme === 'admin-deck') {
      setActiveTheme('landing');
    }
  };

  const [showContributeModal, setShowContributeModal] = useState(false);
  const [contributionData, setContributionData] = useState({ 
    title: '', 
    url: '', 
    description: '', 
    userName: '', 
    category: Theme.GENERAL, 
    wantsCredit: true 
  });
  const [contributionSuccess, setContributionSuccess] = useState(false);

  const handlePublicContribute = () => {
    if (!isValidLink(contributionData.url)) {
      alert("Please provide a secure and valid URL.");
      return;
    }

    const newSubmission: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      title: sanitizeData(contributionData.title),
      url: contributionData.url,
      description: sanitizeData(contributionData.description),
      userName: sanitizeData(contributionData.userName),
      category: contributionData.category,
      wantsCredit: contributionData.wantsCredit,
      submittedDate: new Date().toLocaleDateString('en-GB')
    };
    
    setSubmissions(prev => [newSubmission, ...prev]);
    setContributionSuccess(true);
    
    setTimeout(() => {
      setShowContributeModal(false);
      setContributionSuccess(false);
      setContributionData({ 
        title: '', 
        url: '', 
        description: '', 
        userName: '', 
        category: Theme.GENERAL, 
        wantsCredit: true 
  });
    }, 2000);
  };

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesTheme = activeTheme === 'all' || res.category === activeTheme;
      const matchesSubCategory = activeSubCategory === 'all' || res.subCategory?.toLowerCase() === activeSubCategory.toLowerCase();
      const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            res.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTheme && matchesSubCategory && matchesSearch;
    });
  }, [activeTheme, activeSubCategory, searchQuery, resources]);

  const currentCollection = useMemo(() => 
    collections.find(c => c.id === activeTheme), 
    [activeTheme, collections]
  );

  const isAdminDeckActive = activeTheme === 'admin-deck' && isAdmin;
  const isLandingActive = activeTheme === 'landing';
  const collectionName = isAdminDeckActive ? t.management : (activeTheme === 'all' ? t.archive : currentCollection?.name || t.archive);
  const subCategories = currentCollection?.subCategories || [];

  return (
    <div className="flex h-screen bg-[#FCFDFF] text-slate-900 overflow-hidden font-['Inter'] antialiased relative">
      <Sidebar 
        collections={collections} 
        activeTheme={activeTheme} 
        onThemeSelect={setActiveTheme} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAdminClick={() => isAdmin ? handleLogout() : null}
        isAdminActive={isAdmin}
        notificationCount={submissions.length}
        taglineWords={taglineWords}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {!isLandingActive && (
          <header className="bg-white px-4 md:px-8 pt-4 md:pt-8 pb-5 select-none border-b border-[#F1F5F9]/60 relative z-30">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <div className="flex items-center font-[900] text-[26px] tracking-[-0.04em] leading-none antialiased">
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
                  <div 
                    className="ml-[1.5px] self-end" 
                    style={{ 
                      backgroundColor: BRAND_BLUE, 
                      width: '6.5px', 
                      height: '6.5px',
                      marginBottom: '3.5px' 
                    }}
                  ></div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-6">
                <div className="flex flex-col gap-2 md:gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#2563EB]/20 text-[9px] md:text-[10px] font-[800] tracking-[0.12em] md:tracking-[0.15em] text-[#2563EB] uppercase antialiased">
                      {isAdminDeckActive ? t.adminPanel : (activeTheme === 'all' ? t.fullRepo : (currentCollection?.name.toUpperCase() || 'UNKNOWN'))}
                    </div>
                    {!isAdminDeckActive && (
                      <div className="text-[9px] md:text-[10px] font-[800] tracking-[0.12em] md:tracking-[0.15em] text-[#64748B] uppercase antialiased">
                        {filteredResources.length} {t.items}
                      </div>
                    )}
                  </div>
                  <h1 className="text-[32px] md:text-[48px] font-[900] tracking-[-0.04em] leading-[0.9] text-[#0F172A] antialiased">
                    {collectionName} <span className="text-[#D1D5DB] font-[900]">{isAdminDeckActive ? t.deck : t.vault}</span>
                  </h1>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6 pb-1">
                  {!isAdminDeckActive && (
                    <div className="relative w-full sm:w-[280px] md:w-[380px]">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#94A3B8]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder={t.search}
                        className="block w-full pl-10 md:pl-12 pr-6 py-2.5 md:py-3.5 bg-[#F8FAFC] border border-[#F1F5F9] rounded-full text-[14px] md:text-[15px] font-medium text-[#1E293B] focus:ring-1 focus:ring-[#4F46E5] focus:bg-white outline-none shadow-sm transition-all duration-300 placeholder-[#94A3B8]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  )}
                  <button 
                    onClick={() => isAdmin ? handleLogout() : setShowContributeModal(true)}
                    className={`flex items-center justify-center gap-2 px-6 md:px-8 py-2.5 md:py-3.5 ${isAdminDeckActive ? 'bg-[#0F172A]' : 'bg-[#2563EB]'} text-white text-[14px] md:text-[15px] font-[700] rounded-full hover:opacity-90 transition-all duration-300 shadow-md active:scale-[0.96]`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={isAdminDeckActive ? "M15 19l-7-7 7-7" : "M12 4v16m8-8H4"} />
                    </svg>
                    <span className="whitespace-nowrap">{isAdminDeckActive ? t.exitAdmin : t.contributeBtn}</span>
                  </button>
                </div>
              </div>

              {!isAdminDeckActive && subCategories.length > 0 && (
                <div className="min-h-[48px] flex items-center">
                  <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {/* The "All Resources" tab was removed from here per request */}
                    {subCategories.map((sub, idx) => (
                      <button
                        key={sub}
                        onClick={() => setActiveSubCategory(sub)}
                        className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-[800] tracking-[0.1em] uppercase whitespace-nowrap active:scale-95 border transition-colors duration-200 ${
                          activeSubCategory === sub
                          ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg shadow-slate-200'
                          : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1]'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
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
                {/* Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                   <span className="absolute top-[20%] left-[15%] text-4xl animate-float opacity-40 md:opacity-100" style={{ animationDelay: '0s' }}>🎉</span>
                   <span className="absolute top-[15%] right-[20%] text-4xl animate-float opacity-40 md:opacity-100" style={{ animationDelay: '0.5s' }}>📊</span>
                   <span className="absolute bottom-[30%] left-[20%] text-4xl animate-float opacity-40 md:opacity-100" style={{ animationDelay: '1s' }}>🚀</span>
                   <span className="absolute bottom-[40%] right-[15%] text-4xl animate-float opacity-40 md:opacity-100" style={{ animationDelay: '1.5s' }}>💊</span>
                   <span className="absolute top-[45%] left-[5%] text-3xl animate-float opacity-30 md:opacity-80" style={{ animationDelay: '2s' }}>📈</span>
                   <span className="absolute top-[35%] right-[5%] text-3xl animate-float opacity-30 md:opacity-80" style={{ animationDelay: '2.5s' }}>🧪</span>
                </div>

                {/* Line 1: Welcome text */}
                <span className="text-lg md:text-2xl font-[600] text-slate-400 mb-2 md:mb-4 block tracking-tight antialiased relative z-10">
                  {t.welcome}
                </span>

                {/* Line 2: The Main Attraction Logo */}
                <div className="flex flex-col items-center mb-6 md:mb-10 relative z-10">
                  <div className="flex items-center justify-center font-[900] text-[56px] md:text-[110px] tracking-[-0.04em] shadow-blue-500/10 leading-none antialiased">
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
                    <div 
                      className="ml-[4px] md:ml-[10px] self-end" 
                      style={{ 
                        backgroundColor: BRAND_BLUE, 
                        width: '14px', 
                        height: '14px',
                        marginBottom: '8px' 
                      }}
                    ></div>
                  </div>
                  
                  {/* Introductory Line under logo - HEOR themed with highlighting */}
                  <div className="max-w-3xl flex flex-col items-center">
                    <p className="text-[14px] md:text-[19px] text-slate-500 font-medium mt-4 md:mt-6 leading-relaxed antialiased">
                      The repository of open-source tools & resources <br className="hidden md:block" /> for <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>H</span>ealth <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>E</span>conomics and <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>O</span>utcomes <span style={{ color: BRAND_BLUE, fontWeight: 900 }}>R</span>esearch
                    </p>
                  </div>
                </div>

                {/* Line 3: Instructional text */}
                <div className="flex flex-col items-center gap-10 relative z-10">
                  <div className="text-slate-900 font-[800] text-xl md:text-3xl tracking-tight antialiased">
                    {t.select}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center gap-4 max-w-2xl px-4">
                    {collections.map((col, idx) => (
                      <button 
                        key={col.id}
                        onClick={() => setActiveTheme(col.id)}
                        className="px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-xl transition-all active:scale-95 flex items-center gap-3 shadow-sm"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <span className="text-lg">{col.icon}</span>
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : isAdminDeckActive ? (
              <AdminDashboard 
                resources={resources} 
                setResources={setResources} 
                collections={collections}
                setCollections={setCollections}
                submissions={submissions}
                setSubmissions={setSubmissions}
                taglineWords={taglineWords}
                setTaglineWords={setTaglineWords}
                initialTab="resources"
              />
            ) : (
              <div className="animate-card-entry">
                {filteredResources.length > 0 ? (
                  <div 
                    key={`${activeTheme}-${activeSubCategory}`} 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-[24px] justify-items-center"
                  >
                    {filteredResources.map((res, index) => (
                      <ResourceCard key={res.id} resource={res} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-center text-[#9CA3AF] mb-4 md:mb-6 shadow-sm">
                      <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h4 className="text-lg md:text-xl font-[800] text-[#111827] mb-2">{t.emptyTitle}</h4>
                    <p className="text-[13px] md:text-[14px] text-[#6B7280]">{t.emptyDesc}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <footer className="bg-white border-t border-[#E5E7EB] py-3 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 md:gap-8">
            <span className="text-[9px] md:text-[10px] font-bold text-[#94A3B8] tracking-[0.15em] uppercase whitespace-nowrap">{t.version} 1.0.0</span>
          </div>
          <div className="flex items-center gap-2">
             <div className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-emerald-500' : 'hidden'} animate-pulse`}></div>
             <span className="text-[9px] md:text-[10px] font-bold text-[#64748B] tracking-[0.05em] uppercase">{isAdmin ? t.adminMode : ''}</span>
          </div>
        </footer>
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-card-entry">
          <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl w-full max-w-[400px] border border-slate-100">
            <h2 className="text-xl md:text-2xl font-[900] text-[#0F172A] mb-2">{t.adminPortal}</h2>
            <p className="text-slate-500 text-xs md:text-sm mb-6">{t.adminPortalDesc}</p>
            <div className="space-y-4">
              <div>
                <input 
                  type="password"
                  placeholder={t.password}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-slate-50 border ${loginError ? 'border-red-500 ring-1 ring-red-100' : 'border-slate-200'} outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all font-mono text-[16px]`}
                />
                {loginError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2 ml-1">{t.incorrectPassword}</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowLoginModal(false)} className="flex-1 py-3.5 rounded-2xl text-[13px] font-bold text-slate-500 hover:bg-slate-50">{t.cancel}</button>
                <button onClick={handleLogin} className="flex-[2] py-3.5 rounded-2xl bg-[#0F172A] text-white text-[13px] font-bold hover:bg-black shadow-lg">{t.confirm}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContributeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-card-entry">
          <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl w-full max-w-[500px] border border-slate-100 overflow-y-auto max-h-[90vh]">
            {contributionSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0F172A] mb-2">{t.subReceived}</h3>
                <p className="text-slate-500 text-xs md:text-sm">{t.subReceivedDesc}</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-[900] text-[#0F172A] mb-1 md:mb-2">{t.contributeTitle}</h2>
                <p className="text-slate-500 text-xs md:text-sm mb-6">{t.contributeDesc}</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">{t.title}</label>
                    <input className="w-full px-4 md:px-5 py-3 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-[16px]" placeholder={t.title} value={contributionData.title} onChange={(e) => setContributionData({...contributionData, title: e.target.value})}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">{t.url}</label>
                    <input className="w-full px-4 md:px-5 py-3 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-[16px]" placeholder="https://..." value={contributionData.url} onChange={(e) => setContributionData({...contributionData, url: e.target.value})}/>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">{t.suggestedCol}</label>
                    <div className="relative">
                      {/* Cast the string value to Theme enum to resolve type error on line 508 */}
                      <select className="w-full px-4 md:px-5 py-3 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-[#2563EB]/20 appearance-none cursor-pointer text-[16px]" value={contributionData.category} onChange={(e) => setContributionData({...contributionData, category: e.target.value as Theme})}>
                        {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">{t.description}</label>
                    <textarea className="w-full px-4 md:px-5 py-3 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-[#2563EB]/20 min-h-[80px] md:min-h-[100px] text-[16px]" placeholder={t.description} value={contributionData.description} onChange={(e) => setContributionData({...contributionData, description: e.target.value})}/>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">{t.yourName}</label>
                      <input className="w-full px-4 md:px-5 py-3 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-[16px]" placeholder={t.yourName} value={contributionData.userName} onChange={(e) => setContributionData({...contributionData, userName: e.target.value})}/>
                    </div>
                    <label className="flex items-center gap-3 group cursor-pointer select-none py-1">
                      <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${contributionData.wantsCredit ? 'bg-[#2563EB] border-[#2563EB]' : 'border-slate-300'}`}>
                        {contributionData.wantsCredit && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input type="checkbox" className="hidden" checked={contributionData.wantsCredit} onChange={() => setContributionData({...contributionData, wantsCredit: !contributionData.wantsCredit})}/>
                      <span className="text-sm font-bold text-slate-600">{t.creditName}</span>
                    </label>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setShowContributeModal(false)} className="flex-1 py-3.5 rounded-xl md:rounded-2xl text-[13px] font-bold text-slate-500 hover:bg-slate-50">{t.cancel}</button>
                    <button onClick={handlePublicContribute} className="flex-[2] py-3.5 rounded-xl md:rounded-2xl bg-[#2563EB] text-white text-[13px] font-bold hover:bg-blue-600 shadow-lg active:scale-95 transition-all">{t.submit}</button>
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