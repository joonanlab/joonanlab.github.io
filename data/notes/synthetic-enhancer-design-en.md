---
title: "The Current State of Synthetic Enhancer Design"
date: "2026-04-08"
summary: "This year's omics foundation research is dominated by diffusion models and synthetic enhancers. Tracing the shift from prediction to design in the gLM field."
tags: ["genomics", "deep-learning", "enhancer"]
lang: "en"
category: "Genomics + AI"
---

This year's omics foundation research is dominated by diffusion models and synthetic enhancers. This was expected, but results are emerging faster than anticipated. Omics foundation models are being developed to predict molecular layers of the central dogma — DNA, RNA, and Protein.

**DNA** pursues the question: "What effect do the myriad variants have?" Google's AlphaGenome and other gLMs (genomic language models) are representative. **RNA** focuses on "How does gene expression influence phenotype?" The premise is that gene expression is cell-type-specific and that expression defines cellular identity. Single-cell foundation models are already established, and concepts like virtual cells and digital cells have emerged. Currently, diffusion models that predict and generate how such cells emerge under specific conditions are the dominant trend. **Protein** structure prediction, exemplified by AlphaFold, is already well-established.

## From Prediction to Design

Returning to the main point, a clear axis is forming in the gLM field — the shift from "prediction" to "design." The topic is synthetic enhancer design: using deep learning models to create entirely new enhancer DNA sequences that function only in desired cell types.

## Why Is This Approach Needed?

We need to understand the nature of genetic variants. The human body carries 3 to 4 million variants, and contrary to common belief, most contribute cumulatively to traits. If a variant had a large effect on an organism, it would not have survived through long evolutionary history. This means that to study associations between variants and traits or diseases, one must remove population-level differences accumulated through evolution and precisely measure only the biological contribution. This is no easy task.

gLM models like Google DeepMind's AlphaGenome ([Cheng et al. 2025, Nature](https://doi.org/10.1038/s41586-025-10014-0)) measure how much gene expression changes in a specific cell due to a given variant in a DNA sequence. Gene expression is equated with phenotype, and the cumulative effect of variants can be simulated. But there are limitations. To understand the causal role of a variant in a trait, one must know the functional characteristics of the region where that variant occurs. The millions of variants in humans arise in noncoding regions — regions that do not encode proteins. Noncoding regions contain functional sequences such as enhancers and promoters that help regulate genes. These functional sequences vary in length, location, and mode of action across cell types and developmental stages, making them extremely difficult to measure.

This is why a rapidly emerging research direction uses gLMs to synthesize enhancers. Rather than reading enhancers at specific cells and time points, the approach generates enhancers predicted to have specific rules and functions, then measures them directly. Moreover, if such synthetic enhancers can modulate gene expression levels, they themselves could serve as therapeutics.

## Generational Progress in Synthetic Enhancer Design

**Generation 1: Inverting Prediction Models (In Silico Evolution, ISE)**

First build a good model that predicts enhancer activity from sequence, then iteratively modify the sequence to maximize the model's output. In 2022, DeepSTARR ([de Almeida et al. 2022, Nat Genet](https://doi.org/10.1038/s41588-022-01048-5)) demonstrated this in Drosophila. It is intuitive and allows direct optimization of specificity, but the problem is that adversarial sequences — those that receive high model scores but do not actually work — can emerge. These are sequences outside the natural DNA distribution.

**Generation 2: Motif Grammar-Based Design**

First decode the enhancer grammar: which transcription factor binding motifs, in which arrangement, make an enhancer functional in a specific cell type. Then assemble sequences according to those rules. This is the most interpretable approach, but it is limited by dependence on already-known motifs.

**Generation 3: Generative Language Models**

Learn the actual distribution of regulatory DNA, then conditionally sample new sequences. While Generation 1 "inverts" prediction models, Generation 3 generates directly from natural DNA distributions, theoretically producing more biologically realistic sequences. ATGC-Gen ([Su et al. 2025, arXiv](https://arxiv.org/abs/2507.19523)) demonstrated conditioning on transcription profiles or cell types, and ARSENAL ([Patel & Kundaje 2026, bioRxiv](https://doi.org/10.64898/2026.02.05.703637)) proposed using a masked LM specialized on ENCODE regulatory elements as a design prior.

**Generation 4: Integrated Pipelines + Experimental Validation**

The emerging Generation 4 bundles all of this into a single pipeline while closing the loop with experimental validation. CREsted ([Kempynck, De Winter et al. 2026, Nat Methods](https://doi.org/10.1038/s41592-026-03057-2)), recently published in Nature Methods, is the first example: model training from scATAC-seq data → enhancer grammar interpretation → sequence design → in vivo reporter assay validation in zebrafish, all in one package. Cardiac and somatic muscle enhancers succeeded 3/3, and dual-specificity designs targeting both cell types were also attempted.

## Unanswered Questions

An interesting point remains. No study has directly compared whether Generation 3 language model approaches actually outperform Generation 1 ISE approaches in living organisms. In theory, distribution-based learning should avoid adversarial problems, but whether this makes a real difference in vivo is unknown. So far, the only in vivo validated successes have come from the simplest Generation 1 ISE approach. This head-to-head comparison is probably the most important next experiment in this field.

## Task-Specific Training Over Model Size

Looking at CREsted, a small task-specific model matched or outperformed fine-tuned large pretrained models like Borzoi ([Linder et al. 2025, Nat Genet](https://doi.org/10.1038/s41588-024-02053-6)), and clearly outperformed fine-tuned genomic language models like HyenaDNA ([Nguyen et al. 2023, NeurIPS](https://arxiv.org/abs/2306.15794)) and Nucleotide Transformer ([Dalla-Torre et al. 2024, Nat Methods](https://doi.org/10.1038/s41592-024-02523-z)). In the context of enhancer design, task-specific training on the relevant dataset may matter more than model size.

## From Reading to Writing

This is now establishing itself as a research field. From reading genomes to writing them. And how quickly we can close the loop — verifying whether that "writing" actually works in living organisms — will be the key to the next stage. This kind of research is also well-suited for model organisms. From the evolutionary conservation of enhancers to the fundamental principles of cell-type-specific transcriptional regulation, a large number of hypotheses can be generated. Basic science is not doing experiments the old way — it is solving longstanding questions with new technology.

CREsted is a good example. They trained a model on a zebrafish developmental scATAC-seq atlas (20 developmental stages, 639 cell-type-by-timepoint combinations), then computationally designed enhancer sequences active only in cardiac and somatic muscle, and validated them in live zebrafish embryos. Both cardiac and somatic muscle succeeded 3/3. Even more interesting, they attempted dual-specificity designs that target both cell types while modulating expression ratios. It was not perfect, but dual activity was observed in most cases.

There is also a result where a model trained on mouse brain data could predict chicken interneuron enhancers. This means enhancers can be found and decoded even in species lacking scATAC-seq data. It is evidence that evolutionarily conserved enhancer grammar actually exists and that the model is capturing it.

Ultimately, answers are slowly emerging to the question: "Can we build from scratch the switch that turns on a specific gene in a specific cell?"
