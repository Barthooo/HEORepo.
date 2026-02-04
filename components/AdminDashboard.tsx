
import React, { useState, useEffect, useRef } from 'react';
import { Resource, Collection, Theme } from '../types';
import { REPO_VERSION } from '../data';

interface AdminDashboardProps {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  taglineWords: string[];
  setTaglineWords: React.Dispatch<React.SetStateAction<string[]>>;
  initialTab?: 'resources' | 'collections' | 'settings';
}

const sanitizeInput = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const parseCSV = (text: string): string[][] => {
  const result: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(cell);
        cell = '';
      } else if (char === '\n' || char === '\r') {
        if (cell !== '' || row.length > 0) {
          row.push(cell);
          result.push(row);
        }
        row = [];
        cell = '';
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        cell += char;
      }
    }
  }
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    result.push(row);
  }
  return result;
};

const escapeCSV = (val: string | undefined): string => {
  if (!val) return '""';
  const str = val.toString().replace(/"/g, '""');
  return `"${str}"`;
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  resources, 
  setResources, 
  collections, 
  setCollections, 
  taglineWords, 
  setTaglineWords, 
  initialTab = 'resources' 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'resources' | 'collections' | 'settings'>(initialTab as any);
  const [newTaglineWord, setNewTaglineWord] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const localVersion = localStorage.getItem('heo_repo_version') || '0';
  const sourceVersion = (REPO_VERSION || 0).toString();
  const isOutOfSync = parseInt(sourceVersion) > parseInt(localVersion);

  useEffect(() => {
    if (initialTab && activeTab !== initialTab) {
      setActiveTab(initialTab as any);
    }
  }, [initialTab]);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 6000);
  };

  const handleExportDataFile = () => {
    try {
      if (collections.length === 0 || resources.length === 0) {
        showStatus("Cannot export empty repository.", "error");
        return;
      }

      const collectionsStr = JSON.stringify(collections, null, 2);
      const resourcesStr = JSON.stringify(resources, null, 2);
      const taglineStr = JSON.stringify(taglineWords, null, 2);
      const currentTimestamp = Date.now();

      const fileContent = `import { Collection, Resource, Theme } from './types';

export const REPO_VERSION = ${currentTimestamp};

export const COLLECTIONS: Collection[] = ${collectionsStr};

export const RESOURCES: Resource[] = ${resourcesStr};

export const TAGLINE_WORDS: string[] = ${taglineStr};
`;

      const blob = new Blob([fileContent], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.ts");
      link.click();
      showStatus("data.ts exported with new version timestamp. Push this to GitHub now!");
    } catch (err) {
      showStatus("Export failed.", "error");
      console.error(err);
    }
  };

  const handleResetCache = () => {
    if (window.confirm("This will clear your local edits and revert to the data currently in your repository (data.ts). Continue?")) {
      localStorage.removeItem('heo_collections');
      localStorage.removeItem('heo_resources');
      localStorage.removeItem('heo_tagline');
      localStorage.removeItem('heo_repo_version');
      window.location.reload();
    }
  };

  const moveResource = (index: number, direction: 'up' | 'down') => {
    const newResources = [...resources];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newResources.length) {
      [newResources[index], newResources[targetIndex]] = [newResources[targetIndex], newResources[index]];
      setResources(newResources);
    }
  };

  const moveCollection = (index: number, direction: 'up' | 'down') => {
    const newCollections = [...collections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newCollections.length) {
      [newCollections[index], newCollections[targetIndex]] = [newCollections[targetIndex], newCollections[index]];
      setCollections(newCollections);
    }
  };

  const moveSubCategory = (colId: string, index: number, direction: 'left' | 'right') => {
    setCollections(prev => prev.map(col => {
      if (col.id === colId) {
        const newSubs = [...(col.subCategories || [])];
        const targetIndex = direction === 'left' ? index - 1 : index + 1;
        if (targetIndex >= 0 && targetIndex < newSubs.length) {
          [newSubs[index], newSubs[targetIndex]] = [newSubs[targetIndex], newSubs[index]];
          return { ...col, subCategories: newSubs };
        }
      }
      return col;
    }));
  };

  const handleDownloadTemplate = () => {
    const headers = ['Title', 'Description', 'URL', 'Contributor', 'Category', 'SubCategory'];
    const example = ['Example Analysis', 'Resource description.', 'https://example.com', 'Admin', Theme.GENERAL, 'Basics'];
    const csvContent = [headers.join(","), example.map(v => escapeCSV(v)).join(",")].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "heorepo_template.csv");
    link.click();
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = parseCSV(text);
        if (rows.length < 2) {
          showStatus("CSV has no data rows.", "error");
          return;
        }

        const importedResources: Resource[] = [];
        const existingUrls = new Set(resources.map(r => r.url.toLowerCase()));
        let skipped = 0;

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length < 3) continue;

          const title = row[0]?.trim();
          const desc = row[1]?.trim();
          const urlStr = row[2]?.trim();
          const contributor = row[3]?.trim() || 'Admin';
          const catId = row[4]?.trim() || Theme.GENERAL;
          const subCat = row[5]?.trim() || 'all';

          if (!title || !urlStr || existingUrls.has(urlStr.toLowerCase())) {
            skipped++;
            continue;
          }

          let domain = 'UNKNOWN';
          try {
            const urlToTest = urlStr.startsWith('http') ? urlStr : `https://${urlStr}`;
            domain = new URL(urlToTest).hostname.toUpperCase();
          } catch (e) {}

          importedResources.push({
            id: Math.random().toString(36).substr(2, 9),
            title,
            description: desc || '',
            url: urlStr,
            domain,
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
            addedDate: new Date().toLocaleDateString('en-GB'),
            contributor,
            category: collections.some(c => c.id === catId) ? catId : (collections[0]?.id || Theme.GENERAL),
            subCategory: subCat
          });
        }

        if (importedResources.length > 0) {
          setResources(prev => [...importedResources, ...prev]);
          showStatus(`Imported ${importedResources.length} resources. Skipped ${skipped} (duplicates/invalid).`);
        } else {
          showStatus(`No new resources were found in the CSV.`, "error");
        }
      } catch (err) {
        showStatus("Error parsing CSV. Check file formatting.", "error");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdateResource = (id: string, field: keyof Resource, value: any) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        let finalValue = value;
        if (typeof value === 'string' && (field === 'title' || field === 'description' || field === 'contributor')) {
          finalValue = value.replace(/<[^>]*>?/gm, '');
        }
        const updated = { ...res, [field]: finalValue };
        if (field === 'url') {
          try {
            const urlToTest = value.startsWith('http') ? value : `https://${value}`;
            updated.domain = new URL(urlToTest).hostname.toUpperCase();
          } catch (e) {}
        }
        return updated;
      }
      return res;
    }));
  };

  const handleDeleteResource = (id: string) => {
    if (!window.confirm("Delete this resource?")) return;
    setResources(prev => prev.filter(res => res.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleAddResource = () => {
    const defaultCategory = collections.length > 0 ? collections[0].id : Theme.GENERAL;
    const newRes: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Resource',
      description: 'Enter description...',
      contributor: 'Admin',
      url: 'https://',
      domain: 'NEW.COM',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600',
      addedDate: new Date().toLocaleDateString('en-GB'),
      category: defaultCategory,
      subCategory: 'all'
    };
    setResources(prev => [newRes, ...prev]);
    setEditingId(newRes.id);
    setActiveTab('resources');
  };

  const handleUpdateCollection = (id: string, field: keyof Collection, value: any) => {
    setCollections(prev => prev.map(col => {
      if (col.id === id) {
        let finalValue = value;
        if (typeof value === 'string' && (field === 'name' || field === 'description')) {
          finalValue = value.replace(/<[^>]*>?/gm, '');
        }
        return { ...col, [field]: finalValue };
      }
      return col;
    }));
  };

  const handleUpdateSubCategoryName = (colId: string, index: number, newName: string) => {
    setCollections(prev => prev.map(col => {
      if (col.id === colId) {
        const newSubs = [...(col.subCategories || [])];
        newSubs[index] = newName.replace(/<[^>]*>?/gm, '');
        return { ...col, subCategories: newSubs };
      }
      return col;
    }));
  };

  const handleAddSubCategory = (colId: string) => {
    const cleanSub = sanitizeInput(newSubCategory).trim();
    if (!cleanSub) return;
    if (cleanSub.toLowerCase() === 'all') {
      alert("'All' is a reserved system filter and cannot be added as a custom subcategory.");
      return;
    }
    setCollections(prev => prev.map(col => {
      if (col.id === colId) {
        const subs = col.subCategories || [];
        if (subs.includes(cleanSub)) return col;
        return { ...col, subCategories: [...subs, cleanSub] };
      }
      return col;
    }));
    setNewSubCategory('');
  };

  const handleRemoveSubCategory = (colId: string, index: number) => {
    setCollections(prev => prev.map(col => {
      if (col.id === colId) {
        const subName = (col.subCategories || [])[index];
        setResources(r => r.map(res => res.category === colId && res.subCategory === subName ? { ...res, subCategory: 'all' } : res));
        return { ...col, subCategories: (col.subCategories || []).filter((_, i) => i !== index) };
      }
      return col;
    }));
  };

  const handleDeleteCollection = (id: string) => {
    if (!window.confirm("Move resources to General and delete?")) return;
    setCollections(prev => prev.filter(c => c.id !== id));
    setResources(prev => prev.map(res => res.category === id ? { ...res, category: Theme.GENERAL, subCategory: 'all' } : res));
    if (editingCollectionId === id) setEditingCollectionId(null);
  };

  const handleAddCollection = () => {
    const newId = `custom-${Math.random().toString(36).substr(2, 5)}`;
    const newCol: Collection = { id: newId, name: 'New Category', icon: '📁', description: '', subCategories: ['General'] };
    setCollections(prev => [...prev, newCol]);
    setEditingCollectionId(newId);
    setActiveTab('collections');
  };

  const handleAddTagline = () => {
    const cleanWord = sanitizeInput(newTaglineWord).trim();
    if (cleanWord) {
      setTaglineWords(prev => [...prev, cleanWord]);
      setNewTaglineWord('');
    }
  };

  const handleRemoveTagline = (index: number) => {
    if (taglineWords.length > 1) setTaglineWords(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-200 shadow-xl overflow-hidden animate-card-entry ring-1 ring-black/5">
      <div className="flex bg-slate-50/50 border-b border-slate-200 p-2 gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide">
        {['resources', 'collections', 'settings'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)} 
            className={`flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-xl md:rounded-2xl text-[10px] md:text-[12px] font-[800] uppercase tracking-wider transition-all duration-300 whitespace-nowrap relative ${activeTab === tab ? 'bg-white text-[#2563EB] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab === 'resources' ? 'Vault' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-10">
        {activeTab === 'resources' && (
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-[24px] md:text-[28px] font-[900] text-[#0F172A] tracking-tight">Management</h2>
                <div className="flex items-center gap-2 mt-1 min-h-[24px]">
                  {statusMessage ? (
                    <span className={`text-[11px] font-black px-3 py-1 rounded-full animate-pulse uppercase tracking-widest ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {statusMessage.text}
                    </span>
                  ) : (
                    <p className="text-slate-500 text-xs md:text-sm">Manage resources locally. Click 'Export data.ts' to update the GitHub repository.</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <input type="file" ref={fileInputRef} onChange={handleImportCSV} accept=".csv" className="hidden" />
                <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                   <button onClick={handleDownloadTemplate} className="px-4 py-2 hover:bg-white hover:shadow-sm rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all">CSV Temp</button>
                   <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 hover:bg-white hover:shadow-sm rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all">CSV Imp</button>
                   <button onClick={handleExportDataFile} className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all">Export data.ts</button>
                </div>
                <button onClick={handleAddResource} className="bg-[#2563EB] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all">Add New</button>
              </div>
            </div>
            
            <div className="rounded-[16px] md:rounded-[24px] border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="bg-[#F8FAFC] border-b border-slate-200">
                    <tr className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-4 md:px-8 py-4">Resource</th>
                      <th className="px-4 md:px-8 py-4">Link (URL)</th>
                      <th className="px-4 md:px-8 py-4 w-[180px]">Category</th>
                      <th className="px-4 md:px-8 py-4 w-[180px]">Sub-Category</th>
                      <th className="px-4 md:px-8 py-4 text-right w-[160px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {resources.map((res, idx) => {
                      const isEditing = editingId === res.id;
                      const activeCol = collections.find(c => c.id === res.category);
                      const availableSubCategories = activeCol?.subCategories || [];
                      return (
                        <tr key={res.id} className={`group transition-colors ${isEditing ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}>
                          <td className="px-4 md:px-8 py-5">
                            {isEditing ? (
                              <div className="space-y-1.5 max-w-xs">
                                <input className="w-full font-bold text-[#0F172A] text-sm outline-none border-b-2 border-blue-400 bg-transparent py-0.5" value={res.title} onChange={e => handleUpdateResource(res.id, 'title', e.target.value)} />
                                <textarea className="w-full text-[11px] text-slate-500 bg-transparent outline-none resize-none" value={res.description} onChange={e => handleUpdateResource(res.id, 'description', e.target.value)} rows={2} />
                              </div>
                            ) : (
                              <div className="max-w-[180px] md:max-w-xs">
                                <div className="font-bold text-[#0F172A] text-sm group-hover:text-blue-600 transition-colors truncate">{res.title}</div>
                                <div className="text-[10px] md:text-[11px] text-slate-400 font-medium line-clamp-1">{res.description}</div>
                              </div>
                            )}
                          </td>
                          <td className="px-4 md:px-8 py-5">
                            {isEditing ? (
                              <div className="space-y-1.5">
                                <input className="w-full text-[11px] text-blue-500 font-bold outline-none bg-white border border-blue-100 rounded px-2 py-1" value={res.url} onChange={e => handleUpdateResource(res.id, 'url', e.target.value)} />
                                <div className="text-[9px] text-slate-400 font-black uppercase">{res.domain}</div>
                              </div>
                            ) : (
                              <div className="max-w-[150px] md:max-w-[200px]">
                                <div className="text-[11px] text-blue-600 font-bold truncate">{res.url}</div>
                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{res.domain}</div>
                              </div>
                            )}
                          </td>
                          <td className="px-4 md:px-8 py-5 w-[180px]">
                            {isEditing ? (
                              <select className="text-[10px] font-black px-2 py-1.5 rounded bg-white border border-blue-200 text-blue-600 uppercase tracking-widest outline-none w-full shadow-sm" value={res.category} onChange={e => { handleUpdateResource(res.id, 'category', e.target.value); handleUpdateResource(res.id, 'subCategory', 'all'); }}>
                                {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                              </select>
                            ) : (
                              <span className="text-[9px] md:text-[10px] font-black px-2 py-1.5 rounded bg-slate-100 text-slate-500 uppercase tracking-widest inline-block w-full text-center">{activeCol?.name || 'General'}</span>
                            )}
                          </td>
                          <td className="px-4 md:px-8 py-5 w-[180px]">
                            {isEditing ? (
                              <select className="text-[10px] font-black px-2 py-1.5 rounded bg-white border border-blue-200 text-blue-600 uppercase tracking-widest outline-none w-full shadow-sm" value={res.subCategory || 'all'} onChange={e => handleUpdateResource(res.id, 'subCategory', e.target.value)}>
                                <option value="all">ALL</option>
                                {availableSubCategories.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                              </select>
                            ) : (
                              <span className="text-[9px] md:text-[10px] font-black px-2 py-1.5 rounded bg-slate-100 text-slate-500 uppercase tracking-widest inline-block w-full text-center">{res.subCategory?.toUpperCase() || 'ALL'}</span>
                            )}
                          </td>
                          <td className="px-4 md:px-8 py-5 text-right w-[160px]">
                            <div className="flex justify-end items-center gap-1.5 md:gap-2">
                              <div className="flex flex-col gap-1 mr-1">
                                <button onClick={() => moveResource(idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-[#2563EB] disabled:opacity-20 transition-all cursor-pointer"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 15l7-7 7 7" /></svg></button>
                                <button onClick={() => moveResource(idx, 'down')} disabled={idx === resources.length - 1} className="p-1 hover:bg-slate-100 rounded text-slate-300 hover:text-[#2563EB] disabled:opacity-20 transition-all cursor-pointer"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M19 9l-7 7-7-7" /></svg></button>
                              </div>
                              <button onClick={() => setEditingId(isEditing ? null : res.id)} className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-[12px] font-bold transition-all ${isEditing ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>{isEditing ? 'Save' : 'Adjust'}</button>
                              <button onClick={() => handleDeleteResource(res.id)} className="p-1.5 md:p-2.5 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl cursor-pointer"><svg className="w-4 h-4 md:w-5 md:h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-[24px] md:text-[28px] font-[900] text-[#0F172A] tracking-tight">Organization</h2>
              <button onClick={handleAddCollection} className="w-full sm:w-auto bg-[#2563EB] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[11px] md:text-[12px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 transition-all">New Collection</button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {collections.map((col, idx) => {
                const isEditing = editingCollectionId === col.id;
                return (
                  <div key={col.id} className={`p-5 md:p-8 rounded-[20px] md:rounded-[32px] border transition-all ${isEditing ? 'border-blue-400 bg-blue-50/10 ring-4 ring-blue-50 shadow-sm' : 'border-slate-100 bg-white hover:border-blue-200'}`}>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 md:gap-5">
                          <div className="text-xl md:text-2xl w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-slate-50 rounded-[14px] md:rounded-[20px] shadow-sm">
                            {isEditing ? <input className="w-6 text-center bg-transparent border-b border-blue-400 outline-none" value={col.icon} onChange={e => handleUpdateCollection(col.id, 'icon', e.target.value)} maxLength={2} /> : col.icon}
                          </div>
                          <div>
                            {isEditing ? <input className="text-[16px] md:text-[20px] font-black text-[#0F172A] bg-transparent border-b-2 border-blue-400 outline-none" value={col.name} onChange={e => handleUpdateCollection(col.id, 'name', e.target.value)} /> : <div className="text-[16px] md:text-[20px] font-black text-[#0F172A]">{col.name}</div>}
                            <div className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 md:mt-1">ID: {col.id}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100 gap-1">
                            <button onClick={() => moveCollection(idx, 'up')} disabled={idx === 0} className="p-2 text-slate-400 hover:text-[#2563EB] hover:bg-white rounded-lg transition-all disabled:opacity-10 cursor-pointer"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 15l7-7 7 7" /></svg></button>
                            <button onClick={() => moveCollection(idx, 'down')} disabled={idx === collections.length - 1} className="p-2 text-slate-400 hover:text-[#2563EB] hover:bg-white rounded-lg transition-all disabled:opacity-10 cursor-pointer"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg></button>
                          </div>
                          <button onClick={() => setEditingCollectionId(isEditing ? null : col.id)} className={`px-3 md:px-5 py-1.5 md:py-2.5 rounded-xl text-[10px] md:text-[12px] font-bold transition-all ${isEditing ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>{isEditing ? 'Save' : 'Adjust'}</button>
                          <button onClick={() => handleDeleteCollection(col.id)} className="p-1.5 md:p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"><svg className="w-4 h-4 md:w-5 md:h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      </div>
                      <div className="border-t border-slate-100 pt-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sub-categories</div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(col.subCategories || []).map((sub, index) => (
                            <div key={`${col.id}-sub-${index}`} className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full group/sub transition-all">
                              {isEditing && (
                                <button onClick={() => moveSubCategory(col.id, index, 'left')} disabled={index === 0} className="text-slate-300 hover:text-blue-500 disabled:opacity-20 cursor-pointer"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M15 19l-7-7 7-7" /></svg></button>
                              )}
                              {isEditing ? (
                                <input className="text-[11px] font-bold text-blue-600 bg-transparent outline-none w-24 tracking-tight" value={sub} onChange={(e) => handleUpdateSubCategoryName(col.id, index, e.target.value)} />
                              ) : (
                                <span className="text-[11px] font-bold text-slate-600 tracking-tight">{sub}</span>
                              )}
                              {isEditing && (
                                <div className="flex items-center gap-1.5 ml-1">
                                  <button onClick={() => moveSubCategory(col.id, index, 'right')} disabled={index === (col.subCategories?.length || 0) - 1} className="text-slate-300 hover:text-blue-500 disabled:opacity-20 cursor-pointer"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M9 5l7 7-7 7" /></svg></button>
                                  <button onClick={() => handleRemoveSubCategory(col.id, index)} className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg></button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {isEditing && (
                          <div className="flex gap-2 max-w-sm">
                            <input className="flex-1 px-4 py-2 rounded-xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all font-bold text-xs" placeholder="Add sub-category..." value={newSubCategory} onChange={(e) => setNewSubCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSubCategory(col.id)} />
                            <button onClick={() => handleAddSubCategory(col.id)} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Add</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-[24px] md:text-[28px] font-[900] text-[#0F172A] tracking-tight">Sync & Repository Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-[20px] md:rounded-[32px] p-6 md:p-10 border border-slate-100 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-black text-[#0F172A] mb-1.5">GitHub Synchronization</h3>
                    <p className="text-slate-500 text-[13px] md:text-sm">Download the current project state as a <strong>data.ts</strong> file.</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isOutOfSync ? 'bg-amber-100 text-amber-600 animate-pulse' : 'bg-emerald-100 text-emerald-600'}`}>
                    {isOutOfSync ? 'Sync Needed' : 'In Sync'}
                  </div>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-slate-200 mb-6 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Source (data.ts):</span>
                    <span className="text-slate-800">{sourceVersion}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Local (Browser):</span>
                    <span className="text-slate-800">{localVersion}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <button onClick={handleExportDataFile} className="w-full bg-[#0F172A] text-white px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-lg hover:bg-black transition-all">Export data.ts</button>
                  <button onClick={handleResetCache} className="w-full bg-white border border-red-200 text-red-500 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-all">Reset Cache</button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[20px] md:rounded-[32px] p-6 md:p-10 border border-slate-100">
                <h3 className="text-lg md:text-xl font-black text-[#0F172A] mb-1.5 md:mb-2">Tagline Keywords</h3>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                  {taglineWords.map((word, idx) => (
                    <div key={idx} className="flex items-center gap-2 md:gap-3 bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-[13px] md:text-[15px] font-black text-slate-800 tracking-tight">{word}</span>
                      <button onClick={() => handleRemoveTagline(idx)} className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer"><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <input className="flex-1 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white border border-slate-200 outline-none font-bold" placeholder="Add Keyword..." value={newTaglineWord} onChange={(e) => setNewTaglineWord(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTagline()} />
                  <button onClick={handleAddTagline} className="px-6 md:px-8 py-3 md:py-4 bg-[#0F172A] text-white rounded-xl md:rounded-2xl text-[12px] md:text-[14px] font-black uppercase tracking-widest hover:bg-black transition-all">Add</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
