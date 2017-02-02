(function($) {
	'use strict';
	
	 var royalSlider, nav;	
		  
	  var custom_opts = {
		transitionType: 'fade',
		controlNavigation:'bullets',
		imageScaleMode: 'fill',
		imageAlignCenter:true,
		arrowsNav: true,
		arrowsNavAutoHide: false,
		sliderTouch: true,
		addActiveClass: true,
		sliderDrag:false,
		arrowsNavHideOnTouch: false,
		fullscreen: false,
		loop: true,
		autoScaleSlider: true, 
		autoScaleSliderWidth: 1905,     
		autoScaleSliderHeight: 590,
		slidesSpacing: 0,
		keyboardNavEnabled: false,
		navigateByClick: false,
		fadeinLoadedSlide: true,
		globalCaption:false,
		//imgWidth: 1905,
		//imgHeight: 450,
		transitionSpeed: 500,
		
		autoPlay: {
				// autoplay options go gere
				enabled: true,
				pauseOnHover: false,
				delay: 4000
			}
	  };
	
   	$('.royalSlider').royalSlider(custom_opts);
		
	royalSlider = $(".royalSlider");
	
  
   // hide single slider nav
	nav = royalSlider.find('.rsNav'); 	
	nav.hide();
	
	//nav.appendTo('.slideshow');
	
	$('.royalSlider').animate({opacity: 1 }, 200);
	
	if (nav.length && royalSlider.data('royalSlider').numSlides > 1 ) { 
		nav.show();
	}
		
	
})(jQuery);
