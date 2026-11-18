import test from 'node:test';
import assert from 'node:assert/strict';
import {publicLocation,matchingStories,escapeHtml,safeUrl} from '../map-data.js';
import {stories,copy} from '../stories.js';
const valid={status:'verified',publish:true,precision:'exact',lat:22.3,lng:114.2,verifiedAt:'2026-11-17',source:'https://example.org/source'};
test('twenty-three sourced area markers, never exact historic pins',()=>{assert.equal(stories.filter(publicLocation).length,23);assert.ok(stories.every(s=>s.location.precision==='area'));});
test('area requires explicit bilingual precision label',()=>{assert.equal(publicLocation({location:{...valid,precision:'area'}}),null); assert.ok(publicLocation({location:{...valid,precision:'area',label:{zh:'區域',en:'area'}}}));});
test('verified approved exact coordinates accepted',()=>assert.equal(publicLocation({location:valid}),valid));
test('invalid, private, approximate or unverified coordinates excluded',()=>{
 for(const patch of [{lat:NaN},{lng:181},{lat:null},{publish:false},{status:'unverified'},{precision:'area'},{source:''},{verifiedAt:''}]) assert.equal(publicLocation({location:{...valid,...patch}}),null);
});
test('search/category/Unicode normalization',()=>{
 assert.equal(matchingStories(stories,copy,'en','all','ＴＩＮ ＣＨＵＮ').length,1);
 assert.equal(matchingStories(stories,copy,'zh','waterfront','牛池灣').length,0);
 assert.equal(matchingStories(stories,copy,'zh','waterfront','城門河').length,1);
 assert.equal(matchingStories(stories,copy,'en','craft','Koon Chun').length,1);
});
test('rendered strings and links reject HTML/script injection',()=>{
 assert.equal(escapeHtml('<img>'), '&lt;img&gt;');assert.equal(safeUrl('javascript:alert(1)'),'#');
});
