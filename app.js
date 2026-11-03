import { copy, stories } from './stories.js';

const select = selector => document.querySelector(selector);
const search = select('#search');
const languageButton = select('#language');
const dialog = select('#story');
const filters = select('#filters');
const cards = select('#cards');
const pins = select('#pins');
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh';
let category = 'all';
let openStoryId = null;

function filteredStories() {
  const query = search.value.trim().normalize('NFKC').toLowerCase();
  return stories.filter(story => {
    const text = [story.zh.title, story.en.title, story.zh.area, story.en.area, story[language].summary,
      copy.zh[story.category], copy.en[story.category]].join(' ').normalize('NFKC').toLowerCase();
    return (category === 'all' || story.category === category) && text.includes(query);
  });
}

function renderArchive() {
  const labels = copy[language];
  const matches = filteredStories();
  select('#result-count').textContent = labels.count(matches.length);
  cards.innerHTML = matches.map(story => {
    const detail = story[language];
    return `<article class="story-card ${story.category}">
      <div class="card-top"><span>${labels[story.category]}</span><span>${story.number}</span></div>
      <p class="area">${detail.area}</p>
      <h3><a href="#story/${story.id}">${detail.title}</a></h3>
      <p>${detail.summary}</p>
      <a class="read" href="#story/${story.id}" aria-label="${labels.read} · ${detail.title}">${labels.read} <span aria-hidden="true">↗</span></a>
    </article>`;
  }).join('');
}

function renderInterface() {
  const labels = copy[language];
  document.documentElement.lang = language === 'zh' ? 'zh-Hant-HK' : 'en';
  document.querySelectorAll('[data-copy]').forEach(node => {
    node.textContent = labels[node.dataset.copy];
  });
  select('nav').setAttribute('aria-label', labels.navLabel);
  filters.setAttribute('aria-label', labels.filters);
  search.placeholder = labels.placeholder;
  languageButton.textContent = language === 'zh' ? 'EN' : '繁中';
  languageButton.lang = language === 'zh' ? 'en' : 'zh-Hant-HK';
  languageButton.setAttribute('aria-label', language === 'zh' ? 'Read in English' : '切換繁體中文');
  select('#template').href = `./assets/story-template-${language}.txt`;

  const categories = ['all', ...new Set(stories.map(story => story.category))];
  filters.innerHTML = categories.map(key =>
    `<button type="button" data-category="${key}" aria-pressed="${key === category}">${labels[key]}</button>`
  ).join('');
  pins.innerHTML = stories.map(story =>
    `<a class="pin" href="#story/${story.id}" style="--x:${story.position[0]}%;--y:${story.position[1]}%" aria-label="${story.number} · ${story[language].title}">${story.number}</a>`
  ).join('');
  renderArchive();
}

function renderStory() {
  const story = stories.find(item => location.hash === `#story/${item.id}`);
  if (!story) {
    if (dialog.open) dialog.close();
    return;
  }
  const labels = copy[language];
  const detail = story[language];
  openStoryId = story.id;
  select('#story-content').innerHTML = `
    <p class="eyebrow"><span></span>${story.number} / ${labels.sample}</p>
    <p class="area">${detail.area} · ${labels[story.category]}</p>
    <h2 id="story-title">${detail.title}</h2>
    <p class="story-summary">${detail.summary}</p>
    <p>${detail.body}</p>
    <section class="evidence"><h3>${labels.source}</h3>
      <p>${detail.sourceLabel}</p><a href="${story.source}">${detail.citation} ↗</a>
    </section>
    <section class="evidence"><h3>${labels.note}</h3><p>${detail.note}</p></section>`;
  if (!dialog.open) dialog.showModal();
}

languageButton.addEventListener('click', () => {
  language = language === 'zh' ? 'en' : 'zh';
  const url = new URL(location.href);
  if (language === 'en') url.searchParams.set('lang', 'en');
  else url.searchParams.delete('lang');
  history.replaceState(null, '', url);
  renderInterface();
});

filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  category = button.dataset.category;
  filters.querySelectorAll('button').forEach(item => {
    item.setAttribute('aria-pressed', String(item === button));
  });
  renderArchive();
});

search.addEventListener('input', renderArchive);
window.addEventListener('hashchange', renderStory);
dialog.addEventListener('close', () => {
  if (location.hash === `#story/${openStoryId}`) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  openStoryId = null;
});
renderInterface();
renderStory();
