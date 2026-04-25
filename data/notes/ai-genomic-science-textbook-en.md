---
title: "Writing a Textbook on AI for Genomic Science"
date: "2025-11-03"
summary: "Tracing the history of genomic AI, the rise of foundation models and virtual cells, and reflections on biology education."
tags: ["AI", "genomics", "textbook", "foundation-model", "virtual-cell", "education"]
lang: "en"
category: "Lab Notes"
---

I am writing a textbook titled "AI for Genomic Science." It is intended for my undergraduate course next year, and also serves as a personal study project. My sabbatical started in March, giving me ample time to study. While caring for a family member, I have been sitting beside them, organizing various materials. All 17 chapters have been drafted, but I plan to trim and polish them through three or four rounds of editing before releasing each chapter. Here are some thoughts from the process.

## The Origins of Genomic AI

AlphaFold won the Nobel Prize, and everyone is saying AI is the future. How is AI actually used in genomic research?

Around 2015, groups led by Brendan Frey and Olga Troyanskaya published CNN-based deep learning models — DeepBind ([Alipanahi et al. 2015, Nat Biotechnol](https://doi.org/10.1038/nbt.3300)), DeepSEA ([Zhou & Troyanskaya 2015, Nat Methods](https://doi.org/10.1038/nmeth.3547)) — that predicted gene expression regulation from DNA sequences. Apart from these two landmark papers, there was a lull until Robert Kelley's team released Basenji ([Kelley et al. 2018, Genome Res](https://doi.org/10.1101/gr.227819.117)) and standardized the datasets, spawning several more neural network models for gene regulation. These were pre-foundation models. The accumulation of epigenome data — roughly 20,000 standardized tracks — made this possible.

But we need to look further back. The arrival of AI in genomic research actually began with variant interpretation — predicting which genetic variants among the many in our DNA are pathogenic.

Two of the earliest exome studies stand out: one by Ng published in Nature Genetics, and another by Choi Moo-Rim at Seoul National University published in PNAS. Both relied on evolutionary conservation of sequences to predict whether variants affect protein function. Around 2010, multiple algorithms based on evolutionary conservation of protein sequences — SIFT ([Ng & Henikoff 2003, Nucleic Acids Res](https://doi.org/10.1093/nar/gkg509)), PolyPhen ([Adzhubei et al. 2010, Nat Methods](https://doi.org/10.1038/nmeth0410-248)), PROVEAN, and others — emerged in abundance. Even two decades later, these prediction tools remain remarkably successful.

This led to ensemble machine learning algorithms that aggregated these tools and incorporated epigenome data. The result was the CADD score ([Kircher et al. 2014, Nat Genet](https://doi.org/10.1038/ng.2892)), published in Nature Genetics in 2014. These AI-based models assessed variant pathogenicity based on sequence features. Naturally, other machine learning and deep learning approaches tackling the same problem followed. This is one origin of genomic AI model development.

## From Domain-Specific Models to Foundation Models

The deep learning models mentioned above were CNN-based. Later, hybrid architectures like Enformer ([Avsec et al. 2021, Nat Methods](https://doi.org/10.1038/s41592-021-01252-x)) introduced some variation, but fundamentally they predicted specific tasks — does this sequence influence gene regulation? How much does a variant affect regulation in a given tissue or cell? I categorize these as domain-specific models. We use such models in our research, but their outputs are task-specific and do not provide highly refined predictions for our particular research questions. Performance depends heavily on the epigenome data used, and for groups like ours studying early brain development, the relevant data is often missing.

I was thinking about these limitations around 2023. Then 2024 changed the landscape considerably. LLM-based foundation models began entering genomics and single-cell transcriptomics broadly. Since then, diverse architectures and models have been pouring in. Unlike CNN approaches, LLMs are comprehensive — they are not developed for a specific purpose. This means each model needs to be tested and compared in one's own research context. That is why I started writing this book in March.

## The Virtual Cell Trend

Another emerging direction is the virtual cell. This line of research is grounded in single-cell transcriptomics. In my personal assessment, single-cell technology will converge on two main applications: as a pathological tool and as the basis for virtual cells.

Virtual cells begin with models built on aggregated single-cell data. The single-cell field has been atlas-ified over the past two years — decades of accumulated data have been collected, curated, and unified into atlases. Foundation models trained on these atlas datasets can predict how genes behave in specific cell types or under perturbation conditions.

Such models make it possible to examine genes or gene networks at the single-cell level without performing experiments. But the ultimate goal is to derive experimentally testable hypotheses across various conditions.

## A New Loop in AI-Based Biology Research

This is where the art of AI-based biology research emerges.

Traditionally, biology research followed an "observation → hypothesis → experiment" cycle. With AI, this is shifting to "data accumulation → model building → hypothesis generation through prediction → experimental validation → (back to) data accumulation → model building → (infinite loop)." Data accumulation is a critical part of this flow, and the emergence of high-throughput experimental techniques — which demand validation of large numbers of hypotheses — further drives this trend.

For example, large-scale genomic studies now identify hundreds of genes associated with a single disease. Understanding the full picture of a disease through one gene is impossible. How should we validate and experimentally address this quantitative genetics and genetic heterogeneity? These are the questions facing biologists. AI models can help enormously in this space.

## How Should Biology Students Learn AI?

I am writing chapters with this question in mind. The essence of biology research lies in uncovering the functional causal relationships behind phenotypes and disease. So the learning materials are structured around mechanisms linked to each genomic element and to genomic study results.

I plan to release chapters as they are completed and reviewed, with additional uploads to follow. This brings me close to having a coherent set of textbooks spanning from undergraduate to graduate courses: Human Genetics (sophomore), Basic Statistics for Genomics (sophomore), AI for Genomic Science (junior/graduate), and Writing Your First Paper (senior/graduate) — four books in total.
