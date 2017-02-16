(function($) {
	
	'use strict';
	
	// Load Foundation
	$(document).foundation();
	
	
	
	// touch events for main menu
	var window_width = $(window).width();
 	if( window_width > 1023 ) {
 		$( '.nav-primary li:has(ul)' ).doubleTapToGo();
	}
	
	// responsive videos
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
	
	
	
	var testimonialSlider, testimonialNav;	
		  
	  var testimonial_slider_opts = {
		transitionType: 'fade',
		controlNavigation:'none',
		imageScaleMode: 'none',
		imageAlignCenter:false,
		arrowsNav: true,
		arrowsNavAutoHide: true,
		sliderTouch: true,
		addActiveClass: true,
		sliderDrag:false,
		arrowsNavHideOnTouch: false,
		fullscreen: false,
		loop: true,
		autoHeight: true, 
		autoScaleSlider: false, 
 		slidesSpacing: 0,
		keyboardNavEnabled: false,
		navigateByClick: false,
		fadeinLoadedSlide: true,
		globalCaption:false,
		//imgWidth: 1905,
		//imgHeight: 450,
		transitionSpeed: 100,
		usePreloader: false,
		
		autoPlay: {
				// autoplay options go gere
				enabled: true,
				pauseOnHover: false,
				delay: 4000
			}
	  };
	
   	$('#testimonial-slider').royalSlider(testimonial_slider_opts);
		
	testimonialSlider = $("#slider");
	
  
   // hide single slider nav
	testimonialNav = testimonialSlider.find('.rsNav'); 	
	testimonialNav.hide();
	
	//nav.appendTo('.slideshow');
	
	$('.royalSlider').animate({opacity: 1 }, 200);
	
	if (testimonialNav.length && testimonialSlider.data('royalSlider').numSlides > 1 ) { 
		testimonialNav.show();
	}
	
	

})(jQuery);
