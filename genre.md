---
layout: "layout.njk"
pagination:
  data: collections
  size: 1
  alias: genre
  filter:
    - all
    - reviews
    - navigation
permalink: /genres/{{ genre | slugify }}/index.html
eleventyComputed:
  title: Books in {{ genre }}
hideGenres: true
---
### Tagged "{{ genre }}"
<div class="review-list">
  {%- for review in collections[genre] %}
    {% include "blocks/book-entry.njk" %}
  {%- endfor %}
</div>