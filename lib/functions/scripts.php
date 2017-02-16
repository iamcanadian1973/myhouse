<?php

add_action( 'wp_enqueue_scripts', '_s_register_scripts' );
function _s_register_scripts() {
	wp_register_script( 'foundation', trailingslashit( THEME_JS ) . 'foundation.min.js', array('jquery'), '', true );
	wp_register_script( 'front-page', trailingslashit( THEME_JS ) . 'front-page.js', array('jquery', 'project'), '', true );	
	
	wp_register_script( 'gallery', trailingslashit( THEME_JS ) . 'gallery.js', array('jquery', 'project'), '', true );	
	
	wp_register_script( 'silo-landing', trailingslashit( THEME_JS ) . 'silo-landing-page.js', array('jquery', 'project'), '', true );	
	
	
	//$project_script_url = SCRIPT_DEBUG === true ? 'project.js' : 'project.min.js';
	$project_script_url = 'project.min.js';
						
	// Child Theme JS
	wp_register_script( 'project' , trailingslashit( THEME_JS ) . $project_script_url, 
			array(
					'jquery', 
					'wp-util'
					), 
				NULL, TRUE );
				
								
	wp_register_script( 'general' , trailingslashit( THEME_JS ) . 'general.js', 
			array(
					'jquery',
					'foundation',
					'project'
					), 
				NULL, TRUE );
}


// Load Scripts
add_action( 'wp_enqueue_scripts', '_s_load_scripts' );
function _s_load_scripts() {

		// load Foundation
		wp_enqueue_script( 'foundation' );
		// Load WordPress Utilities
 		wp_enqueue_script( 'wp-util' );
		
		wp_enqueue_script( 'project' );
		wp_enqueue_script( 'general' );
}