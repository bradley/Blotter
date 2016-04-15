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
    version: "0.1.0"
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
  var blotter_Messaging = function() {
    function _formattedMessage(domain, message) {
      return domain + ": " + message;
    }
    return {
      ensureInstanceOf: function(object, constructor, constructorStr, domain) {
        if (!(object instanceof constructor)) {
          this.logError(domain, "argument must be instanceof " + constructorStr);
          return;
        }
      },
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
          if (_properties.hasOwnProperty(k)) {
            defaultedProperties[k] = _properties[k];
          }
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
    },
    extractValidUniforms: function(uniforms, domain) {
      uniforms = uniforms || {};
      var validUniforms = {};
      for (var uniformName in uniforms) {
        if (uniforms.hasOwnProperty(uniformName)) {
          var uniform = uniforms[uniformName];
          if (blotter_UniformUtils.UniformTypes.indexOf(uniform.type) == -1) {
            blotter_Messaging.logError(domain, "uniforms must be one of type: " + blotter_UniformUtils.UniformTypes.join(", "));
            continue;
          }
          if (!blotter_UniformUtils.validValueForUniformType(uniform.type, uniform.value)) {
            blotter_Messaging.logError(domain, "uniform value for " + uniformName + " is incorrect for type: " + uniform.type);
            continue;
          }
          validUniforms[uniformName] = uniform;
        }
      }
      return validUniforms;
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
  var blotter_TextsMapper = function(texts) {
    this.init.apply(this, arguments);
  };
  blotter_TextsMapper.prototype = function() {
    function _updateTexts(texts, eachCallback) {
      if (!(texts instanceof Array)) {
        texts = [ texts ];
      }
      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text or an array of Blotter.Text objects", "Blotter.Material");
        eachCallback.call(this, text);
      }
      _determineTextsMapping.call(this);
    }
    function _determineTextsMapping() {
      var packer = new GrowingPacker(), tempTextsBounds = [];
      for (var textId in this.textsBounds) {
        if (this.textsBounds.hasOwnProperty(textId)) {
          var tempSizesObject = this.textsBounds[textId];
          tempSizesObject.referenceId = textId;
          tempTextsBounds.push(tempSizesObject);
        }
      }
      packer.fit(tempTextsBounds.sort(_sortTexts));
      for (var i = 0; i < tempTextsBounds.length; i++) {
        var packedSizesObject = tempTextsBounds[i];
        if (this.flipY) {
          packedSizesObject.fit.y = packer.root.h - (packedSizesObject.fit.y + packedSizesObject.h);
        }
        this.textsBounds[packedSizesObject.referenceId].fit = packedSizesObject.fit;
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
      constructor: blotter_TextsMapper,
      init: function(texts, options) {
        var options = options || {};
        this.pixelRatio = options.pixelRatio || 1;
        this.flipY = options.flipY || false;
        this.texts = [];
        this.textsBounds = {};
        this.width = 0;
        this.height = 0;
        this.addTexts(texts);
      },
      addTexts: function(texts) {
        _updateTexts.call(this, texts, function(text) {
          var sizesObject = this.textsBounds[text.id];
          if (this.texts.indexOf(text) == -1) {
            this.texts.push(text);
          }
          if (!sizesObject) {
            var size = blotter_TextUtils.sizeForText(text.value, text.properties);
            this.textsBounds[text.id] = size;
          }
        });
      },
      removeTexts: function(texts) {
        _updateTexts.call(this, texts, function(text) {
          var textsIndex = this.texts.indexOf(text);
          if (textsIndex != -1) {
            this.texts.splice(textsIndex, 1);
          }
          delete this.textsBounds[text.id];
        });
      },
      boundsFor: function(text) {
        return this.textsBounds[text.id];
      },
      toCanvas: function() {
        var canvas = blotter_CanvasUtils.hiDpiCanvas(this.width, this.height, this.pixelRatio), ctx = canvas.getContext("2d", {
          alpha: false
        });
        ctx.textBaseline = "middle";
        for (var i = 0; i < this.texts.length; i++) {
          var text = this.texts[i], fit = this.textsBounds[text.id], yOffset = _getYOffset.call(this, text.properties.size, text.properties.leading) / 2, adjustedY = fit.fit.y + text.properties.paddingTop + yOffset;
          ctx.font = text.properties.style + " " + text.properties.weight + " " + text.properties.size + "px" + " " + text.properties.family;
          ctx.save();
          ctx.translate(fit.fit.x + text.properties.paddingLeft, adjustedY);
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
  var blotter_TextsIndicesTexture = function(textsTexture, sampleAccuracy) {
    this.init(textsTexture, sampleAccuracy);
  };
  blotter_TextsIndicesTexture.prototype = function() {
    function _textsIndices(completion) {
      var self = this, height = this.textsTexture.mapper.height * this.sampleAccuracy, width = this.textsTexture.mapper.width * this.sampleAccuracy, points = new Float32Array(height * width * 4), widthStepModifier = width % 1, indicesOffset = 1 / this.textsTexture.texts.length / 2;
      setTimeout(function() {
        for (var i = 1; i < points.length / 4; i++) {
          var y = Math.ceil(i / (width - widthStepModifier)), x = i - (width - widthStepModifier) * (y - 1), lookupIndex = 0, bg = 0, a = 0;
          for (var ki = 0; ki < self.textsTexture.texts.length; ki++) {
            var text = self.textsTexture.texts[ki], bounds = self.textsTexture.boundsFor(text), fitY = bounds.fit.y * self.sampleAccuracy, fitX = bounds.fit.x * self.sampleAccuracy, vH = bounds.h * self.sampleAccuracy, vW = bounds.w * self.sampleAccuracy;
            if (y >= fitY && y <= fitY + vH && x >= fitX && x <= fitX + vW) {
              lookupIndex = ki / self.textsTexture.texts.length + indicesOffset;
              a = 1;
              break;
            }
          }
          var index = i - 1;
          points[4 * index + 0] = lookupIndex;
          points[4 * index + 1] = bg;
          points[4 * index + 2] = bg;
          points[4 * index + 3] = a;
        }
        completion(points);
      });
    }
    return {
      constructor: blotter_TextsIndicesTexture,
      init: function(textsTexture, sampleAccuracy) {
        this.textsTexture = textsTexture;
        this.sampleAccuracy = sampleAccuracy || .5;
      },
      build: function(callback) {
        var self = this;
        _textsIndices.call(this, function(dataPoints) {
          var texture = new THREE.DataTexture(dataPoints, self.textsTexture.mapper.width * self.sampleAccuracy, self.textsTexture.mapper.height * self.sampleAccuracy, THREE.RGBAFormat, THREE.FloatType);
          texture.flipY = true;
          texture.needsUpdate = true;
          callback(texture);
        });
      }
    };
  }();
  var blotter_TextsBoundsTexture = function(textsTexture, pixelRatio) {
    this.init(textsTexture, pixelRatio);
  };
  blotter_TextsBoundsTexture.prototype = function() {
    function _spriteBounds(completion) {
      var self = this, data = new Float32Array(this.textsTexture.texts.length * 4);
      setTimeout(function() {
        for (var i = 0; i < self.textsTexture.texts.length; i++) {
          var text = self.textsTexture.texts[i], bounds = self.textsTexture.boundsFor(text);
          data[4 * i] = bounds.fit.x * self.pixelRatio;
          data[4 * i + 1] = self.height * self.pixelRatio - (bounds.fit.y + bounds.h) * self.pixelRatio;
          data[4 * i + 2] = bounds.w * self.pixelRatio;
          data[4 * i + 3] = bounds.h * self.pixelRatio;
        }
        completion(data);
      }, 1);
    }
    return {
      constructor: blotter_TextsBoundsTexture,
      init: function(textsTexture, pixelRatio) {
        this.textsTexture = textsTexture;
        this.pixelRatio = pixelRatio || 1;
        this.width = this.textsTexture.mapper.width;
        this.height = this.textsTexture.mapper.height;
      },
      build: function(callback) {
        var self = this;
        _spriteBounds.call(this, function(spriteData) {
          var texture = new THREE.DataTexture(spriteData, self.textsTexture.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
          texture.needsUpdate = true;
          callback(texture);
        });
      }
    };
  }();
  var blotter_TextsTexture = function(texts) {
    this.init(texts);
  };
  blotter_TextsTexture.prototype = function() {
    function _createMapperFromTexts(texts) {
      if (!Array.isArray(texts)) {
        texts = [ texts ];
      }
      this.texts = texts;
      this.mapper = new blotter_TextsMapper(texts, {
        pixelRatio: this.pixelRatio,
        flipY: true
      });
      this.width = this.mapper.width * this.pixelRatio;
      this.height = this.mapper.height * this.pixelRatio;
    }
    return {
      constructor: blotter_TextsTexture,
      init: function(texts, pixelRatio) {
        this.pixelRatio = pixelRatio || blotter_CanvasUtils.pixelRatio;
        _createMapperFromTexts.call(this, texts);
      },
      load: function(callback) {
        var self = this, loader = new THREE.TextureLoader();
        loader.load(this.mapper.getImage(), function(texture) {
          self.texture = texture;
          self.texture.generateMipmaps = false;
          self.texture.minFilter = THREE.LinearFilter;
          self.texture.magFilter = THREE.LinearFilter;
          self.texture.needsUpdate = true;
          callback(self.texture);
        });
      },
      boundsFor: function(text) {
        blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");
        if (this.texts.indexOf(text) == -1) {
          blotter_Messaging.logError("Blotter.Material", "Blotter.Text object not found in texture texts");
          return;
        }
        return this.mapper.boundsFor(text);
      },
      indexFor: function(text) {
        var index = this.texts.indexOf(text);
        if (index == -1) {
          blotter_Messaging.logError("Blotter.Material", "Blotter.Text object not found in texture texts");
          return;
        }
        return index;
      }
    };
  }();
  var blotter_MaterialScope = function(text, material) {
    this.init(text, material);
  };
  blotter_MaterialScope.prototype = function() {
    function _buildUniformInterface() {
      var self = this;
      this.uniforms = {};
      for (var uniformName in this.material.uniforms) {
        var uniform = this.material.uniforms[uniformName];
        this.uniforms[uniformName] = {
          _name: uniformName,
          _type: uniform.type,
          _value: uniform.value,
          get type() {
            return this._type;
          },
          set type(v) {
            blotter_Messaging.logError("blotter_MaterialScope", "uniform types may not be updated");
          },
          get value() {
            return this._value;
          },
          set value(v) {
            if (!blotter_UniformUtils.validValueForUniformType(this._type, v)) {
              blotter_Messaging.logError("blotter_MaterialScope", "uniform value not valid for uniform type: " + this._type);
              return;
            }
            this._value = v;
            _updateDataForUniformTextureData.call(self, this._name);
          }
        };
        _updateDataForUniformTextureData.call(this, uniformName);
        console.log("we fixed the problem with updating uniforms by adding _name to the uniform objects. however, none of these are set on creation and currently require user to update them at least once like in examples/index.html. fix thattttttt.");
      }
    }
    function _updateDataForUniformTextureData(uniformName) {
      var materialUniform = this.material.uniforms[uniformName], scopedUniform = this.uniforms[uniformName], data = materialUniform._textureData, i = this.textIndex;
      if (materialUniform.type == "1f") {
        data[4 * i] = scopedUniform._value;
        data[4 * i + 1] = 0;
        data[4 * i + 2] = 0;
        data[4 * i + 3] = 0;
      } else if (materialUniform.type == "2f") {
        data[4 * i] = scopedUniform._value[0];
        data[4 * i + 1] = scopedUniform._value[1];
        data[4 * i + 2] = 0;
        data[4 * i + 3] = 0;
      } else if (materialUniform.type == "3f") {
        data[4 * i] = scopedUniform._value[0];
        data[4 * i + 1] = scopedUniform._value[1];
        data[4 * i + 2] = scopedUniform._value[2];
        data[4 * i + 3] = 0;
      } else if (materialUniform.type == "4f") {
        data[4 * i] = scopedUniform._value[0];
        data[4 * i + 1] = scopedUniform._value[1];
        data[4 * i + 2] = scopedUniform._value[2];
        data[4 * i + 3] = scopedUniform._value[3];
      } else {
        data[4 * i] = 0;
        data[4 * i + 1] = 0;
        data[4 * i + 2] = 0;
        data[4 * i + 3] = 0;
      }
      materialUniform._texture.needsUpdate = true;
    }
    return {
      constructor: blotter_MaterialScope,
      init: function(text, material) {
        this.text = text;
        this.material = material;
        this.textIndex = this.material.textsTexture.indexFor(this.text);
        _buildUniformInterface.call(this);
      }
    };
  }();
  Blotter.Material = function(texts, mainImageSrc, options) {
    this.init(texts, mainImageSrc, options);
  };
  Blotter.Material.prototype = function() {
    function _defaultMainImage() {
      var mainImage = [ "void mainImage( out vec4 mainImage, in vec2 fragCoord ) {", "mainImage = textTexture(fragCoord / uResolution);", "}" ];
      return mainImage.join("\n");
    }
    function _vertexSrc() {
      var vertexSrc = [ "varying vec2 _vTexCoord;", "void main() {", "  _vTexCoord = uv;", "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);", "}" ];
      return vertexSrc.join("\n");
    }
    function _fragmentSrc() {
      var fragmentSrc, privateUniformTextureDeclarations = [], publicUniformDeclarations = [], uniformDefinitionsForUniforms = [];
      for (var uniformName in this.uniforms) {
        if (this.uniforms.hasOwnProperty(uniformName)) {
          var self = this, uniformValue = this.uniforms[uniformName];
          privateUniformTextureDeclarations.push("uniform sampler2D " + _uniformTextureNameForUniformName.call(this, uniformName) + ";");
          publicUniformDeclarations.push(blotter_UniformUtils.glslDataTypeForUniformType(uniformValue.type) + " " + uniformName + ";");
          uniformDefinitionsForUniforms.push(function() {
            var textureName = _uniformTextureNameForUniformName.call(self, uniformName), swizzle = blotter_UniformUtils.fullSwizzleStringForUniformType(uniformValue.type);
            return uniformName + " = " + "texture2D(" + textureName + " , vec2(spriteIndex, 0.5))." + swizzle + ";";
          }());
        }
      }
      privateUniformTextureDeclarations = privateUniformTextureDeclarations.join("\n");
      publicUniformDeclarations = publicUniformDeclarations.join("\n");
      uniformDefinitionsForUniforms = uniformDefinitionsForUniforms.join("\n");
      fragmentSrc = [ "precision highp float;", "uniform sampler2D _uSampler;", "uniform sampler2D _uSpriteIndicesTexture;", "uniform sampler2D _uSpriteBoundsTexture;", "uniform vec2 _uCanvasResolution;", "varying vec2 _vTexCoord;", "vec4 _spriteBounds;", "vec2 uResolution;", privateUniformTextureDeclarations, publicUniformDeclarations, "vec4 textTexture( vec2 coord ) {", "   vec2 adjustedFragCoord = _spriteBounds.xy + vec2((_spriteBounds.z * coord.x), (_spriteBounds.w * coord.y));", "   vec2 uv = adjustedFragCoord.xy / _uCanvasResolution;", "   if (adjustedFragCoord.x < _spriteBounds.x ||", "       adjustedFragCoord.x > _spriteBounds.x + _spriteBounds.z ||", "       adjustedFragCoord.y < _spriteBounds.y ||", "       adjustedFragCoord.y > _spriteBounds.y + _spriteBounds.w) {", "     return vec4(0.0);", "   }", "   return texture2D(_uSampler, uv);", "}", "void mainImage( out vec4 mainImage, in vec2 fragCoord );", this.mainImage, "void main( void ) {", "   vec4 spriteIndexData = texture2D(_uSpriteIndicesTexture, _vTexCoord);", "   float spriteIndex = spriteIndexData.r;", "   float spriteAlpha = spriteIndexData.a;", "   _spriteBounds = texture2D(_uSpriteBoundsTexture, vec2(spriteIndex, 0.5));", "   uResolution = _spriteBounds.zw;", uniformDefinitionsForUniforms, "   vec2 fragCoord = gl_FragCoord.xy - _spriteBounds.xy;", "   vec4 outColor;", "   mainImage(outColor, fragCoord);", "   outColor.a = outColor.a * spriteAlpha;", "   gl_FragColor = outColor;//texture2D(_uSampler, _vTexCoord);//vec4(1.0, 0.6705882353, 0.2509803922, 0.7);//outColor;//vec4(1.0, 1.0, 0.5, 1.0);//", "}" ];
      return fragmentSrc.join("\n");
    }
    function _setTexturesForUniforms() {
      this.uniformTextures = {};
      for (var uniformName in this.uniforms) {
        if (this.uniforms.hasOwnProperty(uniformName)) {
          var data = new Float32Array(this.textsTexture.texts.length * 4);
          this.uniforms[uniformName]._textureData = data;
          this.uniforms[uniformName]._texture = new THREE.DataTexture(data, this.textsTexture.texts.length, 1, THREE.RGBAFormat, THREE.FloatType);
        }
      }
    }
    function _materialUniforms(callback) {
      var self = this, textureUniforms = _textureUniformsForUniforms.call(this), indicesTexture = new blotter_TextsIndicesTexture(this.textsTexture, this.sampleAccuracy), boundsTexture = new blotter_TextsBoundsTexture(this.textsTexture, this.pixelRatio);
      this.textsTexture.load(function(texture) {
        indicesTexture.build(function(spriteIndicesTexture) {
          boundsTexture.build(function(spriteBoundsTexture) {
            var uniforms = {
              _uSampler: {
                type: "t",
                value: texture
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
            for (var uniformName in textureUniforms) {
              if (textureUniforms.hasOwnProperty(uniformName)) {
                uniforms[uniformName] = textureUniforms[uniformName];
              }
            }
            callback(uniforms);
          });
        });
      });
    }
    function _uniformTextureNameForUniformName(uniformName) {
      return "_" + uniformName + "Texture";
    }
    function _textureUniformsForUniforms() {
      var textureUniforms = {};
      for (var uniformName in this.uniforms) {
        if (this.uniforms.hasOwnProperty(uniformName)) {
          textureUniforms[_uniformTextureNameForUniformName.call(this, uniformName)] = {
            value: this.uniforms[uniformName]._texture,
            type: "t"
          };
        }
      }
      return textureUniforms;
    }
    function _buildTextScopes(texts) {
      this.scopes = {};
      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        if (!this.scopes[text.id]) {
          this.scopes[text.id] = new blotter_MaterialScope(text, this);
        }
      }
    }
    return {
      constructor: Blotter.Material,
      init: function(texts, options) {
        options = options || {};
        this.texts = texts;
        this.textsTexture = new blotter_TextsTexture(texts);
        this.width = this.textsTexture.width;
        this.height = this.textsTexture.height;
        this.mainImage = options.mainImage || _defaultMainImage.call(this);
        this.sampleAccuracy = options.sampleAccuracy || .5;
        this.pixelRatio = options.pixelRatio || blotter_CanvasUtils.pixelRatio;
        this.uniforms = blotter_UniformUtils.extractValidUniforms(options.uniforms || {});
      },
      load: function(callback) {
        var self = this;
        _setTexturesForUniforms.call(this);
        _buildTextScopes.call(this, this.textsTexture.texts);
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
      forText: function(text) {
        blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Material");
        if (this.texts.indexOf(text) == -1) {
          blotter_Messaging.logError("Blotter.Material", "Blotter.Text object not found");
          return;
        }
        return this.scopes[text.id];
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
        this.context.putImageData(this.renderer.imageData, this.bounds.x, this.bounds.y);
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
        var mappedBounds = this.renderer.material.textsTexture.boundsFor(text);
        this.bounds = {
          w: mappedBounds.w,
          h: mappedBounds.h,
          x: -1 * Math.floor(mappedBounds.fit.x * this.pixelRatio),
          y: -1 * Math.floor((this.renderer.material.textsTexture.mapper.height - (mappedBounds.fit.y + mappedBounds.h)) * this.pixelRatio)
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
        this.domElement = blotter_CanvasUtils.hiDpiCanvas(this.bounds.w, this.bounds.h);
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
      for (var textId in this.scopes) {
        if (this.scopes[textId].playing) {
          this.scopes[textId].update();
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
        this.scopes = {};
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
        blotter_Messaging.ensureInstanceOf(text, Blotter.Text, "Blotter.Text", "Blotter.Renderer");
        if (!this.material.forText(text)) {
          blotter_Messaging.logError("Blotter.Renderer", "Blotter.Text object not found in material");
          return;
        }
        options = options || {};
        if (typeof options.autostart === "undefined") {
          options.autostart = true;
        }
        options.pixelRatio = this.material.pixelRatio;
        if (!this.scopes[text.id]) {
          var scope = new blotter_RendererScope(text, this, options);
          this.scopes[text.id] = scope;
        }
        return this.scopes[text.id];
      }
    };
  }();
  this.Blotter = Blotter;
}();