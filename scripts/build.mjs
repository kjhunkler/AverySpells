import {rm,mkdir,cp,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('site','dist',{recursive:true});
const files=['index.html','app.js','game.js','style.css','manifest.webmanifest','sw.js','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
const hash=createHash('sha256');for(const file of files)hash.update(await readFile(`site/${file}`));
const version=hash.digest('hex').slice(0,16);const sw=await readFile('site/sw.js','utf8');await writeFile('dist/sw.js',sw.replace('__VERSION__',version));await writeFile('dist/.nojekyll','');console.log(`Built offline app version ${version}`);
