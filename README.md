# jQuery naaav

A simple, bare-bones jQuery drop-down menu plugin. Yep, _another_ jQuery drop-down menu plugin :)

This one is a **super basic** one that's intended to streamline the setting up of a simple drop-down navigation. It sets up event listeners and handlers, along with the in/out delays around a sub-menu's show/hide effect, so you can control the "twitchiness" of it.

This was created to out of a want for a simple drop-down solution that:

1. Didn't try to do everything
2. Didn't write any markup or styles
3. Had the show/hide delay control and not much else

You can pass in your own show/hide functions to completely customise the sub-menu display behaviour.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/victornguyen/naaav/master/dist/jquery.naaav.min.js
[max]: https://raw.github.com/victornguyen/naaav/master/dist/jquery.naaav.js

Markup your menu like his:

```html
<ul id="nav">
    <li>
        <a href="#">About</a>
        <ul>
            <li><a href="#">Me</a></li>
            <li><a href="#">You</a></li>
        </ul>
    </li>
    <li>
        <a href="#">Projects</a>
        <ul>
            <li><a href="#">Naaav</a></li>
            <li><a href="#">Crepe</a></li>
        </ul>
    </li>
</ul>
```

... with CSS that looks like this:

```css
#nav li { float:left; }
#nav a { display:block; }
#nav ul { position:absolute; display:none; } /* this is the key line */
#nav ul li { float:none; }
#nav ul li a { width:150px; }
```

... and initialise it like this:

```html
<script src="jquery.js"></script>
<script src="jquery.naaav.min.js"></script>
<script>
jQuery(function($) {
  $('#nav').naaav();
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History

#### 0.2.0
- Added Grunt 0.4.0
- Added unit tests (QUnit)

#### 0.1.0
- Intial release