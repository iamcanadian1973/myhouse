<?php

function get_term_progenitor( $term, $tax = 'category' ) {
	if ( is_int( $term ) ) {
		$term = get_term_by( 'id', $term, $tax );
	}

	if ( ! $term instanceof WP_Term ) {
		return false;
	}
    
    if ( 0 == $term->parent ) {
		return $term;
	}

	while ( $term instanceof WP_Term && 0 != $term->parent ) {
		$term = get_term_by( 'id', $term->parent, $term->taxonomy );
	}
	return $term;
}


function get_gallery_parent_term() {
    
    $queried_object = get_queried_object();
    $term = $queried_object;
    
    return get_term_progenitor( $term, 'gallery_cat' );
}


function get_child_terms() {
 
    $parent_term = get_gallery_parent_term();
    
    if( empty( $parent_term ) ) {
        return false;
    }
    
    return get_terms( array(
        'parent' => $parent_term->term_id,
        'taxonomy' => 'gallery_cat'
    )); 

}


function get_child_term_menu() {
    
    $queried_object = get_queried_object();
    $current_term = $queried_object;
    
    $terms = get_child_terms();
    
    if( empty( $terms ) ) {
        return false;
    }
    
    $out = '';
    
    foreach( $terms as $term ) {
        
        $class = ( $current_term == $term ) ? ' class="current-menu-item"' : '';
        
        $out .= sprintf( '<li%s><a href="%s">%s</a></li>', $class, get_term_link( $term, 'gallery_cat' ), $term->name );
    }
    
    return sprintf( '<div class="term-menu"><ul class="menu">%s</ul></div>', $out );
    
}




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
	   
	foreach( $slides as $key => $slide ): 
		
        $slide_type = '';
        $photo = '';
 		$before_photo = '';
        
        switch( $slide['slide_type'] ) {
            case 'Single Photo':
            $photo = $slide['single_photo'];
            break;
            case 'Before/After':
            $photo = $slide['after_photo'];
            $before_photo = $slide['before_photo'];
            break;
        }
        
 		if( empty( $photo ) ) {
            continue;
        }
        
        $thumbnail = wp_get_attachment_image( $photo, 'thumbnail', '',  array( 'class' => 'rsTmb' ) ); // returns an array
        
        //$thumbnail = sprintf( '<div class="rsTmb"><div class="rsTmbBackground" style="background: url(%s)"></div></div>', $thumbnail_attr[0] );
        
        
        $img_attr = wp_get_attachment_image_src( $photo, $size ); // returns an array
 		
  		if( !empty( $before_photo ) ) {
			$before_attr = wp_get_attachment_image_src( $before_photo, $size ); // returns an array
			$before_photo = sprintf( '<div data-before="%s" data-after="%s"><span class="toggle-photo">%s</span></div>', $before_attr[0], $img_attr[0], __( 'Show Before', '_s' ) );
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
		
		//$thumbnail = sprintf( '<img src="%s" class="rsTmb thumb-%s" />', $thumbnail_attr[0], $key );
  								
 		$items .= sprintf('<div id="%s">%s<a data-rsw="%s" data-rsh="%s" class="rsImg" href="%s">%s</a>%s</div>', $key, $before_photo, $img_attr[1], $img_attr[2], $img_attr[0], $thumbnail, $caption );
        $items .= "\n\n";
	
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


// =======================================================================//
// Foundation 6 Gallery
// =======================================================================//

add_filter( 'post_gallery', 'f5_gallery', 10, 2 );

function f5_gallery( $output, $attr ) {
	global $post;
	
	/*
	if ( isset( $attr['type'] ) && $attr['type'] == 'sponsors' ) {
		f5_sponsors_gallery( $output, $attr );
	}
	*/

	if ( isset( $attr['orderby'] ) ) {
		$attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
		if ( ! $attr['orderby'] ) {
			unset( $attr['orderby'] );
		}
	}

	extract( shortcode_atts( array(
		'order'   => 'ASC',
		'orderby' => 'menu_order ID',
		'id'      => $post->ID,
		'columns' => 3,
		'size'    => 'thumbnail',
		'include' => '',
		'exclude' => '',
	), $attr ) );


	$id = intval( $id );
	if ( 'RAND' === $order ) {
		$orderby = 'none';
	}

	if ( ! empty( $include ) ) {
		$include         = preg_replace( '/[^0-9,]+/', '', $include );
		$attachments_arr = get_posts( array(
			'include'        => $include,
			'post_status'    => 'inherit',
			'post_type'      => 'attachment',
			'post_mime_type' => 'image',
			'order'          => $order,
			'orderby'        => $orderby
		) );

		$attachments = array();
		foreach ( $attachments_arr as $key => $val ) {
			$attachments[ $val->ID ] = $attachments_arr[ $key ];
		}
	}

	if ( empty( $attachments ) ) {
		return '';
	}
	
	$classes = 'gallery';
	
	if( $size == 'logo' ) {
		$classes = 'sponsors';
	}
	
	$output = sprintf( '<div class="row small-up-2 medium-up-%s %s">', $columns, $classes );

	foreach ( $attachments as $id => $attachment ) {
		$img     = wp_get_attachment_image_src( $id, $size );
		$img_big = wp_get_attachment_image_src( $id, 'full' );
		$link    = get_field( 'custom_link', $id );
		
		$caption = ( ! $attachment->post_excerpt ) ? '' :  esc_attr( $attachment->post_excerpt ) ;
		
		if( $size == 'logo' && $link != '' ) {
			$output .= sprintf( '<div class="column"><a href="%s" title="%s" target="_blank"><img src="%s" alt="%s" /></a></div>', $link, $caption, $img[0], esc_attr( $post->title ) );
		}
		else {
			$output .= sprintf( '<div class="column"><a href="%s" title="%s"><img src="%s" title="" alt="%s" /></a></div>', $img_big[0], $caption, $img[0], esc_attr( $post->title ) );
		}

	}

	$output .= '</div>';

	return $output;
}