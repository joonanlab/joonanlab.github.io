---
title: "An Lab - Alumni"
layout: teamgrid
excerpt: "An Lab: Alumni"
sitemap: false
permalink: /team/alumni/
---

# Alumni

Find out where our alumni have landed and get inspired by their diverse paths and achievements.

---

## Graduate Students

{% for member in site.data.team_members %}
{% if member.group == 1 %}

<i class="alumni1">{{ member.name }}</i> <i class="alumni2">{{ member.info }} ({{ member.year }})</i> 
{% if member.thesis %} 
<i class="alumni2">Thesis: {{ member.thesis }}</i>
{% endif %}

{% if member.current %} 
<i class="alumni2">Current: {{ member.current }}</i>

{% endif %}
{% endif %}

{% endfor %}

---

## Research Assistant

{% for member in site.data.team_members %}
{% if member.group == 2 %}

<i class="alumni1">{{ member.name }}</i> <i class="alumni2">{{ member.info }} ({{ member.year }})</i> 
{% if member.thesis %} 
<i class="alumni2">Thesis: {{ member.thesis }}</i>
{% endif %}

{% if member.current %} 
<i class="alumni2">Current: {{ member.current }}</i>

{% endif %}
{% endif %}

{% endfor %}

---


## Undergraduate interns

{% for member in site.data.team_members %}
{% if member.group == 3 %}

<i class="alumni1">{{ member.name }}</i> <i class="alumni2">{{ member.info }} ({{ member.year }})</i> 
{% if member.thesis %} 
<i class="alumni2">Thesis: {{ member.thesis }}</i>
{% endif %}

{% if member.current %} 
<i class="alumni2">Current: {{ member.current }}</i>

{% endif %}
{% endif %}

{% endfor %}

---

