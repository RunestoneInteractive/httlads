$.fn.exists = function(){return this.length>0;}

// page init
jQuery(function(){
//	jQuery('input, textarea').placeholder();
	initTabNav();
	
	/* External Links */
	$('a').filter(function(){return this.hostname && this.hostname !== location.hostname && this.href.indexOf('cia.gov')==-1}).attr('rel','external');	
	$('[rel="external"]')
		.click(function(e){e.preventDefault();externalLinkConfirm($(this).attr('href'))})
		.each(function(){$(this).attr('title',$(this).prop('title')+' (external link)')}		
	);	
	
	/* Plug-in List */
	$('#plugins ul li,#plugins').hide();
	$('#plugins li').each(function(){		
		if($('[href*=".' + $(this).data('plugin') + '"]').exists()){
			$('#plugins').show();
			$(this).show();
		}
	});
	if($('#myflash').exists()){ // this id will need to be adjusted depending on how flash is implemented
		$('#plugins').show();
		$('[data-plugin="swf"]').show();	
	}
	$('#plugins ul').prepend('[').append(']');
	
});


function externalLinkConfirm(url){
	var extmsg="You are leaving the official CIA.gov public website. Please note that this third-party website is not controlled by the CIA or subject to its Privacy Policy.\n\nClick [OK] to continue to " + url + ".";
	if(confirm(extmsg))location.href=url;
}

// "tab" key handling
function initTabNav() {
	jQuery('#nav').find('li').addClass('more');
	jQuery('#nav').tabNav({
		items: '.more'
	});
}

/*
 * Accessible TAB navigation
 */
;(function($){
	$.fn.tabNav = function(opt) {
		var options = $.extend({
			hoverClass: 'hover',
			items: 'li',
			opener: '>a'
		},opt);

		return this.each(function() {
			var nav = $(this), items = nav.find(options.items);
		
			items.each(function(index, navItem) {
				var item = $(this), navActive, touchNavActive;
				var link = item.find(options.opener);
				var timer;
				
				link.bind('focus', function() {
					navActive = nav.hasClass('js-nav-active');
					touchNavActive = window.TouchNav && TouchNav.isActiveOn(navItem);
					if(!navActive || touchNavActive) {
						initSimpleNav();
					}
					item.trigger(navActive && touchNavActive ? 'itemhover' : 'mouseenter');
				}).bind('blur', function() {
					item.trigger(navActive && touchNavActive ? 'itemleave' : 'mouseleave');
				});

				var initSimpleNav = function() {
					if(!initSimpleNav.done) {
						initSimpleNav.done = true;
						item.hover(function() {
							clearTimeout(timer);
							timer = setTimeout(function() {
								item.addClass(options.hoverClass);
							}, 10)
						}, function() {
							clearTimeout(timer);
							timer = setTimeout(function() {
								item.removeClass(options.hoverClass);
							}, 10)
						});
					}
				};
			});
		});
	};
}(jQuery));

/*! http://mths.be/placeholder v2.0.6 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;
	if(navigator.userAgent.indexOf('Opera/') != -1) {
		isInputSupported = isTextareaSupported = false;
	}
	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We canâ€™t use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they donâ€™t get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input),
		    hadFocus;
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			hadFocus = input == document.activeElement;
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
			}
			hadFocus && input.select();
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));

