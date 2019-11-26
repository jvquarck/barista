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

import {
  fetchContentList,
  fetchContentItemById,
} from '../utils/fetch-strapi-content';

import {
  BaPageBuildResult,
  BaPageBuilder,
  StrapiPageTeaser,
  StrapiContentType,
  BaIndexPageContent,
  StrapiCTA,
} from '../types';

const PUBLIC_BUILD = process.env.PUBLIC_BUILD === 'true';

const TILES_MOSTORDERED = [
  {
    title: 'Icons',
    category: 'Resources',
    link: '/components/icon',
  },
  {
    title: 'Colors',
    category: 'Resources',
    link: '/components/icon',
  },
  {
    title: 'Button',
    category: 'Components',
    link: '/components/button',
  },
  {
    title: 'Table',
    category: 'Components',
    link: '/components/table',
  },
  {
    title: 'Chart',
    category: 'Components',
    link: '/components/icon',
  },
  {
    title: 'Input field',
    category: 'Components',
    link: '/components/input-field',
  },
  {
    title: 'Card',
    category: 'Components',
    link: '/components/card',
  },
];

// tslint:disable-next-line: no-any
export type BaHomepageBuilder = (...args: any[]) => BaPageBuildResult;

/** Page-builder for the homepage of Barista. */
export const homepageBuilder: BaPageBuilder = async () => {
  const pageTeaserData = await fetchContentList<StrapiPageTeaser>(
    StrapiContentType.Pageteasers,
    { publicContent: PUBLIC_BUILD },
  );

  const homepageCTA = await fetchContentItemById<StrapiCTA>(
    StrapiContentType.CTAs,
    '1',
    { publicContent: PUBLIC_BUILD },
  );

  const relativeOutFile = '/index.json';
  const pageContent: BaIndexPageContent = {
    title: 'Barista - the Dynatrace design system.',
    subtitle: 'Tailored to scale.',
    layout: 'index',
    mostordered: TILES_MOSTORDERED,
    gettingstarted: pageTeaserData,
    cta: homepageCTA,
  };

  return [{ pageContent, relativeOutFile }];
};
