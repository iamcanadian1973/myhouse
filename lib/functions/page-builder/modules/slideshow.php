<?php

function kr_module_slideshow( $prefix= '' ) {
	
	$prefix = set_field_prefix( $prefix );
	
	$slides = get_field( sprintf( '%sslider', $prefix ) );
	
	if( empty( $slides )  ) {
		return FALSE;		
	}
	
	$size = 'slide';
	
	if( wp_is_mobile() ) {
		$size = 'large';
	}
	
	$delay = 500;
						
	$items = '';
	
	// Optimize image caching to speed up ACF
	foreach ( $slides as $slide ) {
		$ids[] = $slide['photo'];
	}
		
	$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));
	   
	foreach( $slides as $slide ): 
												
		$img_attr = wp_get_attachment_image_src( $slide['photo'], $size ); // returns an array
		$text = '';
		if( !empty( $slide['caption_title'] ) ) {
			$text .= sprintf( '<h4>%s</h4>', $slide['caption_title'] );
		}
		if( !empty( $slide['caption_description'] ) ) {
			$text .= sprintf( '%s', wpautop( $slide['caption_description'] ) );
		}
		
		$caption = sprintf( '<div class="rsABlock" data-move-effect="left" data-speed="500" data-delay="%s" data-move-offset="500" data-easing="easeOutBack">%s</div>', $delay,  $text );
								
		// 1500px x 500px
		$items .= sprintf('<div><a data-rsw="%s" data-rsh="%s" class="rsImg" href="%s"></a><figure class="caption">%s</figure></div>', $img_attr[1], $img_attr[2], $img_attr[0], $caption );
	
	endforeach;
		
	return sprintf( '<div id="slider" class="royalSlider rsHor">%s</div>', $items );
  	
}
