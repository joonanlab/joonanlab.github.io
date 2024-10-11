---
title: "An Lab - Team"
layout: teamgrid
excerpt: "An Lab: Team members"
sitemap: false
permalink: /team/
---

# Meet the Team

Please click the name below for the lab member's profile.

---

## Principal Investigator

{% assign number_printed = 0 %}
{% for member in site.data.team_members %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if member.group == 0 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4><a href="{{ member.url }}" class="off">{{ member.name }}</a></h4>
  <i>{{ member.info }}</i>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

---


## Doban (Trainee)

<details><summary> What is "Doban"? </summary>

In our lab, we work as scientific companions on a shared journey of discovery, innovation, and intellectual growth. A term that captures this spirit well is "도반" (道伴, doban), drawn from Korean and Buddhist traditions, meaning a "spiritual companion" or "fellow practitioner." While rooted in spiritual contexts, doban represents those who walk together on a path of mutual support, learning, and pursuit of higher goals. In our lab, this idea translates into the collaborative efforts we engage in, where each of us acts as a doban, contributing to and growing from our collective progress in science.

도반 (道伴)은 한국 불교 전통에서 유래된 용어로, '영적인 동반자' 또는 '수행의 동반자'를 의미합니다. 도반은 본래 영적인 맥락에서 쓰이지만, 서로가 지원하고 배움을 나누며 더 높은 목표를 향해 함께 나아가는 사람들을 뜻합니다. 우리 연구실에서는 새로운 발견과 혁신, 그리고 지적 성장을 위한 여정에 함께하는 과학적 동반자로서 일하고 있습니다. 이 도반의 개념이 협력적인 연구 활동에 그대로 적용되며, 각자가 도반으로서 과학적 진보에 기여하고 함께 성장하는 과정을 중요하게 생각합니다.

</details>


{% assign number_printed = 0 %}
{% for member in site.data.team_members %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if member.group == 1 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4><a href="{{ member.url }}" class="off">{{ member.name }}</a></h4>
  <i>{{ member.info }}</i>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

---

## Genomic Core


{% assign number_printed = 0 %}
{% for member in site.data.team_members %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if member.group == 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4><a href="{{ member.url }}" class="off">{{ member.name }}</a></h4>
  <i>{{ member.info }}</i>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

---

## Undergraduate Intern


{% assign number_printed = 0 %}
{% for member in site.data.team_members %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if member.group == 3 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4><a href="{{ member.url }}" class="off">{{ member.name }}</a></h4>
  <i>{{ member.info }}</i>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

---

## Alumni

Curious to see where our former team members are now? Click [here](alumni) to explore our esteemed alumni and discover their current affiliations. 

---

## Equity, Diversity and Inclusion

We commit to dismantling structural inequalities and disparities within the sciences and the establishment of an inclusive environment in which every team member can thrive. 

Our **core values** are diversity and open science. 

**Diversity** 

Diversity and inclusion are essential for scientific progress and innovation. Systemic barriers have historically excluded marginalized groups from science or scientific communities. Our goal is to create a scientific community that is truly representative of society as a whole, where all individuals have an equal opportunity to contribute to and benefit from scientific progress. We support and actively participate in [eLife's Ben Barress Awards](https://elifesciences.org/inside-elife/a3c31ce7/ben-barres-spotlight-awards-applications-open-for-2022).

**Open science**

Open science is fundamental to morden science, making scientific knowledge openly and practically available in order to accelerate discovery, innovation and clinical translation ([McKiernan et al. 2016](https://elifesciences.org/articles/16800)). We aim to make our data, methods, and results openly available and actively engaging in collaborative and inclusive practices. We call on our colleagues to join us in this commitment, and together we can create a more efficient and effective scientific community. 



---