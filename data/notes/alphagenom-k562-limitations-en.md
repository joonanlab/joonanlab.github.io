---
title: "AlphaGenome, K562, and the Reality of Drug Discovery"
date: "2026-01-30"
summary: "The architecture and limitations of AlphaGenome, its dependence on K562 data, and why data investment matters in drug discovery."
tags: ["AlphaGenome", "drug-discovery", "K562", "foundation-model", "genomics"]
lang: "en"
---

On AlphaGenome, the K562 cell line, and the limitations of AlphaGenome. On the gap between ideals and reality in drug discovery.

AlphaGenome ([Cheng et al. 2025, Nature](https://doi.org/10.1038/s41586-025-10014-0)) uses deep learning to predict the effects of variants in noncoding regions. This is not a new concept. Deep learning models predicting noncoding variant effects have been developed over the past decade.

## Why Are Noncoding Variants So Hard to Study?

The opposite of noncoding is coding. Not programming — "coding" here refers to gene sequences that can become proteins (more precisely, protein-coding sequences). Coding sequences are intuitive. The flow from DNA to RNA to amino acids to proteins follows clear rules. A protein is determined by triplets of DNA bases. This is as deterministic as the sun rising in the east.

Noncoding regions, by contrast, lack such clear rules. They do not directly encode proteins, but critical regulatory elements bind within them during protein production. This is why humans can do more diverse things than potatoes despite having fewer genes. Highly evolved organisms achieve complexity by diversifying the combinations of elements that participate in the protein production process.

These "binding" events follow some rules. For instance, a factor called FOXP1 recognizes and binds to the sequence CGATACAA. But this binding is not perfectly deterministic. On top of that, there are factors that exponentially increase the complexity.

## Deep Learning Models Before AlphaGenome

When organisms produce proteins — when genes are transcribed — regulatory elements bind to the DNA sequence. This binding does not occur in a one-dimensional space. The DNA sequence folds and loops into three-dimensional configurations. Sequences that are physically distant can come together at a single "moment of transcription."

To study noncoding genome transcription with language models, BERT was initially used. This was years ago, in the early days. BERT could only train on very short sequences with short tokens, making it unable to learn long-range transcriptional interactions. On the other side, CNN-based approaches attempted to capture sequence motif rules of regulatory elements, but these also trained on very short regions. Then Google developed Enformer ([Avsec et al. 2021, Nat Methods](https://doi.org/10.1038/s41592-021-01252-x)), which attached a transformer to a CNN model, enabling training on 100,000 base pairs at once.

The transformer era followed, bringing diverse models. But a problem became clear. Transformers handle long-range dependencies well, yet their computational cost scales quadratically with sequence length. For genomic problems involving tens to hundreds of thousands of base pairs, a large gap emerged between "theoretically possible" and "practically trainable."

A different approach tried to bridge this gap: state space models like Mamba ([Gu & Dao 2023](https://arxiv.org/abs/2312.00752)). Mamba does not use attention. Instead, it processes the sequence from left to right, passing information through a hidden state that summarizes prior context. Its computational complexity is near-linear, and its advantages grow with sequence length (bi-directional Mamba also emerged, since DNA is a double helix).

The appeal for genomic problems was clear. DNA is inherently sequential. Transcriptional regulation is ultimately the result of accumulated context along the sequence. Mamba represents this context not through pairwise comparisons of all positions but through an evolving state. In theory, it can process hundreds of thousands or even millions of base pairs in a single pass.

But limitations remain. While Mamba handles length well, it struggles to explicitly reveal how two spatially distant points connect. Its interpretability for enhancer-promoter interactions — when and in what combinations they meet — is weaker than attention-based models. A trade-off exists between "the ability to read long" and "the ability to dissect interactions."

## Is AlphaGenome Different?

Against this backdrop, AlphaGenome made yet another architectural choice. It uses a UNet to compress long sequences into multi-resolution summaries and then reconstruct them. This reframes the "how long can we read" problem — not as pure attention, but as spatial compression and restoration.

The UNet's core idea is straightforward. First, compress the sequence progressively to capture broad context. This gathers regulatory signals tens of thousands of base pairs apart into a single representation space. Then restore the original resolution, preserving local information through skip connections. Originally designed for medical imaging — to simultaneously see local lesions and global context — AlphaGenome adapted this structure for genomics.

The result is a model that goes beyond asking "does this variant disrupt a motif?" to asking "what position does the sequence block containing this variant occupy in the entire transcriptional regulatory network?" At least architecturally, that is what it aims to do.

## The K562 Problem: A Data Limitation, Not a Model Limitation

Here an important practical issue arises. A substantial portion of AlphaGenome's training data comes from K562 and a small number of other well-characterized cell lines.

K562 is an excellent model system. Experimental data is abundant, reproducibility is high, and vast amounts of ChIP-seq, ATAC-seq, and RNA-seq data have accumulated. From a deep learning perspective, it is an ideal training target.

But K562 is a leukemia cell line. It is neither normal tissue nor a developmental context, and it is far removed from the actual patient cells where we hope drugs will work.

What AlphaGenome predicts is essentially "in the cellular state of K562, what functional signal might this sequence produce." This is not the model's fault — it is a data limitation. But from a drug discovery perspective, this difference is critical.

In drug discovery, what we truly want to know is whether a variant causes disease, whether perturbing a regulatory axis changes the phenotype, and whether that effect is reproducible in specific tissues, developmental stages, and patient populations. AlphaGenome provides only the methodology. More precisely, it opens a possibility space: "this sequence may have regulatory potential."

But AlphaGenome is not a panacea. Causal direction is unclear, cell-type specificity is limited, and developmental stages or pathological states are barely represented. In other words, AlphaGenome is not a model that confirms drug targets — it is a model that expands the candidate pool. This is where the ideals and reality of drug discovery diverge. The model says "this variant looks important," but the experiment asks back "important when, where, and how?" Bridging that gap still requires classical but expensive experiments: primary cells, organoids, patient-derived samples.

## The Importance of Data Investment

For pharmaceutical companies looking to leverage AlphaGenome, the answer is clear: they must generate patient-derived sample data. Publicly available data alone will not provide the answers. Enformer uses the Basenji dataset ([Kelley et al. 2018, Genome Res](https://doi.org/10.1101/gr.227819.117)) created by Robert Kelley at Calico, built from ENCODE, FANTOM, and Roadmap Epigenome data. With roughly 20,000 tracks, this dataset has been used by multiple companies and research groups to develop models. But this level of data only demonstrates proof of concept — real drug development demands purpose-built data.

Major international pharmaceutical companies generate their own data. While they also use public resources like UK Biobank, these companies invested directly in creating those datasets and secured early access. In Korea, public data initiatives like the National Integrated Bio Big Data project are being discussed, but active corporate data investment must proceed in parallel.

The noncoding genome is governed by loose, combinatorial, context-dependent rules. Patient-derived cell line data, cell line data treated with diverse drugs, and linkage to medical records are all necessary.

## Understanding Quantitative Genetics Is Key to Drug Discovery

Why did Google bother developing AlphaGenome? AlphaFold predicts protein structures. It can also assess how variants alter protein activity and develop drugs targeting those proteins. But there is a domain AlphaFold cannot reach. Humans are diverse. We have quantitative traits. Even among people diagnosed with the same disease, there are diverse subtypes and clinical distributions. Not one gene and one variant, but many genes and many variants are involved.

With whole-genome sequencing, tens of thousands of variants can be found in a single individual. In a traditional experiment, one researcher studies one variant at a time. When will we get through tens of thousands? And that is just one patient.

AlphaGenome predicts this in under ten seconds. From those predictions, the truly important one or two variants can be identified and experimentally validated.

## Why AlphaGenome's Progress Matters

Those who have used AlphaGenome know: you can access its API for research. But currently, it predicts using limited cell information at the K562 level. For someone like me who studies autism, fetal brain data is needed — and such data is extremely rare. If I want to apply my own fetal brain data, I would need to fine-tune the AlphaGenome model. That is currently not straightforward.

Going forward, Google will provide the AlphaGenome framework to various pharmaceutical companies. These companies will train it on their own high-quality proprietary data for drug discovery applications.

What matters more than foundation model development is producing good data — and companies investing directly in that effort.
