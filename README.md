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
@include fixed-navigation((
  'height': $header-height,
));
```

## Options

### jQuery plugin

| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `delta` | `40` | No | Distance to scroll up before showing the fixed element
| `minWidth` | `0` | No | Minimum window width from which the element is fixed

### Mixin

| Option | Default | Required | Description |
| :--- | :--- | :--- | :--- |
| `height` | `null` | Yes | Height of the header (this is used for the `padding-top` on body)
| `speed` | `0.2s` | No | Speed of the transition when showing the fixed element

## Fixed navigation + [Toggle navigation](https://github.com/trendwerk/toggle-navigation)
Using these repositories together creates a few conflicts. This assumes you're using this repository to create a fixed header and are using `toggle-navigation` on the same header. Below you'll find a few tips on how to deal with these conflicts.

| Problem | Description | Solution |
| :--- | :--- | :--- | :--- |
| `transition` | A `transition` is applied by `toggle-navigation` (from a certain breakpoint). This overwrites the `transition` from `fixed-navigation`, because there is [no way to add to transitions](https://github.com/sass/sass/issues/249) yet | Apply the right transitions in your theme under the right conditions (see below)
| body height | `toggle-navigation` sets the body height to `100%`, which, when opening, forces the screen to the top and, when closing the navigation again, stays at the top of the screen | There is no elegant solution


### Example
The example below shows how you could deal with the `transition` conflict. `$toggle-breakpoint` is assumed to be the breakpoint used for [the `until` parameter](https://github.com/trendwerk/toggle-navigation#until).

```scss
.header {
  $transitions: (
    'fixed': transform 0.2s ease-in-out,
    'toggle': (background 0.4s cubic-bezier(0, 0, 0, 1), height 0.4s cubic-bezier(0, 0, 0, 1)),
  );

  @media(max-width: ($toggle-breakpoint - 1px)) {
    transition: map-get($transitions, 'toggle');
  }

  .fixed & {
    transition: map-get($transitions, 'fixed');

    @media(max-width: ($toggle-breakpoint - 1px)) {
      transition: map-values($transitions);
    }
  }
}
```

This makes sure that:

- *Only* the `toggle-navigation` transition is applied when the header should not be fixed but could be toggled
- *Only* the `fixed-navigation` transition is applied when the header should be fixed but could not be toggled
- *Both* transitions are applied when the header should be fixed and could be toggled
