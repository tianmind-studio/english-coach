# English Coach

모든 대화를 영어 연습 시간으로 바꿔주는 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 스킬입니다.

**다른 언어：**
[English](./README.md) | [中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [Español](./README.es.md) | [Português](./README.pt-BR.md) | [Tiếng Việt](./README.vi.md) | [ภาษาไทย](./README.th.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

## 무엇을 하나요

활성화하면 Claude가 매 응답에서 세 가지를 수행합니다:

1. **질문에 정상적으로 답변** — 본래 할 일을 먼저 합니다
2. **영어 교정** — 문법, 철자, 어휘, 구두점, 표현
3. **새로운 것을 가르침** — 유용한 표현, 문법 팁, 더 자연스러운 표현법

**비영어권 사용자**를 위해 설계되었습니다. 교과서가 아닌 일상 대화를 통해 자연스럽게 영어 실력을 향상시킵니다.

## 특징

- **카테고리별 교정**: 철자 / 문법 / 어휘 선택 / 구두점 / 표현
- **수준 적응**: 초보자는 기초 교정, 고급자는 자연스러운 표현에 집중
- **반복 실수 추적**: 같은 실수가 반복되면 패턴으로 지적
- **학습 콘텐츠 순환**: 관용구, 문법 팁, 고급 표현, 한국인이 자주 하는 실수
- **친근한 톤**: 엄격한 선생님이 아닌 친절한 동료처럼

## 설치

```bash
npx skills add tianmind-studio/english-coach -a claude-code -g -y
```

## 사용법

Claude Code에서 다음을 입력하세요:

```
/english-coach
```

그런 다음 영어로 평소처럼 대화하면 됩니다. 스킬이 자동으로 교정하고 가르쳐줍니다.

## 예시

**당신이 말한 것:**
> I am not good at to speak english

**Claude 응답:**

*（질문에 답변）*

---

**English Corrections:**

> ~~I am not good at to speak english~~ → **I'm not good at speaking English.**
>
> **[문법]** "good at to speak" → "good at speaking" — "good at" 뒤에는 동명사(-ing)를 사용합니다
> **[구두점]** "english" → "English" — 언어 이름은 항상 대문자로 시작합니다

**오늘의 표현:** "get the hang of" — 무언가의 요령을 익히다.
*예문: I'm starting to get the hang of English grammar. (영어 문법의 요령을 잡기 시작했다.)*

## 라이선스

MIT
