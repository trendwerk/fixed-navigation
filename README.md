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
| `minWidth` | `0` | No | Minimum window width from which the fixed element is shown when scrolling up

### Mixin

| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `speed` | `0.2s` | No | Speed of the transition when showing the fixed element

## [Toggle navigation](https://github.com/trendwerk/toggle-navigation)
Using these repositories together creates a few conflicts. This assumes you're using this repository to create a fixed header and use `toggle-navigation` on the same header. Below you'll find a few tips on how to deal with these conflicts.

| Problem | Description | Solution |
| :--- | :--- | :--- | :--- |
| `position` | `position: absolute` is applied by `toggle-navigation` from a certain breakpoint. This overwrites `position: fixed` from `fixed-navigation` | Apply `position: fixed` from the same breakpoint
| `transition` | A `transition` is applied by `toggle-navigation` (from a certain breakpoint). This overwrites the `transition` from `fixed-navigation`, because there is [no way to add to transitions](https://github.com/sass/sass/issues/249) yet | Apply both transitions in your theme
| body height | `toggle-navigation` sets the body height to `100%`, which, when opening, forces the screen to the top and, when closing the navigation again, stays at the top of the screen | There is no elegant solution


### Example
The example below shows how you could deal with the conflicts above. This applies the solutions mentioned above and applies both mixins. Variables declared as `...` should be filled in and depend on your specific situation.

```scss
.header {
  $header-height: ...;
  $speeds: (
    'fixed': 0.2s,
    'toggle': 0.4s,
  );
  $toggle-breakpoint: ...;
  $transitions: (
    'fixed': transform map-get($speeds, 'fixed') ease-in-out,
    'toggle': (background map-get($speeds, 'toggle') cubic-bezier(0, 0, 0, 1), height map-get($speeds, 'toggle') cubic-bezier(0, 0, 0, 1)),
  );

  @include fixed-navigation((
    'speed': map-get($speeds, 'fixed'),
  ));
  @include toggle-navigation((
    'height': $header-height,
    'item': '.menu-item',
    'menu': '.main-navigation',
    'until': $toggle-breakpoint,
    'speed': map-get($speeds, 'toggle'),
  ));
  transition: map-get($transitions, 'fixed');

  @media(max-width: ($toggle-breakpoint - 1px)) {
    position: fixed;
    transition: map-values($transitions);
  }
}
```
