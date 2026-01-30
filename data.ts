import { Collection, Resource, Theme } from './types';

/**
 * HEORepo Repository Data
 * Generated: 30/01/2026, 11:53:14
 * REPO_VERSION is used to trigger cache resets for all users when you push to GitHub.
 */

export const REPO_VERSION = 1769745194648;

export const COLLECTIONS: Collection[] = [
  {
    "id": "general",
    "name": "General",
    "icon": "📦",
    "description": "Broad HEOR resources and foundational materials.",
    "subCategories": []
  },
  {
    "id": "modelling",
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
    "id": "meta-analysis",
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
    "id": "survival-analysis",
    "name": "Survival Analysis",
    "icon": "📈",
    "description": "Evidence-based survival extrapolation and KM analysis.",
    "subCategories": []
  },
  {
    "id": "custom-7z8un",
    "name": "Books",
    "icon": "📖",
    "description": "",
    "subCategories": []
  }
];

export const RESOURCES: Resource[] = [
  {
    "id": "1blyfid3n",
    "title": "WebPlotDigitizer",
    "description": "A free web-based tool to extract numerical data from plots and graph images.",
    "url": "https://wpd.starrydata2.org/",
    "domain": "WPD.STARRYDATA2.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "survival-analysis",
    "subCategory": "all"
  },
  {
    "id": "2dh4h0ex5",
    "title": "Reconstruct IPD from KM in R",
    "description": "A step-by-step instructions for executing the Guyot (2012) algorithm to reconstruct IPD from published KM curves in R.",
    "url": "https://pharmasug.org/download/sde/rtp2023/PharmaSUG-NCSDE_2023-05.pdf",
    "domain": "PHARMASUG.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "survival-analysis",
    "subCategory": "all"
  },
  {
    "id": "mdpiug3vw",
    "title": "IPDfromKM_Shiny",
    "description": "The accompanying web-based Shiny application of R package IPDfromKM by Liu et al. (2021).",
    "url": "https://biostatistics.mdanderson.org/shinyapps/IPDfromKM/",
    "domain": "BIOSTATISTICS.MDANDERSON.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "survival-analysis",
    "subCategory": "all"
  },
  {
    "id": "2k5e790nh",
    "title": "IPDfromKM_Tutorial",
    "description": "The paper with step-to-step tutorial on the R package IPDfromKM and the Shiny by Liu et al. (2021).",
    "url": "https://link.springer.com/article/10.1186/s12874-021-01308-8",
    "domain": "LINK.SPRINGER.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "survival-analysis",
    "subCategory": "all"
  },
  {
    "id": "6gucusgit",
    "title": "SurvInt",
    "description": "A free, no-code web-based tool to create precise parametric survival extrapolations for economic models.",
    "url": "https://dgallacher.shinyapps.io/survint/",
    "domain": "DGALLACHER.SHINYAPPS.IO",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "survival-analysis",
    "subCategory": "all"
  },
  {
    "id": "qrswc1eyi",
    "title": "SurvInt_Tutorial",
    "description": "A simple tool to obtain precise parametric survival extrapolations, allows precise parametric survival models to be estimated and carried forward into economic models.",
    "url": "https://link.springer.com/article/10.1186/s12911-024-02475-6",
    "domain": "LINK.SPRINGER.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "survival-analysis",
    "subCategory": "all"
  },
  {
    "id": "991vpkfwt",
    "title": "Decision Tree_Python",
    "description": "A Python-based tool for building and analyzing decision trees in pharmacoeconomics.",
    "url": "https://github.com/mirsadra/Pharmacoeconomics-Decision-Tree",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Decision Tree"
  },
  {
    "id": "ssbe4nfiz",
    "title": "Malaria Decision Tree model",
    "description": "A decision tree model to estimate the relative cost-effectiveness of new treatment for Malaria in Kenya, in Excel.",
    "url": "https://github.com/migleapa/Applied-Methods-of-Cost-effectiveness-Analysis-in-Health-Care",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Decision Tree"
  },
  {
    "id": "sv34pl6xc",
    "title": "Decision Tree quick R tutorial",
    "description": "Quick tutorial on decision tree modelling, with R codes.",
    "url": "https://jacobsmithecon.wordpress.com/2023/02/21/decision-tree-modelling-for-cost-effectiveness-analysis-in-r/",
    "domain": "JACOBSMITHECON.WORDPRESS.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Decision Tree"
  },
  {
    "id": "biiberifj",
    "title": "Glossary of HE terms_YHEC",
    "description": "YHEC’s glossary of health economic terms, from A to Z.",
    "contributor": "Admin",
    "url": "https://www.yhec.co.uk/resources-and-events/glossary/",
    "domain": "WWW.YHEC.CO.UK",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "29/01/2026",
    "category": "general",
    "subCategory": "all"
  },
  {
    "id": "ny49akpzc",
    "title": "Decision Tree tutorials in Excel",
    "description": "A repository of materials for decision tree tutorials using Microsoft Excel, containing VBA macros for OWSA, and a decision tree builder.",
    "contributor": "Admin",
    "url": "https://github.com/mbounthavong/Decision-Tree-tutorials-in-Excel/tree/main",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "29/01/2026",
    "category": "modelling",
    "subCategory": "Decision Tree"
  },
  {
    "id": "26ki8shqh",
    "title": "Network Meta-Analysis for Decision-Making",
    "description": "This book can be used as an introduction to evidence synthesis and network meta-analysis, its key properties and policy implications. Examples and advanced methods are also presented for the more experienced reader.",
    "contributor": "Admin",
    "url": "https://www.agropustaka.id/wp-content/uploads/2020/04/agropustaka.id_buku_Network-Meta-Analysis-for-Decision-Making.pdf",
    "domain": "WWW.AGROPUSTAKA.ID",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "28/01/2026",
    "category": "meta-analysis",
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
    "category": "modelling",
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
    "category": "modelling",
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
    "category": "general",
    "subCategory": "all"
  },
  {
    "id": "3bz5y8qpx",
    "title": "Decision tree tutorial_RPubs",
    "description": "A step-by-step guide that teaches how to build a decision tree from scratch, including estimating costs, outcomes, and ICERs, with R code.",
    "contributor": "Admin",
    "url": "https://rpubs.com/mbounthavong/decision_tree_model_tutorial",
    "domain": "RPUBS.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": "modelling",
    "subCategory": "Decision Tree"
  },
  {
    "id": "73le3hc79",
    "title": "Plant A Tree_GEAR",
    "description": "An Open Access Decision Tree Builder developed by the National University of Singapore (NUS) and HITAP. Allows for the creation of complex decision trees with unlimited branches directly in Excel (Only in Windows).",
    "contributor": "Admin",
    "url": "https://www.gear4health.com/page/i/plant-a-tree",
    "domain": "WWW.GEAR4HEALTH.COM",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": "modelling",
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
    "category": "meta-analysis",
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
    "category": "modelling",
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
    "category": "meta-analysis",
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
  "extrapolation",
  "Decision tree"
];
