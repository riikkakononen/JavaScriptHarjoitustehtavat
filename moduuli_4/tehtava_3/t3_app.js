'use strict';

document.getElementById('searchForm').addEventListener('submit', async function (evt) {
  evt.preventDefault();

  const query = document.getElementById('query').value;
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // tyhjennetään vanhat tulokset

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Verkkovirhe');
    const data = await response.json();

    data.forEach(tvShow => {
      const show = tvShow.show;

      const article = document.createElement('article');

      const h2 = document.createElement('h2');
      h2.textContent = show.name;

      const link = document.createElement('a');
      link.href = show.url;
      link.textContent = 'More details';
      link.target = '_blank';

      const img = document.createElement('img');
      if (show.image?.medium) {
        img.src = show.image.medium;
        img.alt = show.name;
      }

      const summary = document.createElement('div');
      summary.innerHTML = show.summary || 'No summary available.';

      article.appendChild(h2);
      article.appendChild(link);
      if (show.image?.medium) article.appendChild(img);
      article.appendChild(summary);

      resultsDiv.appendChild(article);
    });

  } catch (error) {
    console.error('Virhe haussa:', error);
  }
});
