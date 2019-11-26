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

export type BaPageTransformer = (
  source: BaSinglePageContent,
) => Promise<BaSinglePageContent>;

// tslint:disable-next-line: no-any
export type BaPageBuilder = (...args: any[]) => Promise<BaPageBuildResult[]>;

export interface BaPageBuildResult {
  relativeOutFile: string;
  pageContent: BaSinglePageContent;
}

export const enum BaLayoutType {
  Default = 'default',
  Overview = 'overview',
  Icon = 'icon',
  Index = 'index',
}

export interface BaPageMetaBase {
  title: string;
  layout: BaLayoutType;
  description?: string;
  public?: boolean;
  draft?: boolean;
  nav_group?: string;
}

export interface BaSinglePageMeta extends BaPageMetaBase {
  toc?: boolean;
  contributors?: BaContributors;
  category?: string;
  tags?: string[];
  related?: string[];
  properties?: string[];
  wiki?: string;
  themable?: boolean;
  identifier?: string;
}

export interface BaSinglePageContent extends BaSinglePageMeta {
  content: string;
}

export interface BaContributors {
  dev?: BaContributor[];
  ux?: BaContributor[];
}

export interface BaContributor {
  name: string;
  gitHubUser: string;
}
