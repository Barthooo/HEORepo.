import { Collection, Resource, Theme } from './types';

/**
 * HEORepo Repository Data
 * Updated: 28/01/2026
 * REPO_VERSION is used to trigger cache resets for all users when you push to GitHub.
 */

export const REPO_VERSION = 1769663499949;

export const COLLECTIONS: Collection[] = [
  {
    "id": Theme.ECONOMIC_MODELING,
    "name": "Modelling",
    "icon": "⚖️",
    "description": "Economic modeling, cost-effectiveness, and simulations.",
    "subCategories": [
      "Decision Tree",
      "Markov",
      "PSA"
    ]
  },
  {
    "id": Theme.SURVIVAL_ANALYSIS,
    "name": "Survival Analysis",
    "icon": "📈",
    "description": "Evidence-based survival extrapolation and KM analysis.",
    "subCategories": [
      "KM-IPD",
      "Extrapolation"
    ]
  },
  {
    "id": Theme.SYSTEMATIC_REVIEWS,
    "name": "Meta-Analysis",
    "icon": "⛓️",
    "description": "Evidence synthesis and systematic review methodologies.",
    "subCategories": [
      "Tutorials",
      "Resources",
      "Network Meta-analysis"
    ]
  },
  {
    "id": Theme.GENERAL,
    "name": "General",
    "icon": "📦",
    "description": "Broad HEOR resources and foundational materials.",
    "subCategories": []
  }
];

export const RESOURCES: Resource[] = [
  {
    "id": "26ki8shqh",
    "title": "Network Meta-Analysis for Decision-Making",
    "description": "This book can be used as an introduction to evidence synthesis and network meta-analysis, its key properties and policy implications. Examples and advanced methods are also presented for the more experienced reader.",
    "contributor": "Admin",
    "url": "https://www.agropustaka.id/wp-content/uploads/2020/04/agropustaka.id_buku_Network-Meta-Analysis-for-Decision-Making.pdf",
    "domain": "WWW.AGROPUSTAKA.ID",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "28/01/2026",
    "category": Theme.SYSTEMATIC_REVIEWS,
    "subCategory": "Network Meta-analysis"
  },
  {
    "id": "hewxh7smp",
    "title": "Partitioned-Survival-Analysis_DARTH",
    "description": "A repository contains functions useful for conducting partitioned survival analysis in R and provides a few examples.",
    "contributor": "Admin",
    "url": "https://github.com/DARTH-git/Partitioned-Survival-Analysis",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "28/01/2026",
    "category": Theme.ECONOMIC_MODELING,
    "subCategory": "PSA"
  },
  {
    "id": "anrz5j07v",
    "title": "Youtube channel_Mirko von Hein",
    "description": "A former consultant's channel with topics such as health economics, what it means to be a pharma consultant, and industry insights.",
    "contributor": "Admin",
    "url": "https://www.youtube.com/@MirkovonHein",
    "domain": "WWW.YOUTUBE.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "28/01/2026",
    "category": Theme.ECONOMIC_MODELING,
    "subCategory": "all"
  },
  {
    "id": "lnwksnmxr",
    "title": "HEALTHECON ALL_JISCMAIL",
    "description": "A mail list of Health Economists in the UK, for distributing messages to all the health economics lists.",
    "contributor": "Admin",
    "url": "https://www.jiscmail.ac.uk/cgi-bin/webadmin?A0=HEALTHECON-ALL",
    "domain": "WWW.JISCMAIL.AC.UK",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": Theme.GENERAL,
    "subCategory": "all"
  },
  {
    "id": "3bz5y8qpx",
    "title": "Decision tree tutorial_RPubs",
    "description": "A detailed, step-by-step guide by Mark Bounthavong that teaches how to build a decision tree from scratch in R, including estimating costs, outcomes, and ICERs.",
    "contributor": "Admin",
    "url": "https://rpubs.com/mbounthavong/decision_tree_model_tutorial",
    "domain": "RPUBS.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": Theme.ECONOMIC_MODELING,
    "subCategory": "Decision Tree"
  },
  {
    "id": "73le3hc79",
    "title": "Plant A Tree_GEAR",
    "description": "An Open Access Decision Tree Builder developed by the National University of Singapore (NUS) and HITAP. Allows for the creation of complex decision trees with unlimited branches directly in Excel.",
    "contributor": "Admin",
    "url": "https://www.gear4health.com/page/i/plant-a-tree",
    "domain": "WWW.GEAR4HEALTH.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": Theme.ECONOMIC_MODELING,
    "subCategory": "Decision Tree"
  },
  {
    "id": "1x8awlfbp",
    "title": "Network Meta-analysis_LinoSergio",
    "description": "A tutorial of the code necessary to conduct a Network meta-analysis in R with available dataset",
    "contributor": "Admin",
    "url": "https://github.com/LinoSergio/Network_Meta-analysis",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": Theme.SYSTEMATIC_REVIEWS,
    "subCategory": "all"
  },
  {
    "id": "j8nrra4ks",
    "title": "Open-Source Models_PharmacoEconomics",
    "description": "A collection of papers with open-source models published in PharmacoEconomics - Open, great resource for learning and model-adjusting",
    "contributor": "Admin",
    "url": "https://link.springer.com/collections/ehefgabiif",
    "domain": "SPRINGER.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": Theme.ECONOMIC_MODELING,
    "subCategory": "all"
  },
  {
    "id": "vmrtjwx99",
    "title": "Doing Meta-Analysis in R: A Hands-on Guide",
    "description": "A great resource for beginners to meta-analysis with practical code in R",
    "contributor": "Admin",
    "url": "https://doing-meta.guide/",
    "domain": "DOING-META.GUIDE",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": Theme.SYSTEMATIC_REVIEWS,
    "subCategory": "Tutorials"
  }
];

export const TAGLINE_WORDS: string[] = [
  "health economics",
  "outcome research",
  "markov",
  "PSA",
  "microsimulation",
  "survival analysis",
  "modelling",
  "survival extrapolation"
];