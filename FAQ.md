# English Coach FAQ

## Who is this skill for?

English Coach is designed for non-native English speakers who want to improve through real daily usage rather than separate study sessions.

Typical good fit:
- developers using Claude Code in English
- professionals writing messages, summaries, and requests
- learners who want practical correction in context

## What makes it different from a normal English tutor prompt?

It does two jobs in one response:
1. answer the real question
2. coach your English

That means you can keep using Claude for actual work while still improving.

## Does it correct every single mistake?

Not necessarily. The design intentionally prioritizes the most important mistakes so the correction section stays readable.

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
- status updates
- meeting follow-ups
- short emails
- polite requests

## Can I use it for technical questions?

Yes. It still answers technical questions first, then gives English coaching after that.

This is why it works well in Claude Code.

## Is this good for long essays or formal documents?

Not as the primary workflow.

For long-form editing, line-by-line revision, or publication-quality polishing, use a dedicated editing workflow. English Coach is strongest for conversational and day-to-day practical usage.

## What if I only want corrections and not extra teaching?

Say it explicitly.

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
- keep one stable focus (business English, natural phrasing, grammar, etc.)
- ask it to track recurring mistakes

Example:

```text
For the next few messages, track my recurring mistakes and focus on natural business English.
```

## Is it only for beginners?

No.

Beginner use:
- spelling
- capitalization
- basic grammar

Intermediate / advanced use:
- natural phrasing
- tone
- clarity
- more native-sounding rewrites

## What should I do if the corrections feel too long?

Tell the skill to limit them.

```text
Correct only the 3 most important mistakes.
```

## What should I do if the corrections feel too weak?

Ask for stronger feedback.

```text
Please be direct and point out recurring mistakes clearly.
```

## Where should I give feedback or suggest improvements?

- Discussions: <https://github.com/tianmind-studio/english-coach/discussions>
- Issues: <https://github.com/tianmind-studio/english-coach/issues>
- Roadmap issue: <https://github.com/tianmind-studio/english-coach/issues/3>
