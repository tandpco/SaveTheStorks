/*!
 Ridiculously Responsive Social Sharing Buttons
 Team: @dbox, @joshuatuscan
 Site: http://www.kurtnoble.com/labs/rrssb
 Twitter: @therealkni

        ___           ___
       /__/|         /__/\        ___
      |  |:|         \  \:\      /  /\
      |  |:|          \  \:\    /  /:/
    __|  |:|      _____\__\:\  /__/::\
   /__/\_|:|____ /__/::::::::\ \__\/\:\__
   \  \:\/:::::/ \  \:\~~\~~\/    \  \:\/\
    \  \::/~~~~   \  \:\  ~~~      \__\::/
     \  \:\        \  \:\          /__/:/
      \  \:\        \  \:\         \__\/
       \__\/         \__\/
*/

+(function(window, $, undefined) {
	'use strict';

	var support = {
		calc : false
	};

	/*
	 * Public Function
	 */

	 $.fn.rrssb = function( options ) {

		// Settings that $.rrssb() will accept.
		var settings = $.extend({
			description: undefined,
			emailAddress: undefined,
			emailBody: undefined,
			emailSubject: undefined,
			image: undefined,
			title: undefined,
			url: undefined
		}, options );

		// Return the encoded strings if the settings have been changed.
		for (var key in settings) {
			if (settings.hasOwnProperty(key) && settings[key] !== undefined) {
				settings[key] = encodeString(settings[key]);
			}
		};

		if (settings.url !== undefined) {

			$(this).find('.rrssb-facebook a').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + settings.url);
			$(this).find('.rrssb-tumblr a').attr('href', 'http://tumblr.com/share/link?url=' + settings.url + (settings.title !== undefined ? '&name=' + settings.title : '')  + (settings.description !== undefined ? '&description=' + settings.description : ''));
			$(this).find('.rrssb-linkedin a').attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + settings.url + (settings.title !== undefined ? '&title=' + settings.title : '') + (settings.description !== undefined ? '&summary=' + settings.description : ''));
			$(this).find('.rrssb-twitter a').attr('href', 'http://twitter.com/home?status=' + (settings.description !== undefined ? settings.description : '') + '%20' + settings.url);
			$(this).find('.rrssb-hackernews a').attr('href', 'https://news.ycombinator.com/submitlink?u=' + settings.url + (settings.title !== undefined ? '&text=' + settings.title : ''));
			$(this).find('.rrssb-reddit a').attr('href', 'http://www.reddit.com/submit?url=' + settings.url + (settings.description !== undefined ? '&text=' + settings.description : '') + (settings.title !== undefined ? '&title=' + settings.title : ''));
			$(this).find('.rrssb-googleplus a').attr('href', 'https://plus.google.com/share?url=' + (settings.description !== undefined ? settings.description : '') + '%20' + settings.url);
			$(this).find('.pinterest a').attr('href', 'http://pinterest.com/pin/create/button/?url=' + settings.url + ((settings.image !== undefined) ? '&amp;media=' + settings.image : '') + (settings.description !== undefined ? '&amp;description=' + settings.description : ''));
			$(this).find('.rrssb-pocket a').attr('href', 'https://getpocket.com/save?url=' + settings.url);
			$(this).find('.rrssb-github a').attr('href', settings.url);
		}

		if (settings.emailAddress !== undefined) {
			$(this).find('.rrssb-email a').attr('href', 'mailto:' + settings.emailAddress + '?' + (settings.emailSubject !== undefined ? 'subject=' + settings.emailSubject : '') + (settings.emailBody !== undefined ? '&amp;body=' + settings.emailBody : ''));
		}

	};

	var popupCenter = function(url, title, w, h) {
		// Fixes dual-screen position                         Most browsers      Firefox
		var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

		var left = ((width / 2) - (w / 2)) + dualScreenLeft;
		var top = ((height / 3) - (h / 3)) + dualScreenTop;

		var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

		// Puts focus on the newWindow
		if (window.focus) {
			newWindow.focus();
		}
	};

	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = "Don't call this twice without a uniqueId";
			}
			if (timers[uniqueId]) {
				clearTimeout (timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	// init load
	$(document).ready(function(){
		/*
		 * Event listners
		 */

    $(document).on('click', 'a.popup', {}, function popUp(e) {
			var self = $(this);
			popupCenter(self.attr('href'), self.find('.rrssb-text').html(), 580, 470);
			e.preventDefault();
		});

	});

})(window, jQuery);