---
title: "AlphaGenome, DNA Foundation Models, and ISM"
date: "2026-02-03"
summary: "What in silico mutagenesis (ISM) is, why it matters, and what it means in the context of DNA foundation models."
tags: ["AlphaGenome", "ISM", "foundation-model", "genomics"]
lang: "en"
---

You need to understand AlphaGenome ([Cheng et al. 2025, Nature](https://doi.org/10.1038/s41586-025-10014-0)), DNA foundation models, and ISM (in silico mutagenesis).

## What Is ISM?

ISM refers to the method of systematically substituting each position in a reference sequence with every other possible base, one at a time, and computing how each change affects the model's output. It is the computational equivalent of creating genetic variants one by one in an actual experiment and measuring functional changes.

In DNA foundation models, ISM is the most representative downstream task. Foundation models take DNA sequences as input and predict diverse molecular properties such as transcript expression, chromatin accessibility, and transcription factor binding. ISM holds these predictions fixed, then computes how much the output changes when a specific base is altered. It is essentially a process of revealing, one by one, which base positions the model is "reading" as important.

This approach is particularly critical for interpreting noncoding variants. Because noncoding variants do not alter protein sequences, their functional impact is not intuitively obvious. ISM directly shows whether such variants strengthen or weaken signals within regulatory elements. If changing a single base substantially reduces predicted enhancer activity or disrupts a transcription factor binding pattern, that variant is likely located at a functionally important position.

## Why Is ISM Important in AlphaGenome and DNA Foundation Models?

The DNA of one person is very similar to another's, but some parts differ. Even though we call it "some," the number of differences amounts to 3 to 5 million. African populations have somewhat more; non-African populations who migrated out of Africa and settled elsewhere have around 3 million (varying by genetic pool). In a genome of 3 billion bases, even a fraction of a percent difference adds up to an enormous number of variants.

In molecular biology, which developed from Mendelian genetics, researchers studied one variant and one gene at a time. Disease mechanisms and biological principles were uncovered that way. But in humans, most traits are not determined by a single gene. Most traits are quantitative, shaped by the cumulative contributions of numerous variants. So when studying a single disease, a vast number of variants and genes emerge.

To experimentally validate all of these in a classical molecular biology lab would take centuries. This is not to diminish that effort. Classical biologists select the most plausible hypothesis and devote decades to it. That is how biology textbooks grew thick. Some hypotheses turn out to be right, others wrong. Some lead to drugs, others fail. And still, in reality, far more hypotheses — genes and variants in astronomical numbers — remain untested.

## What If We Could "Predict as If We Had Experimented" Without Actually Experimenting?

Build a foundation model from accumulated data, make predictions, then experiment on those predictions. Research is shifting toward this kind of loop, and AlphaGenome and other foundation models accelerate it.

Returning to ISM: it tests millions of variants — millions of potential hypotheses. Without culturing neurons with inserted variants, without growing cancer cells with mutations, without measuring gene expression levels, without assaying chromatin regulation, it extracts predicted information much like asking ChatGPT a question. Is it accurate? It is not. Will it become accurate? And in what way?

## Where Is ISM Ultimately Headed?

Several foreseeable futures exist. Beyond simply identifying drug candidates, ISM can be applied to disease prediction and various forms of patient stratification. A variant takes a single form, but it plays diverse roles across development and adaptation.
