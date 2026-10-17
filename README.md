# SEM-QUEST

A gamified study planner and to-do list for the run-up to semester exams. Every day has a ready-made timetable (study blocks, DSA, Python, labs, rest, sleep). Tick tasks off to earn XP, level up, build streaks and unlock badges.

**Live demo:** https://subhrajeetshaw008-bit.github.io/Sem-Quest/

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

## Features

- **56-day plan** starting 16 Oct 2026, with a countdown to exams (around 10 Dec)
- **Daily to-do list** generated from the weekday, with the topic rotating week by week
- **XP, levels and ranks** (Rookie to Legend)
- **Streaks** with a multiplier of up to 2x for consecutive perfect days
- **Badges** such as First step, Week warrior and Unstoppable
- **Edit, remove, undo and add** your own bonus tasks on any day
- **Locked rewards:** the gaming slot unlocks only after that day's focus blocks are done
- **Light and dark theme**, responsive layout, keyboard accessible
- **Progress saved automatically** in your browser (`localStorage`)

## Run it

Open `index.html` in any browser. That is all.

Or serve it locally:

```bash
git clone https://github.com/subhrajeetshaw008-bit/Sem-Quest.git
cd Sem-Quest
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy free on GitHub Pages

1. Fork or push this project to your own GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. Your app will be live at `https://<your-username>.github.io/<repo-name>/`.

## Project
