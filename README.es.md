# English Coach

Un skill de [Claude Code](https://docs.anthropic.com/en/docs/claude-code) que convierte cada conversación en una sesión de práctica de inglés.

**Otros idiomas:**
[English](./README.md) | [中文](./README.zh-CN.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Português](./README.pt-BR.md) | [Tiếng Việt](./README.vi.md) | [ภาษาไทย](./README.th.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

## Qué hace

Al activarse, Claude hará tres cosas en cada respuesta:

1. **Responder tu pregunta normalmente** — primero hace su trabajo
2. **Corregir tu inglés** — gramática, ortografía, vocabulario, puntuación, expresión
3. **Enseñar algo nuevo** — frases útiles, tips de gramática, formas más naturales de decir las cosas

Diseñado para **hablantes no nativos de inglés** que quieren mejorar su inglés a través del uso diario real, no con ejercicios de libro de texto.

## Características

- **Correcciones categorizadas**: Ortografía / Gramática / Vocabulario / Puntuación / Expresión
- **Se adapta a tu nivel**: enfoque en lo básico para principiantes, naturalidad para avanzados
- **Seguimiento de errores recurrentes**: si repites un error, se marca como patrón
- **Contenido educativo rotativo**: modismos, tips gramaticales, reformulaciones avanzadas, errores comunes de hispanohablantes
- **Tono amigable**: como un compañero de trabajo amable, no un profesor estricto

## Instalación

```bash
npx skills add tianmind-studio/english-coach -a claude-code -g -y
```

## Uso

En Claude Code, escribe:

```
/english-coach
```

Luego simplemente chatea en inglés como lo harías normalmente. El skill corregirá y enseñará automáticamente.

## Ejemplo

**Tú dices:**
> I have 25 years old and I work since 3 years

**Claude responde:**

*(responde tu pregunta)*

---

**English Corrections:**

> ~~I have 25 years old~~ → **I am 25 years old**
>
> **[Gramática]** "I have 25 years" → "I am 25 years old" — en inglés se usa "to be", no "to have" para la edad
>
> ~~I work since 3 years~~ → **I've been working for 3 years**
>
> **[Gramática]** "since 3 years" → "for 3 years" — "since" es para fechas específicas, "for" para duraciones
> **[Gramática]** "I work" → "I've been working" — present perfect continuous para acciones que empezaron en el pasado y continúan

**Frase del día:** "get the hang of" — acostumbrarse a algo, pillarle el truco.
*Ejemplo: I'm starting to get the hang of English prepositions. (Estoy empezando a pillarle el truco a las preposiciones en inglés.)*

## Licencia

MIT
