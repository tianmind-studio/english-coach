# English Coach FAQ

## Who is this skill for?

English Coach is designed for non-native English speakers who want to improve through real daily usage rather than separate study sessions.

Typical good fit:
- developers using Antigravity CLI or Claude Code in English
- professionals writing messages, PR descriptions, summaries, and requests
- learners who want practical correction in context without interrupting their flow

## What makes it different from a normal English tutor prompt?

It does two jobs in one response:
1. answer the real question / execute the real task
2. coach your English

That means you can keep using your assistant for actual coding and work while still improving.

## How does it work with Antigravity CLI?

In Antigravity CLI, you have two options depending on your preferred workflow:
1. **On-Demand (Skill)**: Install into `.agents/skills/english-coach/SKILL.md` or `~/.gemini/config/skills/english-coach/SKILL.md`. It triggers when you invoke `/english-coach` or ask for English coaching.
2. **Continuous Always-On (Rule)**: Install as `AGENTS.md` (or `.agents/rules/AGENTS.md`). The agent will coach your English on every response throughout your project sessions.
3. **Plugin Bundle**: Install `.agents/plugins/english-coach/` to get both the skill and rules in a self-contained package.

You can use `./install.sh` to install any of these options easily.

## Will it interfere with my code, git commands, or terminal syntax?

No. The skill is specifically instructed to recognize developer context. It will **not** treat intentional variable names, shell commands, git branch names, or programming syntax as English mistakes unless you explicitly ask it to proofread your naming or docstrings.

## Does it correct every single mistake?

Not necessarily. The design intentionally prioritizes the most important mistakes (up to 5 per response) so the correction section stays readable and doesn't overwhelm you.

If you want stricter behavior, say so directly:

```text
Please be stricter and catch as many mistakes as possible.
```

## Can I make it gentler?

Yes. Example:

```text
Please keep corrections short and encouraging because I am still a beginner.
```

## Can I ask it to focus on spoken English instead of grammar?

Yes. Example:

```text
Please focus more on natural spoken English than grammar rules.
```

## Can I use it for work writing?

Yes — this is one of the best use cases.

Examples:
- messages to managers or clients
- pull request (PR) descriptions and commit messages
- status updates and issue comments
- meeting follow-ups
- short emails and polite requests

## Can I use it for technical questions?

Yes. It answers technical questions and pair-programs first, then provides English coaching after that.

## Is this good for long essays or formal documents?

Not as the primary workflow.

For long-form editing, line-by-line revision, or publication-quality polishing, use a dedicated editing workflow. English Coach is strongest for conversational and day-to-day practical usage.

## What if I only want corrections and not extra teaching?

Say it explicitly:

```text
Please answer normally, then give corrections only. Skip the teaching part today.
```

## What if I only want one small lesson per turn?

That is already the default style, but you can make it even more specific:

```text
Please teach only one short thing after each answer.
```

## How do I get the most improvement from this skill?

A good pattern is:
- use it repeatedly over several days
- keep one stable focus (business English, natural phrasing, technical communication, etc.)
- ask it to track recurring mistakes

Example:

```text
For the next few messages, track my recurring mistakes and focus on natural engineering communication.
```

## Is it only for beginners?

No.

Beginner use:
- spelling
- capitalization
- basic grammar and tenses

Intermediate / advanced use:
- natural phrasing and collocations
- professional tone
- clarity and precision
- more native-sounding rewrites

## What should I do if the corrections feel too long?

Tell the assistant:

```text
Correct only the 3 most important mistakes.
```

## What should I do if the corrections feel too weak?

Ask for stronger feedback:

```text
Please be direct and point out recurring mistakes clearly.
```

## Where should I give feedback or suggest improvements?

- Discussions: <https://github.com/tianmind-studio/english-coach/discussions>
- Issues: <https://github.com/tianmind-studio/english-coach/issues>
- Roadmap issue: <https://github.com/tianmind-studio/english-coach/issues/3>
