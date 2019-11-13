import { ElementAst } from '@angular/compiler';
import { BasicTemplateAstVisitor, NgWalker } from 'codelyzer';
import { IRuleMetadata, RuleFailure, Rules } from 'tslint';
import { SourceFile } from 'typescript';

import { addFailure, isDirectChild, isElementWithName } from '../../utils';

class DtTileVisitor extends BasicTemplateAstVisitor {
  visitElement(element: ElementAst, context: any): void {
    this._validateElement(element);
    super.visitElement(element, context);
  }

  private _validateElement(element: ElementAst): any {
    if (
      !isElementWithName(element, 'dt-tile') ||
      isDirectChild(element, 'dt-tile-title')
    ) {
      return;
    }

    addFailure(
      this,
      element,
      'A dt-tile must contain a dt-tile-title element, that must be a direct child.',
    );
  }
}

/**
 * The dtTileNeedsTitleRule ensures that a dt-tile always has a title,
 * that is a direct child of dt-tile.
 *
 * The following example passes the check:
 * <dt-tile>
 *   <dt-tile-icon><dt-icon name="agent"></dt-icon></dt-tile-icon>
 *   <dt-tile-title>L-W8-64-APMDay3</dt-tile-title>
 *   <dt-tile-subtitle>Linux (x84, 64-bit)</dt-tile-subtitle>
 *   Network traffic
 * </dt-tile>
 *
 * For the following example the linter throws an error:
 * <dt-tile>
 *   <dt-tile-icon><dt-icon name="agent"></dt-icon></dt-tile-icon>
 *   <dt-tile-subtitle>Linux (x84, 64-bit)</dt-tile-subtitle>
 *   Network traffic
 * </dt-tile>
 */
export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    description:
      'Ensures that a tile always has a title, that is a direct child of dt-tile.',
    // tslint:disable-next-line:no-null-keyword
    options: null,
    optionsDescription: 'Not configurable.',
    rationale:
      'A tile must always contain a dt-tile-title, that is a direct child of dt-tile.',
    ruleName: 'dt-tile-needs-title',
    type: 'maintainability',
    typescriptOnly: true,
  };

  apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: DtTileVisitor,
      }),
    );
  }
}
