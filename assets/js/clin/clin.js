
(function ($) {
	"use strict";

	$.fn.cli = (function (opt) {
		/* jQuery plugin. */

		var lineClass = "cli-line";
		var self = this;
		var $clonned;

		var $el = this;
		$clonned = $el.clone();
		$el.html('').addClass('active');

		var opts = {
			debug: (opt && opt.debug) || false,
			charDelay: (opt && opt.dd) || 50,		// character delay
			wsDelay: (opt && opt.dd) || 100,		// whitespace char delay
			prePutD: (opt && opt.prePutD) || 400,	// pre put() delay
			posPutD: (opt && opt.posPutD) || 400,	// pos put() delay
		};

		var debug = function () {
			if (opts.debug)
				console.debug.apply(console, arguments);
		}

		/* Lock queue */
		var Queue = new (function () {
			var locked = false;
			var _queue = [];

			setInterval(function () {
				if (!locked) {
					locked = true;
					_queue.length && (_queue.shift())();
				}
			}, 10);
			
			this.unlock = function () {
				locked = false;
			}

			this.append = function (fn) {
				return function () {
					var args = arguments;
					var call = (function () {
						fn.apply(this, args);
					}).bind(self);
					_queue.push(call);
					return this;
				}
			}

			this.prepend = function (fn) {
				return function () {
					var args = arguments;
					var call = (function () {
						fn.apply(this, args);
					}).bind(self);
					_queue.unshift(call);
					return this;
				}
			}
		});

		/* Exposed methods before Async-Lock Wrapping */
		var methods = {
			putNode: function putNode (textnode, $place, _opt) {
				
				debug('\tputting message', textnode, 'in', $place[0].outerHTML);
				
				if (textnode.nodeType == Node.TEXT_NODE) {
					var text = $(textnode).text().replace(/^\s+|\s+$/g, '');
					textnode.nodeValue = ''
					var lineEl = $(textnode).clone().appendTo($place);
				} else
					throw 'err';

				debug('new lineEl:', lineEl);

				if (lineEl.has('b-cursor'))
					lineEl.parent().addClass('blink-cursor')
				setTimeout(function () {
					var i = 0;
					(function thisFn () {
						debug('character:', text[i]);
						lineEl[0].nodeValue += text[i];
						if (++i >= text.length) {
							Queue.unlock();
							Queue.prepend(methods.after)(function () {
									lineEl.parent().removeClass('blink-cursor');
									Queue.unlock();
								});
							Queue.prepend(methods.wait)(opts.posPutD);
							return;
						}
						var delay = (text[i]===' '&&opts.wsDelay)||opts.charDelay;
						setTimeout(thisFn, delay);
					})();
				}, opts.prePutD);
			},

			fadeIn: function (obj) {
				obj.fade
				Queue.unlock();
			},
			
			wait: function wait (ms) {
				if (!ms)
					return;
				setTimeout(function () {
					Queue.unlock();
				}, ms);
			},

			render: function render () {
				function renderNode (node, $place) {
					console.log('\nrendering node', node, 'in', String($place.html()));
					if (node.dataset && node.dataset.cli === 'fade') {
						$(node).hide().appendTo($place).fadeIn('slow');
						Queue.unlock();
						return;
					}

					// If node has childNodes (includes text nodes)
					if (node.childNodes.length) {
						// Recursively render the nodes.
						debug('has child')
						var css = $(node).contents();
						var nplace = $(node).clone().html('').appendTo($place);
						for (var i=css.length-1; i+1; i--) {
							console.log('cs[%s]',i, css[i], nplace)
							Queue.prepend(renderNode)(css[i], nplace);
						}
					} else {
						// Otherwise, render string.
						debug('doesn\'t have child')
						if (/^[\s\n\r]*$/.test($(node).text())) { // Empty text-node
							debug('EMPTY!\n\n', node)
							Queue.append(function() {
								$(node).appendTo($place);
								Queue.unlock();
							})();
							window.node = node;
						} else {
							debug('\tcontent', node, $place[0]);
							Queue.prepend(methods.putNode)(node, $place);
						}
					}
					Queue.unlock();
				}

				var cs = $clonned[0].childNodes;
				for (var i=0; i<cs.length; i++) {
					Queue.append(renderNode)(cs[i], $el);
				}

				Queue.unlock();
			},

			after: function (fn) {
				fn();
			},
		}
		Queue.append(methods.render)();

		return this;
	});

}(jQuery));