# English Coach

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) のスキルで、すべての会話を英語練習の場に変えます。

**他の言語：**
[English](./README.md) | [中文](./README.zh-CN.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt-BR.md) | [Tiếng Việt](./README.vi.md) | [ภาษาไทย](./README.th.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

## 何ができるか

有効化すると、Claude は毎回の返信で3つのことを行います：

1. **質問に普通に回答** — まず本来の仕事をこなします
2. **英語を添削** — 文法、スペル、語彙、句読点、表現
3. **新しいことを教える** — 便利なフレーズ、文法のコツ、よりネイティブな言い方

**英語を母語としない方**向けに設計されています。教科書ではなく、日常の会話を通じて自然に英語力を向上させます。

## 特徴

- **カテゴリ別添削**：スペル / 文法 / 語彙選択 / 句読点 / 表現
- **レベル適応**：初心者は基礎的な修正、上級者はより自然な表現に重点
- **繰り返しミスの追跡**：同じ間違いを繰り返すとパターンとして指摘
- **学習コンテンツのローテーション**：慣用句、文法、上級表現、日本人がよくする間違い
- **フレンドリーなトーン**：厳しい先生ではなく、親切な同僚のように

## インストール

```bash
npx skills add tianmind-studio/english-coach -a claude-code -g -y
```

## 使い方

Claude Code で以下を入力：

```
/english-coach
```

あとは普通に英語でチャットするだけ。スキルが自動的に添削・指導してくれます。

## 例

**あなたの発言：**
> I want to ask that is this sentence correct?

**Claude の返信：**

*（質問に回答）*

---

**English Corrections:**

> ~~I want to ask that is this sentence correct?~~ → **I'd like to ask whether this sentence is correct.**
>
> **[表現]** "I want to ask" → "I'd like to ask" — より丁寧で自然
> **[文法]** "ask that is this" → "ask whether this is" — 間接疑問文では語順が平叙文と同じになります

**今日のフレーズ：** "get the hang of" — 何かのコツをつかむこと。
*例文：I'm starting to get the hang of English grammar.（英文法のコツがつかめてきた。）*

## ライセンス

MIT
