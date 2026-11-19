import { albumPhotos } from './story-album-photos.js?v=20261119-album';
import { escapeHtml, safeUrl } from './map-data.js';

const kindLabels = {
  site: { zh: '地點實景', en: 'Site photo' },
  historic: { zh: '歷史影像', en: 'Archive image' },
  area: { zh: '地區配圖', en: 'Area photo' },
  context: { zh: '背景配圖', en: 'Context photo' },
};

function photosFor(story) {
  const photos = albumPhotos[story.id] ?? [];
  if (!story.photo) return photos;
  return [story.photo, ...photos.filter(photo => photo.src !== story.photo.src)];
}

function photoUrl(photo) {
  return new URL('./assets/' + photo.src, import.meta.url).href;
}

function captionHtml(photo, lang) {
  const kind = kindLabels[photo.kind]?.[lang];
  const license = escapeHtml(photo.license);
  return `<span class="album-caption-line">${kind ? `<span class="album-photo-kind">${escapeHtml(kind)}</span>` : ''}${escapeHtml(photo.caption[lang])}</span>
    <span class="album-photo-credit"><a href="${escapeHtml(safeUrl(photo.source))}" target="_blank" rel="noopener noreferrer">${escapeHtml(photo.credit)}</a> ·
      ${photo.licenseUrl ? `<a href="${escapeHtml(safeUrl(photo.licenseUrl))}" target="_blank" rel="noopener noreferrer">${license}</a>` : license}
      ${photo.adapted ? (lang === 'zh' ? ' · 網頁縮圖' : ' · Web resize') : ''}</span>`;
}

export function renderStoryAlbum(story, lang, previousAlbum) {
  const photos = photosFor(story);
  if (photos.length < 2) return '';
  const zh = lang === 'zh';
  const slide = previousAlbum?.dataset.storyAlbum === story.id ? Number(previousAlbum.dataset.slide) : 0;
  const photo = photos[slide];
  return `<figure class="story-cover story-album" data-story-album="${escapeHtml(story.id)}" data-slide="${slide}" aria-label="${zh ? '地點相冊' : 'Place photo album'}">
    <div class="album-stack">
      <div class="album-frame">
        <img class="album-image" src="${escapeHtml(photoUrl(photo))}" alt="${escapeHtml((photo.alt ?? photo.caption)[lang])}" decoding="async">
        <span class="cover-number">${escapeHtml(story.number)}</span>
      </div>
    </div>
    <figcaption class="album-bar">
      <div class="album-caption">${captionHtml(photo, lang)}</div>
      <div class="album-controls" role="group" aria-label="${zh ? '切換相片' : 'Browse photos'}">
        <button type="button" data-photo-step="-1" aria-label="${zh ? '上一張相片' : 'Previous photo'}">←</button>
        <span class="album-count" aria-hidden="true">${slide + 1} / ${photos.length}</span>
        <button type="button" data-photo-step="1" aria-label="${zh ? '下一張相片' : 'Next photo'}">→</button>
      </div>
      <span class="sr-only album-status" role="status"></span>
    </figcaption>
  </figure>`;
}

export function bindStoryAlbum(album, story, lang) {
  const photos = photosFor(story);
  const image = album.querySelector('.album-image');
  const caption = album.querySelector('.album-caption');
  const count = album.querySelector('.album-count');
  const status = album.querySelector('.album-status');
  let index = Number(album.dataset.slide);

  function step(amount) {
    index = (index + amount + photos.length) % photos.length;
    const photo = photos[index];
    album.dataset.slide = String(index);
    image.alt = (photo.alt ?? photo.caption)[lang];
    image.src = photoUrl(photo);
    caption.innerHTML = captionHtml(photo, lang);
    count.textContent = `${index + 1} / ${photos.length}`;
    status.textContent = lang === 'zh'
      ? `第 ${index + 1} 張，共 ${photos.length} 張。${photo.caption.zh}`
      : `Photo ${index + 1} of ${photos.length}. ${photo.caption.en}`;
  }

  for (const button of album.querySelectorAll('[data-photo-step]')) {
    button.addEventListener('click', () => step(Number(button.dataset.photoStep)));
  }
  album.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    step(event.key === 'ArrowLeft' ? -1 : 1);
  });
}
