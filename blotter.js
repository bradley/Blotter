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
}.call(this));!function() {
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
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
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
      var sharpness = 2;
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
        y: rect.height - (event.clientY - rect.top)
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
    function _generateId() {
      var d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
      }
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : r & 3 | 8).toString(16);
      });
      return uuid;
    }
    return {
      constructor: Blotter.Text,
      init: function(value, properties) {
        this.id = _generateId.call(this);
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
        this.textsSizes[packedSizesObject.referenceId].fit = packedSizesObject.fit;
      }
      this.width = packer.root.w;
      this.height = packer.root.h;
    }
    function _sortTexts(textA, textB) {
      var areaA = textA.w * textA.h, areaB = textB.w * textB.h;
      return areaB - areaA;
    }
    return {
      constructor: blotter_Mapper,
      init: function(texts, pixelRatio) {
        this.pixelRatio = pixelRatio || 1;
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
        var canvas = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height, this.pixelRatio), ctx = canvas.getContext("2d");
        for (var i = 0; i < this.texts.length; i++) {
          var text = this.texts[i], size = this.textsSizes[text.id], lineHeightOffset = text.properties.size / 2 + (text.properties.size * text.properties.leading - text.properties.size) / 2;
          ctx.font = text.properties.style + " " + text.properties.weight + " " + text.properties.size + "px " + text.properties.family;
          ctx.fillStyle = text.properties.fill;
          ctx.fillText(text.value, size.fit.x + text.properties.paddingLeft, size.fit.y + text.properties.paddingTop + lineHeightOffset);
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
  Blotter.Material = function(texts, shaderSrc, options) {
    this.init(texts, shaderSrc, options);
  };
  Blotter.Material.prototype = function() {
    function _createMapperFromTexts(texts) {
      if (!Array.isArray(texts)) {
        texts = [ texts ];
      }
      var mapper = new blotter_Mapper(texts, this.pixelRatio);
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
      fragmentSrc = [ "precision highp float;", "uniform sampler2D _uSampler;", "uniform sampler2D _uSpriteIndicesTexture;", "uniform sampler2D _uSpriteBoundsTexture;", "uniform vec2 _uCanvasResolution;", "varying vec2 _vTexCoord;", "vec4 _spriteBounds;", "vec2 uResolution;", privateUserDefinedUniformTextureDeclarations, publicUserDefinedUniformDeclarations, "vec4 textTexture( vec2 coord ) {", "   vec2 adjustedFragCoord = _spriteBounds.xy + vec2((_spriteBounds.z * coord.x), (_spriteBounds.w * coord.y));", "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;", "   if (adjustedFragCoord.x < _spriteBounds.x ||", "       adjustedFragCoord.x > _spriteBounds.x + _spriteBounds.z ||", "       adjustedFragCoord.y < _spriteBounds.y ||", "       adjustedFragCoord.y > _spriteBounds.y + _spriteBounds.w) {", "     return vec4(0.0);", "   }", "   return texture2D(_uSampler, uv);", "}", "void mainImage( out vec4 mainImage, in vec2 fragCoord );", this.shaderSrc, "void main( void ) {", "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);", "   float spriteIndex = spriteIndexData.r;", "   float spriteAlpha = spriteIndexData.a;", "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));", "   uResolution = _spriteBounds.zw;", uniformDefinitionsForUserDefinedUniforms, "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;", "   vec4 outColor;", "   mainImage(outColor, fragCoord);", "   outColor.a = outColor.a * spriteAlpha;", "   gl_FragColor = outColor;", "}" ];
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
      var uniformDescription = this.userDefinedUniforms[uniformName], data = new Float32Array(this.mapper.texts.length * 4);
      if (!uniformDescription) blotter_Messaging.logError("Blotter.Composer", "cannot find uniformName for _uniformTextureForUniformName");
      for (var i = 0; i < this.mapper.texts.length; i++) {
        var text = this.mapper.texts[i], textUniformsValues = this.textsUniformsValues[text.id];
        if (textUniformsValues) {
          var textUniform = textUniformsValues[uniformName];
          switch (textUniform.type) {
           case "1f":
            data[4 * i] = textUniform.value;
            data[4 * i + 1] = 0;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;

           case "2f":
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;

           case "3f":
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = textUniform.value[2];
            data[4 * i + 3] = 0;
            break;

           case "4f":
            data[4 * i] = textUniform.value[0];
            data[4 * i + 1] = textUniform.value[1];
            data[4 * i + 2] = textUniform.value[2];
            data[4 * i + 3] = textUniform.value[3];
            break;

           default:
            data[4 * i] = 0;
            data[4 * i + 1] = 0;
            data[4 * i + 2] = 0;
            data[4 * i + 3] = 0;
            break;
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
        this.context.clearRect(0, 0, this.size.w, this.size.h);
        this.context.putImageData(this.renderer.backBufferData, -1 * Math.floor(this.size.fit.x), -1 * Math.floor(this.size.fit.y));
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
        this.size = this.renderer.material.mapper.sizeForText(text);
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
        this.playing += 1;
        this.timeDelta = (now - (this.lastDrawTime || now)) / 1e3;
        this.lastDrawTime = now;
        _render.call(this);
      },
      appendTo: function(element) {
        if (this.domElement) {
          this.domElement.remove();
          this.context = null;
        }
        this.domElement = blotter_CanvasUtils.canvas(this.size.w, this.size.h);
        this.context = this.domElement.getContext("2d");
        element.appendChild(this.domElement);
        _setEventListeners.call(this);
      }
    };
  }();
  Blotter.Renderer = function(material) {
    this.init(material);
  };
  Blotter.Renderer.prototype = function() {
    function _loop() {
      var self = this, textScope;
      this.renderer.render(this.scene, this.camera);
      this.backBufferContext.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
      this.backBufferContext.drawImage(this.domElement, 0, 0, this.domElement.width, this.domElement.height, 0, 0, this.backBuffer.width, this.backBuffer.height);
      this.backBufferData = this.backBufferContext.getImageData(0, 0, this.backBuffer.width, this.backBuffer.height);
      for (var textId in this.textScopes) {
        textScope = this.textScopes[textId];
        if (textScope.playing) {
          textScope.update();
        }
      }
      this.currentAnimationLoop = blotter_Animation.requestAnimationFrame(function() {
        _loop.call(self);
      });
    }
    return {
      constructor: Blotter.Renderer,
      init: function(material, options) {
        var width = material.width, height = material.height;
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
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        this.renderer.setSize(width, height);
        this.domElement = this.renderer.domElement;
        this.domElementContext = this.renderer.getContext();
        this.backBuffer = blotter_CanvasUtils.canvas(material.mapper.width, material.mapper.height);
        this.backBufferContext = this.backBuffer.getContext("2d");
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.geometry = new THREE.PlaneGeometry(2, 2, 0);
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material.threeMaterial);
        this.scene.add(this.mesh);
        this.textScopes = {};
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
        this.renderer = null;
        this.domElement.remove();
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