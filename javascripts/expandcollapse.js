$.fn.exists = function(){return this.length>0;}
/* - expandcollapse.js - */
//for advertising page: (bug not showing Next button when container starts collapsed)
function showNextButton() {
	// wrap to not show button if at last slide
	//var onLastSlide = isLastSlide(thisCarousel);
	//if !(onLastSlide) {
	$("span.elastislide-next").css({
		"display": "block"
	});
	//}
}

function isLastSlide(currentCarousel) {
	//
}

(function ($) {
	$(document).ready(function () {
		//// make accordion heads tab-navigable
		//$('.expandcollapse > li.odd').each(function () {
		//	var tabFocusLink = $('<a></a>');
		//	tabFocusLink.attr('href', '#');
		//	tabFocusLink.addClass('tabHead');
		//	var tabHtml = $(this).html();
		//	tabFocusLink.html(tabHtml);
		//	$(this).html(tabFocusLink);
		//});

		var all = $('<ul class="list-open">' +
				 '<li><a class="open" href="#">Expand Section</a></li>' +
				 '<li><a class="close" href="#">Collapse Section</a></li>' +
			   '</ul>');
		var firstHeading, headingCheck;
		var textOpenAll = "Open All";
		var textCloseAll = "Close All";

		/* XXX ignore the adding an odd class to even!
		   jquery works differently than css in this
		   evidently! */
		//		from http://api.jquery.com/odd-selector/: the 0-based indexing means that, counter-intuitively, :odd selects the second element, fourth element, and so on within the matched set.
		$('.expandcollapse > li:even').addClass('odd').each(function () {
			var el = $(this);
			var button = $('<span class="plus"></span>');

			// make accordion heads tab-navigable
			var tabFocusLink = $('<a></a>');
			tabFocusLink.attr('href', '#');
			tabFocusLink.addClass('tabHead');
			var tabHtml = $(this).html();
			tabFocusLink.html(tabHtml);
			$(this).html(tabFocusLink);

			// attach button, assign click event to <li>
			el.prepend(button);
			el.click(function (e) {
				/* here is where we slide down/up the next
				   list item */
				var next = el.next();

				if (next.is(':visible')) {
					next.slideUp('slow');
					el.removeClass('expanded');
					button.removeClass('minus');
					el.children('.accessabilttext').text('Show');
					el.children('.panelstate').text('Panel - Collapsed');
				} else {
					// show next button
					showNextButton();
					next.css('display', 'block').hide().slideDown('slow');
					el.addClass('expanded');
					button.addClass('minus');
					el.children('.accessabilttext').text('Hide');
					el.children('.panelstate').text('Panel - Expanded');
				}
				e.preventDefault();
			});
		});

		$('.expandcollapse').each(function () {
			var ec = $(this);
			var oc = all.clone();
			var open = oc.find('.open');
			var close = oc.find('.close');
			open.click(function (e) {
				$('li', ec).each(function () {
					var el = $(this);
					if (!el.hasClass('expanded')) {
						el.trigger('click');
					}
				});
				// show next button
				showNextButton();
				e.preventDefault();
			});
			close.click(function (e) {
				$('li', ec).each(function () {
					var el = $(this);
					if (el.hasClass('expanded')) {
						el.trigger('click');
					}
				});
				e.preventDefault();
			});
			oc.insertBefore(ec);
		});

		$('.expandcollapse > li:odd').addClass('even');
		$('.expandcollapse > li:first').addClass('first');
		$('.expandcollapse > li:last').addClass('last');

		var accessableSpan = $('<span>Show</span>').addClass('accessabilttext').addClass('visuallyhidden');
		$('.expandcollapse > li.odd').prepend(accessableSpan);

		var currentTab = $('<span>Panel - Collapsed</span>').addClass('visuallyhidden').addClass('panelstate');
		$('.expandcollapse > li.odd').append(currentTab);

		// open the Advertising section on page load besides kryptos
		//$(".expandcollapse .first").click();

		// add an Open/Close All to the top of the accordions (i.e., before the first ul.list-open) besides kryptos
		//$('ul.list-open').filter(":first").before("<ul class='expandcollapse-all'><li><a href='#'>" + textOpenAll + "</a></li><li><a href='#'>" + textCloseAll + "</a></li></ul>");
		if (!$('.template-document_view_kryptos').exists() && !$('.template-document_view_photo_tour').exists() && !$('.template-document_view_publications_center').exists()){
//dfl			$(".expandcollapse .first").click();   //dfl
//dfl  test entry	$("ul.list-open .open").click(); //dfl
			$('ul.list-open').filter(":first").before("<ul class='expandcollapse-all'><li><a href='#'>" + textOpenAll + "</a></li><li><a href='#'>" + textCloseAll + "</a></li></ul>");
		}
		// attach click event for Open All and Close All
		$(".expandcollapse-all li").click(function (e) {
			// if clicking Open, trigger Open event
			if ($(this).text().substring(0, 4).toLowerCase() == "open") {
				$("ul.list-open .open").click();
			}
			else {
				// in clicking Closed, trigger Close event
				$("ul.list-open .close").click();
			}
			e.preventDefault;
			return false;
		});

		// if ul.list-open is preceded by <h3> as in <h3>Students</h3>, then move the h3 to beneath the newly-added expandcollapse-all
		firstHeading = $('h3 + ul.list-open').filter(":first");
		headingCheck = firstHeading.length;
		if (headingCheck > 0) {
			// move heading to beneath expandcollapse-all
			$("#content-core h3").filter(":first").insertAfter($(".expandcollapse-all"));
		}

		// if there are no h3s (assumption is no sub-sections), no need to show the Expand Section | Collapse Section part; Open All/Close All will take care of entire page
		if (headingCheck == 0) {
			// hide Expand Section | Collapse Section part
			$(".list-open").addClass("hidden");
		}
	});
})(jQuery);
