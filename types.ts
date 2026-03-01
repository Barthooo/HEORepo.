
export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  imageUrl: string;
  addedDate: string;
  contributor: string;
  category: string;
  subCategory?: string;
  fileType?: string;
  status?: 'verified' | 'warning' | 'new';
  isBookmarked?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories?: string[];
}

export enum Theme {
  ALL = 'all',
  GENERAL = 'general',
  ECONOMIC_MODELING = 'modelling',
  SYSTEMATIC_REVIEWS = 'meta-analysis',
  SURVIVAL_ANALYSIS = 'survival-analysis',
  NEWS = 'news',
  BOOKMARKS = 'bookmarks'
}

export enum ViewMode {
  GRID = 'grid',
  LIST = 'list'
}
