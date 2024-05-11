---
title: "An Lab - Project"
layout: gridlay
excerpt: "An Lab -- Project."
sitemap: false
permalink: /project/
---

# Featured Publications

---

{% assign number_printed = 0 %}
{% for publi in site.data.publist %}

{% if publi.highlight == 1 %}

<div class="row">

<div class="col-sm-12">
 	<img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="20%" style="float: left" />
  <p><a class="pub1" href="{{ publi.link.url }}">{{ publi.title }}</a></p>
  <!-- <p><a class="pub2"> {{ publi.authors }} </a></p> -->
  <a class="pub2"> {{ publi.link.display }} </a>
</div>

</div>

{% endif %}

{% endfor %}



<p> &nbsp; </p>

---

<div>
## Full List

Publications since 2019 (✻First, †Corresponding author)
1.  Kim JH✻, Koh IG, Lee H, Lee GH, Song DY, Kim SW, Kim Y, Han JH, Bong G, Lee J, Byun H, Son JH, Kim YR, Lee Y, Kim JJ, Park JW, Kim IB, Choi JK, Jang JH, Trost B, Lee J, Kim E, Yoo HJ†, **An JY†**, Short tandem repeat expansions in cortical layer-specific genes implicate in phenotypic severity and adaptability of autism spectrum disorder, Psychiatry and Clinical Neurosciences, In Press.
2.  Chang E✻, Hwang HS, Song KJ, Kim K, Kim MS, Jang SJ, Kim KP, You S, **An JY†**, Pan-cancer proteogenomic landscape of whole-genome doubling reveals putative therapeutic targets in various cancer types, medRxiv, 2024.
3.  Kim Y✻, Jeong M✻, Koh IG, Kim C, Lee H, Kim JH, Yurko R, Kim IB, Park J, Werling DM, Sanders SJ, **An JY†**, CWAS-Plus: Estimating category-wide association of rare noncoding variation from whole-genome sequencing data with cell-type-specific functional data, medRxiv, 2024.
4.  Kim S✻, Lee J✻, Koh IG, Ji J, Kim HJ, Kim E, Park J, Park JE, **An JY†**, An integrative single-cell atlas to explore the cellular and temporal specificity of neurological disorder genes during human brain development, bioRxiv, 2024.
5.  Song KJ✻, Kim M, Heo YJ, Cho KC, Oh JW, Kim DH, Hwa C, Do Y, Choi S, Hwang HS, Kim K, Kim KG, Na S, Paek E, An JY, Jang SJ, Kim MS, Kim KP†, Assessing Long-Term Stored Tissues for Multi-Omics Data Quality and Proteogenomics Suitability, bioRxiv, 2024.
6.  Song KJ✻, Choi S✻, Kim K✻, Hwang HS✻, Chang E, Park JS, Shim SB, Choi S, Heo YJ, An WJ, Yang DY, Cho KC, Ji W, Choi CM, Lee JC, Kim HR, Yoo J, Ahn HS, Lee GH, Hwa C, Kim S, Kim KG, Kim MS, Paek E, Na S†, Jang SJ†, **An JY†**, Kim KP†, Proteogenomic Analysis of a Korean Cohort Reveals Lung Cancer Subtypes Predictive of Metastasis, Chromosome Instability, and Tumor Microenvironment, Nature Communications, In Revision.
7.  Darbandi SF✻, An JY✻, Lim K, Page NF, Liang L, Young DM, Ypsilanti AR, State MW, Nord AS, Sanders SJ†, Rubenstein JLR†, Five autism-associated transcriptional regulators target shared loci proximal to brain-expressed genes, Cell Reports, In Revision.
8.  Choi S✻ & **An JY†**, Multiomics-based evaluation for cancer biomarker discovery and cancer subtyping, Advances in Clinical Chemistry, In Revision.
9.  Kissel LT✻, Pochareddy S, An JY, Sestan N, Sanders SJ, Wang X, Werling DM†, Sex-differential gene expression in developing human cortex and its intersection with autism risk pathways, Biological Psychiatry Global Open Science, 2024.
10. Chang E & **An JY†**, Whole-genome doubling is a double-edged sword: the heterogeneous role of whole-genome doubling in various cancer types, BMB Reports, 2024; 57(3): 125.
11. Lagunas T✻, Plassmyer SP, Friedman RZ, Rieger MA, Fischer AD, Lucero AFA, An JY, Sanders SJ, Cohen BA, Dougherty JD†, A Cre-dependent massively parallel reporter assay allows for cell-type specific assessment of the functional effects of non-coding elements in vivo, Communications Biology , 2023
12. Park G✻, Jang WE✻, Kim S✻, Gonzales EL, Ji J, Choi S, Kim YJ, Park JH, Mohammad HB, Bang G, Kang M, Kim SB, Jeon SJ, Kim JY, Kim KP, Shin CY†, **An JY†**, Kim MS†, Lee YS†, Dysregulation of the Wnt/β-catenin signaling pathway via Rnf146 upregulation in a VPA-induced mouse model of autism spectrum disorder, Experimental and Molecular Medicine, 2023
13. Lowther C✻, Valkanas E, Giordano JL, Wang HZ, Currall BB, O’Keefe K, Pierce-Hoffman E, Kurtas NE, Whelan CW, Hao SP, Weisburd B, Jalili V, Fu J, Wong I, Collins RL, Zhao X, Austin-Tse CA, Evangelista E, Lemire G, Aggarwal VS, Lucente D, Gauthier LD, Tolonen C, Sahakian N, Stevens C, An JY, Dong S, Norton ME, MacKenzie T, Devlin B, Gilmore K, Powell BC, Brandt A, Vetrini F, DiVito M, Sanders SJ, MacArthur DG, Hodge JC, O’Donnell-Luria A, Rehm HL, Vora NL, Levy B†, Brand H†, Wapner RJ†, Talkowski ME†, Systematic evaluation of genome sequencing for the assessment of fetal structural anomalies, The American Journal of Human Genetics, 2023.
14. Park HR✻, Shiva A, Cummings P, Kim S, Kim S, Lee E, Leong A, Chowdhury S, Shawber C, Carvajal R, Thurston G, An JY, Lund AW, Yang HW, Kim M†. Angiopoietin-2-dependent spatial vascular destabilization promotes T-cell exclusion and limits immunotherapy in melanoma, Cancer Research, 2023.
15. Jang WE✻, Park JH†, Park G, Bang G, Na CH, Kim JY, Kim KY, Kim KP, Shin CY, An JY, Lee YS, Kim MS†, Cntnap2-dependent molecular networks in autism spectrum disorder revealed through an integrative multi-omics analysis, Molecular Psychiatry , 2023.
16. Koesterich J✻, An JY, Inoue F, Sohota A, Ahituv N, Sanders SJ†, Kreimer A†, Characterization of De Novo Promoter Variants in Autism Spectrum Disorder with Massively Parallel Reporter Assays, International journal of molecular sciences, 2023.
17. Yoon K✻, Kim Y✻, Kim S✻, Cui Y, Ji J, Choi S, Park G, Chung JH, Lee YS†, **An JY†**, DH Lee†, Chronic skin ultraviolet irradiation induces transcriptomic changes associated with microglial dysfunction in the hippocampus, Molecular Brain, 2022.
18. Lee T✻, Lee H✻, Kim S, Park K, **An JY†**, Kim HW†, Risk variants could inform early neurodevelopmental outcome in children with developmental disabilities, Journal of Autism and Developmental Disorders, 2022.
19. Kim IB✻, Lee T✻, Lee J, Kim J, Lee S, Koh IG, Kim JH, An JY, Lee H, Kim WK, Ju YS, Cho Y, Yu SJ, Kim SA, Oh M, Han DW, Kim E†, Choi JK†, Yoo HJ†, Lee JH†, Non-coding de novo mutations in chromatin interactions are implicated in autism spectrum disorder, Molecular Psychiatry , 2022.
20. Oh J✻, Hwa C✻, Jang D, Shin S, Lee SJ, Kim J, Lee SE, Jung HR, Oh Y, Jang G, Kwon O, **An JY†**, Cho SY†, Augmentation of the RNA m6A reader signature is associated with poor survival by enhancing cell proliferation and EMT across cancer types, Experimental and Molecular Medicine, 2022.
21. Jang Y✻, Kwak E, An JY, Jung JH†, Infantile esotropia in a family with TUBB3 mutation associated congenital fibrosis of extraocular muscles, Ophthalmic Genetics, 2022.
22. Georgakopoulos-Soares I✻, Victorino J✻, Parada GE✻,Agarwal V, Zhao J, Yuen WH, Umar MI, Elor O, Muh- wezi A, An JY, Sanders SJ, Kwok CK, Inoue F†, Hemberg M†, Ahituv N†, High-throughput characterization of the role of non-B DNA motifs, Cell Genomics, 2022.
23. Liang L✻, Darbandi SF, Pochareddy S, Gulden FO, Gilson MC, Sheppard BK, Sahagun A, An JY, Werling DM, Rubenstein JR, Sestan N, Bender K, Sanders SJ†, Developmental dynamics of voltage-gated sodium channel isoform expression in the human and mouse brain, Genome Medicine, 2021.
24. Kim YG✻, Bak MS, Kim A, Kim Y, Chae YC, Kim YL, Chun YS, An JY, Seo SB, Kim SJ, Lee YS†, Kdm3b haploinsufficiency impairs the consolidation of cerebellum-dependent motor memory in mice, Molecular Brain, 2021.
25. Choi L✻, **An JY†**, Genetic architecture of autism spectrum disorder: Lessons from large-scale genomic studies, Neuroscience and Biobehavioral Reviews, 128:244-257, 2021
26. Kim HJ✻, Kim JY, Jung CW, Lee YS, An JY, Kim EH, Kim KH, Lee SP, Park JY†, Park MJ†, ANO1 regulates maintenance of stemness in glioblastoma stem cells by stabilizing EGFRvIII, Oncogene, 2021
27. Jung HR✻, Oh Y, Na D, Min S, Kang J, Jang D, Shin S, Kim J, Lee SE, Jeong EM, An JY, Sung CO, Lee WS, Lee C, Cho SY†, CRISPR screens identify a novel combination treatment targeting BCL-X L and WNT signaling for KRAS/BRAF-mutated colorectal cancers, Oncogene, 2021
28. An JY✻, Jung JH, Choi L, Wiegen ED, Mohney BG, Identification of risk genes of familial strabismus using an exome sequencing analysis, Genes, 2021
29. Kim SW✻, Kim YJ✻, Kim SE†, **An JY†**, Ferroptosis-Related Genes in Neurodevelopment and Central Nervous System, Biology , 2021
30. Satterstrom FK✻, Kosmicki JA✻, Wang J✻, Breen MS✻, De Rubeis S✻, An JY, Peng M, Collins R, Grove J, Klei L, Stevens C, Reichert J, Mulhern MS, Artomov M, Gerges S, Sheppard B, Xu X, Bhaduri A, Norman U, Brand H, Schwartz G, Nguyen R, Guerrero EE, Dias C; Autism Sequencing Consortium; iPSYCH-Broad Consortium, Betancur C, Cook EH, Gallagher L, Gill M, Sutcliffe JS, Thurm A, Zwick ME, Børglum AD, State MW, Cicek AE, Talkowski ME, Cutler DJ, Devlin B, Sanders SJ†, Roeder K†, Daly MJ†, Buxbaum JD†, Large-scale exome sequencing study implicates both developmental and functional changes in the neurobiology of autism, Cell, 2020
31. Genc O✻, An JY, Fetter RD, Kulik Y, Zunino G, Sanders SJ†, Davis GW†, Homeostatic Plasticity Commonly Fails at the Intersection of Autism-Gene Mutations and a Novel Class of Common Phenotypic Modifier, eLife, 2020
32. Kim YJ✻, **An JY†**, Spatio-temporal roles of ASD-associated variants in human brain development, Genes, 2020
33. Werling DW✻, Pochareddy S✻, JM Choi✻, An JY✻, Peng M, Sheppard BS, Peng M, Li Z, Dastmalchi C, Santperebaro G, Sousa A, Tebbenkamp A, Kaur N, Gulden F, Breen M, Liang L, Gilson M, Zhao X, Dong S, Klei L, Cicek AE, Buxbaum JD, Adle-Biassette H, Thomas JL, Aldinger KA, O’Day DR, Glass I, Zaitlen N, Talkowski ME, Roeder K, Devlin B, Sanders SJ†, Sestan N†, Whole-genome and RNA sequencing reveal variation and transcriptomic coordination in the developing human prefrontal cortex, Cell Reports, 2020
34. Williams SM✻, An JY✻, Edson J, Watts M, Murigneux V, Whitehouse AJO, Jackson CJ, Bellgrove MA, Cristino AS†, Claudianos C†, An integrative analysis of non-coding regulatory DNA variations associated with autism spectrum disorder, Molecular Psychiatry , 2019

Publications before Korea University (\✻First, \✻\✻Corresponding author)
1. An JY✻, Lin K✻, Zhu L✻, Werling DM✻, Dong S, Brand H, Wang HZ, Zhao X, Schwartz GB, Collins RL, Currall BB, Dastmalchi C, Dea J, Duhn C, Gilson MC, Klei L, Liang L, Markenscoff-papadimitriou E, Pochareddy S, Ahituv N, Buxbaum JD, Coon H, Daly MJ, Kim YS, Marth GT, Neale BM, Quinlan AR, Rubenstein JL, Sestan N, State MW, Willsey AJ, Talkowski ME†, Devlin B†, Roeder K†, Sanders SJ†, Genome-wide de novo risk score implicates promoter variation in autism spectrum disorder, Science, 2018
2. Wang D✻, Liu S, Warrell J, Won H, Shi X, Navarro FCP, Clarke D, Gu M, Emani P, Yang YT, Xu M, Gandal MJ, Lou S, Zhang J, Park JJ, Yan C, Rhie SK, Manakongtreecheep K, Zhou H, Nathan A, Peters M, Mattei E, Fitzgerald D, Brunetti T, Moore J, Jiang Y, Girdhar K, Hoffman GE, Kalayci S, GÜmÜS¸ ZH, Crawford GE, PSYCHENCODE CONSORTIUM (including An JY), Roussos P, Akbarian S, Jaffe AE, White KP, Weng Z, Sestan N, Geschwind DH, Knowles JA, Gerstein MB, Comprehensive functional genomic resource and integrative model for the human brain, Science, 2018
3. Werling DM✻, Brand H✻, An JY✻, Stone MR✻, Zhu L✻, Glessner JT, Collins RL, Dong S, Layer RM, Markenscoff-Papadimitriou E, Farrell A, Schwartz GB, Wang HZ, Currall BB, Zhao X, Dea J, Duhn C, Erdman CA, Gilson MC, Yadav R, Handsaker RE, Kashin S, Klei L, Mandell JD, Nowakowski TJ, Liu Y, Sirisha Pochareddy S, Smith L, Walker MF, Waterman MJ, He X, Kriegstein AR, Rubenstein JL, Sestan N, McCarroll SA, Neale BM, Coon H, Willsey AJ, Buxbaum JD, Daly MJ, State MW, Quinlan AR, Marth GT, Roeder K, Devlin B†, Talkowski M†, Sanders SJ†, An analytical framework for whole genome sequence data and its implications for autism spectrum disorder, Nature Genetics, 50:727–736, 2018
4. Sanders SJ✻, Neale BM✻, Huang H, Werling DM, An JY, Dong S, Abecasis G, Arguello PA, Blangero J, Boehnke M, Daly MJ, Eggan K, Geschwind DH, Glahn DC, Goldstein DB, Gur RE, Handsaker RE, McCarroll SA, Ophoff RA, Palotie A, Pato CN, Sabatti C, State MW, Willsey AJ, Hyman SE, Addington AM, Lehner T, Freimer NB and Whole Genome Sequencing for Psychiatric Disorders, Whole genome sequencing in psychiatric disorders: the WGSPD consortium, Nature Neuroscience, 20:1661–1668, 2017
5. Ben-Shalom R✻, Keeshen CM, Berrios NK, An JY, Sanders SJ†, Bender KJ†, Opposing effects on NaV1.2 function underlie differences between SCN2A variants observed in individuals with autism spectrum disorder or infantile seizures, Biological Psychiatry , 82(3):224-232, 2017
6. An JY✻, Sanders SJ†, Appreciating the Population-wide Impact of Copy Number Variants on Cognition, Biological Psychiatry , 82(2):78-80, 2017
7. Collins RL✻, Brand H, Redin CE, Hanscom C, Antolik C, Stone MR, Glessner JT, Mason T, Pregno G, Dorrani N, Mandriele G, Giachino D, Perrin D, Walsh C, Cipicchio M, Costello M, Stortchevoi A, An JY, Currall BB, Seabra CM, Ragavendran A, Margolin L, Martinez-Agosto J, Lucente D, Levy B, Sanders SJ, Wapner RJ, Quintero-Rivera F, Kloosterman W, Talkowski M†, Defining the spectrum of large inversions, complex structural variation, and chromothripsis in the morbid genome, Genome Biology , 18(1):36, 2017
8. **An JY†**, National human genome projects: an update and an agenda, Epidemiology and Health, 39, 2017
9. An JY✻, Claudianos C†, Genetic heterogeneity in autism: From single gene to a pathway perspective, Neuroscience and Biobehavioral Reviews, 68:442–453, 2016
10. An JY✻, Cristino AS, Zhao Q, Edson J, Williams SM, Marshall VM, Ravine D, Wray J, Hunt A, Whitehouse AJO, Claudianos C†, Towards molecular diagnosis of Autism Spectrum Disorders: An exome sequencing and systems approach, Translational Psychiatry , 4(6):e394, 2014
11. Cristino AS✻, Williams SM, Hawi Z, An JY, Bellgrove MA, Schwartz CE, Costa LDF, Claudianos C†, Neurodevelopmental and neuropsychiatric disorders represent an interconnected molecular system, Molecular Psychiatry , 19(3):294, 2014 


<br>

</div>
