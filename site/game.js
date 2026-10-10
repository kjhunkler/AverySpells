import {normalizeAcademy} from './academy.js';
export const words = [
 ['cat','🐱'],['dog','🐶'],['sun','☀️'],['hat','🎩'],['pig','🐷'],['hen','🐔'],['bat','🦇'],['bug','🐛'],['fox','🦊'],['cup','☕'],['bus','🚌'],['bed','🛏️'],['map','🗺️'],['net','🥅'],['pot','🍲'],['pan','🍳'],['log','🪵'],['web','🕸️'],['jam','🍓'],['van','🚐'],
 ['frog','🐸'],['crab','🦀'],['drum','🥁'],['star','⭐'],['flag','🚩'],['plum','🟣']
].map(([word,emoji])=>({word,emoji}));
export const sounds = [ ['house','🏠'],['door','🚪'],['kangaroo','🦘'],['bee','🐝'],['vase','🏺'],['lemon','🍋'],['elephant','🐘'],['leaf','🍃'],['kite','🪁'],['glove','🧤'],['ball','⚽'],['moon','🌙'],['fish','🐟'],['rain','🌧️'],['snake','🐍'],['turtle','🐢'] ].map(([word,emoji])=>({word,emoji}));
export const modules = [
 {id:'sounds',emoji:'💎',title:'Sound Crystals',tag:'LISTEN & DISCOVER',description:'Hear a word. Find its first letter. Light up your crystals.',goal:'Light 5 crystals',reward:'💎',color:'mint'},
 {id:'potions',emoji:'🧪',title:'Letter Potions',tag:'FIND THE MISSING LETTER',description:'A letter has vanished! Drop it back into your word potion.',goal:'Brew 5 potions',reward:'🧪',color:'peach'},
 {id:'spells',emoji:'🪄',title:'Spell Workshop',tag:'BUILD A WHOLE WORD',description:'Gather letter tiles and put them in order to cast a spell.',goal:'Cast 5 spells',reward:'🪄',color:'lilac'}
];
export function shuffle(items,random=Math.random){const copy=[...items]; for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
export function makeQuest(module,difficulty,random=Math.random){const pool=module==='sounds'?sounds:words.filter(x=>difficulty==='star'?true:x.word.length===3); return shuffle(pool,random).slice(0,5);}
export function choices(answer,count,random=Math.random){return shuffle([answer,...shuffle([... 'abcdefghijklmnopqrstuvwxyz'].filter(x=>x!==answer),random).slice(0,count-1)],random);}
export function missingIndex(word,difficulty,random=Math.random){return difficulty==='sprout'?0:difficulty==='glow'?1:Math.floor(random()*word.length);}
export function spellTiles(word,difficulty,random=Math.random){const extras=difficulty==='star'?shuffle([... 'abcdefghijklmnopqrstuvwxyz'].filter(x=>!word.includes(x)),random).slice(0,2):[];return shuffle([...word,...extras],random).map((letter,id)=>({letter,id}));}
export function validProgress(raw){const blank={stars:0,completed:{sounds:0,potions:0,spells:0},difficulty:'sprout',voice:true,effects:true,voiceURI:'',animations:true,academy:normalizeAcademy()};if(!raw||typeof raw!=='object')return blank;const count=x=>Number.isSafeInteger(x)&&x>=0?Math.min(x,1000000):0;return {...blank,stars:count(raw.stars),completed:Object.fromEntries(Object.keys(blank.completed).map(k=>[k,count(raw.completed?.[k])])),difficulty:['sprout','glow','star'].includes(raw.difficulty)?raw.difficulty:'sprout',voice:typeof raw.voice==='boolean'?raw.voice:true,effects:typeof raw.effects==='boolean'?raw.effects:true,voiceURI:typeof raw.voiceURI==='string'?raw.voiceURI.slice(0,500):'',animations:typeof raw.animations==='boolean'?raw.animations:true,academy:normalizeAcademy(raw.academy)};}

export const celebrations = {
 sounds: ['Your crystal is glowing!', 'You found the sound!','Crystal magic!','That letter shines!','A bright little discovery!','You lit up the crystal!'],
 potions: ['A perfect potion!','Bubble, bubble, word magic!','Your potion is sparkling!','You found the missing magic!','A brilliant brew!','That letter fits beautifully!'],
 spells: ['You cast the spell!','Your word has magic!','A wonderful word spell!','Your wand is sparkling!','Letters together, magic forever!','You built a brilliant word!'],
 quests: ['Five words, a whole lot of magic!','Your magic is growing!','A wonderful quest, little wizard!','Look at all the words you discovered!','Your academy is sparkling!','Another adventure in your spell book!']
};
export function pickCelebration(kind,previous='',random=Math.random){const pool=(celebrations[kind]||celebrations.quests).filter(line=>line!==previous);return pool[Math.floor(random()*pool.length)];}
export function chooseVoice(voices,preferred='',online=true){const english=voices.filter(v=>/^en(?:[-_]|$)/i.test(v.lang));const usable=online?english:english.filter(v=>v.localService);const selected=usable.find(v=>v.voiceURI===preferred);if(selected)return selected;const score=v=>(/enhanced|premium|natural|neural/i.test(v.name)?100:0)+(/samantha|ava|allison|serena|google us english|jenny/i.test(v.name)?30:0)+(/^en[-_]US$/i.test(v.lang)?20:0)+(v.default?5:0)+(v.localService?2:0);return [...usable].sort((a,b)=>score(b)-score(a))[0];}
