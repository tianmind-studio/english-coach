# English Coach

Uma skill do [Claude Code](https://docs.anthropic.com/en/docs/claude-code) que transforma cada conversa em uma sessão de prática de inglês.

**Outros idiomas:**
[English](./README.md) | [中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Tiếng Việt](./README.vi.md) | [ภาษาไทย](./README.th.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

## O que faz

Quando ativado, o Claude faz três coisas em cada resposta:

1. **Responde sua pergunta normalmente** — primeiro faz o trabalho dele
2. **Corrige seu inglês** — gramática, ortografia, vocabulário, pontuação, expressão
3. **Ensina algo novo** — frases úteis, dicas de gramática, formas mais naturais de se expressar

Projetado para **falantes não nativos de inglês** que querem melhorar seu inglês no uso diário real, sem precisar de exercícios de livro didático.

## Recursos

- **Correções categorizadas**: Ortografia / Gramática / Vocabulário / Pontuação / Expressão
- **Adapta-se ao seu nível**: foco no básico para iniciantes, naturalidade para avançados
- **Rastreamento de erros recorrentes**: se você repete um erro, ele é marcado como padrão
- **Conteúdo educativo rotativo**: expressões idiomáticas, dicas de gramática, reformulações avançadas, erros comuns de falantes de português
- **Tom amigável**: como um colega de trabalho prestativo, não um professor rígido

## Instalação

```bash
npx skills add tianmind-studio/english-coach -a claude-code -g -y
```

## Como usar

No Claude Code, digite:

```
/english-coach
```

Depois é só conversar em inglês normalmente. A skill vai corrigir e ensinar automaticamente.

## Exemplo

**Você diz:**
> I have 30 years and I work with programming since 5 years

**Claude responde:**

*(responde sua pergunta)*

---

**English Corrections:**

> ~~I have 30 years~~ → **I'm 30 years old**
>
> **[Gramática]** "I have 30 years" → "I'm 30 years old" — em inglês usa-se "to be", não "to have" para idade
>
> ~~I work with programming since 5 years~~ → **I've been working with programming for 5 years**
>
> **[Gramática]** "since 5 years" → "for 5 years" — "since" é para datas específicas, "for" para durações
> **[Gramática]** "I work" → "I've been working" — present perfect continuous para ações que começaram no passado e continuam

**Expressão do dia:** "get the hang of" — pegar o jeito de algo.
*Exemplo: I'm starting to get the hang of English prepositions. (Estou começando a pegar o jeito das preposições em inglês.)*

## Licença

MIT
