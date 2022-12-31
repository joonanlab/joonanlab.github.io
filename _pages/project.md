---
title: "An Lab - Project"
layout: gridlay
excerpt: "An Lab -- Project."
sitemap: false
permalink: /project/
---

# Featured Publications

---

{% assign number_printed = 0 %}
{% for publi in site.data.publist %}

{% if publi.highlight == 1 %}

<div class="row">

<div class="col-sm-12">
 	<img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="20%" style="float: left" />
  <p><a class="pub1" href="{{ publi.link.url }}">{{ publi.title }}</a></p>
  <p><a class="pub2"> {{ publi.authors }} </a></p>
  <a class="pub2"> {{ publi.link.display }} </a>
</div>

</div>

{% endif %}

{% endfor %}



<p> &nbsp; </p>

---

<div>
## Full List




For a full list, please go to <a class="regtext" href="https://scholar.google.com/citations?user=eTLI6dsAAAAJ&hl=en">Google Scholar</a>.
<br><br><br>

</div>
