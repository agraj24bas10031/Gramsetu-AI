import test from 'node:test';
import assert from 'node:assert/strict';
import {classify,priority,distance,duplicates,acceptOnce} from '../src/logic.js';
test('English, Hindi and Hinglish category rules',()=>{assert.equal(classify('Large pothole near school').category,'road_damage');assert.equal(classify('नाली बंद है').category,'drainage');assert.equal(classify('Pipeline se paani leak').category,'water_issue')});
test('safety overrides a low numeric score',()=>{const p=priority({severity:0,recurrence:0,affected:0,duration:0,threat:0,safety:true});assert.equal(p.score,0);assert.equal(p.label,'Critical')});
test('priority inputs are clamped',()=>{assert.equal(priority({severity:200,recurrence:200,affected:200,duration:200,threat:200}).score,100)});
test('missing coordinates do not produce a duplicate',()=>assert.equal(distance({lat:null,lng:null},{lat:28,lng:77}),Infinity));
test('duplicate filtering respects location, category and time',()=>{const a={id:'a',category:'drainage',status:'submitted',lat:28,lng:77,createdAt:'2026-01-02'};const b={...a,id:'b',lat:28.0001};assert.equal(duplicates(a,[b]).length,1);assert.equal(duplicates(a,[{...b,lng:78}]).length,0);assert.equal(duplicates(a,[{...b,category:'road_damage'}]).length,0);assert.equal(duplicates(a,[{...b,createdAt:'2025-01-01'}]).length,0)});
test('queue acknowledgement is idempotent by client ID',()=>{const r={clientId:'client-a',id:'a'};assert.equal(acceptOnce(acceptOnce([],r),r).length,1)});
