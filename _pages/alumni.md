---
title: "An Lab - Team"
layout: teamgrid
excerpt: "An Lab: Alumni"
sitemap: false
permalink: /team/
---

# Alumni

{% for member in site.data.team_members %}
{% if member.group == 8 %}

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

