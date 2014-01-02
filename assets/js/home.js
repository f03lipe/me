
(function ($) {
	"use strict";

	var cln = (new (function (opt) {

		var lineClass = "cli-line";
		var self = this;

		var options = {
			debug: (opt && opt.debug) || true,
			charDelay: (opt && opt.dd) || 100,		// character delay
			prePutD: (opt && opt.prePutD) || 1000,	// pre put() delay
			posPutD: (opt && opt.posPutD) || 1000,	// pos put() delay
		};

		var debug = function () {
			if (options.debug)
				console.debug.apply(console, arguments);
		}

		/* Part of Async */
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

			this.push = function (fn) {
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

		/****************/

		/* Exposed methods before Async-Lock Wrapping */
		var methods = {
			put: function put (msg, _opt) {
				if (typeof msg === 'string') {
					debug('msg is string');
					var text = msg.slice().replace(/^\s+|\s+$/g, '');
					var lineEl = $("<div>").addClass(lineClass).appendTo(self.$el);
				} else {
					debug('msg is/should-be HTML/jQuery element');
					var text = $(msg).html().replace(/^\s+|\s+$/g, '');
					var lineEl = $(msg).clone().html('').addClass(lineClass).appendTo(self.$el);
				}
				debug('new lineEl:', lineEl);

				setTimeout(function () {
					var i = 0;
					var int = setInterval(function () {
						debug('character:', text[i])
						lineEl.html(text.slice(0,++i));
						if (i >= text.length) {
							clearInterval(int);
							Queue.unlock();
							Queue.prepend(methods.after)(function () {
									lineEl.removeClass('b-cursor');
									Queue.unlock();
								});
							Queue.prepend(methods.wait)((_opt && prePutD.posPutD) || options.posPutD)
						}
					}, (_opt && _opt.charDelay) || options.charDelay);
				}, (_opt && _opt.prePutD) || options.prePutD);
			},
			
			wait: function wait (ms) {
				if (!ms)
					return;
				setTimeout(function () {
					Queue.unlock();
				}, ms);
			},

			render: function render () {
				var cs = self.$el.children();
				for (var i=0, c=cs[0]; i<cs.length; i++, c=cs[i]) {
					if (c.dataset.cli) {
						var cc = $(c.innerHTML);
						$(c).remove();
						Queue.push(methods.put)(cc);
					}
				}
				Queue.unlock();
			},

			after: function (fn) {
				fn();
			},
		}

		return {
			init: function (el) {
				self.$el = $(el);
				return this;
			},
			put: Queue.push(methods.put),
			wait: Queue.push(methods.wait),
			render: Queue.push(methods.render),
			after: Queue.push(methods.after),
		};

	})).init($(".cli-wrapper"));

	$(document).ready(function(){
		cln.render()
			// .put("I'm Felipe.").wait(1000)
			// .put("Welcome to my hand-crafted webpage.");
	});

}(jQuery));