(function($) {
	'use strict';
	
	 var royalSlider, nav;	
		  
	  var custom_opts = {
		transitionType: 'fade',
		controlNavigation:'thumbnails',
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
		autoHeight: false,
		autoScaleSlider: true, 
		autoScaleSliderWidth: 1024,     
		autoScaleSliderHeight: 768,
		slidesSpacing: 0,
		keyboardNavEnabled: true,
		navigateByClick: false,
		fadeinLoadedSlide: true,
		globalCaption:false,
		//imgWidth: 1905,
		//imgHeight: 450,
		transitionSpeed: 500,
		
		autoPlay: {
				// autoplay options go gere
				enabled: true,
				pauseOnHover: true,
				delay: 4000
			}
	  };
	
   	$('#slider').royalSlider(custom_opts);
		
	royalSlider = $('#slider');
	
  
   // hide single slider nav
	nav = royalSlider.find('.rsNav'); 	
	nav.hide();
	
	//nav.appendTo('.slideshow');
	
	$('.royalSlider').animate({opacity: 1 }, 200);
	
	
	if (nav.length && royalSlider.data('royalSlider').numSlides > 1 ) { 
		nav.show();
	}
		
		
	$('#slider').on('click', '.toggle-photo', function(){
		var show = '';
		var button = $(this);
		var txt = button.text();
		var before = $(this).parent().data('before');
		var after = $(this).parent().data('after');
		var image = $(this).parents( '.rsSlide' ).find('.rsImg');
 		show = (image.attr('src') == after) ? before : after;
 		image.attr('src', show );
		button.text( txt == gallery_script_vars.show_after ? gallery_script_vars.show_before : gallery_script_vars.show_after );
	});

	
})(jQuery);
