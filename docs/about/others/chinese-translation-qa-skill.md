---
icon: lucide/languages
description: "Internal reference for the Chinese technical-translation QA skill: when to use it, its engineering translation standard, workflow, checks, and limits."
---

# Chinese Translation QA Skill

## Purpose

Use this internal skill to translate, review, or polish English technical documentation into Chinese for μForge.io. It protects technical accuracy and source completeness while making the result read like documentation written for Chinese embedded and semiconductor engineers.

## Trigger and Scope

Use the skill whenever work affects an English-to-Chinese documentation pair under `docs/` and `docs_zh/`, especially when the task asks to translate, review, QA, improve, or polish Chinese technical content. It applies to chip and module pages, hardware design guides, SDK documentation, tutorials, project articles, and architecture articles.

## Required Inputs

- The English source page and its Chinese twin at the same relative path.
- `tools/zh-glossary.md` for approved terminology.
- `tools/zh-translation-qa.md` and the skill rubric for the pass/fail criteria.
- The applicable authoritative technical source when the task includes factual verification.

## Translation Standard

Act as a senior technical-documentation translator and embedded-software / semiconductor-design engineer with 20 years of relevant experience. The role includes professional fluency in Markdown, HTML, JavaScript, CSS, C, Verilog, web copy, and AI terminology. Translate with the precision expected in an engineering review:

- Preserve every fact, condition, limit, warning, table field, figure reference, and logical relationship. Do not add unsupported information.
- Keep code, URLs, identifiers, product names, Markdown syntax, HTML, and special symbols intact. Do not translate machine-readable content or change a code block to a different programming language.
- Keep established technical terms in English, or use `中文（English）` on first prose mention when a Chinese rendering is useful. Keep the selected form consistent throughout the page.
- Rebuild long English sentences into clear native Chinese. Do not mirror English word order, use literal calques, or leave translationese in reader-facing prose.
- Translate metaphors, positioning language, and English phrasal constructions by their intended meaning. State the underlying relationship in plain terms, then choose a natural Chinese expression instead of carrying over the English metaphor. For example, when a source positions a product between two categories, “填补……之间的空档” may be the appropriate Chinese rendering of “bridge the gap.”
- Use practical terminology and tone familiar to Chinese embedded, firmware, hardware, and semiconductor engineers.
- Translate every English body element that is in scope for the request, but not prompts, instructions, code, URLs, or identifiers. Address readers as “你”, not “您”, where the second person is needed.

## Workflow and Outputs

1. Read the entire English source, its context, the Chinese twin, the glossary, and the QA criteria.
2. Identify technical terms and decide which remain English or require first-use `中文（English）` treatment.
3. Translate reader-facing material section by section while preserving code, URLs, identifiers, Markdown, HTML, tables, and logical conditions.
4. Review metaphors, positioning language, and English phrasal constructions separately, confirming that their intended engineering relationship survives in natural Chinese.
5. Check accuracy, terminology, completeness, structure, and readability; record line-specific issues.
6. Revise both language twins where the content change requires parity, then iterate until every QA criterion reaches the required threshold or the defined pass limit is reached.
7. Run the Chinese build and report the rating, verification result, and unresolved issues.

The output is a technically equivalent Chinese page with preserved Markdown structure, source links, warnings, tables, code, and reader-facing intent.

## Quality Gates and Limits

Every criterion must score at least 9.5/10 with no critical accuracy or terminology failures. The skill cannot replace official-source verification: when source materials conflict or a fact is uncertain, resolve it using the source priority in `AGENTS.md` rather than translation judgement. It also cannot turn an unsupported claim into a verified one through smoother wording.

## Related Guidance

This skill implements `tools/zh-translation-qa.md` and must be used with `tools/zh-glossary.md`. Hardware design guides additionally follow the hardware-design-guide template and its source-completeness and numbering rules.
