---
title: 'Highlight'
description:
  'The highlight component is used to highlight characters in a string.'
contributors:
  dev:
    - lukas.holzer
properties:
  - 'dev utility'
tags:
  - 'highlight'
  - 'text'
---

# Highlight

The `dt-highlight` component is designed to highlight some characters in a
string that has been searched of filtererd for. It can be either used for
[filtering tables](/components/table#filtering) or in the drop-down panel of the
[filter field](/components/filter-field/).

<docs-source-example example="HighlightDefaultExample"></docs-source-example>

## Imports

You have to import the `DtHighlightModule` when you want to use the
`<dt-highlight>` component:

```typescript
@NgModule({
  imports: [DtHighlightModule],
})
class MyModule {}
```

## Inputs

| Name            | Type      | Default | Description                                                                  |
| --------------- | --------- | ------- | ---------------------------------------------------------------------------- |
| `caseSensitive` | `boolean` | `false` | The caseSensitive input can be set to search for case sensitive occurrences. |
| `term`          | `string`  | `''`    | The term is the string that should be highlighted in the projected content.  |

## Usage

There are two options to use the highlight component in your template. If you
already have a native HTML element that contains your text (e.g. a paragraph
`<p>`) you can keep this tag and apply the attribute `dt-highlight` in
combination with the attribute `term` on it.

If the text's wrapper is an Angular component, you have to use the highlight as
an additional tag with a term-attribute to wrap your text. Find usage examples
below.

**Important notice:** The projected content inside the highlight component will
be escaped! You have to avoid any HTML Tags inside this component!

### On a paragraph

```html
<p dt-highlight term="dynat">Dynatrace system monitoring</p>
```

### Without wrapping element

```html
<dt-highlight term="dynat">Dynatrace system monitoring</dt-highlight>
```

### A case sensitive highlight example

<docs-source-example example="HighlightCaseSensitiveExample"></docs-source-example>
