# English Coach

一个 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 技能，让每次对话都变成英语练习课。

**其他语言版本：**
[English](./README.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt-BR.md) | [Tiếng Việt](./README.vi.md) | [ภาษาไทย](./README.th.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

## 它能做什么

激活后，Claude 会在每次回复中做三件事：

1. **正常回答你的问题** —— 先把正事办了
2. **纠正你的英语** —— 语法、拼写、用词、标点、表达方式
3. **教你点新东西** —— 实用短语、语法技巧、更地道的说法

专为**非英语母语者**设计。不用背单词、不用刷题，在日常使用中自然提升英语水平。

## 特性

- **分类纠错**：拼写 / 语法 / 用词 / 标点 / 表达，一目了然
- **自适应难度**：初学者侧重基础纠错，进阶者侧重地道表达
- **重复错误追踪**：同一个错误犯两次，会被重点标记
- **轮换教学内容**：实用短语、语法规则、高级改写、中国人常见错误，每次不同
- **友好语气**：像朋友聊天一样纠正，不是老师批作业

## 安装

```bash
npx skills add tianmind-studio/english-coach -a claude-code -g -y
```

## 使用方法

在 Claude Code 中输入：

```
/english-coach
```

然后正常用英语聊天就行。Skill 会自动纠正并教学。

## 示例

**你说：**
> dose this work for practice my english?

**Claude 回复：**

*（正常回答你的问题）*

---

**English Corrections:**

> ~~dose this work for practice my english?~~ → **Does this work for practicing my English?**
>
> **[拼写]** "dose" → "does"
> **[语法]** "for practice" → "for practicing" —— 介词 for 后面要用动名词（-ing 形式）
> **[标点]** "english" → "English" —— 语言名称首字母要大写

**今日短语：** "get the hang of" —— 逐渐掌握、上手某件事。
*例句：I'm starting to get the hang of English prepositions.（我开始掌握英语介词的用法了。）*

## 许可证

MIT
