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


## Trainee


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

## Genomics Core


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

## Visitor


{% for member in site.data.team_members %}
{% if member.group == 5 %}

<i class="alumni1">{{ member.name }}</i> <i class="alumni2">{{ member.info }} {% if member.current %} 
{% endif %}
{% endif %}

{% endfor %}

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