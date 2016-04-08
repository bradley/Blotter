// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}/******************************************************************************

This is a binary tree based bin packing algorithm that is more complex than
the simple Packer (packer.js). Instead of starting off with a fixed width and
height, it starts with the width and height of the first block passed and then
grows as necessary to accomodate each subsequent block. As it grows it attempts
to maintain a roughly square ratio by making 'smart' choices about whether to
grow right or down.

When growing, the algorithm can only grow to the right OR down. Therefore, if
the new block is BOTH wider and taller than the current target then it will be
rejected. This makes it very important to initialize with a sensible starting
width and height. If you are providing sorted input (largest first) then this
will not be an issue.

A potential way to solve this limitation would be to allow growth in BOTH
directions at once, but this requires maintaining a more complex tree
with 3 children (down, right and center) and that complexity can be avoided
by simply chosing a sensible starting block.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  blocks: array of any objects that have .w and .h attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];

  var packer = new GrowingPacker();
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


******************************************************************************/

GrowingPacker = function() { };

GrowingPacker.prototype = {

  fit: function(blocks) {
    var n, node, block, len = blocks.length;
    var w = len > 0 ? blocks[0].w : 0;
    var h = len > 0 ? blocks[0].h : 0;
    this.root = { x: 0, y: 0, w: w, h: h };
    for (n = 0; n < len ; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h))
        block.fit = this.splitNode(node, block.w, block.h);
      else
        block.fit = this.growNode(block.w, block.h);
    }
  },

  findNode: function(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if ((w <= root.w) && (h <= root.h))
      return root;
    else
      return null;
  },

  splitNode: function(node, w, h) {
    node.used = true;
    node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
    node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
    return node;
  },

  growNode: function(w, h) {
    var canGrowDown  = (w <= this.root.w);
    var canGrowRight = (h <= this.root.h);

    var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
    var shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

    if (shouldGrowRight)
      return this.growRight(w, h);
    else if (shouldGrowDown)
      return this.growDown(w, h);
    else if (canGrowRight)
     return this.growRight(w, h);
    else if (canGrowDown)
      return this.growDown(w, h);
    else
      return null; // need to ensure sensible root starting size to avoid this happening
  },

  growRight: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { x: this.root.w, y: 0, w: w, h: this.root.h }
    };
    var node = this.findNode(this.root, w, h);
    if (node)
      return this.splitNode(node, w, h);
    else
      return null;
  },

  growDown: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down:  { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root
    };
    var node = this.findNode(this.root, w, h);
    if (node)
      return this.splitNode(node, w, h);
    else
      return null;
  }

}
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () {

		try {

			var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

		} catch ( e ) {

			return false;

		}

	} )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports = Detector;

}/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));require=function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var f=new Error("Cannot find module '"+s+"'");throw f.code="MODULE_NOT_FOUND",f}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return o(n?n:e)},c,c.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({"./defaults":[function(e,t,n){"use strict";n.__esModule=!0,n["default"]={pool:{size:navigator.hardwareConcurrency||8}},t.exports=n["default"]},{}],1:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=e("./index"),i=r(o);"object"==typeof window&&(window.thread=i["default"]),"function"==typeof define?define([],function(){return i["default"]}):"object"==typeof t&&(t.exports=i["default"])},{"./index":3}],"./worker":[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=p.getConfig().basepath.web;return t?t+"/"+e:e}function a(e){for(var t=[],n=0;"undefined"!=typeof e[n];)t.push(e[n]),n++;return t}function u(e){if(e.stack)console.error(e.stack);else if(e.message&&e.filename&&e.lineno){var t=e.filename.match(/^data:text\/javascript/)&&e.filename.length>50?e.filename.substr(0,50)+"...":e.filename;console.error(e.message+" @"+t+":"+e.lineno)}else console.error(e)}n.__esModule=!0;var f=e("eventemitter3"),c=r(f),l=e("./slave-code-uri"),h=r(l),p=e("../config");if("object"!=typeof window.Worker&&"function"!=typeof window.Worker)throw new Error("Browser does not support web workers!");var d=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?null:arguments[0],r=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];o(this,t),e.call(this),this.initWorker(),this.worker.addEventListener("message",this.handleMessage.bind(this)),this.worker.addEventListener("error",this.handleError.bind(this)),n&&this.run(n,r)}return i(t,e),t.prototype.initWorker=function(){try{this.worker=new window.Worker(h["default"])}catch(e){var t=p.getConfig().fallback.slaveScriptUrl;if(!t)throw e;this.worker=new window.Worker(h["default"])}},t.prototype.run=function(e){var t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return"function"==typeof e?this.runMethod(e,t):this.runScripts(e,t),this},t.prototype.runMethod=function(e,t){var n=e.toString(),r=n.substring(n.indexOf("(")+1,n.indexOf(")")).split(","),o=n.substring(n.indexOf("{")+1,n.lastIndexOf("}"));this.worker.postMessage({initByMethod:!0,method:{args:r,body:o},scripts:t.map(s)})},t.prototype.runScripts=function(e,t){if(!e)throw new Error("Must pass a function or a script URL to run().");this.worker.postMessage({initByScripts:!0,scripts:t.concat([e]).map(s)})},t.prototype.send=function(e){var t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return this.worker.postMessage({doRun:!0,param:e},t),this},t.prototype.kill=function(){return this.worker.terminate(),this.emit("exit"),this},t.prototype.promise=function(){var e=this;return new Promise(function(t,n){e.once("message",t).once("error",n)})},t.prototype.handleMessage=function(e){if(e.data.error)this.handleError(e.data.error);else if(e.data.progress)this.handleProgress(e.data.progress);else{var t=a(e.data.response);this.emit.apply(this,["message"].concat(t))}},t.prototype.handleProgress=function(e){this.emit("progress",e)},t.prototype.handleError=function(e){this.listeners("error",!0)||u(e),e.preventDefault&&e.preventDefault(),this.emit("error",e)},t}(c["default"]);n["default"]=d,t.exports=n["default"]},{"../config":2,"./slave-code-uri":6,eventemitter3:8}],2:[function(e,t,n){"use strict";function r(e,t){var n=arguments.length<=2||void 0===arguments[2]?[]:arguments[2];Object.keys(t).forEach(function(o){var i=t[o],s=n.concat([o]);if("object"==typeof i){if("undefined"!=typeof e[o]&&"object"!=typeof e[o])throw new Error("Expected config property not to be an object: "+s.join("."));r(e[o],i,s)}else{if("object"==typeof e[o])throw new Error("Expected config property to be an object: "+s.join("."));e[o]=i}})}function o(){return a.get()}function i(){return a.set.apply(a,arguments)}n.__esModule=!0,n.getConfig=o,n.setConfig=i;var s={basepath:{node:"",web:""},fallback:{slaveScriptUrl:""}},a={get:function(){return s},set:function(e){if("object"!=typeof e)throw new Error("Expected config object.");r(s,e)}};n["default"]=a},{}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0],t=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return new h["default"](e,t)}n.__esModule=!0,n.spawn=o,e("native-promise-only");var i=e("./config"),s=r(i),a=e("./defaults"),u=r(a),f=e("./pool"),c=r(f),l=e("./worker"),h=r(l);n.config=s["default"],n.defaults=u["default"],n.Pool=c["default"],n["default"]={config:s["default"],defaults:u["default"],Pool:c["default"],spawn:o,Worker:h["default"]}},{"./config":2,"./defaults":"./defaults","./pool":5,"./worker":"./worker","native-promise-only":9}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.__esModule=!0;var s=e("eventemitter3"),a=r(s),u=function(e){function t(n){o(this,t),e.call(this),this.pool=n,this.thread=null,this.runArgs=[],this.clearSendParameter(),n.emit("newJob",this)}return i(t,e),t.prototype.run=function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];if(0===t.length)throw new Error("Cannot call .run() without arguments.");return this.runArgs=t,this},t.prototype.send=function(){if(0===this.runArgs.length)throw new Error("Cannot .send() before .run().");for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];if(this.hasSendParameter()){var r;return(r=this.clone().clearSendParameter()).send.apply(r,t)}return this.sendArgs=t,this.parameterSet=!0,this.emit("readyToRun"),this},t.prototype.executeOn=function(e){var t,n;return(t=(n=e.once("message",this.emit.bind(this,"done")).once("error",this.emit.bind(this,"error"))).run.apply(n,this.runArgs)).send.apply(t,this.sendArgs),this.thread=e,this},t.prototype.promise=function(){if(!this.thread)throw new Error("Cannot return promise, since job is not executed.");return this.thread.promise()},t.prototype.clone=function n(){var n=new t(this.pool);return this.runArgs.length>0&&n.run.apply(n,this.runArgs),this.parameterSet&&n.send.apply(n,this.sendArgs),n},t.prototype.hasSendParameter=function(){return this.parameterSet},t.prototype.clearSendParameter=function(){return this.parameterSet=!1,this.sendArgs=[],this},t}(a["default"]);n["default"]=u,t.exports=n["default"]},{eventemitter3:8}],5:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n.__esModule=!0;var s=e("eventemitter3"),a=r(s),u=e("./job"),f=r(u),c=e("./defaults"),l=r(c),h=e("./"),p=function(e){function t(n){o(this,t),e.call(this),this.threads=t.spawn(n||l["default"].pool.size),this.idleThreads=this.threads.slice(),this.jobQueue=[],this.lastCreatedJob=null,this.on("newJob",this.handleNewJob.bind(this))}return i(t,e),t.prototype.run=function(){var e;return(e=new f["default"](this)).run.apply(e,arguments)},t.prototype.send=function(){var e;if(!this.lastCreatedJob)throw new Error("Pool.send() called without prior Pool.run(). You need to define what to run first.");return(e=this.lastCreatedJob).send.apply(e,arguments)},t.prototype.killAll=function(){this.threads.forEach(function(e){e.kill()})},t.prototype.queueJob=function(e){this.jobQueue.push(e),this.dequeue()},t.prototype.dequeue=function(){if(0!==this.jobQueue.length&&0!==this.idleThreads.length){var e=this.jobQueue.shift(),t=this.idleThreads.shift();e.on("done",this.handleJobSuccess.bind(this,t,e)).on("error",this.handleJobError.bind(this,t,e)),e.executeOn(t)}},t.prototype.handleNewJob=function(e){this.lastCreatedJob=e,e.on("readyToRun",this.queueJob.bind(this,e))},t.prototype.handleJobSuccess=function(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),o=2;n>o;o++)r[o-2]=arguments[o];this.emit.apply(this,["done",t].concat(r)),this.handleJobDone(e)},t.prototype.handleJobError=function(e,t,n){this.emit("error",t,n),this.handleJobDone(e)},t.prototype.handleJobDone=function(e){var t=this;this.idleThreads.push(e),this.dequeue(),this.idleThreads.length===this.threads.length&&setTimeout(function(){t.emit("finished")},0)},t}(a["default"]);n["default"]=p,p.spawn=function(e){for(var t=[],n=0;e>n;n++)t.push(h.spawn());return t},t.exports=n["default"]},{"./":3,"./defaults":"./defaults","./job":4,eventemitter3:8}],6:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var o=e("./slave-code"),i=r(o),s="data:text/javascript;charset=utf-8,"+encodeURI(i["default"]),a=window.createBlobURL||window.createObjectURL;if(!a){var u=window.URL||window.webkitURL;if(!u)throw new Error("No Blob creation implementation found.");a=u.createObjectURL}if("function"==typeof window.BlobBuilder&&"function"==typeof a){var f=new window.BlobBuilder;f.append(i["default"]),s=a(f.getBlob())}else if("function"==typeof window.Blob&&"function"==typeof a){var c=new window.Blob([i["default"]],{type:"text/javascript"});s=a(c)}n["default"]=s,t.exports=n["default"]},{"./slave-code":7}],7:[function(e,t,n){t.exports="/*eslint-env worker*/\n/*global importScripts*/\n/*eslint-disable no-console*/\nself.module = {\n  exports : function() {\n    if (console) { console.error('No thread logic initialized.'); }\n  }\n};\n\nfunction handlerDone() {\n  var args = Array.prototype.slice.call(arguments, 0);\n  this.postMessage({ response : args });\n}\n\nfunction handlerProgress(progress) {\n  this.postMessage({ progress : progress });\n}\n\nfunction handlerDoneTransfer() {\n  var args = Array.prototype.slice.call(arguments);\n  var lastArg = args.pop();\n\n  if (!(lastArg instanceof Array) && this.console) {\n    console.error('Expected 2nd parameter of <doneCallback>.transfer() to be an array. Got:', lastArg);\n  }\n\n  this.postMessage({ response : args }, lastArg);\n}\n\nself.onmessage = function (event) {\n  var scripts = event.data.scripts;\n  if (scripts && scripts.length > 0 && typeof importScripts !== 'function') {\n    throw new Error('importScripts() not supported.');\n  }\n\n  if (event.data.initByScripts) {\n    importScripts.apply(null, scripts);\n  }\n\n  if (event.data.initByMethod) {\n    var method = event.data.method;\n    this.module.exports = Function.apply(null, method.args.concat(method.body));\n\n    if (scripts && scripts.length > 0) {\n      importScripts.apply(null, scripts);\n    }\n  }\n\n  if (event.data.doRun) {\n    var handler = this.module.exports;\n    if (typeof handler !== 'function') {\n      throw new Error('Cannot run thread logic. No handler has been exported.');\n    }\n\n    var preparedHandlerDone = handlerDone.bind(this);\n    preparedHandlerDone.transfer = handlerDoneTransfer.bind(this);\n\n    handler.call(this, event.data.param, preparedHandlerDone, handlerProgress.bind(this));\n  }\n}.bind(self);\n"},{}],8:[function(e,t,n){"use strict";function r(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function o(){}var i="function"!=typeof Object.create?"~":!1;o.prototype._events=void 0,o.prototype.listeners=function(e,t){var n=i?i+e:e,r=this._events&&this._events[n];if(t)return!!r;if(!r)return[];if(r.fn)return[r.fn];for(var o=0,s=r.length,a=new Array(s);s>o;o++)a[o]=r[o].fn;return a},o.prototype.emit=function(e,t,n,r,o,s){var a=i?i+e:e;if(!this._events||!this._events[a])return!1;var u,f,c=this._events[a],l=arguments.length;if("function"==typeof c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,n),!0;case 4:return c.fn.call(c.context,t,n,r),!0;case 5:return c.fn.call(c.context,t,n,r,o),!0;case 6:return c.fn.call(c.context,t,n,r,o,s),!0}for(f=1,u=new Array(l-1);l>f;f++)u[f-1]=arguments[f];c.fn.apply(c.context,u)}else{var h,p=c.length;for(f=0;p>f;f++)switch(c[f].once&&this.removeListener(e,c[f].fn,void 0,!0),l){case 1:c[f].fn.call(c[f].context);break;case 2:c[f].fn.call(c[f].context,t);break;case 3:c[f].fn.call(c[f].context,t,n);break;default:if(!u)for(h=1,u=new Array(l-1);l>h;h++)u[h-1]=arguments[h];c[f].fn.apply(c[f].context,u)}}return!0},o.prototype.on=function(e,t,n){var o=new r(t,n||this),s=i?i+e:e;return this._events||(this._events=i?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],o]:this._events[s].push(o):this._events[s]=o,this},o.prototype.once=function(e,t,n){var o=new r(t,n||this,!0),s=i?i+e:e;return this._events||(this._events=i?{}:Object.create(null)),this._events[s]?this._events[s].fn?this._events[s]=[this._events[s],o]:this._events[s].push(o):this._events[s]=o,this},o.prototype.removeListener=function(e,t,n,r){var o=i?i+e:e;if(!this._events||!this._events[o])return this;var s=this._events[o],a=[];if(t)if(s.fn)(s.fn!==t||r&&!s.once||n&&s.context!==n)&&a.push(s);else for(var u=0,f=s.length;f>u;u++)(s[u].fn!==t||r&&!s[u].once||n&&s[u].context!==n)&&a.push(s[u]);return a.length?this._events[o]=1===a.length?a[0]:a:delete this._events[o],this},o.prototype.removeAllListeners=function(e){return this._events?(e?delete this._events[i?i+e:e]:this._events=i?{}:Object.create(null),this):this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prototype.setMaxListeners=function(){return this},o.prefixed=i,"undefined"!=typeof t&&(t.exports=o)},{}],9:[function(e,t,n){(function(e){!function(e,n,r){n[e]=n[e]||r(),"undefined"!=typeof t&&t.exports?t.exports=n[e]:"function"==typeof define&&define.amd&&define(function(){return n[e]})}("Promise","undefined"!=typeof e?e:this,function(){"use strict";function e(e,t){h.add(e,t),l||(l=d(h.drain))}function t(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t?t:!1}function n(){for(var e=0;e<this.chain.length;e++)r(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function r(e,n,r){var o,i;try{n===!1?r.reject(e.msg):(o=n===!0?e.msg:n.call(void 0,e.msg),o===r.promise?r.reject(TypeError("Promise-chain cycle")):(i=t(o))?i.call(o,r.resolve,r.reject):r.resolve(o))}catch(s){r.reject(s)}}function o(r){var s,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(s=t(r))?e(function(){var e=new a(u);try{s.call(r,function(){o.apply(e,arguments)},function(){i.apply(e,arguments)})}catch(t){i.call(e,t)}}):(u.msg=r,u.state=1,u.chain.length>0&&e(n,u))}catch(f){i.call(new a(u),f)}}}function i(t){var r=this;r.triggered||(r.triggered=!0,r.def&&(r=r.def),r.msg=t,r.state=2,r.chain.length>0&&e(n,r))}function s(e,t,n,r){for(var o=0;o<t.length;o++)!function(o){e.resolve(t[o]).then(function(e){n(o,e)},r)}(o)}function a(e){this.def=e,this.triggered=!1}function u(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function f(t){if("function"!=typeof t)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new u(this);this.then=function(t,o){var i={success:"function"==typeof t?t:!0,failure:"function"==typeof o?o:!1};return i.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");i.resolve=e,i.reject=t}),r.chain.push(i),0!==r.state&&e(n,r),i.promise},this["catch"]=function(e){return this.then(void 0,e)};try{t.call(void 0,function(e){o.call(r,e)},function(e){i.call(r,e)})}catch(s){i.call(r,s)}}var c,l,h,p=Object.prototype.toString,d="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),c=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:r!==!1})}}catch(y){c=function(e,t,n){return e[t]=n,e}}h=function(){function e(e,t){this.fn=e,this.self=t,this.next=void 0}var t,n,r;return{add:function(o,i){r=new e(o,i),n?n.next=r:t=r,n=r,r=void 0},drain:function(){var e=t;for(t=n=l=void 0;e;)e.fn.call(e.self),e=e.next}}}();var g=c({},"constructor",f,!1);return f.prototype=g,c(g,"__NPO__",0,!1),c(f,"resolve",function(e){var t=this;return e&&"object"==typeof e&&1===e.__NPO__?e:new t(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)})}),c(f,"reject",function(e){return new this(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)})}),c(f,"all",function(e){var t=this;return"[object Array]"!=p.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");var o=e.length,i=Array(o),a=0;s(t,e,function(e,t){i[e]=t,++a===o&&n(i)},r)})}),c(f,"race",function(e){var t=this;return"[object Array]"!=p.call(e)?t.reject(TypeError("Not an array")):new t(function(n,r){if("function"!=typeof n||"function"!=typeof r)throw TypeError("Not a function");s(t,e,function(e,t){n(t)},r)})}),f})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);!function() {
  var Blotter = {
    version: "1.0.0"
  };
  var blotter_VendorPrefixes = [ "ms", "moz", "webkit", "o" ];
  var blotter_Animation = function() {
    var lastTime = 0, requestAnimationFrame = window.requestAnimationFrame, cancelAnimationFrame = window.cancelAnimationFrame, vendors = blotter_VendorPrefixes;
    for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
      requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
      cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!requestAnimationFrame) {
      requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!cancelAnimationFrame) {
      cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
    return {
      requestAnimationFrame: function(callback) {
        return requestAnimationFrame.call(window, callback);
      },
      cancelAnimationFrame: function(id) {
        cancelAnimationFrame.call(window, id);
      }
    };
  }();
  var blotter_CanvasUtils = {
    canvas: function(w, h) {
      var canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      return canvas;
    },
    hiDpiCanvas: function(w, h, pixelRatio) {
      pixelRatio = pixelRatio || this.pixelRatio;
      var canvas = document.createElement("canvas");
      canvas.width = w * pixelRatio;
      canvas.height = h * pixelRatio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      return canvas;
    },
    pixelRatio: function() {
      var sharpness = 1;
      console.log("dont forget you did this. set back to 1");
      var ctx = document.createElement("canvas").getContext("2d"), dpr = window.devicePixelRatio || 1, bsr = ctx.backingStorePixelRatio;
      for (var x = 0; x < blotter_VendorPrefixes.length && !bsr; ++x) {
        bsr = ctx[blotter_VendorPrefixes[x] + "BackingStorePixelRatio"];
      }
      bsr = bsr || 1;
      return dpr / bsr * sharpness;
    }(),
    mousePosition: function(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    },
    normalizedMousePosition: function(canvas, event) {
      var rect = canvas.getBoundingClientRect();
      var position = this.mousePosition(canvas, event);
      return {
        x: position.x / rect.width,
        y: position.y / rect.height
      };
    }
  };
  var blotter_Messaging = function() {
    function _formattedMessage(domain, message) {
      return domain + ": " + message;
    }
    return {
      logError: function(domain, message) {
        var formatted = _formattedMessage(domain, message);
        console.error(formatted);
      },
      throwError: function(domain, message) {
        var formatted = _formattedMessage(domain, message);
        throw formatted;
      }
    };
  }();
  var blotter_PropertyDefaults = {
    family: "sans-serif",
    size: 12,
    leading: 1.5,
    fill: "#000",
    style: "normal",
    weight: 500,
    padding: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  };
  var blotter_TextUtils = {
    Properties: function() {
      return Object.keys(blotter_PropertyDefaults);
    }(),
    ensurePropertyValues: function(properties) {
      var _properties = properties || {}, defaultedProperties = blotter_PropertyDefaults;
      for (var i = 0; i < this.Properties.length; i++) {
        var k = this.Properties[i];
        if (k in _properties) {
          defaultedProperties[k] = _properties[k];
        }
      }
      return defaultedProperties;
    },
    stringifiedPadding: function(properties) {
      var _properties = properties || this.ensurePropertyValues(), pTop = properties.paddingTop || _properties.padding, pRight = _properties.paddingRight || _properties.padding, pBottom = _properties.paddingBottom || _properties.padding, pLeft = _properties.paddingLeft || _properties.padding;
      return pTop + "px " + pRight + "px " + pBottom + "px " + pLeft + "px";
    },
    sizeForText: function(textValue, properties) {
      var el = document.createElement("p"), properties = this.ensurePropertyValues(properties), size;
      el.innerHTML = textValue;
      el.style.fontFamily = properties.family;
      el.style.fontSize = properties.size + "px";
      el.style.fontWeight = properties.weight;
      el.style.fontStyle = properties.style;
      el.style.padding = this.stringifiedPadding(properties);
      el.style.lineHeight = properties.leading;
      el.style.visibility = "hidden";
      el.style.display = "inline-block";
      document.body.appendChild(el);
      size = {
        w: el.offsetWidth,
        h: el.offsetHeight
      };
      document.body.removeChild(el);
      return size;
    }
  };
  var blotter_UniformUtils = {
    UniformTypes: [ "1f", "2f", "3f", "4f" ],
    validValueForUniformType: function(type, value) {
      var valid = false, isValid = function(element, index, array) {
        return !isNaN(element);
      };
      switch (type) {
       case "1f":
        valid = !isNaN(value) && [ value ].every(isValid);
        break;

       case "2f":
        valid = Array.isArray(value) && value.length == 2 && value.every(isValid);
        break;

       case "3f":
        valid = Array.isArray(value) && value.length == 3 && value.every(isValid);
        break;

       case "4f":
        valid = Array.isArray(value) && value.length == 4 && value.every(isValid);
        break;

       default:
        break;
      }
      return valid;
    },
    glslDataTypeForUniformType: function(type) {
      var dataType;
      switch (type) {
       case "1f":
        dataType = "float";
        break;

       case "2f":
        dataType = "vec2";
        break;

       case "3f":
        dataType = "vec3";
        break;

       case "4f":
        dataType = "vec4";
        break;

       default:
        break;
      }
      return dataType;
    },
    fullSwizzleStringForUniformType: function(type) {
      var swizzleString;
      switch (type) {
       case "1f":
        swizzleString = "x";
        break;

       case "2f":
        swizzleString = "xy";
        break;

       case "3f":
        swizzleString = "xyz";
        break;

       case "4f":
        swizzleString = "xyzw";
        break;

       default:
        break;
      }
      return swizzleString;
    }
  };
  Blotter.Text = function(value, properties) {
    this.init(value, properties);
  };
  Blotter.Text.prototype = function() {
    return {
      constructor: Blotter.Text,
      init: function(value, properties) {
        this.id = THREE.Math.generateUUID();
        this.value = value;
        this.properties = blotter_TextUtils.ensurePropertyValues(properties);
      }
    };
  }();
  var blotter_Mapper = function(texts) {
    this.init.apply(this, arguments);
  };
  blotter_Mapper.prototype = function() {
    function _updateTexts(texts, eachCallback) {
      if (!(texts instanceof Array)) {
        texts = [ texts ];
      }
      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        if (texts instanceof Blotter.Text) {
          blotter_Messaging.throwError("blotter_Mapper", "argument must be instance of Blotter.Text or array of objects that are instances of Blotter.Text");
        }
        eachCallback.call(this, text);
      }
      _determineTextsMapping.call(this);
    }
    function _determineTextsMapping() {
      var packer = new GrowingPacker(), tempTextsSizesArray = [];
      for (var textId in this.textsSizes) {
        var tempSizesObject = this.textsSizes[textId];
        tempSizesObject.referenceId = textId;
        tempTextsSizesArray.push(tempSizesObject);
      }
      packer.fit(tempTextsSizesArray.sort(_sortTexts));
      for (var i = 0; i < tempTextsSizesArray.length; i++) {
        var packedSizesObject = tempTextsSizesArray[i];
        if (this.flipY) {
          packedSizesObject.fit.y = packer.root.h - (packedSizesObject.fit.y + packedSizesObject.h);
        }
        this.textsSizes[packedSizesObject.referenceId].fit = packedSizesObject.fit;
      }
      this.width = packer.root.w;
      this.height = packer.root.h;
    }
    function _sortTexts(textA, textB) {
      var areaA = textA.w * textA.h, areaB = textB.w * textB.h;
      return areaB - areaA;
    }
    function _getYOffset(size, lineHeight) {
      var lineHeight = lineHeight || blotter_TextUtils.ensurePropertyValues().leading;
      if (!isNaN(lineHeight)) {
        lineHeight = size * lineHeight;
      } else if (lineHeight.toString().indexOf("px") !== -1) {
        lineHeight = parseInt(lineHeight);
      } else if (lineHeight.toString().indexOf("%") !== -1) {
        lineHeight = parseInt(lineHeight) / 100 * size;
      }
      return lineHeight;
    }
    return {
      constructor: blotter_Mapper,
      init: function(texts, options) {
        var options = options || {};
        this.pixelRatio = options.pixelRatio || 1;
        this.flipY = options.flipY || false;
        this.texts = [];
        this.textsSizes = {};
        this.width = 0;
        this.height = 0;
        this.addTexts(texts);
      },
      addTexts: function(texts) {
        _updateTexts.call(this, texts, function(text) {
          var sizesObject = this.textsSizes[text.id];
          if (this.texts.indexOf(text) == -1) {
            this.texts.push(text);
          }
          if (!sizesObject) {
            var size = blotter_TextUtils.sizeForText(text.value, text.properties);
            this.textsSizes[text.id] = size;
          }
        });
      },
      removeTexts: function(texts) {
        _updateTexts.call(this, texts, function(text) {
          var textsIndex = this.texts.indexOf(text);
          if (textsIndex != -1) {
            this.texts.splice(textsIndex, 1);
          }
          delete this.textsSizes[text.id];
        });
      },
      sizeForText: function(text) {
        return this.textsSizes[text.id];
      },
      toCanvas: function() {
        var canvas = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height, this.pixelRatio), ctx = canvas.getContext("2d", {
          alpha: false
        });
        ctx.textBaseline = "middle";
        for (var i = 0; i < this.texts.length; i++) {
          var text = this.texts[i], size = this.textsSizes[text.id], yOffset = _getYOffset.call(this, text.properties.size, text.properties.leading) / 2, adjustedY = size.fit.y + text.properties.paddingTop + yOffset;
          ctx.font = text.properties.style + " " + text.properties.weight + " " + text.properties.size + "px" + " " + text.properties.family;
          ctx.save();
          ctx.translate(size.fit.x + text.properties.paddingLeft, adjustedY);
          if (this.flipY) {
            ctx.scale(1, -1);
          }
          ctx.fillStyle = text.properties.fill;
          ctx.fillText(text.value, 0, 0);
          ctx.restore();
        }
        return canvas;
      },
      getImage: function() {
        return this.toCanvas().toDataURL();
      }
    };
  }();
  var blotter_TextsIndicesTexture = function(mapper, fidelityModifier) {
    this.init(mapper, fidelityModifier);
  };
  blotter_TextsIndicesTexture.prototype = function() {
    function _textsIndices(completion) {
      var self = this, height = this.mapper.height * this.fidelityModifier, width = this.mapper.width * this.fidelityModifier, points = new Float32Array(height * width * 4), widthStepModifier = width % 1, indicesOffset = 1 / this.mapper.texts.length / 2;
      setTimeout(function() {
        for (var i = 1; i < points.length / 4; i++) {
          var y = Math.ceil(i / (width - widthStepModifier)), x = i - (width - widthStepModifier) * (y - 1), referenceIndex = 0, bg = 0, a = 0;
          for (var ki = 0; ki < self.mapper.texts.length; ki++) {
            var text = self.mapper.texts[ki], textSize = self.mapper.sizeForText(text), fitY = textSize.fit.y * self.fidelityModifier, fitX = textSize.fit.x * self.fidelityModifier, vH = textSize.h * self.fidelityModifier, vW = textSize.w * self.fidelityModifier;
            if (y >= fitY && y <= fitY + vH && x >= fitX && x <= fitX + vW) {
              referenceIndex = ki / self.mapper.texts.length + indicesOffset;
              a = 1;
              break;
            }
          }
          var index = i - 1;
          points[4 * index + 0] = referenceIndex;
          points[4 * index + 1] = bg;
          points[4 * index + 2] = bg;
          points[4 * index + 3] = a;
        }
        completion(points);
      }, 1);
    }
    return {
      constructor: blotter_TextsIndicesTexture,
      init: function(mapper, fidelityModifier) {
        this.mapper = mapper;
        this.fidelityModifier = fidelityModifier || .5;
      },
      build: function(callback) {
        var self = this;
        _textsIndices.call(this, function(dataPoints) {
          var texture = new THREE.DataTexture(dataPoints, self.mapper.width * self.fidelityModifier, self.mapper.height * self.fidelityModifier, THREE.RGBAFormat, THREE.FloatType);
          texture.flipY = true;
          texture.needsUpdate = true;
          callback(texture);
        });
      }
    };
  }();
  var blotter_TextsBoundsTexture = function(mapper, pixelRatio) {
    this.init(mapper, pixelRatio);
  };
  blotter_TextsBoundsTexture.prototype = function() {
    function _spriteBounds(completion) {
      var self = this, data = new Float32Array(this.mapper.texts.length * 4);
      setTimeout(function() {
        for (var i = 0; i < self.mapper.texts.length; i++) {
          var text = self.mapper.texts[i], textSize = self.mapper.sizeForText(text);
          data[4 * i] = textSize.fit.x * self.pixelRatio;
          data[4 * i + 1] = self.height * self.pixelRatio - (textSize.fit.y + textSize.h) * self.pixelRatio;
          data[4 * i + 2] = textSize.w * self.pixelRatio;
          data[4 * i + 3] = textSize.h * self.pixelRatio;
        }
        completion(data);
      }, 1);
    }
    return {
      constructor: blotter_TextsBoundsTexture,
      init: function(mapper, pixelRatio) {
        this.mapper = mapper;
        this.pixelRatio = pixelRatio || 1;
        this.width = this.mapper.width;
        this.height = this.mapper.height;
      },
      build: function(callback) {
        var self = this;
        _spriteBounds.call(this, function(spriteData) {
          var texture = new THREE.DataTexture(spriteData, self.mapper.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
          texture.needsUpdate = true;
          callback(texture);
        });
      }
    };
  }();
  var blotter_Float32ArrayCache = function(length, poolSize) {
    this.init(length, poolSize);
  };
  blotter_Float32ArrayCache.prototype = function() {
    function _buildCache(length, poolSize) {
      this.cache = [];
      for (var i = 0; i < poolSize; i++) {
        this.cache.push(new Float32Array(length));
      }
    }
    return {
      constructor: blotter_Float32ArrayCache,
      init: function(length, poolSize) {
        poolSize = poolSize || 10;
        this.index = 0;
        _buildCache.call(this, length, poolSize);
      },
      next: function() {
        this.current = this.cache[this.index];
        this.index++;
        if (this.index == this.cache.length) {
          this.index = 0;
        }
        return this.current;
      }
    };
  }();
  var blotter_ImageDataCache = function(width, height, poolSize) {
    this.init(width, height, poolSize);
  };
  blotter_ImageDataCache.prototype = function() {
    function _buildCache(width, height, poolSize) {
      var canvas = document.createElement("canvas"), context = canvas.getContext("2d");
      this.cache = [];
      for (var i = 0; i < poolSize; i++) {
        this.cache.push(context.createImageData(width, height));
      }
      delete canvas;
    }
    return {
      constructor: blotter_ImageDataCache,
      init: function(width, height, poolSize) {
        poolSize = poolSize || 10;
        this.index = 0;
        _buildCache.call(this, width, height, poolSize);
      },
      next: function() {
        this.current = this.cache[this.index];
        this.index++;
        if (this.index == this.cache.length) {
          this.index = 0;
        }
        return this.current;
      }
    };
  }();
  var blotter_Uint8ArrayCache = function(length, poolSize) {
    this.init(length, poolSize);
  };
  blotter_Uint8ArrayCache.prototype = function() {
    function _buildCache(length, poolSize) {
      this.cache = [];
      for (var i = 0; i < poolSize; i++) {
        this.cache.push(new Uint8Array(length));
      }
    }
    return {
      constructor: blotter_Uint8ArrayCache,
      init: function(length, poolSize) {
        poolSize = poolSize || 10;
        this.index = 0;
        _buildCache.call(this, length, poolSize);
      },
      next: function() {
        this.current = this.cache[this.index];
        this.index++;
        if (this.index == this.cache.length) {
          this.index = 0;
        }
        return this.current;
      }
    };
  }();
  Blotter.Material = function(texts, shaderSrc, options) {
    this.init(texts, shaderSrc, options);
  };
  Blotter.Material.prototype = function() {
    function _createMapperFromTexts(texts) {
      if (!Array.isArray(texts)) {
        texts = [ texts ];
      }
      var mapper = new blotter_Mapper(texts, {
        pixelRatio: this.pixelRatio,
        flipY: true
      });
      this.width = mapper.width * this.pixelRatio;
      this.height = mapper.height * this.pixelRatio;
      return mapper;
    }
    function _vertexSrc() {
      var vertexSrc = [ "varying vec2 _vTexCoord;", "void main() {", "  _vTexCoord = uv;", "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", "}" ];
      return vertexSrc.join("\n");
    }
    function _fragmentSrc() {
      var privateUserDefinedUniformTextureDeclarations = [], publicUserDefinedUniformDeclarations = [], uniformDefinitionsForUserDefinedUniforms = [], fragmentSrc;
      for (var uniformName in this.userDefinedUniforms) {
        var self = this, uniformValue = this.userDefinedUniforms[uniformName];
        privateUserDefinedUniformTextureDeclarations.push("uniform sampler2D " + _uniformTextureNameForUniformName.call(this, uniformName) + ";");
        publicUserDefinedUniformDeclarations.push(blotter_UniformUtils.glslDataTypeForUniformType(uniformValue.type) + " " + uniformName + ";");
        uniformDefinitionsForUserDefinedUniforms.push(function() {
          var textureName = _uniformTextureNameForUniformName.call(self, uniformName), swizzle = blotter_UniformUtils.fullSwizzleStringForUniformType(uniformValue.type);
          return uniformName + " = " + "texture2D(" + textureName + " , vec2(spriteIndex, 0.5))." + swizzle + ";";
        }());
      }
      privateUserDefinedUniformTextureDeclarations = privateUserDefinedUniformTextureDeclarations.join("\n");
      publicUserDefinedUniformDeclarations = publicUserDefinedUniformDeclarations.join("\n");
      uniformDefinitionsForUserDefinedUniforms = uniformDefinitionsForUserDefinedUniforms.join("\n");
      fragmentSrc = [ "precision highp float;", "uniform sampler2D _uSampler;", "uniform sampler2D _uSpriteIndicesTexture;", "uniform sampler2D _uSpriteBoundsTexture;", "uniform vec2 _uCanvasResolution;", "varying vec2 _vTexCoord;", "vec4 _spriteBounds;", "vec2 uResolution;", privateUserDefinedUniformTextureDeclarations, publicUserDefinedUniformDeclarations, "vec4 textTexture( vec2 coord ) {", "   vec2 adjustedFragCoord = _spriteBounds.xy + vec2((_spriteBounds.z * coord.x), (_spriteBounds.w * coord.y));", "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;", "   if (adjustedFragCoord.x < _spriteBounds.x ||", "       adjustedFragCoord.x > _spriteBounds.x + _spriteBounds.z ||", "       adjustedFragCoord.y < _spriteBounds.y ||", "       adjustedFragCoord.y > _spriteBounds.y + _spriteBounds.w) {", "     return vec4(0.0);", "   }", "   return texture2D(_uSampler, uv);", "}", "void mainImage( out vec4 mainImage, in vec2 fragCoord );", this.shaderSrc, "void main( void ) {", "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);", "   float spriteIndex = spriteIndexData.r;", "   float spriteAlpha = spriteIndexData.a;", "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));", "   uResolution = _spriteBounds.zw;", uniformDefinitionsForUserDefinedUniforms, "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;", "   vec4 outColor;", "   mainImage(outColor, fragCoord);", "   outColor.a = outColor.a * spriteAlpha;", "   gl_FragColor = outColor;//texture2D(_uSampler, _vTexCoord);//vec4(1.0, 0.6705882353, 0.2509803922, 0.7);//outColor;//vec4(1.0, 1.0, 0.5, 1.0);//", "}" ];
      return fragmentSrc.join("\n");
    }
    function _setTextsUniformsValues() {
      for (var uniformName in this.userDefinedUniforms) {
        if (this.userDefinedUniforms.hasOwnProperty(uniformName)) {
          for (var i = 0; i < this.mapper.texts.length; i++) {
            var text = this.mapper.texts[i], uniform = this.userDefinedUniforms[uniformName];
            if (blotter_UniformUtils.UniformTypes.indexOf(uniform.type) == -1) {
              blotter_Messaging.logError("Blotter.Material", "user defined uniforms must be one of type: " + blotter_UniformUtils.UniformTypes.join(", "));
              return;
            }
            if (!blotter_UniformUtils.validValueForUniformType(uniform.type, uniform.value)) {
              blotter_Messaging.logError("Blotter.Material", "user defined uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
              return;
            }
            this.textsUniformsValues[text.id] = this.textsUniformsValues[text.id] || {};
            this.textsUniformsValues[text.id][uniformName] = JSON.parse(JSON.stringify(uniform));
          }
        }
      }
    }
    function _materialUniforms(callback) {
      var self = this, uniforms, loader = new THREE.TextureLoader(), userDefinedUniformTextures = _uniformsForUserDefinedUniformValues.call(this), indicesTexture = new blotter_TextsIndicesTexture(this.mapper, this.fidelity), boundsTexture = new blotter_TextsBoundsTexture(this.mapper, this.pixelRatio);
      loader.load(this.mapper.getImage(), function(textsTexture) {
        indicesTexture.build(function(spriteIndicesTexture) {
          boundsTexture.build(function(spriteBoundsTexture) {
            textsTexture.generateMipmaps = false;
            textsTexture.minFilter = THREE.LinearFilter;
            textsTexture.magFilter = THREE.LinearFilter;
            textsTexture.needsUpdate = true;
            uniforms = {
              _uSampler: {
                type: "t",
                value: textsTexture
              },
              _uCanvasResolution: {
                type: "2f",
                value: [ self.width, self.height ]
              },
              _uSpriteIndicesTexture: {
                type: "t",
                value: spriteIndicesTexture
              },
              _uSpriteBoundsTexture: {
                type: "t",
                value: spriteBoundsTexture
              }
            };
            for (var uniformName in userDefinedUniformTextures) {
              uniforms[uniformName] = userDefinedUniformTextures[uniformName];
            }
            callback(uniforms);
          });
        });
      });
    }
    function _uniformTextureNameForUniformName(uniformName) {
      return "_" + uniformName + "Texture";
    }
    function _uniformsForUserDefinedUniformValues() {
      var uniformsAsTextures = {};
      for (var uniformName in this.userDefinedUniforms) {
        uniformsAsTextures[_uniformTextureNameForUniformName.call(this, uniformName)] = {
          value: _uniformTextureForUniformName.call(this, uniformName),
          type: "t"
        };
      }
      return uniformsAsTextures;
    }
    function _uniformTextureForUniformName(uniformName) {
      var uniformDescription = this.userDefinedUniforms[uniformName], data = this.float32ArrayCache.next();
      if (!uniformDescription) blotter_Messaging.logError("Blotter.Composer", "cannot find uniformName for _uniformTextureForUniformName");
      for (var i = 0; i < this.mapper.texts.length; i++) {
        var text = this.mapper.texts[i], textUniformsValues = this.textsUniformsValues[text.id];
        if (textUniformsValues) {
          var textUniform = textUniformsValues[uniformName];
          if (textUniform.type == "1f") {
            data[4 * i] = textUniform.value;
            data[4 * i + 1] = 0;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
          } else if (textUniform.type == "2f") {
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
          } else if (textUniform.type == "3f") {
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = textUniform.value[2];
            data[4 * i + 3] = 0;
          } else if (textUniform.type == "4f") {
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = textUniform.value[2];
            data[4 * i + 3] = textUniform.value[3];
          } else {
            data[4 * i] = 0;
            data[4 * i + 1] = 0;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
          }
        } else {
          data[4 * i] = 0;
          data[4 * i + 1] = 0;
          data[4 * i + 2] = 0;
          data[4 * i + 3] = 0;
        }
      }
      var texture = new THREE.DataTexture(data, this.mapper.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
      texture.needsUpdate = true;
      return texture;
    }
    return {
      constructor: Blotter.Material,
      init: function(texts, shaderSrc, options) {
        options = options || {};
        this.pixelRatio = options.pixelRatio || blotter_CanvasUtils.pixelRatio;
        this.mapper = _createMapperFromTexts.call(this, texts);
        this.float32ArrayCache = new blotter_Float32ArrayCache(this.mapper.texts.length * 4);
        this.shaderSrc = shaderSrc;
        this.userDefinedUniforms = options.uniforms || {};
        this.fidelity = .5;
        this.textsUniformsValues = {};
        _setTextsUniformsValues.call(this);
      },
      load: function(callback) {
        var self = this;
        _materialUniforms.call(this, function(uniforms) {
          self.threeMaterial = new THREE.ShaderMaterial({
            vertexShader: _vertexSrc.call(self),
            fragmentShader: _fragmentSrc.call(self),
            uniforms: uniforms
          });
          self.threeMaterial.depthTest = false;
          self.threeMaterial.depthWrite = false;
          callback();
        });
      },
      hasText: function(text) {
        if (!(text instanceof Blotter.Text)) {
          blotter_Messaging.logError("Blotter.Material", "argument must be instanceof Blotter.Text");
        }
        return !!this.textsUniformsValues[text.id];
      },
      updateUniformValueForText: function(text, uniformName, value) {
        var textsUniformsObject = this.textsUniformsValues[text.id];
        if (!textsUniformsObject) {
          blotter_Messaging.logError("Blotter.Material", "cannot find text for updateUniformsForText");
          return;
        }
        if (!textsUniformsObject[uniformName]) {
          blotter_Messaging.logError("Blotter.Material", "cannot find uniformName for updateUniformsForText");
          return;
        }
        if (!blotter_UniformUtils.validValueForUniformType(textsUniformsObject[uniformName].type, value)) {
          blotter_Messaging.logError("Blotter.Material", "user defined uniform value for " + uniformName + " is incorrect for type: " + this.userDefinedUniforms[uniformName].type);
          return;
        }
        textsUniformsObject[uniformName].value = value;
        this.threeMaterial.uniforms[_uniformTextureNameForUniformName.call(self, uniformName)] = {
          type: "t",
          value: _uniformTextureForUniformName.call(this, uniformName)
        };
        this.threeMaterial.needsUpdate = true;
      }
    };
  }();
  var blotter_RendererScope = function(text, renderer, options) {
    this.init(text, renderer, options);
  };
  blotter_RendererScope.prototype = function() {
    function _setupEventEmission() {
      var emitter = EventEmitter.prototype;
      for (var prop in emitter) {
        if (emitter.hasOwnProperty(prop)) {
          this[prop] = emitter[prop];
        }
      }
    }
    function _setMouseEventListeners() {
      var self = this, eventNames = [ "mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave" ];
      for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        (function(self, name) {
          self.domElement.addEventListener(name, function(e) {
            var position = blotter_CanvasUtils.normalizedMousePosition(self.domElement, e);
            self.emit(name, position);
          }, false);
        })(self, eventName);
      }
    }
    function _setEventListeners() {
      _setMouseEventListeners.call(this);
    }
    function _render() {
      if (this.domElement) {
        this.context.clearRect(0, 0, this.domElement.width, this.domElement.height);
        this.context.putImageData(this.renderer.imageData, this.fit.x, this.fit.y);
        this.emit("update", this.frameCount);
      }
    }
    return {
      constructor: blotter_RendererScope,
      init: function(text, renderer, options) {
        options = options || {};
        if (typeof options.autostart === "undefined") {
          options.autostart = true;
        }
        this.text = text;
        this.renderer = renderer;
        this.pixelRatio = options.pixelRatio || blotter_CanvasUtils.pixelRatio;
        var mappedSize = this.renderer.material.mapper.sizeForText(text);
        this.fit = {
          w: mappedSize.w,
          h: mappedSize.h,
          x: -1 * ~~(mappedSize.fit.x * this.pixelRatio),
          y: -1 * ~~((this.renderer.material.mapper.height - (mappedSize.fit.y + mappedSize.h)) * this.pixelRatio)
        };
        this.playing = options.autostart;
        this.timeDelta = 0;
        this.lastDrawTime;
        this.frameCount = 0;
        this.domElement;
        this.context;
        _setupEventEmission.call(this);
      },
      play: function() {
        this.playing = true;
      },
      pause: function() {
        this.playing = false;
      },
      update: function() {
        var now = Date.now();
        this.frameCount += 1;
        this.timeDelta = (now - (this.lastDrawTime || now)) / 1e3;
        this.lastDrawTime = now;
        _render.call(this);
      },
      appendTo: function(element) {
        if (this.domElement) {
          this.domElement.remove();
          this.context = null;
        }
        this.domElement = blotter_CanvasUtils.hiDpiCanvas(this.fit.w, this.fit.h);
        this.context = this.domElement.getContext("2d");
        element.appendChild(this.domElement);
        _setEventListeners.call(this);
      }
    };
  }();
  var blotter_BackBufferRenderer = function(width, height, material) {
    this.init(width, height, material);
  };
  blotter_BackBufferRenderer.prototype = function() {
    return {
      constructor: blotter_BackBufferRenderer,
      init: function(width, height, material) {
        this.scene = new THREE.Scene();
        this.renderTarget = new THREE.WebGLRenderTarget(width, height, {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
          type: THREE.UnsignedByteType
        });
        this.renderTarget.texture.generateMipmaps = false;
        this.renderTarget.width = width;
        this.renderTarget.height = height;
        this.material = material;
        this.plane = new THREE.PlaneGeometry(width, height);
        this.mesh = new THREE.Mesh(this.plane, this.material);
        this.scene.add(this.mesh);
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          premultipliedAlpha: false
        });
        this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 100);
        this.viewBuffer = new ArrayBuffer(width * height * 4);
        this.imageDataArray = new Uint8Array(this.viewBuffer);
        this.clampedImageDataArray = new Uint8ClampedArray(this.viewBuffer);
        this.imageData = new ImageData(this.clampedImageDataArray, width, height);
      },
      render: function() {
        this.renderer.render(this.scene, this.camera, this.renderTarget);
        this.renderer.readRenderTargetPixels(this.renderTarget, 0, 0, this.renderTarget.width, this.renderTarget.height, this.imageDataArray);
      },
      teardown: function() {
        this.renderer = null;
      }
    };
  }();
  Blotter.Renderer = function(material) {
    this.init(material);
  };
  Blotter.Renderer.prototype = function() {
    function _loop() {
      var self = this;
      this.backBuffer.render();
      this.imageData = this.backBuffer.imageData;
      for (var textId in this.textScopes) {
        if (this.textScopes[textId].playing) {
          this.textScopes[textId].update();
        }
      }
      this.currentAnimationLoop = blotter_Animation.requestAnimationFrame(function() {
        _loop.call(self);
      });
    }
    return {
      constructor: Blotter.Renderer,
      init: function(material, options) {
        options = options || {};
        if (typeof options.autostart === "undefined") {
          options.autostart = true;
        }
        if (!Detector.webgl) {
          blotter_Messaging.throwError("Blotter.Renderer", "device does not support webgl");
        }
        if (!material.threeMaterial) {
          blotter_Messaging.throwError("Blotter.Renderer", "material does not expose property threeMaterial. Did you forget to call #load on your Blotter.Material object before instantiating Blotter.Renderer?");
        }
        this.material = material;
        this.textScopes = {};
        this.imageData;
        this.backBuffer = new blotter_BackBufferRenderer(this.material.width, this.material.height, this.material.threeMaterial);
        if (options.autostart) {
          this.start();
        }
      },
      start: function() {
        if (!this.currentAnimationLoop) {
          _loop.call(this);
        }
      },
      stop: function() {
        if (this.currentAnimationLoop) {
          blotter_Animation.cancelAnimationFrame(this.currentAnimationLoop);
          this.currentAnimationLoop = undefined;
        }
      },
      teardown: function() {
        this.stop();
        this.backBuffer.teardown();
        this.renderer = null;
      },
      forText: function(text, options) {
        if (!(text instanceof Blotter.Text)) {
          blotter_Messaging.logError("Blotter.Renderer", "argument must be instanceof Blotter.Text");
          return;
        }
        if (!this.material.hasText(text)) {
          blotter_Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in material");
          return;
        }
        options = options || {};
        if (typeof options.autostart === "undefined") {
          options.autostart = true;
        }
        options.pixelRatio = this.material.pixelRatio;
        if (!this.textScopes[text.id]) {
          var scope = new blotter_RendererScope(text, this, options);
          this.textScopes[text.id] = scope;
        }
        return this.textScopes[text.id];
      }
    };
  }();
  this.Blotter = Blotter;
}();