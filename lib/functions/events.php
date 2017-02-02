<?php

function get_previous_post_id( $post_id ) {
    // Get a global post reference since get_adjacent_post() references it
    global $post;
    // Store the existing post object for later so we don't lose it
    $oldGlobal = $post;
    // Get the post object for the specified post and place it in the global variable
    $post = get_post( $post_id );
    // Get the post object for the previous post
    $previous_post = get_previous_post();
    // Reset our global object
    $post = $oldGlobal;
    if ( '' == $previous_post ) 
        return 0;
    return $previous_post->ID; 
} 


/*
first event of month?
- check the start date
- is start date the earliest that month?
*/


function get_previous_event() {
	
	global $post;
		
	if( is_sticky() )
		return;
	
	$event_start_date = $post->event_start_date;	
	
	global $wp_query;
	echo $wp_query->current_post;
	
	$event = false;
	
	$meta_query = array(				
				array(
				'key' => 'event_start_date',
				'value' => $event_start_date,
				'compare' => '<',
				'type'			=> 'NUMERIC'
				)
			);
		
		$args = array(
			'post_type'      => 'event',
			'posts_per_page' => 10,
			'post_status'    => 'publish',
			'orderby' 		 => 'meta_value_num',
			'order'          => 'ASC',
			'meta_query'     => $meta_query,
			'meta_key'       => 'event_start_date'
		);
	
		// Use $loop, a custom variable we made up, so it doesn't overwrite anything
		$loop = new WP_Query( $args );
				
		if ( $loop->have_posts() ) {
			while ( $loop->have_posts() ) : $loop->the_post(); 
			echo get_the_title();
			endwhile;
		}
		
		wp_reset_postdata();
		
}

function events_month_heading() {
		
	static $current_month;
	$event_start_month = get_event_date_part( 'F' );
	$event_start_year  = get_event_date_part( 'Y' );
	
	if( is_sticky() && empty( $current_month ) ) {
		$current_month = 'Featured';
		return '<h2>Featured</h2>';
	}
	
	if( !is_sticky() && $current_month != $event_start_month ) {
		$current_month = $event_start_month;
		return sprintf( '<h2 id="event-heading-%1$s-%2$s" class="event-heading">%1$s %2$s</h2>', $event_start_month, $event_start_year  );
	}
	
}

function get_event_date_part( $format = 'n/d/y', $when = 'start' ) {
	$when = $when == 'start' ? 'event_start_date' : 'event_end_date';
	$date = get_post_meta( get_the_ID(), $when, true );
	$date = new DateTime( $date );
	return $date->format( $format );
}

function get_event_date( $format = 'Ymd', $post_id = NULL, $single = true ) {
	
	if(!$post_id ) {
		$post_id = get_the_ID();
	}
	
	$event_start_date = get_post_meta( $post_id, 'event_start_date', true );
	$event_end_date  = get_post_meta( $post_id, 'event_end_date', true );
	
	$start = DateTime::createFromFormat( $format, $event_start_date );
	$end = DateTime::createFromFormat( $format, $event_end_date );
	
 	$date = '';
	
	if( $start && $end ) {
		
		// not a same day event
		if( $start != $end ) {
			// Same year?
			if( $start->format('Y') == $end->format('Y') ) {
				// same month?
				if( $start->format('F') == $end->format('F') ) {
					$date = sprintf( '%s - %s', $start->format('F d'), $end->format('d, Y') );	
				}
				else {
					$date = sprintf( '%s - %s', $start->format('F d'), $end->format('F d, Y') );
				}
			}
			
			else {
				$date = sprintf( '%s - %s', $start->format('F d, Y'), $end->format('F d, Y') );	
			}
			
		}
		else {
			$date = $start->format('F d, Y');
		}
	}
	
	return $date;
}



function _s_google_static_map ( $attributes ) {
	
	$google_map = '';
	
	// Set defaults for attributes or retrieve value if present, the following are sanitized if present
	$center = ( isset( $attributes['center'] ) ? sanitize_text_field( $attributes['center'] )  : null );
	$zoom = ( isset( $attributes['zoom'] ) ? intval( $attributes['zoom'] ) : 12 );
	$width = ( isset( $attributes['width'] ) ? intval( $attributes['width'] ) : 640 );
	$height = ( isset( $attributes['height'] ) ? intval( $attributes['height'] ) : 300 );
	$scale = ( isset( $attributes['scale'] ) ? intval( $attributes['scale'] ) : 2);
	$class = ( isset( $attributes['class'] ) ? sanitize_text_field( $attributes['class'] ) : 'smrt-google-map-embed' );
	
	// computed attribute
	$size = $width . 'x' . $height;
	
	// These parameters are validated/sanitized through equality checks later
	$visual_refresh = ( isset( $attributes['visual_refresh'] ) ? strtolower( $attributes['visual_refresh'] )  : 'false' );
	$format = ( isset( $attributes['format'] ) ? strtolower( $attributes['format'] ) : 'png' );
	$maptype = ( isset( $attributes['maptype'] ) ? strtolower( $attributes['maptype'] ) : 'roadmap' );
	
	// These parameters are simply encoded and appended to querystring if present
	$region = ( isset( $attributes['region'] ) ? urlencode( $attributes['region'] ) : null );
	$markers = ( isset( $attributes['markers'] ) ? urlencode( $attributes['markers'] ) : null );
	$path = ( isset( $attributes['path'] ) ? urlencode( $attributes['path'] ) : null );
	$visible = ( isset( $attributes['visible'] ) ? urlencode( $attributes['visible'] ) : null );
	$style = ( isset( $attributes['style'] ) ?  urlencode( $attributes['style'] ) : null );
	$location = ( isset( $attributes['location'] ) ? sanitize_text_field( $attributes['location'] ) : null );
	
	// In order to be valid we need either the center & zoom attributes, or a valid marker, or a location .
	if ( !isset( $location ) && !isset( $markers ) && !isset( $center ) ) {
		$google_map = '<div class="' . esc_attr( $class ) . '">Invalid attributes, please specify either a location, marker, or center/zoom coordinates.</div>';
		return $google_map;
	}
	
	
	// Validate the parameters value ranges, set or format values based on supplied attributes
	
	// if center and markers are null, then only location is supplied, set center = location for map positioning.
	if ( !isset( $center ) && !isset( $marker ) )
		$center = $location;
	
	// Scale can be 1 or 2, by default it is 1.  If any other number we will reselt to default
	if ( $scale < 1 || $scale > 2 )
		$scale = 1;
	
	// Format must be one of these values, set to default 'png' otherwise
	if ( !in_array( $format, array( 'png', 'png8', 'gif', 'jpg', 'jpg-baseline' ) ) )
		$format = 'png';
	
	// maptype must be one of these four values, set to default 'roadmap' otherwise
	if ( !in_array( $maptype, array( 'roadmap', 'satellite', 'hybrid', 'terrain' ) ) )
		$maptype = 'roadmap';
	
	// API Key
	$key = '';
	$key = ( isset( $attributes['key'] ) ? $attributes['key'] : '' );
	
	// generate the url
	$api_call = add_query_arg(
		array(
			'center'         => ( isset( $center) ? $center : false ),
			'size'           => $size,
			'zoom'           => $zoom,
			'visual_refresh' => ( 'true' === $visual_refresh ? true : false ),
			'scale'          => $scale,
			'format'         => $format,
			'maptype'        => $maptype,
			'region'         => ( isset( $region) ? $region : false ),
			'markers'        => ( isset( $markers) ? $markers : false ),
			'path'           => ( isset( $path) ? $path : false ),
			'visible'        => ( isset( $visible) ? $visible : false ),
			'style'          => ( isset( $style) ? $style : false ),
			'sensor'         => 'false', // note this must be in quotes and is required
			'key'            => $key
		),
		'http://maps.google.com/maps/api/staticmap'
	);
	
	$google_map = esc_url( $api_call );
	
	return $google_map;
}