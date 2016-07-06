# Fixed navigation
Fixed navigation when scrolling. Hides navigation when scrolling down, reappears when slightly scrolling up.

Requires jQuery.

## Install
```sh
bower install trendwerk/fixed-navigation --save
```

## Usage
Using `fixed-navigation` is a two-step process:

1. **JS**: Use the jQuery plugin on the element that should be fixed.
2. **SCSS**: `@include` the mixin on the element that should be fixed;

### Implementation

```js
$('.header').fixedNavigation({
  minWidth: 981,
});
```

```scss
@include fixed-navigation();
```

## Options

### jQuery plugin

| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `delta` | `40` | No | Distance to scroll up before showing the fixed element
| `minWidth` | `0` | No | Minimum window width from which the fixed navigation is used

### Mixin

| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `speed` | `0.2s` | No | Speed of the transition when showing the fixed element
