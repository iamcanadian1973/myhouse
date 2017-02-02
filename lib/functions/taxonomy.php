<?php

function _s_get_terms_array( $tax, $key = 'slug' ) {
	
	$terms_array = array();
	
	$terms = get_terms( $tax, array(
		'hide_empty' => true,
	) );	
	
	if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
	    foreach ( $terms as $term ) {
			$terms_array[$term->$key] = $term->name;
		}
		
		return $terms_array;	
	}
}


function _s_get_terms_by_post_type( $tax = 'category', $post_type = 'post', $fields = array( 'slug', 'name' ) ) {
	
	$terms_array = array();
		
	// arguments, adjust as needed
	$args = array(
		'post_type'      => $post_type,
		'posts_per_page' => -1,
		'post_status'    => 'publish',		
	);

	$loop = new WP_Query( $args );
	
	if ( $loop->have_posts() ) : 
 		while ( $loop->have_posts() ) : $loop->the_post(); 
			$terms = wp_get_post_terms( get_the_ID(), $tax );
			
			if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
				foreach( $terms as $term ) {
					$terms_array[$term->{$fields[0]}] = $term->{$fields[1]};
				}
			}
						
		endwhile;
		
		// Sort the array by key asc
		ksort( $terms_array );
		
	endif;
	
	wp_reset_postdata();
	
	return $terms_array;
}


function _s_term_values( $taxonomy, $key = 'name', $single = FALSE, $seperator = ', ', $post_id = FALSE ) {
	
	if( !$post_id ) {
		$post_id = get_the_ID();
	}
	
	$terms = get_the_terms( $post_id, $taxonomy );
		
	if( is_array( $terms ) ) {
		$list = wp_list_pluck( $terms, $key );
		
		if( $single ) {
			return $list[0];
		}
		else {
			return implode( $seperator, $list );
		}
	}
	
	return '';
}

function _s_term_value( $taxonomy, $key = 'name', $single = TRUE, $post_id = false ) {
	return	_s_term_values( $taxonomy, $key, $single, '', $post_id );
}

function _s_term_name( $taxonomy ) {
	return	_s_term_value( $taxonomy, 'name', TRUE, false );
}

