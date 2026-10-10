# Avery Spells

A magic-themed, installable spelling PWA for a kindergarten learner. No frameworks, dependencies, accounts, analytics, or backend.

## Three adventures

- **Sound Crystals:** choose the beginning letter of a spoken picture word. Inspired by the Beginning Sounds Search worksheet (house, door, kangaroo, bee, vase, lemon, elephant, leaf, kite, glove, ball). The original photo is not published.
- **Letter Potions:** fill a missing letter in a pictured word.
- **Spell Workshop:** arrange letter tiles to spell a spoken word.

Each quest contains five words. Correct answers award one star, including answers after a retry; stars are never deducted. Complete quests to track module practice. Collect a dragon at 10 stars, an owl at 25, and a unicorn at 50. Rank advances at 20 and 50 stars. No timers or daily streak obligations.

Settings offer Apprentice (two choices and first-letter help), Wizard (three choices and short words), and Archmage (four choices, some four-letter words, and extra spelling tiles). Each new quest uses the selected difficulty. Speech synthesis says whole words, not isolated phonemes: the learner identifies the first letter. Picture names are read aloud to reduce emoji ambiguity. Speech and synthesized chimes can be switched off.

## GitHub Pages setup — once

1. Open repository **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
2. Open **Actions → Test and deploy Avery Spells → Run workflow** to deploy the existing main branch. Every later push to `main` runs tests, builds the offline app, and deploys automatically.
3. The expected project URL is **https://kjhunkler.github.io/AverySpells/**. The workflow's deployment output is authoritative.

The current repository is private. GitHub Pages for a private personal repository requires GitHub Pro (or another eligible paid plan). If Pages is unavailable, upgrade or deliberately make this repository public. The default Pages website itself is public even when its source is private. Repository visibility has not been changed. See https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site.

The GitHub connector can write repository files but cannot enable the Pages administration setting. A first deployment may fail at Configure Pages until step 1 is completed. Workflow permissions require `contents: read`, `pages: write`, and `id-token: write`; no manual secrets are needed. Ensure Actions are enabled and any github-pages environment approval rules permit deployment from main.

## Local development

Requires Node 22+; no dependency installation needed.

```sh
npm test
npm run build
python3 -m http.server 8080 --directory dist
```

Visit localhost:8080. Use HTTPS for deployment; service workers also work on localhost. All asset paths are relative, so the app works beneath `/AverySpells/`.

## Installation and offline behavior

On iOS Safari: Share → Add to Home Screen. On supporting browsers an Install app button appears, or use the browser's install menu. Open online once and allow the service worker to finish caching before using offline. Whole-word speech depends on installed browser/device voices and may not work offline; other gameplay stays available. A displayed Hear the word button lets a grown-up name the picture if speech is unavailable.

Each build hashes the app files and images to produce a new service-worker cache version. An update waits until old app windows close; close and reopen the app after a deploy to receive it without interrupting a quest. Old app caches are then removed. Local progress survives app updates, but clearing site data removes it. Storage failures allow play and show a warning. There is no sync between devices.

## Extending

Edit `site/game.js` to add reviewed word/emoji pairs or modules. Add corresponding UI behavior in `site/app.js`. Keep beginning-sound words unambiguous and spelling words suitable for a beginning reader. Avoid silent initial letters or tricky spellings at beginner levels. `site/style.css` contains responsive styling and reduced-motion support. Tests check valid questions, answer choices, repeated-letter tiles, and stored-progress recovery. Build output in `dist/` is generated, not committed.

## Verification

Node gameplay tests, JavaScript syntax checks, and production build pass. Browser visual QA, device speech, installation, and offline transitions require browser/device verification. Suggested smoke test: play all three modules on each difficulty, retry an answer, earn a companion, refresh, toggle audio, then install and launch offline after the first online load.

## Celebrations and storyteller voices

Each module has six rotating success messages (no immediate repeats), with six quest-completion messages. Short crystal, bubble, and star bursts celebrate answers; a bigger burst celebrates a quest, and a new companion is announced when unlocked. Ambient wizard motion and all celebrations respect reduced-motion preferences and the Magical animations setting.

In Grown-up corner, choose an English storyteller voice and preview it. Automatic selection prefers names labeled Enhanced, Premium, Natural, or Neural when the device exposes them, then familiar English voices. Selection is saved on this device and the list refreshes as voices load. Speech rate is slightly slower than normal rather than stretched. Online-only voices fall back to local English voices while offline. Device/browser voice quality varies; this app does not provide a cloud speech service or guarantee humanlike narration.

Project preference: deploy all completed changes, verify the GitHub Actions result, and include https://kjhunkler.github.io/AverySpells/ in the deployment handoff.

## Build your magical academy

The home screen shows a 15-piece construction project: Crystal Garden, Potion Laboratory, and Wizard Tower, each with five milestones. Completing one five-word quest permanently constructs the next piece in that module. Existing completed quests count toward construction; counts beyond five remain intact while the building stays complete. Stars and earlier star companions are preserved.

The next suggested building is the least complete building, but all games stay available. Each quest shows exactly what it builds. Five crystals fill immediately as words are answered. Quest completion reveals the new structure, lets the learner choose Moonlight, Sunshine, or Enchanted forest colors, and shows the next milestone. Colors can be changed later for individual built pieces.

At five quests, each building welcomes its own companion. Visit the garden to feed a dragon, mix two pretend ingredients with the laboratory frog, or cast flower, snow, and star spells with the tower owl. These are freely available celebration activities, with no stars or evidence scores. Once all 15 pieces are built, the learner can name the academy. All interaction effects respect animation settings.

The Spell Book records module/difficulty/word histories from this update onward; prior detailed word history cannot be reconstructed. One completed appearance is Discovered; two or more appearances are Practicing; at least two first-try answers in separate quests without the displayed first-letter hint are Used independently. A retry marks that appearance as supported, and Apprentice spelling always counts as supported because its first-letter hint is shown. These labels describe in-app practice, not demonstrated mastery outside the game. Two words with supported histories may return in a quest while independent evidence is still below two. Progress and rewards never penalize mistakes.

New tests cover old-save migration, capped construction, distinct-quest evidence, supported-word review, and safe persistent customization. Device/browser visual verification remains a separate check.
