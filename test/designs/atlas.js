import './assets/vendor/leaflet.js';
import {createAtlas as createOverview} from './geographic-fallback.js';

// Load Leaflet before initialization; public OSM street tiles need no API key.
export function createAtlas(host,stories,options={}){
 const {lang='zh',preview=false,storyUrl,accent='#b85436',ink='#283d31'}=options;
 const zh=lang==='zh';const L=globalThis.L;
 if(!L)return createOverview(host,stories,options);
 let removed=false,map=null,observer=null,frame=0,timer=0,tileCount=0,errorCount=0,fallback=null,retryMap=null;
 const bounds=stories.filter(s=>s.location.publish).map(s=>[s.location.lat,s.location.lng]);
 host.innerHTML=`<div class="street-map-frame"><div class="street-map-canvas"></div><div class="street-map-loading" role="status">${zh?'正在載入街道地圖…':'Loading the street map…'}</div></div>`;
 const frameElement=host.firstElementChild,canvas=host.querySelector('.street-map-canvas');
 const fit=()=>{if(removed)return;if(retryMap){retryMap.fitBounds();return;}if(fallback){fallback.fitBounds();return;}map?.invalidateSize({pan:false});map?.fitBounds(bounds,{padding:preview?[50,50]:[75,65],maxZoom:11,animate:false});};
 function useOverview(){
  if(removed||fallback||tileCount>0)return;
  clearTimeout(timer);observer?.disconnect();map?.remove();map=null;
  host.innerHTML='<div class="street-fallback-notice"><span></span><button type="button"></button></div><div class="street-fallback-view"></div>';
  const notice=host.querySelector('.street-fallback-notice');notice.querySelector('span').textContent=zh?'街道底圖暫未載入，先顯示地理概覽。':'Street tiles could not load. Showing the geographic overview.';
  const retry=notice.querySelector('button');retry.textContent=zh?'重試街道地圖':'Retry street map';retry.addEventListener('click',()=>{fallback?.remove();fallback=null;retryMap=createAtlas(host,stories,options)});
  fallback=createOverview(host.querySelector('.street-fallback-view'),stories,options);
 }
 try{
  map=L.map(canvas,{scrollWheelZoom:!preview,dragging:true,touchZoom:true,zoomControl:true,attributionControl:true,minZoom:9,maxZoom:19,maxBounds:[[21.8,113.5],[23,114.9]],maxBoundsViscosity:.7});
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{minZoom:9,maxZoom:19,detectRetina:false,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>'});
  tiles.on('tileload',()=>{tileCount++;clearTimeout(timer);frameElement.classList.add('street-map-ready');frameElement.querySelector('.street-map-loading')?.remove()});
  tiles.on('tileerror',()=>{if(++errorCount>=4)useOverview()});tiles.addTo(map);
  stories.filter(s=>s.location.publish).forEach(s=>{
   L.circle([s.location.lat,s.location.lng],{radius:preview?1800:1200,color:accent,weight:1,dashArray:'4 5',fillColor:accent,fillOpacity:.07}).addTo(map);
   const marker=L.marker([s.location.lat,s.location.lng],{keyboard:true,title:s[lang].title,alt:s[lang].title,icon:L.divIcon({className:'story-marker',html:`<span style="background:${ink}">${s.number}</span>`,iconSize:[44,44],iconAnchor:[22,22]})}).addTo(map);
   marker.bindTooltip(s[lang].title,{direction:'top',offset:[0,-22]});marker.on('click',()=>{location.href=storyUrl(s.id)});
  });
  fit();frame=requestAnimationFrame(fit);
  observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>{if(!removed)map?.invalidateSize({pan:false})}):null;observer?.observe(host);
  timer=setTimeout(useOverview,15000);
 }catch(error){useOverview();}
 return {
  fitBounds:fit,
  invalidateSize(){if(removed)return;if(retryMap){retryMap.invalidateSize();return;}if(fallback)fallback.invalidateSize();else{map?.invalidateSize({pan:false});frame=requestAnimationFrame(()=>map?.invalidateSize({pan:false}))}},
  remove(){removed=true;clearTimeout(timer);cancelAnimationFrame(frame);observer?.disconnect();map?.remove();fallback?.remove();retryMap?.remove();host.replaceChildren();}
 };
}
