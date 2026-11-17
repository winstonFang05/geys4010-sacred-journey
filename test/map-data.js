// Coordinates must come from independently verified, publication-approved data.
export function publicLocation(story) {
  const p = story.location;
  if (!p || p.status !== 'verified' || p.publish !== true || !['exact','area'].includes(p.precision) ||
      !/^https?:\/\//.test(p.source || '') || !/^\d{4}-\d{2}-\d{2}$/.test(p.verifiedAt || '') ||
      !Number.isFinite(p.lat) || !Number.isFinite(p.lng) ||
      Math.abs(p.lat) > 90 || Math.abs(p.lng) > 180) return null;
  if (p.precision === 'area' && (!p.label?.zh || !p.label?.en)) return null;
  return p;
}
export function matchingStories(stories, copy, language, category, query) {
  const needle = query.trim().normalize('NFKC').toLowerCase();
  return stories.filter(s => (category === 'all' || s.category === category) &&
    [s.zh.title, s.en.title, s.zh.area, s.en.area, s[language].summary,
      copy.zh[s.category], copy.en[s.category]].join(' ').normalize('NFKC').toLowerCase().includes(needle));
}
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
export function safeUrl(value) {
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : '#'; }
  catch { return '#'; }
}
