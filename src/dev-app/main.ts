/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {platformBrowser} from '@angular/platform-browser';
import {ɵNgModuleFactory} from '@angular/core';
import {DevAppModule} from './dev-app-module';

platformBrowser().bootstrapModuleFactory(new ɵNgModuleFactory(DevAppModule));
