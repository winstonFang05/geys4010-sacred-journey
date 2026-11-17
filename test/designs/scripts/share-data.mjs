import vm from 'node:vm';
import fs from 'node:fs';
import {stories} from '../data.js';
import {config} from '../config.js';
const sandbox={};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('assets/vendor/qrcode.js','utf8'),sandbox);
const cards=[];
for(const theme of ['trevonelle','accession','relic','synthesis'])for(const story of stories)for(const lang of ['zh','en']){
 const url=`${config.siteOrigin}/${theme}/${lang==='en'?'?lang=en':''}#story/${story.id}`;
 const qr=sandbox.qrcode(0,'M');qr.addData(url);qr.make();
 cards.push({theme,id:story.id,number:story.number,lang,url,title:story[lang].title,area:story[lang].area,summary:story[lang].summary,qr:Array.from({length:qr.getModuleCount()},(_,r)=>Array.from({length:qr.getModuleCount()},(_,c)=>qr.isDark(r,c)))});
}
fs.mkdirSync('work',{recursive:true});fs.writeFileSync('work/share-data.json',JSON.stringify(cards));
