import { copy, stories } from './stories.js?v=20261117-map2';
import { publicLocation, matchingStories, escapeHtml as e, safeUrl } from './map-data.js?v=20261117-map2';
import { mapConfig } from './map-config.js?v=20261117-map2';
const $ = s => document.querySelector(s);
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh';
let category = 'all', map, markers, tiles, tileFailed = false, mapTimer;
const zh = () => language === 'zh';
const text = (a,b) => zh() ? a : b;
const locationLabel = s => publicLocation(s) ? text('位置已核實','Verified location') : text('位置待核實／不公開精確位置','Location unverified / exact location not public');
const matches = () => matchingStories(stories, copy, language, category, $('#search').value);
let homeState = { source: '#stories', scroll: 0 };

function renderArchive() {
  const labels = copy[language], list = matches();
  $('#result-count').textContent = labels.count(list.length);
  $('#cards').innerHTML = list.map(s => `<article class="story-card ${e(s.category)}">
    <div class="card-top"><span>${e(labels[s.category])}</span><span>${e(s.number)}</span></div>
    <p class="area">${e(s[language].area)}</p><h3><a href="#story/${encodeURIComponent(s.id)}">${e(s[language].title)}</a></h3>
    <p>${e(s[language].summary)}</p><p class="location-status">${e(locationLabel(s))}</p>
    <a class="read" href="#story/${encodeURIComponent(s.id)}">${e(labels.read)} ↗</a></article>`).join('');
  renderMarkers();
}
function mapStatus() {
  const all = stories.filter(publicLocation).length;
  const matching = matches().filter(publicLocation).length;
  $('#map-status').textContent = !map || tileFailed
    ? text('地圖暫時無法完整載入。仍可從下方列表閱讀故事。','Map is temporarily unavailable or incomplete. Read stories in the list below.')
    : all ? text(`地圖有 ${all} 個已核實位置；${matching} 個符合目前搜尋／分類。`, `${all} verified locations; ${matching} match the current search / category.`)
      : text('現有故事位置尚待核實，暫不放置標記。請從下方列表閱讀。','Story locations are not yet verified. No markers are shown; use the list below.');
  $('#map-retry').hidden = !!map && !tileFailed;
}
function renderMarkers() {
  if (!map) return;
  markers.clearLayers();
  const matched = new Set(matches().map(s => s.id));
  // Keep all public places accessible as required by the brief. Search highlights matches.
  stories.forEach(s => {
    const p = publicLocation(s); if (!p) return;
    const marker = L.marker([p.lat,p.lng], {
      title: s[language].title, alt: s[language].title, keyboard: true,
      icon: L.divIcon({className: `story-marker${matched.has(s.id) ? '' : ' is-muted'}`,
        html: `<span>${e(s.number)}</span>`, iconSize:[36,36],iconAnchor:[18,18]})
    }).addTo(markers);
    marker.on('click', () => { rememberHome('#map'); location.hash = `story/${encodeURIComponent(s.id)}`; });
  });
  mapStatus();
}
function initMap() {
  clearTimeout(mapTimer);
  if (!window.L) { mapStatus(); return; }
  if (map) { map.remove(); map = null; }
  try {
    tileFailed = false;
    map = L.map('interactive-map', {scrollWheelZoom:false}).setView(mapConfig.center,mapConfig.zoom);
    markers = L.layerGroup().addTo(map);
    tiles = L.tileLayer(mapConfig.tileUrl,{maxZoom:mapConfig.maxZoom, attribution:mapConfig.attribution});
    tiles.on('tileerror', () => { tileFailed = true; mapStatus(); });
    tiles.on('load', () => { clearTimeout(mapTimer); mapStatus(); });
    tiles.addTo(map);
    mapTimer = setTimeout(() => { if (tiles.isLoading()) { tileFailed = true; mapStatus(); } },10000);
    renderMarkers();
  } catch { if (map) map.remove(); map = null; mapStatus(); }
}
function rememberHome(source) {
  homeState = {source,scroll:window.scrollY};
  history.replaceState({...history.state, home:homeState},'',location.href);
}
function renderInterface() {
  const labels = copy[language];
  document.documentElement.lang = zh() ? 'zh-Hant-HK' : 'en';
  document.querySelectorAll('[data-copy]').forEach(n => { n.textContent = labels[n.dataset.copy]; });
  $('nav').setAttribute('aria-label', labels.navLabel);
  $('#filters').setAttribute('aria-label', labels.filters);
  $('#search').placeholder = labels.placeholder;
  $('#language').textContent = zh() ? 'EN' : '繁中';
  $('#language').setAttribute('aria-label',zh() ? 'Read in English' : '切換繁體中文');
  $('#language').lang = zh() ? 'en' : 'zh-Hant-HK';
  $('#template').href = `./assets/story-template-${language}.txt`;
  $('#interactive-map').setAttribute('aria-label',text('香港故事地圖，可用方向鍵移動及加減鍵縮放','Hong Kong story map. Use arrow keys to pan and plus/minus to zoom.'));
  $('#map-retry').textContent = text('重新載入地圖','Reload map');
  $('#filters').innerHTML = ['all',...new Set(stories.map(s=>s.category))].map(c=>`<button type="button" data-category="${e(c)}" aria-pressed="${c===category}">${e(labels[c] || c)}</button>`).join('');
  renderArchive(); mapStatus();
}
function renderRoute({focus=false}={}) {
  const detail = location.hash.startsWith('#story/');
  $('#home-view').hidden = detail; $('#detail-view').hidden = !detail;
  if (!detail) {
    map?.invalidateSize();
    if (history.state?.home) homeState = history.state.home;
    return;
  }
  let id; try {id = decodeURIComponent(location.hash.slice(7));} catch {id = '';}
  const s = stories.find(s=>s.id===id), labels=copy[language];
  if (!s) $('#detail-view').innerHTML = `<h1>${text('找不到這個故事','Story not found')}</h1><p>${text('此地點可能已下架或連結有誤。','This location may have been removed, or the link is incorrect.')}</p><a href="#stories">${text('返回故事檔案','Back to stories')}</a>`;
  else {
    const d=s[language], p=publicLocation(s);
    const route = p ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${p.lat},${p.lng}`)}` : null;
    $('#detail-view').innerHTML=`<a id="detail-back" href="${e(homeState.source)}">← ${homeState.source==='#map' ? text('返回地圖','Back to map') : text('返回故事檔案','Back to stories')}</a>
      <p class="eyebrow">${e(s.number)} / ${e(labels.sample)}</p><p class="area">${e(d.area)} · ${e(labels[s.category])}</p>
      <h1>${e(d.title)}</h1><p class="story-summary">${e(d.summary)}</p>
      <section class="evidence"><h2>${text('位置與到訪','Location and visiting')}</h2><p>${e(locationLabel(s))}</p>
      ${p ? `<p>${e(p.lat)}, ${e(p.lng)} · ${text('核實日期','Verified')}: ${e(p.verifiedAt)}</p><a href="${e(route)}" target="_blank" rel="noopener">${text('查看前往路線','Get directions')} ↗</a><p><a href="${e(safeUrl(p.source))}">${text('位置資料來源','Location source')}</a></p>` : `<p>${text('不提供未核實的導航目的地。','No unverified navigation destination is provided.')}</p>`}</section>
      <section class="evidence"><h2>${text('地方故事','The story')}</h2><p>${e(d.body)}</p></section>
      <section class="evidence"><h2>${e(labels.source)}</h2><p>${e(d.sourceLabel)}</p><a href="${e(safeUrl(s.source))}">${e(d.citation)} ↗</a></section>
      <section class="evidence"><h2>${e(labels.note)}</h2><p>${e(d.note)}</p></section>`;
  }
  if (focus) { $('#detail-view').focus({preventScroll:true}); window.scrollTo(0,0); }
}
$('#language').addEventListener('click',()=> {
  language=zh()?'en':'zh'; const u=new URL(location.href);
  if(language==='en') u.searchParams.set('lang','en'); else u.searchParams.delete('lang');
  history.replaceState(history.state,'',u);renderInterface();renderRoute();
});
$('#filters').addEventListener('click',ev=>{const b=ev.target.closest('[data-category]');if(!b)return;category=b.dataset.category;renderInterface();});
$('#search').addEventListener('input',renderArchive);
$('#map-retry').addEventListener('click',()=>{ if (!window.L) location.reload(); else initMap(); });
document.addEventListener('click',ev=>{
 const a=ev.target.closest('a');if(!a || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey)return;
 if(a.getAttribute('href')?.startsWith('#story/') && !$('#home-view').hidden) rememberHome(a.closest('#map')?'#map':'#stories');
 if(a.id==='detail-back') { ev.preventDefault(); location.hash=homeState.source; requestAnimationFrame(()=>window.scrollTo(0,homeState.scroll)); }
});
window.addEventListener('hashchange',()=>{renderRoute({focus:true});});
window.addEventListener('popstate',()=>{
 language=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh'; renderInterface();renderRoute();
 if(!location.hash.startsWith('#story/') && history.state?.home) requestAnimationFrame(()=>window.scrollTo(0,history.state.home.scroll));
});
renderInterface();initMap();renderRoute();
