<img src="https://github.com/bradley/Blotter/blob/assets/images/logo.png" alt="Blotter logo"/>

A JavaScript API for drawing unconventional text effects on the web.

[Home](http://bradley.github.io/Blotter) &mdash;
[Help](https://github.com/bradley/blotter/issues?labels=question)

## Overview

When applying effects to text on the web, designers have traditionally been constrained to those provided by CSS. In the majority of cases this is entirely suitable – text is text right? Yet still, there exist numerous examples of designers combining CSS properties or gifs and images to create effects that evoke something more playful. Precisely here, Blotter exists to provide an alternative.

#### GLSL Backed Text Effects with Ease

*Blotter provides a simple interface for building and manipulating text effects that utilize GLSL shaders without requiring that the designer write GLSL. Blotter has a growing library of configurable effects while also providing ways for student or experienced GLSL programmers to quickly bootstrap new ones.*

#### Atlasing Effects in a Single WebGL Back Buffer

*Blotter bypasses the limit browsers place on the number of live WebGL contexts in the document by using an atlas. This atlas maps elements that share the same effects so that they may be rendered together in a single WebGL context. The resulting image data is then output to individual 2d contexts for each element.*

#### Animation Loop

*Rather than executing on a time based interval, Blotter's internal animation loop uses requestAnimationFrame to match the browser's display refresh rate and pause when the user navigates to other browser tabs; improving performance and preserving the battery life on the user's device.*

#### What Blotter Isn't

*Any texts you pass to Blotter can be individually configured using familiar style properties. You can use custom font faces through the `@font-face` spec. However, Blotter ultimately renders the texts passed to it into canvas elements. This means rendered text won't be selectable. Blotter is great for elements like titles, headings, and texts used for graphic purposes. It's not recommended that Blotter be used for lengthy bodies of text, and should in most cases be applied to words individually.*


## Usage

Download the [minified version](https://raw.github.com/bradley/blotter/build/blotter.min.js).

To apply text effects, you'll also want to include at least one [material](https://github.com/bradley/Blotter/tree/master/build/materials/), so download one of Blotter's ready-made effects, such as the [ChannelSplitMaterial](https://raw.github.com/bradley/blotter/build/materials/ChannelSplitMaterial.js).

Include both in your HTML.

```html
<script src="path/to/blotter.min.js"></script>
<script src="path/to/ChannelSplitMaterial.js"></script>
```

The following illustrates how to render Blotter's [ChannelSplitMaterial](http://bradley.github.io/Blotter/#/materials/ChannelSplitMaterial) in the `body` of your page with default settings.

```html
<!doctype html>
<html>
  <head>
    <script src="path/to/blotter.min.js"></script>
    <script src="path/to/ChannelSplitMaterial.js"></script>
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

The `blotter.js`, `blotter.clean.js`, and `blotter.min.js` files are built from source files in the `/src` directory. Do not edit these built files directly. Instead, edit the source files within the `/src` directory and then run the following to build the generated files:

```
$ grunt
```

You will the updated build files at `/build/blotter.js`, `/build/blotter.clean.js`, and `/build/blotter.min.js`.
