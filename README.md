<img src="https://github.com/bradley/Blotter/blob/assets/images/logo.png" alt="Blotter logo"/>

A JavaScript API for drawing unconventional text effects on the web.

[Home](https://blotter.js.org) &mdash;
[Help](https://github.com/bradley/blotter/issues?labels=question)

## Overview

When applying effects to text on the web, designers have traditionally been constrained to those provided by CSS. In the majority of cases this is entirely suitable – text is text right? Yet still, there exist numerous examples of designers combining CSS properties or gifs and images to create effects that evoke something more playful. Precisely here, Blotter exists to provide an alternative.

#### GLSL Backed Text Effects with Ease

*Blotter provides a simple interface for building and manipulating text effects that utilize GLSL shaders without requiring that the designer write GLSL. Blotter has a growing library of configurable effects while also providing ways for student or experienced GLSL programmers to quickly bootstrap new ones.*

#### Atlasing Effects in a Single WebGL Back Buffer

*Blotter renders all texts in a single WebGL context and limits the number of draw calls it makes by using atlases. When multiple texts share the same effect they are mapped into a single texture and rendered together. The resulting image data is then output to individual 2d contexts for each element.*

#### Animation Loop

*Rather than executing on a time based interval, Blotter's internal animation loop uses requestAnimationFrame to match the browser's display refresh rate and pause when the user navigates to other browser tabs; improving performance and preserving the battery life on the user's device.*

#### What Blotter Isn't

*Any texts you pass to Blotter can be individually configured using familiar style properties. You can use custom font faces through the `@font-face` spec. However, Blotter ultimately renders the texts passed to it into canvas elements. This means rendered text won't be selectable. Blotter is great for elements like titles, headings, and texts used for graphic purposes. It's not recommended that Blotter be used for lengthy bodies of text, and should in most cases be applied to words individually.*


## Usage

Download the [minified version](https://raw.githubusercontent.com/bradley/Blotter/master/build/blotter.min.js).

To apply text effects, you'll also want to include at least one [material](https://github.com/bradley/Blotter/tree/master/build/materials/), so download one of Blotter's ready-made effects, such as the [ChannelSplitMaterial](https://raw.githubusercontent.com/bradley/Blotter/master/build/materials/channelSplitMaterial.js).

Include both in your HTML.

```html
<script src="path/to/blotter.min.js"></script>
<script src="path/to/channelSplitMaterial.js"></script>
```

The following illustrates how to render Blotter's [ChannelSplitMaterial](https://blotter.js.org/#/materials/ChannelSplitMaterial) in the `body` of your page with default settings.

```html
<!doctype html>
<html>
  <head>
    <script src="path/to/blotter.min.js"></script>
    <script src="path/to/channelSplitMaterial.js"></script>
  </head>
  <body>
    <script>
      var text = new Blotter.Text("Hello", {
        family : "serif",
        size : 120,
        fill : "#171717"
      });

      var material = new Blotter.ChannelSplitMaterial();

      var blotter = new Blotter(material, { texts : text });

      var scope = blotter.forText(text);

      scope.appendTo(document.body);
    </script>
  </body>
</html>
```


## Making Changes / Custom Builds

Firstly, install Blotter's build dependencies (OSX):

```
$ cd ~/path/to/blotter
$ npm install
```

The `blotter.js` and `blotter.min.js` files are built from source files in the `/src` directory. Do not edit these built files directly. Instead, edit the source files within the `/src` directory and then run the following to build the generated files:

```
$ npm run build
```

You will the updated build files at `/build/blotter.js` and `/build/blotter.min.js`.

#### Without Three.js / Without Underscore.js

Blotter.js requires Three.js and Underscore.js. If you're already including these files in your project, you should remove them from the `defFiles` array in the [Gruntfile](https://github.com/bradley/Blotter/blob/master/Gruntfile.js) and re-run the build script.

*Note: In order to decrease the total build size, Blotter uses a custom build of Three.js that only includes modules Blotter.js relies on. For more information view the `build-custom-three` script in [package.json](https://github.com/bradley/Blotter/blob/master/package.json).*


## Custom Materials

The documentation for creating custom materials can be found in [the Wiki](https://github.com/bradley/Blotter/wiki/Custom-Materials).


## Credits

Blotter is not possible without these contibutions to JavaScript.
<br/>

* [Underscore.js](http://underscorejs.org/)<br/>
Utility functions for JavaScript.
* [Three.js](https://threejs.org/)<br/>
WebGL Render Pipeline.
* [requestAnimationFrame](https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)<br/>
Polyfill by Paul Irish.
* [bin-packing](https://github.com/jakesgordon/bin-packing)<br/>
How Blotter positions texts for batched rendering.
* [EventEmitter](https://github.com/Olical/EventEmitter)<br/>
Simple API for JavaScript events.
* [dat.GUI](https://github.com/dataarts/dat.gui)<br/>
A lightweight GUI for changing variables in JavaScript. Used in Blotter's [Material](https://blotter.js.org/#/materials) documention pages.

<br/>
Some projects and people who have helped inspire along the way.
<br/>
<br/>

* [Two.js](https://two.js.org/)<br/>
Jono Brandel's Two.js has provided much inpsiration for Blotter's documentation and API design.
* [Reza Ali](http://www.syedrezaali.com/)<br/>
Reza's [Fragment](http://www.syedrezaali.com/store/fragment-osx-app) was a fundamental part of the development process for writing Blotter's Fragment shaders, and Reza kindly allowed Blotter to include an array of shader [helper functions](https://github.com/bradley/Blotter/tree/master/src/assets/shaders) from Fragment.
* [Mitch Paone](https://twitter.com/DIA_Mitch)<br/>
I was introduced to Mitch's work in computational typography while working on Blotter, and the work Mitch has done with [DIA](http://dia.tv/) has been hugely motivational.
* [Stan Haanappel](https://www.instagram.com/stanhaanappel/)<br/>
Stan Haanappel is a designer whose work with type has been inspirational to Blotter.
* [The Book of Shaders](https://thebookofshaders.com/)<br/>
The Book of Shaders by [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) and [Jen Lowe](http://jenlowe.net/) is where anyone looking to learn more about writing shaders should begin.
* [Shadertoy](https://www.shadertoy.com/)<br/>
Shadertoy has been a critical part of my personal learning experience while working on Blotter.

<br/>
<br/>

✌️ - [Bradley Griffith](http://bradley.computer)
