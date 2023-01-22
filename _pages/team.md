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

## Diversity, Equity, Inclusion

We are committed to dismantling structural racism within the sciences and the establishment of an inclusive environment in which every team member can thrive. 

Our core values are equity, innovation, and open science principles.

*Equity* in our thoughts and actions arises from fair access to opportunities and resources. Recognizing that educational and research environments are often unwelcoming, unjust, and unequal, we are committed to improving this situation through the cultivation of a climate of mutual respect and the promotion of autonomy within the context of a collaborative and supportive team. As mentors, we are dedicated to understanding the unique needs of each team member and imparting scientific leadership skills to aid in their future success.

Innovation is fundamental to our practice. We pursue to pioneer scientific databases, novel statistical models, and bioinformatics algorithms. We actively collaborate with technology developers and disease specialists to optimize the breadth and depth of expertise applied to our bioinformatics methodologies. We actively seek out individuals who possess a creative problem-solving mindset and diverse experiences to enhance and invigorate our team. All team members have opportunities to expand their statistical knowledge, work with a wider range of data, develop open-source software, and improve their communication and collaboration skills.

Open science, as we understand it, encompasses a range of practices such as open-source code development and open access data sharing, as well as actively engaging in the transformation of outdated paradigms in the realms of education, research, and publishing. Our ultimate goal is to enhance efficiency and reproducibility in scientific research. Our team boasts a distinguished history of open-source software development that encourages inclusive, international collaboration and educational opportunities. We design and develop statistical models that integrate data from the public domain and emerging technologies. We view open science practices as a crucial means of increasing accessibility and participation in academic research and discovery.



---