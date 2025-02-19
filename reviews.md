---
title: "Book Reviews"
layout: "layout.njk"
pagination:
  data: collections.reviews
  size: 12
  alias: review
permalink: "
  {%- if pagination.pageNumber == 0 %}reviews/
  {%- else %}reviews/{{ pagination.pageNumber + 1 }}/
  {%- endif %}"
---
<div class="review-heading">
  <h3>Reviews by post date</h3>
  <div class="review-heading__options">
    <a class="active" href="/reviews/">Post date</a>
    <a href="/reviews-title/">Title</a>
    <a href="/reviews-author/">Author</a>
  </div>
</div>

<div class="review-list">
  {%- for review in pagination.items %}
    {% include "blocks/book-entry.njk" %}
  {%- endfor %}
</div>
{% include "blocks/pagination.njk" %}