# Sem III Quest

A gamified study planner and to-do list for the run-up to semester exams. Every day has a ready-made timetable (study blocks, DSA, Python, labs, rest, sleep). Tick tasks off to earn XP, level up, build streaks and unlock badges.

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

## Features

- **56-day plan** starting 16 Oct 2026, with a countdown to exams (around 10 Dec)
- **Daily to-do list** generated from the weekday, with the topic rotating week by week
- **XP, levels and ranks** (Rookie to Legend)
- **Streaks** with a multiplier of up to 2x for consecutive perfect days
- **Badges** such as First step, Week warrior and Unstoppable
- **Edit, remove, undo and add** your own bonus tasks on any day
- **Locked rewards**: the gaming slot unlocks only after that day's focus blocks are done
- **Light and dark theme**, responsive layout, keyboard accessible
- **Progress saved automatically** in your browser (`localStorage`)

## Run it

Open `index.html` in any browser. That is all.

Or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy free on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. Your app will be live at `https://<your-username>.github.io/<repo-name>/`.

## Project structure

```
sem3-quest/
├── index.html   # page markup
├── style.css    # styling and light/dark themes
├── script.js    # timetable generator, XP logic, rendering, storage
├── README.md
├── LICENSE
└── .gitignore
```

## Customising

- **Start date or length**: edit `S0` (start date) and `N` (number of days) at the top of `script.js`.
- **Exam date**: change `new Date(2026,11,10)` in the `render()` function.
- **Subjects and timetable**: edit the `plan()` function in `script.js`.
- **XP values**: edit the `xp()` function.
- **Reset all progress**: clear this site's data in your browser, or run `localStorage.removeItem('sem3-quest-v1')` in the console.

## How points work

| Task type | XP |
|---|---|
| Study and DSA blocks | 20 |
| Python and lab blocks | 15 |
| Sleep on time | 5 |
| Bonus tasks you add | 10 |
| Finish every focus block in a day | +50 |

Each consecutive perfect day adds 10% to that day's XP, up to 2x.

## License

MIT
