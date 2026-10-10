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
export function validProgress(raw){const blank={stars:0,completed:{sounds:0,potions:0,spells:0},difficulty:'sprout',voice:true,effects:true};if(!raw||typeof raw!=='object')return blank;const count=x=>Number.isSafeInteger(x)&&x>=0?Math.min(x,1000000):0;return {...blank,stars:count(raw.stars),completed:Object.fromEntries(Object.keys(blank.completed).map(k=>[k,count(raw.completed?.[k])])),difficulty:['sprout','glow','star'].includes(raw.difficulty)?raw.difficulty:'sprout',voice:typeof raw.voice==='boolean'?raw.voice:true,effects:typeof raw.effects==='boolean'?raw.effects:true};}
