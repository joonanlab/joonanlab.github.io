---
title: "Karpathy's LLM-Wiki and Research in the Age of Agents"
date: "2026-04-06"
summary: "RAG vs LLM-Wiki, and reflections from Karpathy's talk on the direction of biology research in the agentic era. From information retrieval to knowledge construction, from coding to orchestration."
tags: ["LLM", "RAG", "knowledge-management", "agentic-AI", "biology"]
lang: "en"
category: "Essay"
---

I was preparing for tomorrow's graduate lecture, organizing materials on how students should read and organize papers, and by extension, how to use RAG systems. I had been building a simple RAG pipeline myself, exploring different ways to collect literature and structure it for retrieval. Then, over the weekend, Karpathy shared an idea called [LLM-Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Once again, he set the weekend on fire.

Just a few months ago, building RAG systems with Obsidian was getting considerable attention. Embedding personal collections of papers, notes, and code, then connecting them to an LLM for question-answering — this approach was clearly practical. A related study even appeared in Nature, lending it the air of an established methodology. When you build one yourself, it is genuinely convenient. It quickly retrieves relevant information and generates answers based on your accumulated materials.

## The Limits of RAG

But once you actually build and use one, it does not feel particularly useful. The retrieval works well, but thinking does not flow the way you expect. RAG is fundamentally a "system that retrieves related materials well." But what researchers actually need is not simple retrieval — it is closer to understanding relationships between materials, building context, and organizing importance by your own criteria. Some RAG practitioners say this is achievable. But what distinguishes researchers is that the structuring and connecting of knowledge and questions is deeply personalized.

For researchers, this difference is larger than it might seem. A researcher — especially one who has completed a PhD — carries a knowledge structure built over many years. It includes which papers matter, what results are meaningful in what context, and what is not particularly important. When you bundle new materials through RAG, the result often exists as a separate layer rather than naturally connecting to this existing structure. Sometimes it conflicts, or information you do not consider important keeps surfacing. Ultimately, the problem is not retrieval performance but how knowledge is structured.

## LLM-Wiki: A Different Approach

This is where LLM-Wiki diverges. Instead of focusing on finding materials well, it delegates the process of reading, organizing, and connecting materials to the LLM. Rather than simply storing papers or notes, it breaks them into concept-level documents, links them together, and gradually builds a wiki. When you ask questions, you are not re-searching scattered materials — you are generating answers atop an already-formed structure. The process of asking and answering is guided by human flow. I spent the weekend trying it, and the reason it felt far more natural than conventional RAG is probably this.

## Information Retrieval Systems vs Knowledge-Building Systems

Ultimately, this distinction is close to the difference between "a system that finds information" and "a system that builds knowledge." And this connects directly to university and graduate education. Graduate training is not just about reading many papers. It is about learning to generate your own questions, explore literature around those questions, and connect disparate results into a coherent framework. This is not a task with right answers — it is a deeply personal endeavor shaped by each individual's questions and experiences. From this perspective, approaches like LLM-Wiki are quite interesting. If the process of students repeatedly reading and organizing papers accumulates not as mere notes but as increasingly structured knowledge, they gain an environment where they can externally observe and refine their own thinking. Perhaps this is where we will find answers.

---

## Karpathy's Talk: From Coding to Orchestration

Karpathy's talk went up on YouTube. Many readers of this post are probably spending sleepless nights with his [autoresearch](https://github.com/karpathy/autoresearch). I am too. With tools like Agentic Kit and Claw emerging, these are truly exhilarating days. Here are some thoughts on his talk.

The first thing that struck me while listening was that what is changing is not just the tools — it is the layer at which humans participate. Karpathy says the word "coding" no longer applies to what he does. Instead, he spends 16 hours a day expressing his will to agents. This expression was intriguing. It may sound exaggerated at first, but on reflection it is precise. What matters now is not just the ability to implement by hand, but the ability to define objectives, set constraints, embed context, run multiple agents in parallel, evaluate their outputs, and readjust direction.

His use of "manifesting" is not mystical "law of attraction." It is the opposite. It is closer to structuring intent so that a desired outcome can emerge in reality, and designing the loop that makes it happen. Not building things directly, but making things get built. He showed very clearly the scene of the implementer becoming supervisor, designer, editor, orchestrator.

## Already Reality in Software

This shift already looks quite real in software. Karpathy talks about delegating to multiple agents by feature, research, and planning units instead of typing code line by line. One agent writes code, another does research, yet another builds implementation plans. The human moves between them, setting direction, checking quality, ensuring nothing conflicts. He even aims to remove himself from the loop — to set things up once and let them run autonomously for extended periods. This is not simple automation. It looks like the basic interface of research and production is changing.

## What About Biology Research?

A problem I have long felt in biology research is that not all topics fit inside such a loop. Topics that cannot enter the loop are difficult to scale. They lack throughput. If the loop of hypothesis, experiment, measurement, judgment, and next hypothesis does not close cleanly, the research remains bound by human intuition, tacit knowledge, waiting, and interpretive ambiguity. Biology is particularly prone to this. Measurements are slow and expensive, judgment functions are fuzzy, sample preparation carries heavy tacit knowledge, and failures often do not become structured data. This is why the "agent loop" that works in software does not close easily in biology.

I think this difference will become even more important. Research that scales going forward will likely involve not just important topics, but important topics that can be loopified. The ability to translate an idea into a repeatable experiment-judgment loop may matter more than the quality of the idea itself.

## Confirmation Bias in the Age of Agents

There is one more thing to consider in this context. Even with high-throughput technology, the approach of adjusting analysis conditions until desired results appear — rather than letting data revise the hypothesis — has always existed. But in the age of agents, this problem becomes much larger. With agents, confirmation bias can become the objective function. Give the system a target outcome, and it can endlessly explore by changing cohorts, covariates, batch corrections, subgroups, and pathway-level detours. Confirmation bias gets automated and parallelized.

The biggest takeaway from this talk, for me, is that what matters going forward is not the total volume of analytical capability but the discipline of handling evidence. What the age of agents demands is not "the ability to run more" but the ability to lock down what should and should not be run before anything starts. Define questions in advance, set success and falsification criteria, separate discovery analyses from confirmatory analyses, leave provenance for every exploration path, and close conclusions with independent data, perturbations, or evidence from different layers.

## Research That Enters the Loop, and Research That Stays Outside

I believe biology's paradigm can shift here. Not toward a single result destined for a paper, but toward a continuously running experiment-judgment loop as the basic unit of research. Stronger labs will not be those that produce the cleverest interpretations, but those that design the hypothesis-experiment-measurement-judgment loop faster and more rigorously.

And this change will not arrive uniformly across all of biology. Fields with standardizable perturbations, measurable phenotypes, automatable assays, and designable surrogate metrics will absorb this change first. Fields where judgment is ambiguous and physical preparation carries heavy tacit knowledge will move much more slowly.

What I felt while listening to Karpathy's talk was neither pure optimism nor pessimism. It was closer to my questions becoming sharper. The important question now is not "will AI replace humans" but "which tasks enter the loop, and which tasks ultimately remain outside it." In biology, many of the truly important problems sit right on that boundary.

Ultimately, the researcher of the future will need to do two things simultaneously. One is to hold on to the truly important questions in their field. The other is to translate those questions into loops that machines can run. The former remains squarely in the human domain. The latter will increasingly become the decisive competitive advantage. Strong research of the future will not come from good ideas alone. It will come from the ability to transform good ideas into emergent loops.
