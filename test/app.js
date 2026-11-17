import { siteConfig } from './site-config.js?v=20261117-test5';
import { rankStories } from './ranking.js?v=20261117-test5';
import { copy, stories } from './stories.js?v=20261117-test5';
import { publicLocation, matchingStories, escapeHtml as e, safeUrl } from './map-data.js?v=20261117-test5';
import { mapConfig } from './map-config.js?v=20261117-test5';
const $ = s => document.querySelector(s);
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh';
let category = 'all', map, markers, tiles, tileFailed = false, mapTimer;
const zh = () => language === 'zh';
const text = (a,b) => zh() ? a : b;
const locationLabel = s => publicLocation(s) ? (publicLocation(s).precision === 'area' ? text('大致區域 · 非精確舊址','Approximate area · not exact historic site') : text('位置已核實','Verified location')) : text('位置待核實／不公開精確位置','Location unverified / exact location not public');
const matches = () => matchingStories(stories, copy, language, category, $('#search').value);
let homeState = { source: '#stories', scroll: 0 };


function formUrl() { try { const u=new URL(siteConfig.contributionFormUrl); return u.protocol==='https:' ? u.href : null; } catch{return null;} }
function localAsset(value) { return typeof value==='string' && /^assets\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes('..') ? './'+value : null; }
function sharePanel(s) {
 const asset=localAsset(s.shareImages?.[language]);
 return asset ? `<div class="detail-actions"><a href="${e(asset)}" download>${text('下載分享圖片','Download share image')}</a><a href="${e(asset)}" target="_blank" rel="noopener">${text('開啟圖片／長按儲存','Open image / save manually')}</a></div>` : `<p class="availability">${text('分享圖片準備中：尚未提供已授權照片及雙語 QR 圖片。','Share image pending: licensed photos and bilingual QR images have not been supplied.')}</p>`;
}
function photoPanel(s) {
 const photos=(s.photos||[]).filter(p=>localAsset(p.src)&&p.rights&&p.credit&&p.alt?.[language]);
 return photos.length ? `<div class="photo-gallery">${photos.map(p=>`<figure><img src="${e(localAsset(p.src))}" alt="${e(p.alt[language])}" loading="lazy"><figcaption>${e(p.caption?.[language]||'')} · ${e(p.credit)} · ${e(p.rights)}</figcaption></figure>`).join('')}</div>` : `<p class="availability">${text('照片待補：目前未取得可刊登的授權照片。','Photos pending: no publication-cleared photos available.')}</p>`;
}
function relatedPanel(s) {
 const related=(s.relatedIds||[]).map(id=>stories.find(x=>x.id===id)).filter(x=>x&&x.id!==s.id);
 return related.length ? `<section class="evidence"><h2>${text('相關故事','Related stories')}</h2>${related.map(x=>`<p><a href="#story/${encodeURIComponent(x.id)}">${e(x[language].title)}</a></p>`).join('')}</section>` : '';
}
function ratingPanel() {
 return `<section class="evidence"><h2>${text('匿名評價','Anonymous reviews')}</h2><p>${text('尚未評分。評分與審核後台未連接，暫不收集星數或評語。','Not rated. Ratings and moderation backend are not connected; no scores or comments are collected.')}</p><p>${text('未來評分僅代表使用者意見，不是官方文化價值評級。','Future ratings represent user opinions, not official cultural value.')}</p></section>`;
}

function renderArchive() {
  const labels = copy[language], all = matches(), list = rankStories(all).slice(0,3);
  $('#result-count').textContent = all.length ? text(`共 ${all.length} 處符合，顯示 ${list.length} 處。暫無評分排行，按固定 ID 排列。`, `${all.length} matching places, showing ${list.length}. No ratings yet; ordered by stable ID.`) : labels.count(0);
  $('#cards').innerHTML = list.map(s => `<article class="story-card ${e(s.category)}">
    <div class="card-top"><span>${e(labels[s.category])}</span><span>${e(s.number)}</span></div>
    <p class="area">${e(s[language].area)}</p><p class="rating-summary">${text("尚未評分 · 評分服務準備中","Not rated · rating service pending")}</p><h3><a href="#story/${encodeURIComponent(s.id)}">${e(s[language].title)}</a></h3>
    <p>${e(s[language].summary)}</p><p class="location-status">${e(locationLabel(s))}</p>
    <a class="read" href="#story/${encodeURIComponent(s.id)}">${e(labels.read)} ↗</a></article>`).join('');
  renderMarkers();
}
function mapStatus() {
  const all = stories.filter(publicLocation).length;
  const matching = matches().filter(publicLocation).length;
  $('#map-status').textContent = !map || tileFailed
    ? text('地圖暫時無法完整載入。仍可從下方列表閱讀故事。','Map is temporarily unavailable or incomplete. Read stories in the list below.')
    : all ? text(`地圖有 ${all} 則故事位置；${matching} 個符合目前搜尋／分類。`, `${all} story locations; ${matching} match the current search / category.`)
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
      icon: L.divIcon({className: `story-marker story-label${matched.has(s.id) ? '' : ' is-muted'}`,
        html: `<b>${e(s.number)}</b><span>${e(s[language].title)}<small>${text("大致區域","Approximate area")}</small></span>`, iconSize:[180,58],iconAnchor:[90,29]})
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
    const points = stories.map(publicLocation).filter(Boolean).map(p=>[p.lat,p.lng]);
    if(points.length) map.fitBounds(points,{padding:[100,65],maxZoom:11});
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
  const form = formUrl(); const c=$('#template'); c.hidden=!form; c.href=form || '#contribute'; c.textContent=text('提交地區故事（簡體中文表單）','Submit a story (Simplified Chinese form)'); c.target='_blank'; c.rel='noopener'; c.removeAttribute('download'); $('#contribution-state').textContent=form ? text('上傳檔案需要 Google 帳號。投稿須經項目團隊及 HKSS 審核，不會自動公開。','File uploads require a Google account. The project team and HKSS review submissions before publication.') : text('表單準備中。尚未連接正式收件表單，本站不收集投稿。','Form in preparation. No published submission form is connected; this site does not collect submissions.');
  $('#interactive-map').setAttribute('aria-label',text('香港故事地圖，可用方向鍵移動及加減鍵縮放','Hong Kong story map. Use arrow keys to pan and plus/minus to zoom.'));
  $('#map-retry').textContent = text('重新載入地圖','Reload map');
  $('#filters').innerHTML = ['all',...new Set(stories.map(s=>s.category))].map(c=>`<button type="button" data-category="${e(c)}" aria-pressed="${c===category}">${e(labels[c] || c)}</button>`).join('');
  renderArchive(); mapStatus();
}
function renderRoute({focus=false}={}) {
  const admin = location.hash === '#admin';
  const detail = location.hash.startsWith('#story/') || admin;
  $('#home-view').hidden = detail; $('#detail-view').hidden = !detail;
  if (!detail) {
    map?.invalidateSize();
    if (history.state?.home) homeState = history.state.home;
    return;
  }
  if(admin) { $('#detail-view').innerHTML=`<a href="#top">${text('返回首頁','Back home')}</a><h1>${text('管理統計','Administration')}</h1><p>${text('管理服務尚未連接。沒有登入、統計或管理權限；不以公開頁面假裝受保護後台。','Administration is not connected. No sign-in, statistics or admin access is available; this public page is not a protected backend.')}</p>`; return; }
  let id; try {id = decodeURIComponent(location.hash.slice(7));} catch {id = '';}
  const s = stories.find(s=>s.id===id), labels=copy[language];
  if (!s) $('#detail-view').innerHTML = `<h1>${text('找不到這個故事','Story not found')}</h1><p>${text('此地點可能已下架或連結有誤。','This location may have been removed, or the link is incorrect.')}</p><a href="#stories">${text('返回故事檔案','Back to stories')}</a>`;
  else {
    const d=s[language], p=publicLocation(s);
    const route = p?.precision === 'exact' ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${p.lat},${p.lng}`)}` : null;
    $('#detail-view').innerHTML=`<a id="detail-back" href="${e(homeState.source)}">← ${homeState.source==='#map' ? text('返回地圖','Back to map') : text('返回故事檔案','Back to stories')}</a>
      ${sharePanel(s)}<p class="eyebrow">${e(s.number)} / ${e(labels.sample)}</p><p class="area">${e(d.area)} · ${e(labels[s.category])}</p>
      <h1>${e(d.title)}</h1><p class="story-summary">${e(d.summary)}</p>${photoPanel(s)}<section class="evidence"><h2>${text("基本資料","Basic information")}</h2><p>${e(d.area)} · ${e(labels[s.category])}</p><p>${text("現況與開放限制：待核實；不代表獲准進入。","Current condition and access: unverified; not permission to enter.")}</p><p>${text("交通資訊：尚未提供已核實站點。","Transport: no verified nearby stop information supplied.")}</p><p>${text("內容審核日期：尚未完成正式團隊審核。","Content review: formal team review not yet completed.")}</p></section>
      <section class="evidence"><h2>${text('位置與到訪','Location and visiting')}</h2><p>${e(locationLabel(s))}</p>
      ${p ? `<p>${e(p.label?.[language] || "")}<br>${e(p.lat)}, ${e(p.lng)} · ${text('核實日期','Verified')}: ${e(p.verifiedAt)}</p>${route ? `<a href="${e(route)}" target="_blank" rel="noopener">${text("查看前往路線","Get directions")} ↗</a>` : `<p>${text("區域參考點，不提供精確舊址導航。","Area reference only; no navigation to an unverified historic site.")}</p>`}<p><a href="${e(safeUrl(p.source))}">${text('位置資料來源','Location source')}</a></p>` : `<p>${text('不提供未核實的導航目的地。','No unverified navigation destination is provided.')}</p>`}</section>
      <section class="evidence"><h2>${text('地方故事','The story')}</h2><p>${e(d.body)}</p></section>
      <section class="evidence"><h2>${e(labels.source)}</h2><p>${e(d.sourceLabel)}</p><a href="${e(safeUrl(s.source))}">${e(d.citation)} ↗</a></section>
      <section class="evidence"><h2>${e(labels.note)}</h2><p>${e(d.note)}</p></section>${relatedPanel(s)}<section class="evidence"><h2>${text("補充本地點資料","Contribute information")}</h2>${formUrl() ? `<a href="${e(formUrl())}" target="_blank" rel="noopener">${text("開啟簡體中文投稿表單","Open Simplified Chinese form")} ↗</a>` : `<p>${text("表單準備中","Form in preparation")}</p>`}</section>${ratingPanel()}`;
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
