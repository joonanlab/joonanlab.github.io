export interface Tool {
  name: string
  description: string
  image: string
  links: { label: string; url: string }[]
}

export const TOOLS: Tool[] = [
  {
    name: 'K-GeneBook',
    description:
      'An interactive resource for exploring ASD risk genes identified through whole-genome sequencing of Korean families, SSC, SPARK, and MSSNG cohorts.',
    image: '/images/codepic/kgenebook.png',
    links: [
      { label: 'Website', url: 'https://joonan-lab.github.io/k_genebook/' },
    ],
  },
  {
    name: 'Brain Transcriptome Single-cell (BTS) Atlas',
    description:
      'Anndata, Seurat object, and Celltypist model for the atlas. Plots for 3,380 neurological disorder risk genes expression profiles are available.',
    image: '/images/codepic/SCN2A_multiplot.png',
    links: [
      { label: 'Zenodo', url: 'https://zenodo.org/records/14177002' },
      { label: 'UCSC Browser', url: 'https://bts-brain-cell-atlas.cells.ucsc.edu/' },
      { label: 'Paper', url: 'https://www.nature.com/articles/s12276-024-01328-6' },
    ],
  },
  {
    name: 'CWAS-Plus',
    description:
      'A new Python package for category-wide association study with better user-interface. Now available via pip install.',
    image: '/images/codepic/cwas.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/joonan-lab/cwas' },
      { label: 'Docs', url: 'https://cwas-plus.readthedocs.io/en/latest/index.html' },
    ],
  },
  {
    name: 'AnnQ',
    description:
      'Reference-based quantification of cellular abnormality at single-cell resolution. AnnQ uses annotation probability distributions to track uncertainty states and out-of-reference signals in perturbation and disease datasets.',
    image: '/images/codepic/annQ.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/joonan-lab/AnnQ' },
      { label: 'Paper', url: 'https://academic.oup.com/bib/article/27/3/bbag278/8698826' },
    ],
  },
  {
    name: 'IDAP',
    description:
      'Integrated literature- and knowledge-graph-driven evidence prioritization pipeline for precision oncology. Combines OncoKB annotation, PubMed text mining, and TxGNN-based drug repurposing to recommend candidate therapies for cancer patients.',
    image: '/images/codepic/idap.png',
    links: [
      { label: 'Manual', url: 'https://joonan-lab.github.io/IDAP-pipeline/' },
      { label: 'GitHub', url: 'https://github.com/joonan-lab/IDAP-pipeline' },
      { label: 'Zenodo', url: 'https://zenodo.org/records/19301367' },
      { label: 'Paper', url: 'https://doi.org/10.1093/bioinformatics/btag300' },
    ],
  },
]
