(function($) {
	
	'use strict';
	
	// Load Foundation
	$(document).foundation();
	
	// Events open on page load, currently not working.
	// We don't need this anymore
	/*
	var hash, offset, scrollto;
	hash = window.location.hash;
	offset = $('.sticky-header').height() + $('#wpadminbar').height();
		
	if ( hash !== '' ) {
		
		$('.accordion').foundation('down', $(hash) );
		
		scrollto = hash.replace("event", "event-item");
			
		$(window).on('down.zf.accordion', function(){
			  $.smoothScroll({
				offset: offset * -1,
				scrollTarget: scrollto
			});
			
			
		});
		
		
	}
	*/
	
	
	// touch events for main menu
	var window_width = $(window).width();
 	if( window_width > 1023 ) {
 		$( '.nav-primary li:has(ul)' ).doubleTapToGo();
	}
	
	var $all_oembed_videos = $("iframe[src*='youtube'], iframe[src*='vimeo']");
	
	$all_oembed_videos.each(function() {
	
		var _this = $(this);
				
		if (_this.parent('.embed-container').length === 0) {
		  _this.wrap('<div class="embed-container"></div>');
		}
		
		_this.removeAttr('height').removeAttr('width');
 	
 	});
	
	
	// Open external links in new window
	/*
	$('a:not([target]').each(function() {
	   var a = new RegExp('/' + window.location.host + '/');
	   if(!a.test(this.href)) {
		   $(this).click(function(event) {
			   event.preventDefault();
			   event.stopPropagation();
			   window.open(this.href, '_blank');
		   });
	   }
	});
	*/
	
	// front page
	//$('.section-page-blocks .grid .column-wrap').matchHeight(true);
	
	// disable phone link on desktop
		
	$('.no-touchevents a[href^="tel:"]').on('click', function(e){
        e.preventDefaults();
    });
	
	$('.equal-height-columns .columns').matchHeight(true);
	
	$('.section-helping-advance-dermatology .grid .column div').matchHeight(true);
	
	

})(jQuery);

