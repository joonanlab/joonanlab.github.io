---
title: "Reading annotation uncertainty as a biological signal"
date: "2026-05-31"
summary: "A short note on AnnQ, a framework for quantifying cellular abnormality from reference-based single-cell annotation uncertainty."
tags: ["AnnQ", "single-cell", "annotation", "perturbation", "virtual-cell"]
lang: "en"
category: "Genomics + AI"
---

Paper: [Briefings in Bioinformatics](https://academic.oup.com/bib/article/27/3/bbag278/8698826)

Single-cell RNA sequencing has become a standard tool in modern biology. By measuring gene expression in individual cells, we can infer what type of cell each one is and how its state may differ across conditions. In many biological studies, this is used to compare two experimental conditions, such as a genetically modified animal versus a wild type, a drug-treated sample versus a control, or patient tissue versus normal tissue.

Yet in real collaborative projects, we often encounter a recurring problem. Experiments are rarely designed simply to rediscover cell types that are already well defined in a reference atlas. More often, they ask whether a perturbation, treatment, or disease state creates a change that has not been observed before. In that case, the most interesting cells may be precisely the ones that do not fit cleanly into the reference. Conventional annotation pipelines often treat this ambiguity as noise or as a low-confidence label.

AnnQ was developed to capture these ambiguous moments. Instead of using reference-based annotation probabilities only to assign a cell type, AnnQ asks how stable the cell identity is and how far the cell appears to move away from the reference. It classifies cells into uncertainty states such as G0, G1, G2, and G3, while also estimating out-of-reference scores. The key point is that AnnQ can reveal subtle lineage-level shifts even when no clearly separated new cluster appears.

For example, in a Fezf2 perturbation setting, a distinct new cluster may not emerge. However, if G1 increases within a specific neuronal lineage and the OOR tail expands, we can begin to say that the identity of those cells is becoming unstable. In cancer datasets, even malignant cells that are forcibly annotated against a normal reference can be examined through G1 and OOR shifts, allowing us to trace drug-tolerant persister states, EMT-like transitions, or metastatic precursor states.

This AnnQ paper is a short methods paper. I see many opportunities to apply this framework to experimental and patient-derived datasets, and it continues to generate unusual and interesting ideas for us. This work was led by Davin Lee and Gaeun Byeon. I am grateful to them for trusting an unusual idea from their PI and turning it into a working method. I look forward to seeing where this line of thinking takes us next, especially in the context of virtual cells and perturbation biology.
