# Alert

The alert component informs users about necessary configuration actions
(warnings) or warns users about failed actions or other events that do not
require actions from the user (error messages).

<docs-source-example example="AlertWarningExample"></docs-source-example>

<docs-source-example example="AlertErrorExample"></docs-source-example>

## Imports

You have to import the `DtAlertModule` to use the `dt-alert`:

```typescript
@NgModule({
  imports: [DtAlertModule],
})
class MyModule {}
```

## Initialization

To use the alert component, add the `<dt-alert>` element to your page.

## Inputs

| Name           | Type              | Default | Description                                                 |
| -------------- | ----------------- | ------- | ----------------------------------------------------------- |
| `severity`     | `error | warning` | `error` | Sets the alert severity.                                    |
| `<ng-content>` |                   |         | The text (error/warning) message which should be displayed. |

## Variants

Depending on the value of the `severity` input an error- or warning-alert is
rendered.

<docs-source-example example="AlertInteractiveExample"></docs-source-example>

## Dark background

Alerts can be placed on dark background.

<docs-source-example example="AlertDarkExample" themedark="true"></docs-source-example>

<docs-source-example example="AlertDarkErrorExample" themedark="true"></docs-source-example>

## Alerts in use

For alerts that refer to a specific content such as a form, the message size
should not exceed the width of this content.

Read the
[validation guidelines](/patterns/validation/#page-specific-error-validation)
for more information about how the alert component is used in a form.

## Do's and don'ts

- Use a minimum textbox width of 260px.
- Use a maximum textbox width of 580px.
- Don't use walls of text – our alerts and warnings should be as small as
  possible but effective at the same time.
