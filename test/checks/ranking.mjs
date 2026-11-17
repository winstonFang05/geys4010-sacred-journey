import test from 'node:test';import assert from 'node:assert/strict';import {rankStories} from '../ranking.js';
const s=[{id:'c'},{id:'a'},{id:'b'},{id:'d'}];
test('no ratings means stable IDs, input unchanged',()=>{assert.deepEqual(rankStories(s).map(x=>x.id),['a','b','c','d']);assert.equal(s[0].id,'c');});
test('raw mean then count then ID; unrated last',()=>assert.deepEqual(rankStories(s,{a:{count:2,sum:9},b:{count:1,sum:5},c:{count:4,sum:18}}).map(x=>x.id),['b','c','a','d']));
test('invalid scores ignored',()=>assert.deepEqual(rankStories(s,{c:{count:1,sum:6},b:{count:-1,sum:5}}).map(x=>x.id),['a','b','c','d']));
