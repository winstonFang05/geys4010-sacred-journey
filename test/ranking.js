// Only trusted server aggregates belong here, never invented browser-local votes.
export function rankStories(stories, ratings = {}) {
  const value = s => {const v=ratings[s.id];return v && Number.isInteger(v.count) && v.count>0 && Number.isFinite(v.sum) && v.sum>=v.count && v.sum<=5*v.count ? {count:v.count,average:v.sum/v.count} : {count:0,average:0};};
  return [...stories].sort((a,b)=>{const x=value(a),y=value(b);return y.average-x.average || y.count-x.count || (a.id<b.id?-1:a.id>b.id?1:0);});
}
