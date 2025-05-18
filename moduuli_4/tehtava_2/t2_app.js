'use strict';

document.getElementById('searchForm').addEventListener('submit', async function (evt) {
  evt.preventDefault();

  const query = document.getElementById('query').value;
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Verkkovirhe');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe haussa:', error);
  }
});