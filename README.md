# Element scrollIntoView() polyfill for Internet Explorer 11

Internet Explorer 11 has a bug in scrollIntoView(), which causes the whole page to move horizontally
in some cases:

http://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move

There are various workarounds, like using jQuery, but this can be a problem when running Selenium tests, something like this:

```java
WebElement element = driver.findElement(By.id("my-id"));
Actions actions = new Actions(driver);
actions.moveToElement(element);
actions.click();
```

Selenium's in-built handling of moveToElement is to use scrollIntoView().

What can be done instead, is to polyfill/fix the scrollIntoView() function itself, so that Selenium
can use it.

## Usage:

#### 1) Install it

```sh
npm install ie11-scroll-into-view --save
```

(or just download the script and put it in your project)

#### 2) Import it
```html
<script src="ie11-scroll-into-view.js"></script>
```

or with AMD:

```javascript
require(['ie11-scroll-into-view'], function () {
  // ...
});
```

or with CommonJS:


```javascript
require('ie11-scroll-into-view');
```

or with Harmony modules:

```javascript
import 'ie11-scroll-into-view';
```

## Running tests

There is currently only one test, and we run it manually:

```bash
npm run dev
```

This will open a server, you can access it at
http://localhost:8080. You can interact with the
buttons on the page to see expected behavior.

It is possible to reproduce the IE 11 bug by
commenting out the `<script>` tag that imports
the polyfill/fix.


## Project License

Apache 2.0
