---
title: "Using LLM-Wiki to Mentor Lab Students"
date: "2026-04-14"
summary: "A few ways to connect Karpathy's LLM-Wiki with lab mentoring and teaching — building a shared knowledge base, absorbing student questions, and preparing for meetings."
tags: ["LLM", "knowledge-management", "mentoring", "teaching", "Claude"]
lang: "en"
category: "Lab Notes"
---

LLM-Wiki has brought back the pure joy of studying. It reminds me of my first days as a graduate student, filling Endnote entries as I worked through paper after paper. After spending some time with this approach, I want to share what I have noticed.

## What It Means to Build a Wiki

LLM-Wiki is not simply a tool for reading and summarizing papers. The idea is that each time you ask a question or organize a concept after reading, a wiki page is generated. The act itself is not so different from everyday ChatGPT use — the decisive difference is the source. The grounding material is literature you have personally selected, read, and deemed important to your own research context.

I will be honest with anyone just starting out: building the initial knowledge base and generating good questions takes a considerable amount of time. But once you get past that first stretch, what follows is a completely different kind of pleasure.

## How I Now Write Textbooks

I have been working on a few papers related to single-cell foundation models recently. This is a domain I was genuinely learning from scratch. Over the past year I put in a lot of work — producing lecture materials and writing a textbook — and all of that now lives inside my LLM-Wiki as I continue.

At some point it struck me: I could use this knowledge base to write a textbook specifically for my lab students. So I pulled up past conversations and email threads with students, mapped out where they tend to get stuck and what confuses them most, and organized that into a textbook-style document. For now it lives on Notion — since this is active, ongoing work in the lab, Notion fits better. Eventually it will go up on chaek as well.

## How Students Connect

Students can read the textbook on Notion and leave comments whenever a question comes up. Going one step further, they can pull the textbook content via the Notion API into their own LLM-Wiki and connect it to their research. Any concept they need while writing a paper or running an analysis can be handled on top of their own knowledge base.

When Gmail is connected to Claude Code, emails students send about papers or analysis results can be brought in via MCP and read alongside LLM-Wiki. When there is feedback on a manuscript or results, that feedback gets organized and written back to Notion via the API. The inbox stops being a place where conversations get buried and becomes an input channel that feeds the knowledge base.

## Meetings Become Different

I also use LLM-Wiki before meeting with collaborating groups. I read their recent papers in advance, organize them in LLM-Wiki, and write out how their work might connect with the research directions we have been developing. The meeting materials are ready before I walk in, and the conversation runs at a much higher density.

## The One Drawback, and How to Handle It

If LLM-Wiki has a single weakness, it is bias. Because the system is grounded in literature and questions the user has selected, knowledge accumulates in particular directions. So when organizing the wiki, I periodically go back to the original texts, and I explicitly ask Claude whether there are topics it has not been able to address. I also check whether any of the cited references need to be supplemented. Claude typically responds along the lines of "if you have a paper on this, I can take a look" — and that opens up a shared reading session.

To give a concrete example: when studying noncoding variants, I tend to prefer the categorical approach I have published on over TAD-based (3D chromatin structure) methods. Because my materials reflect my own reading history, LLM-Wiki does not naturally mine TAD-related knowledge very deeply for noncoding variants. But I know exactly where that bias comes from. And I can point it out directly to Claude and keep the conversation going from there. The goal is not to eliminate bias but to know it and work with it.

## LLM-Wiki Is Not a Push-Button Tool

This is the most important point. LLM-Wiki is not a magic solution. The user has to ask enough questions, and then read and absorb the answers and organized results that come back. Just as an AI's answer does not automatically become your own knowledge, neither does this process. For a researcher, this actually means studying more — and the tool grows alongside the expansion of your own knowledge system.

There is also a practical issue as the number of wiki pages grows: Claude's grep-based search starts to weaken. Karpathy himself recommended tools like [qmd](https://github.com/tobi/qmd) for this, and I have been thoroughly satisfied with it.

## The Same Approach in Undergraduate Teaching

I use LLM-Wiki in my undergraduate courses as well. The textbook I use in class is loaded into LLM-Wiki. When students post questions on Slack — my courses take questions via Slack 24 hours a day, seven days a week — I bring those questions in via Claude MCP and draft answers grounded in LLM-Wiki. Each student question then gets folded back into the wiki, and the wiki gradually becomes more precisely calibrated to the course context.

There is one amusing side effect. The answers I send back to students have a certain unmistakable Claude quality to them. The fix is straightforward: just talk like Claude in real life too. "I have found sufficient information and will now compose a response" — that sort of thing.
