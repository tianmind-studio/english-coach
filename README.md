# English Coach

A skill for **[Antigravity CLI](https://github.com/google-deepmind)** and **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** that turns every conversation and pair-programming session into an English practice session.

[![Release](https://img.shields.io/github/v/release/tianmind-studio/english-coach)](https://github.com/tianmind-studio/english-coach/releases/latest)
[![Built for Antigravity](https://img.shields.io/badge/built%20for-Antigravity%20CLI-4285F4)](https://github.com/google-deepmind)
[![Built for Claude Code](https://img.shields.io/badge/built%20for-Claude%20Code-8A2BE2)](https://docs.anthropic.com/en/docs/claude-code)
[![Live Guide](https://img.shields.io/badge/Live_Guide-GitHub_Pages-4FACFE)](https://tianmind-studio.github.io/english-coach/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Quick links:
- Live guide: <https://tianmind-studio.github.io/english-coach/>
- Latest release: <https://github.com/tianmind-studio/english-coach/releases/latest>
- Canonical Skill (Claude Code & Antigravity): [`english-coach/SKILL.md`](./english-coach/SKILL.md)
- Antigravity Workspace Rule: [`rules/AGENTS.md`](./rules/AGENTS.md)
- Installation Script: [`install.sh`](./install.sh)
- Practical scenarios: [`examples/chat-scenarios.md`](./examples/chat-scenarios.md)
- FAQ: [`FAQ.md`](./FAQ.md)

**README in other languages:**
[中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt-BR.md) | [Tiếng Việt](./README.vi.md) | [ภาษาไทย](./README.th.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

## Why people star this repo

- **Zero workflow disruption**: Answers questions and writes code first, then coaches your English at the bottom of the response.
- **Developer & Pair-Programming aware**: Does not nag or flag intentional code, shell commands, or variable names.
- **Dual compatibility**: Native support for both **Antigravity CLI** (skills, rules, plugins) and **Claude Code**.
- **Practical improvement**: Focuses on real communication, workplace phrasing, and common non-native mistakes instead of dry drills.

## What it does

When activated, your AI assistant will:

1. **Answer your question normally** — it writes the code, debugs, or answers your question first.
2. **Correct your English** — provides structured corrections for grammar, spelling, word choice, punctuation, and expression.
3. **Teach something new** — rotates between phrases of the day, practical grammar tips, level-up rephrasings, and common mistakes.

Designed for **non-native English speakers** who want to improve their English through daily work.

## Features

- **Categorized corrections**: `Spelling` / `Grammar` / `Word Choice` / `Punctuation` / `Expression`.
- **Adaptive leveling**: Gentle on basics for beginners; focuses on nuances, idiomatic phrasing, and flow for advanced speakers.
- **Mistake tracking**: Identifies and flags recurring patterns over multiple messages.
- **Rotates learning bites**: Idioms, clear grammar formulas, advanced rephrasings, and frequent non-native traps.
- **Friendly tone**: Like an encouraging coworker, not an exam proctor.

---

## Installation

### For Antigravity CLI

You can install English Coach using the provided [`install.sh`](./install.sh) script, or copy the files directly into your project or configuration folder.

#### Option A: Interactive Installer

Run the installer wizard:

```bash
chmod +x ./install.sh
./install.sh
```

#### Option B: Fast CLI Commands

**1. Install globally (on-demand across all projects):**
```bash
./install.sh --global
# Installs to ~/.gemini/config/skills/english-coach/SKILL.md
```

**2. Install in your current project workspace:**
```bash
./install.sh --local
# Installs to ./.agents/skills/english-coach/SKILL.md
```

**3. Install as an Always-On workspace rule:**
```bash
./install.sh --rule
# Installs to ./AGENTS.md for continuous coaching on every turn
```

**4. Install as a complete plugin bundle:**
```bash
./install.sh --plugin-local
# Installs to ./.agents/plugins/english-coach/
```

---

### For Claude Code

**Option 1 — via npx:**
```bash
npx skills add tianmind-studio/english-coach -a claude-code -g -y
```

**Option 2 — from release package:**
1. Open <https://github.com/tianmind-studio/english-coach/releases/latest>
2. Download `english-coach.skill`
3. Import it into Claude Code / Claude Desktop

---

## Usage

### In Antigravity CLI

- **On-Demand Mode (Skill):**
  Type `/english-coach` or simply say:
  > Let's practice English while working on this feature.
- **Continuous Mode (Rule):**
  If you installed the `AGENTS.md` rule or enabled the plugin, English Coach will automatically coach your English on every turn without needing explicit invocation.

### In Claude Code

In your terminal or chat, type:
```
/english-coach
```
Then chat or work normally.

---

## Example 1

**You say:**
> dose this work for practice my english?

**Assistant responds:**

*(answers your question)*

---

**English Corrections:**

> ~~dose this work for practice my english?~~ → **Does this work for practicing my English?**
>
> **[Spelling]** "dose" → "does"
> **[Grammar]** "for practice" → "for practicing" — after "for", use the -ing form
> **[Punctuation]** "english" → "English" — language names are always capitalized

---

## Example 2

**You say:**
> His has a great time yesterday.

**Assistant responds:**

*(answers your question)*

---

**English Corrections:**

> ~~His has a great time yesterday.~~ → **He had a great time yesterday.**
>
> **[Grammar]** "His" → "He" — "His" is possessive, "He" is a subject pronoun
> **[Grammar]** "has" → "had" — "yesterday" indicates past time, so the verb should be past tense

---

## Example 3 (Developer Context)

**You say:**
> I create new PR for fix bug in auth controller and make discussion with team.

**Assistant responds:**

*(reviews your PR / provides technical assistance)*

---

**English Corrections:**

> ~~I create new PR for fix bug in auth controller and make discussion with team.~~ → **I created a new PR to fix the bug in the auth controller and had a discussion with the team.**
>
> **[Grammar]** "I create" → "I created" — use past tense for completed actions.
> **[Grammar]** "for fix" → "to fix" — use "to + infinitive" to express purpose.
> **[Grammar]** "new PR" / "auth controller" → "a new PR" / "the auth controller" — add missing articles.
> **[Word Choice]** "make discussion" → "had a discussion" — we "have" a discussion in English.

**Phrase of the day:** "walk through" — to explain or examine something step-by-step.
*Example: "Let's walk through the auth flow during tomorrow's standup."*

---

## License

[MIT](./LICENSE)

---

If this helps you practice English more consistently, consider starring the repo so more learners can find it.
