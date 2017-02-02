<?php

/**
 * Exclude sticky posts from main query
 */
function wpc_exclude_sticky_posts( $query ) {

	if ( $query->is_home() && !is_admin() && $query->is_main_query() ) {
 		$query->set( 'post__not_in', get_option( 'sticky_posts' ) );
	}
}

add_action( 'pre_get_posts', 'wpc_exclude_sticky_posts' );

add_filter('post_class','kr_filter_sticky_posts');
function kr_filter_sticky_posts( $classes ) {
	// sticky for Sticky Posts
	global $post;
	if ( is_sticky( $post->ID ) ) {
		if ( ! is_paged() ) {
			$classes[] = 'sticky';
		} elseif ( is_admin() ) {
			$classes[] = 'status-sticky';
		}
	}
	
	return $classes;
}

/**
 * Use home template for all post archives
 */
//add_filter( 'template_include', 'sk_template_redirect' );
function sk_template_redirect( $template ) {
	if ( is_category() || is_tag() || is_date() )
		$template = get_query_template( 'home' );
	return $template;
}

