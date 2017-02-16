<?php

// Slideshow

/*
photo_slideshow

slide_type : 
Single Photo
Interactive Before/After Slider
Before/After
Before/During/After


single_photo
before/after_slider_thumbnail
before_photo
during_photo
after_photo
photo_description

only use single/before_after
*/



function _s_gallery_slideshow( $prefix= '' ) {
	
	$prefix = set_field_prefix( $prefix );
	
	$slides = get_field( sprintf( '%sphoto_slideshow', $prefix ) );
	
	
	
	if( empty( $slides )  ) {
		return FALSE;		
	}
 	
	$size = 'large';
	
	$delay = 500;
						
	$items = '';
	
	// Optimize image caching to speed up ACF
	foreach ( $slides as $slide ) {
		$ids[] = $slide['single_photo'];
		$ids[] = $slide['before_photo'];
		$ids[] = $slide['after_photo'];
	}
		
	$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));
	   
	foreach( $slides as $slide ): 
		
		if( $slide['before_photo'] ) {
			$photo = $slide['before_photo'];
		}
		else {
			$photo = $slide['single_photo'];
		}
		
 		
		$thumbnail_attr = wp_get_attachment_image_src( $photo, 'thumbnail' ); // returns an array
		
		$img_attr = wp_get_attachment_image_src( $photo, $size ); // returns an array
		
		if( false == $img_attr ) {
			continue;
		}
		
		/*
		$text = '';
		if( !empty( $slide['caption_title'] ) ) {
			$text .= sprintf( '<h4>%s</h4>', $slide['caption_title'] );
		}
		if( !empty( $slide['caption_description'] ) ) {
			$text .= sprintf( '%s', wpautop( $slide['caption_description'] ) );
		}
		
		$caption = sprintf( '<div class="rsABlock" data-move-effect="bottom" data-speed="500" data-delay="%s" data-move-offset="100" data-easing="easeOutBack">%s</div>', $delay,  $text );
		*/
		
		$caption = '';
		//$caption = '<figure class="caption">%s</figure>;'
		
		$thumbnail = sprintf( '<img src="%s" class="rsTmb" />', $thumbnail_attr[0] );
								
 		$items .= sprintf('<div><a data-rsw="%s" data-rsh="%s" class="rsImg" href="%s">%s</a>%s</div>', $img_attr[1], $img_attr[2], $img_attr[0], $thumbnail, $caption );
	
	endforeach;
		
	printf( '<div id="slider" class="royalSlider rsDefault rsHor">%s</div>', $items );
  	
}


function _s_get_awards() {
 	
	/*
	award_title
	award_description
	award_image
	*/
	
	$image_size = 'large';
	$title_tag = 'h3';
	
	$rows = get_field( 'awards' );
		
	if( empty( $rows ) ) {
		return;
	}
	
	// let's cache those images
	foreach ($rows as $row) {
		$ids[] = $row['award_image'];
	}
	$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));

	
	$list_items = array();
	
	foreach( $rows as $row ) {
		
		$photo = isset(  $row['award_image'] ) ? $row['award_image']: '';
		
		if( $photo ) {
			$photo = wp_get_attachment_image( $photo, $image_size );
		}
		
		$title = isset(  $row['award_title'] ) ? sprintf( '<%1$s>%2$s</%1$s>', $title_tag, $row['award_title'] ) : '';
		
		$description = isset(  $row['award_description'] ) ? $row['award_description']: '';
		
		$list_items[] = sprintf( '<div class="column">%s<div class="entry-content">%s%s</div></div>', $photo, $title, $description );
	}
	
	return implode( '', $list_items );
 }
 
 
 
 function _s_get_youtube_videos() {
 
	$rows = get_field( 'youtube_videos' );
		
	if( empty( $rows ) ) {
		return;
	}
		
	$list_items = array();
	
	foreach( $rows as $row ) {
		
		$embed_code = isset(  $row['embed_code'] ) ? $row['embed_code']: '';
		
		if( empty( $embed_code ) ) {
			continue;
		}
	
		$list_items[] = sprintf( '<div class="column">%s</div>', $embed_code );
	}
	
	return implode( '', $list_items );
 }
 
 
 
 function _s_get_gallery_youtube_video( $embed_code ) {
	
	preg_match('/src="([^"]+)"/', $embed_code, $match );
	$url = $match[1];
	
	add_filter('oembed_dataparse','youtube_embed_thumbnail',10,3);
	
	$thumbnail = wp_oembed_get( $url );
	
	$video_url = add_query_arg( array( 'rel' => 0, 'autoplay' => 1 ), $url );
	$title = sprintf( ' data-caption-title="%s"', esc_html( get_the_title() ) );
 	$description  = get_post_meta( get_the_ID(),  'video_description', true );
	if( !empty( $description ) ) {
		$description = sprintf( ' data-caption-desc="%s"', $description );
	}
	printf( '<a href="%s" class="foobox youtube"%s%s><i class="icon video-icon"></i>', $video_url, $title, $description );
	the_post_thumbnail( 'video-thumbnail' );
	echo '</a>';
		 
 }
 
 
 

function youtube_embed_thumbnail( $return, $data, $url ) {
    if ($data->provider_name == 'YouTube') {
        return "<img src='{$data->thumbnail_url}'>";
    }
    else return $return;
}