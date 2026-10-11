import {normalizeAcademy} from './academy.js';
export const words = [
 ['cat','🐱'],['dog','🐶'],['sun','☀️'],['hat','🎩'],['pig','🐷'],['hen','🐔'],['bat','🦇'],['bug','🐛'],['fox','🦊'],['cup','☕'],['bus','🚌'],['bed','🛏️'],['map','🗺️'],['net','🥅'],['pot','🍲'],['pan','🍳'],['log','🪵'],['web','🕸️'],['jam','🍓'],['van','🚐'],
 ['frog','🐸'],['crab','🦀'],['drum','🥁'],['star','⭐'],['flag','🚩'],['plum','🟣']
].map(([word,emoji])=>({word,emoji}));
export const sounds = [ ['house','🏠'],['door','🚪'],['kangaroo','🦘'],['bee','🐝'],['vase','🏺'],['lemon','🍋'],['elephant','🐘'],['leaf','🍃'],['kite','🪁'],['glove','🧤'],['ball','⚽'],['moon','🌙'],['fish','🐟'],['rain','🌧️'],['snake','🐍'],['turtle','🐢'] ].map(([word,emoji])=>({word,emoji}));
export const modules = [
 {id:'sounds',emoji:'💎',title:'Sound Crystals',tag:'LISTEN & DISCOVER',description:'Hear a word. Find its first letter. Light up your crystals.',goal:'Light 5 crystals',reward:'💎',color:'mint'},
 {id:'potions',emoji:'🧪',title:'Letter Potions',tag:'FIND THE MISSING LETTER',description:'A letter has vanished! Drop it back into your word potion.',goal:'Brew 5 potions',reward:'🧪',color:'peach'},
 {id:'spells',emoji:'🪄',title:'Spell Workshop',tag:'BUILD A WHOLE WORD',description:'Gather letter tiles and put them in order to cast a spell.',goal:'Cast 5 spells',reward:'🪄',color:'lilac'},
 {id:'endings',emoji:'🔔',title:'Ending Echoes',tag:'MODULE 4 · LAST SOUNDS',description:'Listen all the way to the end. Find the last letter and wake the cave bells.',goal:'Ring 5 bells',reward:'🔔',color:'sky'},
 {id:'rhymes',emoji:'🎵',title:'Rhyme Runes',tag:'MODULE 5 · RHYMING WORDS',description:'Cat and hat! Find words that rhyme and bring music to your meadow.',goal:'Match 5 rhymes',reward:'🎵',color:'rose'},
 {id:'families',emoji:'🌳',title:'Word Families',tag:'MODULE 6 · SHARED ENDINGS',description:'Find the ending that belongs to your word. Grow a treehouse of word families.',goal:'Grow 5 word branches',reward:'🌳',color:'lime'}
];
export function shuffle(items,random=Math.random){const copy=[...items]; for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
export function makeQuest(module,difficulty,random=Math.random){const pool=questPool(module,difficulty); return shuffle(pool,random).slice(0,5);}
export function choices(answer,count,random=Math.random){return shuffle([answer,...shuffle([... 'abcdefghijklmnopqrstuvwxyz'].filter(x=>x!==answer),random).slice(0,count-1)],random);}
export function missingIndex(word,difficulty,random=Math.random){return difficulty==='sprout'?0:difficulty==='glow'?1:Math.floor(random()*word.length);}
export function spellTiles(word,difficulty,random=Math.random){const extras=difficulty==='star'?shuffle([... 'abcdefghijklmnopqrstuvwxyz'].filter(x=>!word.includes(x)),random).slice(0,2):[];return shuffle([...word,...extras],random).map((letter,id)=>({letter,id}));}
export function validProgress(raw){const blank={stars:0,completed:Object.fromEntries(modules.map(m=>[m.id,0])),difficulty:'sprout',voice:true,effects:true,voiceURI:'',animations:true,academy:normalizeAcademy()};if(!raw||typeof raw!=='object')return blank;const count=x=>Number.isSafeInteger(x)&&x>=0?Math.min(x,1000000):0;return {...blank,stars:count(raw.stars),completed:Object.fromEntries(Object.keys(blank.completed).map(k=>[k,count(raw.completed?.[k])])),difficulty:['sprout','glow','star'].includes(raw.difficulty)?raw.difficulty:'sprout',voice:typeof raw.voice==='boolean'?raw.voice:true,effects:typeof raw.effects==='boolean'?raw.effects:true,voiceURI:typeof raw.voiceURI==='string'?raw.voiceURI.slice(0,500):'',animations:typeof raw.animations==='boolean'?raw.animations:true,academy:normalizeAcademy(raw.academy)};}

export const celebrations = {
 sounds: ['Your crystal is glowing!', 'You found the sound!','Crystal magic!','That letter shines!','A bright little discovery!','You lit up the crystal!'],
 potions: ['A perfect potion!','Bubble, bubble, word magic!','Your potion is sparkling!','You found the missing magic!','A brilliant brew!','That letter fits beautifully!'],
 spells: ['You cast the spell!','Your word has magic!','A wonderful word spell!','Your wand is sparkling!','Letters together, magic forever!','You built a brilliant word!'],
 endings:['You caught the last sound!','Your echo bell is ringing!','Listen to that magic echo!','Your cave is glowing!','A wonderful ending!','The bat heard your magic!'],
 rhymes:['A perfect rhyme!','Your words sing together!','Your meadow has a new tune!','The fox loves that rhyme!','Two words, one magical sound!','Your rhyme rune is glowing!'],
 families:['You found its word family!','A new branch of word magic!','Your treehouse is growing!','That ending fits perfectly!','The squirrel found a word family!','Your family flag is flying!'],
 quests: ['Five words, a whole lot of magic!','Your magic is growing!','A wonderful quest, little wizard!','Look at all the words you discovered!','Your academy is sparkling!','Another adventure in your spell book!']
};
export function pickCelebration(kind,previous='',random=Math.random){const pool=(celebrations[kind]||celebrations.quests).filter(line=>line!==previous);return pool[Math.floor(random()*pool.length)];}
export function chooseVoice(voices,preferred='',online=true){const english=voices.filter(v=>/^en(?:[-_]|$)/i.test(v.lang));const usable=online?english:english.filter(v=>v.localService);const selected=usable.find(v=>v.voiceURI===preferred);if(selected)return selected;const score=v=>(/enhanced|premium|natural|neural/i.test(v.name)?100:0)+(/samantha|ava|allison|serena|google us english|jenny/i.test(v.name)?30:0)+(/^en[-_]US$/i.test(v.lang)?20:0)+(v.default?5:0)+(v.localService?2:0);return [...usable].sort((a,b)=>score(b)-score(a))[0];}


// All rhyme examples use regular short-vowel spellings and unambiguous rime groups.
export const rhymePairs=[
 ['cat','🐱','hat','🎩'],['dog','🐶','log','🪵'],['sun','☀️','bun','🥖'],['pig','🐷','wig','💇'],['hen','🐔','pen','🖊️'],['bug','🐛','rug','🧶'],['bed','🛏️','red','🔴'],['fox','🦊','box','📦'],['net','🥅','jet','✈️'],['pan','🍳','van','🚐'],['map','🗺️','cap','🧢'],['pot','🍲','dot','🔵']
].map(([word,emoji,match,matchEmoji])=>({word,emoji,match,matchEmoji}));
export function questPool(module,difficulty){if(module==='sounds')return sounds;if(module==='rhymes')return rhymePairs;if(module==='families')return words.filter(x=>x.word.length===3);return words.filter(x=>(difficulty==='star'||x.word.length===3)&&(module!=='endings'||x.word!=='star'));}
export function questionFor(module,difficulty,q,random=Math.random){const count={sprout:2,glow:3,star:4}[difficulty];const blank=missingIndex(q.word,difficulty,random);if(module==='sounds')return {answer:q.word[0],options:choices(q.word[0],count,random),title:'Find the first letter',prompt:`${q.word}. Which letter starts ${q.word}?`,mode:'letters'};
 if(module==='endings'){const answer=q.word.at(-1);return {answer,options:choices(answer,count,random),title:'Find the last letter',prompt:`${q.word}. Listen to the end of ${q.word}. Which letter makes the last sound?`,mode:'letters'};}
 if(module==='rhymes'){const others=shuffle(rhymePairs.filter(x=>x.match.slice(1)!==q.word.slice(1)),random).slice(0,count-1).map(x=>({value:x.match,emoji:x.matchEmoji}));return {answer:q.match,options:shuffle([{value:q.match,emoji:q.matchEmoji},...others],random),title:'Find a rhyming word',prompt:`${q.word}. Which word rhymes with ${q.word}? Listen to each choice.`,mode:'rhymes'};}
 if(module==='families'){const answer=q.word.slice(1),rimes=[...new Set(words.filter(x=>x.word.length===3).map(x=>x.word.slice(1)))];return {answer,options:shuffle([answer,...shuffle(rimes.filter(x=>x!==answer),random).slice(0,count-1)],random),title:'Find the word ending',prompt:`${q.word}. ${q.word} starts with ${q.word[0]}. Choose the ending that completes ${q.word}.`,mode:'family'};}
 if(module==='potions')return {answer:q.word[blank],options:choices(q.word[blank],count,random),blank,title:'Find the missing letter',prompt:`${q.word}. Find the missing letter in ${q.word}.`,mode:'missing'};
 return {title:'Build your word',prompt:`${q.word}. Spell ${q.word}.`,mode:'spelling'};
}
