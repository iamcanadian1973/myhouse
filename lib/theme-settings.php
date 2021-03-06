<?php

// Gravity forms hide labels
add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

// increase jpeg quality
add_filter('jpeg_quality', function( $arg ){ return 100; } );
  
/****************************************
	Enqueue theme stylesheet
	*****************************************/
 
add_action( 'wp_enqueue_scripts', 'kr_enqueue_stylesheet', 15 );
function kr_enqueue_stylesheet() {

	$version = defined( 'THEME_VERSION' ) && THEME_VERSION ? THEME_VERSION : '1.0';
	$handle  = defined( 'THEME_NAME' ) && THEME_NAME ? sanitize_title_with_dashes( THEME_NAME ) : 'theme';
	
	//$stylesheet = SCRIPT_DEBUG === true ? 'style.css' : 'style.min.css';
	$stylesheet = 'style.css';

	wp_enqueue_style( $handle, trailingslashit( THEME_URL ) . $stylesheet, false, $version );

}
 
/****************************************
	Image Sizes
	*****************************************/
	
add_image_size( 'hero', 1900, 800 ); // Hero photo
add_image_size( 'video-thumbnail', 640, 360, true ); // homepage posts
add_image_size( 'gallery-cat-thumbnail', 400, 300, true );
add_image_size( 'gallery-thumbnail', 400, 250, true );
