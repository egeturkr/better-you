# 🚀 BetterYou

**Become the best version of yourself — one mission at a time.**

BetterYou is a mobile self-improvement app that delivers one meaningful daily mission to help you grow across key life areas. Track your streaks, earn XP, level up, and build the habits that shape a better you.

![React Native](https://img.shields.io/badge/React_Native-Expo_SDK_54-blue?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Platform](https://img.shields.io/badge/Platform-iOS_|_Android-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

- **Daily Growth Missions** — Receive one personalized mission every day
- **7 Growth Categories** — Mind 🧠 · Body 💪 · Discipline 🎯 · Confidence 🔥 · Productivity ⚡ · Social 🤝 · Emotional Wellbeing 🌿
- **Smart Personalization** — Missions are weighted toward your chosen goals
- **Streak Tracking** — Stay consistent and watch your streak grow
- **XP & Leveling** — Earn experience points and level up as you complete missions
- **Mission History** — Full log of your completed, skipped, and missed missions
- **Category Progress** — See how you're growing in each life area
- **100+ Missions** — Curated missions across all categories and difficulty levels
- **Local-First** — All data stored on-device, no account required

---

## 📱 Screens

| Screen | Description |
|--------|-------------|
| **Welcome** | App introduction with motivational messaging |
| **Goal Selection** | Pick 2-3 growth areas to personalize your experience |
| **Home** | Today's mission with complete/skip actions, streak & level display |
| **History** | Scrollable log of past missions grouped by date |
| **Progress** | Category breakdown, completion stats, and XP overview |
| **Profile** | Settings, goal management, and app info |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React Native](https://reactnative.dev/) + [Expo SDK 54](https://expo.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Navigation | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) + AsyncStorage persistence |
| Animations | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) |
| Date Utilities | [date-fns](https://date-fns.org/) |

---

## 📂 Project Structure

```
better-you/
├── app/
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Entry point / router
│   ├── (onboarding)/
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx          # Welcome screen
│   │   ├── goals.tsx            # Goal selection
│   │   └── ready.tsx            # Ready confirmation
│   └── (tabs)/
│       ├── _layout.tsx          # Tab navigator
│       ├── home.tsx             # Today's mission
│       ├── history.tsx          # Mission history
│       ├── progress.tsx         # Progress overview
│       └── profile.tsx          # Settings & profile
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI primitives
│   │   ├── MissionCard.tsx
│   │   ├── CompletionModal.tsx
│   │   ├── GoalSelector.tsx
│   │   ├── HistoryItem.tsx
│   │   └── StreakCounter.tsx
│   ├── constants/
│   │   ├── categories.ts        # Growth category definitions
│   │   ├── missions.ts          # 100+ mission database
│   │   ├── levels.ts            # XP thresholds & level names
│   │   └── tokens.ts            # Design tokens (colors, spacing, fonts)
│   ├── store/
│   │   └── useAppStore.ts       # Zustand store with persistence
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── utils/
│       ├── missionEngine.ts     # Mission selection algorithm
│       └── dates.ts             # Date helper functions
├── assets/                      # App icons, splash screen
├── app.json                     # Expo configuration
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/go) app on your phone
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/egeturkr/better-you.git
cd better-you

# Install dependencies
npm install

# Start the dev server
npx expo start -c
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS) to open on your device.

---

## 🎮 How It Works

1. **Onboard** — Choose 2-3 growth areas that matter to you
2. **Get Your Mission** — Each day, receive one personalized mission
3. **Complete or Skip** — Mark it done to earn XP, or skip if needed
4. **Build Streaks** — Stay consistent for streak bonuses
5. **Level Up** — Watch your XP grow and unlock new levels
6. **Track Progress** — See your growth across all categories

---

## 🎯 Mission Categories

| Category | Focus Area | Example Mission |
|----------|-----------|-----------------|
| 🧠 Mind | Knowledge & learning | Read 10 pages of any book |
| 💪 Body | Fitness & health | Do 20 push-ups |
| 🎯 Discipline | Consistency & willpower | Wake up before 7 AM |
| 🔥 Confidence | Self-belief & courage | Talk to one new person |
| ⚡ Productivity | Focus & output | Finish your most important task first |
| 🤝 Social | Relationships & connection | Call a friend or family member |
| 🌿 Emotional | Wellbeing & mindfulness | Meditate for 5 minutes |

---

## 🗺 Roadmap

- [ ] Push notification reminders
- [ ] Daily reflection journal
- [ ] Badge & achievement system
- [ ] Dark mode
- [ ] Cloud sync & user accounts
- [ ] Weekly progress reports
- [ ] Social sharing
- [ ] Custom mission creation

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  <strong>Small actions. Real growth. Every day.</strong>
</p>
