# SMASH

SMASH TOGETHER FILES! PROBABLY JAVASCRIPT.

SAY THIS foo.js:

```js
import "bar";

function foo() {
  return "foo" + bar();
}
```

AND THIS bar.js:

```js
function bar() {
  return "bar";
}
```

WHEN SMASH TOGETHER foo.js AND bar.js:

```js
function bar() {
  return "bar";
}

function foo() {
  return "foo" + bar();
}
```

SMASH HANDLE CIRCULAR AND REDUNDANT IMPORTS GOOD. SMASH GOOD. SMASH.

SMASH LIKE MAKE, TOO.

```Makefile
bundle.js: $(shell smash --list src/bundle.js)
  smash src/bundle.js > bundle.js
```
