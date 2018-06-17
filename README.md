# mw-toolbox

[![npm](https://img.shields.io/npm/v/mw-toolbox.svg) ![npm](https://img.shields.io/npm/dm/mw-toolbox.svg)](https://www.npmjs.com/package/mw-toolbox)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js Plugin

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)

# Installation

```
npm install --save mw-toolbox
```

## Default import

Install all the components:

```javascript
import Vue from 'vue'
import MwToolbox from 'mw-toolbox'

Vue.use(MwToolbox)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'mw-toolbox'

Vue.component('test', Test)
```

## Distribution import

Install all the components:

```javascript
import 'mw-toolbox/dist/mw-toolbox.css'
import MwToolbox from 'mw-toolbox/dist/mw-toolbox.common'

Vue.use(MwToolbox)
```

Use specific components:

```javascript
import 'mw-toolbox/dist/mw-toolbox.css'
import { Test } from 'mw-toolbox/dist/mw-toolbox.common'

Vue.component('test', Test)
```

## Browser

```html
<link rel="stylesheet" href="mw-toolbox/dist/mw-toolbox.css"/>

<script src="vue.js"></script>
<script src="mw-toolbox/dist/mw-toolbox.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.
Install all the components:

```javascript
Vue.use(MwToolbox)
```

Use specific components:

```javascript
Vue.component('test', MwToolbox.Test)
```

## Source import

Install all the components:

```javascript
import Vue from 'vue'
import MwToolbox from 'mw-toolbox/src'

Vue.use(MwToolbox)
```

Use specific components:

```javascript
import Vue from 'vue'
import { Test } from 'mw-toolbox/src'

Vue.component('test', Test)
```

# Usage

> TODO


## License

[MIT](http://opensource.org/licenses/MIT)
