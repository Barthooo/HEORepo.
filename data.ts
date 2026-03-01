import { Collection, Resource, Theme } from './types';

export const REPO_VERSION = 1770284453583;

export const COLLECTIONS: Collection[] = [
  {
    "id": "general",
    "name": "HEOR General",
    "icon": "📦",
    "description": "Broad HEOR resources and foundational materials.",
    "subCategories": [
      "Intro to HEOR",
      "Books📖",
      "Tools & Resources🔧"
    ]
  },
  {
    "id": "modelling",
    "name": "Modelling",
    "icon": "⚖️",
    "description": "Economic modeling, cost-effectiveness, and simulations.",
    "subCategories": [
      "Decision Tree",
      "Markov",
      "PartSA",
      "Budget Impact"
    ]
  },
  {
    "id": "meta-analysis",
    "name": "Meta-Analysis",
    "icon": "⛓️",
    "description": "Evidence synthesis and systematic review methodologies.",
    "subCategories": [
      "Meta-analysis",
      "Network Meta-analysis"
    ]
  },
  {
    "id": "survival-analysis",
    "name": "Survival Analysis",
    "icon": "📈",
    "description": "Evidence-based survival extrapolation and KM analysis.",
    "subCategories": []
  }
];

export const RESOURCES: Resource[] = [
  {
    "id": "tx9lqbblp",
    "title": "Intro to Network meta-analyses_Cochrane",
    "description": "NMA Chapter of Cochrane Handbook for Systematic Reviews of Interventions, could be used as an intro to NMA.",
    "url": "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-11",
    "domain": "WWW.COCHRANE.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Network Meta-analysis"
  },
  {
    "id": "c3en8ft5b",
    "title": "Handbook for Systematic Reviews_Cochrane",
    "description": "The online version of Cochrane's handbook for systematic reviews of interventions, includes a full chapter on meta-analysis plus many advanced topics.",
    "url": "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current",
    "domain": "WWW.COCHRANE.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Meta-analysis"
  },
  {
    "id": "1lza86vlw",
    "title": "Tutorial: R package meta for meta-analysis",
    "description": "Tutorial and R codes for performing a meta-analysis with the package {meta}.",
    "url": "https://cran.r-project.org/web/packages/meta/vignettes/meta-tutorial.pdf",
    "domain": "CRAN.R-PROJECT.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Meta-analysis"
  },
  {
    "id": "vkxrtubv1",
    "title": "Tutorial: R package netmeta for Network meta-analysis",
    "description": "Tutorial and R codes for performing a Network meta-analysis with the package {netmeta}.",
    "url": "https://cran.r-project.org/web/packages/netmeta/vignettes/netmeta.pdf",
    "domain": "CRAN.R-PROJECT.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Network Meta-analysis"
  },
  {
    "id": "w71p79qbz",
    "title": "Tutorial: R package metafor for meta-analysis",
    "description": "Tutorial and R codes for performing a meta-analysis with the package {metafor}.",
    "url": "https://cran.r-project.org/web/packages/metafor/vignettes/metafor.pdf",
    "domain": "CRAN.R-PROJECT.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Meta-analysis"
  },
  {
    "id": "075gg8tyt",
    "title": "Doing Meta-Analysis with R: metafor adaptation",
    "description": "A \"Doing Meta-Analysis in R\" adaptation for the package {metafor}.",
    "url": "https://cjvanlissa.github.io/Doing-Meta-Analysis-in-R/index.html",
    "domain": "CJVANLISSA.GITHUB.IO",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Meta-analysis"
  },
  {
    "id": "snwqfmc8y",
    "title": "R Workshop for Meta-analysis materials",
    "description": "Slides and R codes of performing meta in R by Wolfgan Viechtbauer.",
    "url": "https://github.com/wviechtb/workshop_2022_ma_esmarconf",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Meta-analysis"
  },
  {
    "id": "mp64umjo8",
    "title": "Simple workflow of package dmetar for meta-analysis",
    "description": "R package {dmetar} guide vignette in GitHub repo.",
    "url": "https://github.com/MathiasHarrer/dmetar/blob/master/vignettes/dmetar_vignette.Rmd",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "05/02/2026",
    "contributor": "Admin",
    "category": "meta-analysis",
    "subCategory": "Meta-analysis"
  },
  {
    "id": "8ztgsctpj",
    "title": "NICE_Budget Impact template",
    "description": "NICE's Budget Impact Model submission template for digital health technologies in Excel.",
    "url": "https://www.nice.org.uk/corporate/ecd7/resources/budget-impact-template-excel-11189604349",
    "domain": "WWW.NICE.ORG.UK",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "04/02/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Budget Impact"
  },
  {
    "id": "6ks8kx1zo",
    "title": "NPCE_Budget Impact template",
    "description": "National Centre for Pharmacoeconomics (NPCE)'s Budget Impact Model submission template in Excel, version 2.2.",
    "url": "https://www.ncpe.ie/submission-process/submission-templates/budget-impact-model-template/",
    "domain": "WWW.NCPE.IE",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "04/02/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Budget Impact"
  },
  {
    "id": "ldsykbenu",
    "title": "SMC_Budget Impact template",
    "description": "Scottish Medicines Consortium (SMC)'s Budget Impact Model submission template in Excel.",
    "url": "https://scottishmedicines.org.uk/media/8840/bi-template-final-v10.xlsx",
    "domain": "SCOTTISHMEDICINES.ORG.UK",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "04/02/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Budget Impact"
  },
  {
    "id": "ixebzul0g",
    "title": "YHEC_Budget Impact Analysis Shiny",
    "description": "A web-based application designed by YHEC to assess the budget impact of Drug X for Disease Y patients.",
    "url": "https://shiny.york.ac.uk/YHEC_Examples/",
    "domain": "SHINY.YORK.AC.UK",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "04/02/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Budget Impact"
  },
  {
    "id": "k8qswhu7m",
    "title": "BIA Tutorial_AMCP",
    "description": "Slides of tutorial by AMCP for introduction to BIA and budget impact model building.",
    "url": "https://www.amcp.org/sites/default/files/2022-09/Budget_Impact_Analysis_2021.pptx",
    "domain": "WWW.AMCP.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "04/02/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Budget Impact"
  },
  {
    "id": "gqmkkdrzw",
    "title": "ISPOR_Good practice for BIA",
    "description": "ISPOR's guidance on methodologies for undertaking or reviewing the results of BIAs.",
    "url": "https://www.ispor.org/heor-resources/good-practices/article/principles-of-good-practice-for-budget-impact-analysis",
    "domain": "WWW.ISPOR.ORG",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "04/02/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Budget Impact"
  },
  {
    "id": "tnn81i4it",
    "title": "Performing BIA in R_dynamicpv",
    "description": "Vignette of building budget impact models in a dynamic fashion using R package dynamicpv.",
    "url": "https://msdllcpapers.r-universe.dev/articles/dynamicpv/budget-impact-applications.html",
    "domain": "MSDLLCPAPERS.R-UNIVERSE.DEV",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "04/02/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "Budget Impact"
  },
  {
    "id": "bv8oqx6fe",
    "title": "PartSA_Youtube tutorial",
    "description": "A Youtube viedo showing how to run a Probabilistic Sensitivity Analysis (PSA) in Excel using a simple Markov model to compare two treatments' cost-effectiveness by Mirko von Hein.",
    "url": "https://www.youtube.com/watch?v=fPmQaf_XQDA",
    "domain": "WWW.YOUTUBE.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "PartSA"
  },
  {
    "id": "krf957vpw",
    "title": "KM-GPT",
    "description": "An Automated Pipeline for Reconstructing Individual Patient Data from Kaplan-Meier Plots, require OpenAI API Key.",
    "url": "https://km-gpt.wse.jhu.edu/",
    "domain": "KM-GPT.WSE.JHU.EDU",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "survival-analysis",
    "subCategory": "all"
  },
  {
    "id": "vwlxwbq1o",
    "title": "PartSA_Excel template",
    "description": "A template of PartSA model in Excel by Mvon Hein.",
    "url": "https://github.com/MvonHein/Partitioned-Survival-Model",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "PartSA"
  },
  {
    "id": "ofcji2wpa",
    "title": "PartSA_DARTH",
    "description": "A repository contains functions useful for conducting partitioned survival analysis in R and provides a few examples.",
    "url": "https://github.com/DARTH-git/Partitioned-Survival-Analysis/tree/master",
    "domain": "GITHUB.COM",
    "imageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    "addedDate": "30/01/2026",
    "contributor": "Admin",
    "category": "modelling",
    "subCategory": "PartSA"
  },
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
    "subCategory": "Intro to HEOR"
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
    "subCategory": "PartSA"
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
    "subCategory": "Intro to HEOR"
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
    "subCategory": "Meta-analysis"
  },
  {
    "id": "vmrtjwx99",
    "title": "Doing Meta-Analysis in R: A Hands-on Guide",
    "description": "(one of) The best step-by-step open-source book; covers heterogeneity, subgroup/meta-regression, publication bias, plus advanced chapters.",
    "contributor": "Admin",
    "url": "https://doing-meta.guide/",
    "domain": "DOING-META.GUIDE",
    "imageUrl": "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=600",
    "addedDate": "27/01/2026",
    "category": "meta-analysis",
    "subCategory": "Meta-analysis"
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
  "Decision tree",
  "BIA",
  "HEOR"
];
