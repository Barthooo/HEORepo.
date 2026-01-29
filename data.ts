import { Collection, Resource, Theme } from './types';

export const REPO_VERSION = 1710345600000; // Timestamp for version tracking

export const COLLECTIONS: Collection[] = [
  { 
    id: Theme.GENERAL, 
    name: 'General', 
    icon: '🏛️', 
    description: 'Broad HEOR resources, glossaries, and foundational materials.',
    subCategories: ['Foundations', 'Glossary', 'Basics']
  },
  { 
    id: Theme.ECONOMIC_MODELING, 
    name: 'Modelling', 
    icon: '📉', 
    description: 'Economic modeling, cost-effectiveness, and simulations.',
    subCategories: ['Markov', 'PSA', 'DCE', 'Microsimulation']
  },
  { 
    id: Theme.SYSTEMATIC_REVIEWS, 
    name: 'Meta-analysis', 
    icon: '🔬', 
    description: 'Evidence synthesis and systematic review methodologies.',
    subCategories: ['Cochrane', 'Prisma', 'Network MA', 'Real World']
  },
  { 
    id: Theme.NEWS, 
    name: 'News', 
    icon: '🔔', 
    description: 'Latest industry updates, breakthroughs, and regulatory shifts.',
    subCategories: ['Regulatory', 'Industry', 'Pricing', 'Policy']
  },
];

export const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Advanced PSA in Excel-based Models',
    description: 'A comprehensive guide on implementing Monte Carlo simulations for cost-effectiveness analysis.',
    url: 'https://pubmed.ncbi.nlm.nih.gov',
    domain: 'PUBMED.NCBI.NLM.NIH.GOV',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600',
    addedDate: '22/01/2026',
    contributor: 'Dr. Sarah Chen',
    category: Theme.ECONOMIC_MODELING,
    subCategory: 'PSA',
    fileType: 'GUIDE',
    status: 'warning'
  },
  {
    id: '2',
    title: 'Microsimulation: Patient-Level Modeling',
    description: 'Exploring the advantages of microsimulation over cohort models in chronic disease pathways.',
    url: 'https://www.ispor.org',
    domain: 'ISPOR.ORG',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    addedDate: '22/01/2026',
    contributor: 'Dr. Sarah Chen',
    category: Theme.ECONOMIC_MODELING,
    subCategory: 'Microsimulation',
    fileType: 'PAPER',
    status: 'verified'
  },
  {
    id: '3',
    title: 'Open Source Markov Models in R',
    description: 'A repository of reusable R scripts for building multi-state Markov transitions.',
    url: 'https://github.com',
    domain: 'GITHUB.COM',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=600',
    addedDate: '22/01/2026',
    contributor: 'Dr. Sarah Chen',
    category: Theme.ECONOMIC_MODELING,
    subCategory: 'Markov',
    fileType: 'REPO',
    status: 'warning'
  },
  {
    id: '4',
    title: 'Pharma Pricing Regulatory Shift 2026',
    description: 'A deep dive into the upcoming changes in EU-wide market access regulations and joint clinical assessments.',
    url: 'https://www.who.int',
    domain: 'EMA.EUROPA.EU',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=600',
    addedDate: '28/02/2026',
    contributor: 'Samir Gupta',
    category: Theme.NEWS,
    subCategory: 'Regulatory',
    fileType: 'DASHBOARD'
  },
  {
    id: '5',
    title: 'NICE Evaluation Framework 2026',
    description: 'The updated manual for health technology evaluation across drugs, devices, and diagnostics.',
    url: 'https://www.nice.org.uk',
    domain: 'NICE.ORG.UK',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dad99978?auto=format&fit=crop&q=80&w=600',
    addedDate: '15/02/2026',
    contributor: 'Mark Thompson',
    category: Theme.NEWS,
    subCategory: 'Policy',
    fileType: 'EXTERNAL LINK',
    status: 'warning'
  }
];

export const TAGLINE_WORDS: string[] = ['HEOR', 'MARKOV', 'PSA', 'MARKET ACCESS', 'EVIDENCE'];