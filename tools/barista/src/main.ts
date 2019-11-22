/**
 * @license
 * Copyright 2019 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BaPageBuildResult, BaPageBuilder } from './types';
import { componentsBuilder } from './builder/components';
import { dirname, join } from 'path';
import { promises as fs, mkdirSync, readFileSync, readdirSync } from 'fs';

import {
  BaOverviewPage,
  BaOverviewPageSectionItem,
} from '../../../apps/barista/src/shared/page-contents';

// Add your page-builder to this map to register it.
const BUILDERS = new Map<string, BaPageBuilder>([
  ['components-builder', componentsBuilder],
]);

const DIST_DIR = join(__dirname, '../../', 'apps', 'barista', 'data');

/** Builds pages using all registered builders. */
async function buildPages(): Promise<void[]> {
  const builders = Array.from(BUILDERS.values());
  // Run each builder and collect all build results
  const results = await builders.reduce<Promise<BaPageBuildResult[]>>(
    async (aggregatedResults, currentBuilder) => [
      ...(await aggregatedResults),
      ...(await currentBuilder()),
    ],
    Promise.resolve([]),
  );

  // Make sure dist dir is created
  mkdirSync(DIST_DIR, { recursive: true });

  const files = results.map(async result => {
    const outFile = join(DIST_DIR, result.relativeOutFile);

    // Creating folder path if it does not exist
    mkdirSync(dirname(outFile), { recursive: true });

    // Write file with page content to disc.
    // tslint:disable-next-line: no-magic-numbers
    return fs.writeFile(outFile, JSON.stringify(result.pageContent, null, 2), {
      flag: 'w', // "w" -> Create file if it does not exist
      encoding: 'utf8',
    });
  });

  return Promise.all(files);
}

function getOverviewSectionItem(
  filecontent: any,
  category: string,
  filepath: string,
): BaOverviewPageSectionItem {
  return {
    title: filecontent.title,
    identifier:
      filecontent.title && filecontent.title.length > 1
        ? filecontent.title[0] + filecontent.title[1]
        : 'Id',
    description: filecontent.description,
    category: category,
    link: filepath,
    badge: filecontent.properties,
  };
}

/** Builds overview pages */
async function buildOverviewPages(): Promise<void[]> {
  const allDirectories = readdirSync(DIST_DIR);

  const pages = allDirectories.map(async directory => {
    const path = join(DIST_DIR, directory);

    if (directory.indexOf('.') < 0 && directory !== 'components') {
      const files = readdirSync(path);
      const capitalizedTitle =
        directory.charAt(0).toUpperCase() + directory.slice(1);
      let overviewPage: BaOverviewPage = {
        title: capitalizedTitle,
        id: directory,
        layout: 'overview',
        sections: [
          {
            items: [],
          },
        ],
      };

      for (const file of files) {
        const filepath = join(directory, file.replace(/\.[^/.]+$/, ''));
        const content = JSON.parse(readFileSync(join(path, file)).toString());
        overviewPage.sections[0].items.push(
          getOverviewSectionItem(content, capitalizedTitle, filepath),
        );
      }

      const overviewfilepath = join(DIST_DIR, `${directory}.json`);
      // Write file with page content to disc.
      // tslint:disable-next-line: no-magic-numbers
      return fs.writeFile(
        overviewfilepath,
        JSON.stringify(overviewPage, null, 2),
        {
          flag: 'w', // "w" -> Create file if it does not exist
          encoding: 'utf8',
        },
      );
    } else if (directory.indexOf('.') < 0 && directory === 'components') {
      const files = readdirSync(path);

      let componentOverview: BaOverviewPage = {
        title: 'Components',
        id: 'components',
        layout: 'overview',
        description:
          'Read all about development with/of our Angular components in how to get started. If you run into any troubles or want to contribute, please visit our GitHub page.',
        sections: [
          {
            title: 'Documentation',
            items: [],
          },
          {
            title: 'Components',
            items: [],
          },
          {
            title: 'Other',
            items: [],
          },
        ],
      };

      for (const file of files) {
        const content = JSON.parse(readFileSync(join(path, file)).toString());
        for (const section of componentOverview.sections) {
          const filepath = join(directory, file.replace(/\.[^/.]+$/, ''));
          if (
            content.nav_group === 'docs' &&
            section.title === 'Documentation'
          ) {
            section.items.push(
              getOverviewSectionItem(content, section.title, filepath),
            );
          } else if (
            content.nav_group === 'other' &&
            section.title === 'Other'
          ) {
            section.items.push(
              getOverviewSectionItem(content, section.title, filepath),
            );
          } else if (section.title === 'Components' && !content.nav_group) {
            section.items.push(
              getOverviewSectionItem(content, 'Component', filepath),
            );
          }
        }
      }

      const overviewfilepath = join(DIST_DIR, `${directory}.json`);
      // Write file with page content to disc.
      // tslint:disable-next-line: no-magic-numbers
      return fs.writeFile(
        overviewfilepath,
        JSON.stringify(componentOverview, null, 2),
        {
          flag: 'w', // "w" -> Create file if it does not exist
          encoding: 'utf8',
        },
      );
    }
  });
  return Promise.all(pages);
}

buildPages()
  .then(results => {
    console.log(`${results.length} Pages created.`);
    buildOverviewPages();
  })
  .catch(err => {
    console.error(err);
  });
