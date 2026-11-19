import {geography} from './assets/hk-geography.js';

// All base geometry ships with the site: no tile service, CDN, or API key is
// needed for the map, the point links, or pan/zoom to work.
const WIDTH=1000;
const mercator=lat=>Math.log(Math.tan(Math.PI/4+lat*Math.PI/360));
const [west,south,east,north]=geography.bounds;
const top=mercator(north), bottom=mercator(south);
const HEIGHT=WIDTH*(top-bottom)/((east-west)*Math.PI/180);
const project=([lng,lat])=>[(lng-west)/(east-west)*WIDTH,(top-mercator(lat))/(top-bottom)*HEIGHT];
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const landPaths=geography.features.map(f=>f.geometry.coordinates.map(ring=>'M'+ring.map(p=>project(p).map(n=>n.toFixed(2)).join(',')).join('L')+'Z').join('')).join(' ');
const placeLabels=[
 [114.1,22.57,'新界','NEW TERRITORIES','region'],
 [114.185,22.36,'九龍','KOWLOON','region'],
 [114.185,22.255,'香港島','HONG KONG ISLAND','region'],
 [113.96,22.265,'大嶼山','LANTAU ISLAND','region'],
 [114.1,22.31,'維多利亞港','VICTORIA HARBOUR','water'],
 [114.25,22.47,'吐露港','TOLO HARBOUR','water'],
 [114.28,22.36,'西貢','Sai Kung','town'],
 [114.19,22.43,'沙田','Sha Tin','town'],
 [114.08,22.37,'荃灣','Tsuen Wan','town'],
 [113.98,22.42,'屯門','Tuen Mun','town'],
 [114.03,22.47,'元朗','Yuen Long','town'],
 [114.3,22.2,'南中國海','SOUTH CHINA SEA','water'],
];

export function createAtlas(host,stories,{lang='zh',preview=false,focusId,storyUrl,accent='#b85436',ink='#283d31'}={}){
 const zh=lang==='zh';let view={x:200,y:100,w:650,h:560};let removed=false;
 const pointers=new Map();let gesture=null,dirty=false,frame=0,dragging=false;
 const paths=`<path d="${landPaths}" fill="#eeeee4" stroke="#aebcac" stroke-width="1.15" vector-effect="non-scaling-stroke" fill-rule="evenodd"/>`;
 const labels=placeLabels.map(([lng,lat,cn,en,kind])=>{const [x,y]=project([lng,lat]);return `<g transform="translate(${x},${y})" class="atlas-place atlas-place-${kind}" data-map-label="${kind}"><text text-anchor="middle" fill="${kind==='water'?'#7e9da5':'#697a6a'}" font-size="${kind==='region'?13:10}" font-family="Arial, 'Noto Sans TC',sans-serif" font-weight="${kind==='region'?600:400}">${escape(zh?cn:en)}</text></g>`;}).join('');
 const grid=[22.2,22.4,22.6].map(lat=>{const p=project([west,lat]);return `<line x1="0" y1="${p[1]}" x2="1000" y2="${p[1]}" stroke="#b8cdd0" stroke-width=".45"/>`;}).join('')+[114,114.2,114.4].map(lng=>{const p=project([lng,north]);return `<line x1="${p[0]}" y1="0" x2="${p[0]}" y2="${HEIGHT}" stroke="#b8cdd0" stroke-width=".45"/>`;}).join('');
 const mappedStories=stories.filter(s=>s.location.publish);
 const focusedStory=mappedStories.find(s=>s.id===focusId);
 let showFocus=Boolean(focusedStory);
 const pins=mappedStories.map(s=>{const [x,y]=project([s.location.lng,s.location.lat]);const title=escape(s[lang].title);const focused=s===focusedStory;return `<g class="atlas-area" transform="translate(${x},${y})"><circle r="15" fill="${accent}" fill-opacity=".08" stroke="${accent}" stroke-width="1" stroke-dasharray="3 4" vector-effect="non-scaling-stroke"/></g><g class="atlas-pin${focused?' is-focused':''}" data-map-pin="${s.id}" data-x="${x}" data-y="${y}" transform="translate(${x},${y})"><a href="${escape(storyUrl(s.id))}" aria-label="${title}" data-story-pin="${s.id}"><title>${title}</title><circle r="19" fill="${focused?accent:ink}" stroke="#fffdf7" stroke-width="3"/><text y="4" text-anchor="middle" fill="#fffdf7" font-size="11" font-weight="600" font-family="Arial,sans-serif">${s.number}</text></a>${focused?`<text class="atlas-focus-label" y="-29" text-anchor="middle" fill="${ink}" stroke="#fffdf7" stroke-width="4" paint-order="stroke" font-size="13" font-weight="600">${title}</text>`:''}</g>`;}).join('');
 host.innerHTML=`<div class="atlas-shell ${preview?'atlas-preview':''}" style="--map-accent:${accent}"><svg class="atlas-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 760" role="group" aria-label="${zh?'香港地理故事地圖，可拖動及縮放':'Hong Kong geographic story map. Drag to pan; use controls to zoom.'}" tabindex="0"><rect x="-2000" y="-2000" width="5000" height="5000" fill="#dce9e9"/><g class="atlas-grid">${grid}</g><g class="atlas-land">${paths}</g><g class="atlas-labels">${labels}</g><g class="atlas-pins">${pins}</g></svg><div class="atlas-controls" role="group" aria-label="${zh?'地圖縮放':'Map zoom'}"><button type="button" data-zoom="in" aria-label="${zh?'放大地圖':'Zoom in'}">+</button><button type="button" data-zoom="out" aria-label="${zh?'縮小地圖':'Zoom out'}">−</button><button type="button" data-zoom="reset" aria-label="${zh?'顯示所有點位':'Show all places'}">⌖</button></div><div class="atlas-compass" aria-hidden="true">N<span>↑</span></div><div class="atlas-attribution"><a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener">Natural Earth</a> · ${zh?'地理底圖，非街道導航':'Geographic map, not street navigation'}</div><p class="sr-only">${zh?'使用加減鍵縮放、方向鍵平移，Home 鍵顯示所有點位。點選編號閱讀故事。':'Use plus/minus to zoom, arrow keys to pan and Home to show all places. Select a numbered point to read its story.'}</p></div>`;
 const svg=host.querySelector('.atlas-svg');const shell=host.querySelector('.atlas-shell');
 const pinNodes=[...host.querySelectorAll('[data-map-pin]')];const labelNodes=[...host.querySelectorAll('[data-map-label]')];
 function dimensions(){const rect=host.getBoundingClientRect();return {width:rect.width||800,height:rect.height||(preview?420:610)};}
 function fit(){
  if(showFocus){
   showFocus=false;
   const pin=host.querySelector('.atlas-pin.is-focused');
   pin?.classList.remove('is-focused');
   pin?.querySelector('circle')?.setAttribute('fill',ink);
   pin?.querySelector('.atlas-focus-label')?.remove();
  }
  const {width,height}=dimensions();const points=stories.filter(s=>s.location.publish).map(s=>project([s.location.lng,s.location.lat]));let minX=Math.min(...points.map(p=>p[0]))-120,maxX=Math.max(...points.map(p=>p[0]))+120,minY=Math.min(...points.map(p=>p[1]))-80,maxY=Math.max(...points.map(p=>p[1]))+80;let w=maxX-minX,h=maxY-minY;const ratio=width/height;if(w/h<ratio)w=h*ratio;else h=w/ratio;view={x:(minX+maxX-w)/2,y:(minY+maxY-h)/2,w,h};draw();}
 function resize(){
  if(!showFocus){fit();return;}
  const {width,height}=dimensions();
  const [x,y]=project([focusedStory.location.lng,focusedStory.location.lat]);
  const w=120,h=w*height/width;
  view={x:x-w/2,y:y-h/2,w,h};
  draw();
 }
 function clamp(){view.w=Math.max(100,Math.min(1300,view.w));const {width,height}=dimensions();view.h=view.w*height/width;view.x=Math.max(-100,Math.min(WIDTH+100-view.w,view.x));view.y=Math.max(-80,Math.min(HEIGHT+80-view.h,view.y));}
 function draw(){if(removed)return;svg.setAttribute('viewBox',`${view.x} ${view.y} ${view.w} ${view.h}`);const scale=view.w/dimensions().width;pinNodes.forEach(n=>n.setAttribute('transform',`translate(${n.dataset.x},${n.dataset.y}) scale(${scale})`));labelNodes.forEach(n=>{const tr=n.getAttribute('transform').split(' scale(')[0];n.setAttribute('transform',`${tr} scale(${Math.min(1.3,Math.max(.45,scale))})`)});}
 function schedule(){if(dirty)return;dirty=true;frame=requestAnimationFrame(()=>{dirty=false;draw()});}
 function zoom(factor,cx=.5,cy=.5){const w=view.w;view.w=Math.max(100,Math.min(1300,w*factor));const ratio=view.w/w;view.x+=w*(1-ratio)*cx;view.y+=view.h*(1-ratio)*cy;clamp();draw();}
 const onControl=e=>{const button=e.target.closest('[data-zoom]');if(!button)return;if(button.dataset.zoom==='reset')fit();else zoom(button.dataset.zoom==='in'?.7:1.42);};
 const onWheel=e=>{if(preview&&!e.ctrlKey&&!e.metaKey)return;e.preventDefault();const r=svg.getBoundingClientRect();zoom(e.deltaY<0?.85:1.18,(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);};
 const onKey=e=>{if(e.target!==svg)return;const delta=view.w*.08;switch(e.key){case '+':case '=':zoom(.75);break;case '-':zoom(1.33);break;case 'Home':fit();break;case 'ArrowLeft':view.x-=delta;break;case 'ArrowRight':view.x+=delta;break;case 'ArrowUp':view.y-=delta;break;case 'ArrowDown':view.y+=delta;break;default:return;}e.preventDefault();clamp();draw();};
 const onDown=e=>{if(e.target.closest('[data-story-pin]'))return;if(e.button!==undefined&&e.button!==0)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});svg.setPointerCapture?.(e.pointerId);if(pointers.size===1){gesture={type:'pan',x:e.clientX,y:e.clientY,start:{...view}};}else if(pointers.size===2){const [a,b]=[...pointers.values()];gesture={type:'pinch',distance:Math.hypot(a.x-b.x,a.y-b.y)};}shell.classList.add('is-dragging');dragging=true;};
 const onMove=e=>{if(!pointers.has(e.pointerId)||!gesture)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(gesture.type==='pinch'&&pointers.size===2){const[a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(distance>0){zoom(gesture.distance/distance);gesture.distance=distance;}}else if(gesture.type==='pan'){const {width,height}=dimensions();view.x=gesture.start.x-(e.clientX-gesture.x)*gesture.start.w/width;view.y=gesture.start.y-(e.clientY-gesture.y)*gesture.start.h/height;clamp();schedule();}};
 const onUp=e=>{pointers.delete(e.pointerId);gesture=null;dragging=false;shell.classList.remove('is-dragging');};
 shell.addEventListener('click',onControl);svg.addEventListener('wheel',onWheel,{passive:false});svg.addEventListener('keydown',onKey);svg.addEventListener('pointerdown',onDown);svg.addEventListener('pointermove',onMove);svg.addEventListener('pointerup',onUp);svg.addEventListener('pointercancel',onUp);
 const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>{if(!dragging)resize()}):null;observer?.observe(host);
 resize();requestAnimationFrame(()=>{if(!removed)resize()});
 return {fitBounds:fit,invalidateSize:resize,remove(){removed=true;observer?.disconnect();cancelAnimationFrame(frame);shell.remove();},getView(){return {...view};}};
}
