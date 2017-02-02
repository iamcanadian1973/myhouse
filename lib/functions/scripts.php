<?php

// Load Scripts
add_action( 'wp_enqueue_scripts', 'load_scripts' );
function load_scripts() {

		// load foundation
		wp_enqueue_script( 'foundation', trailingslashit( THEME_JS ) . 'foundation.min.js', array('jquery'), '', true );

		wp_enqueue_script( 'wp-util' );
		
		//$project_script_url = SCRIPT_DEBUG === true ? 'project.js' : 'project.min.js';
		$project_script_url = 'project.js';
						
		// Child Theme JS
		wp_enqueue_script( 'forefront-project' , trailingslashit( THEME_JS ) . $project_script_url, 
				array(
					'jquery', 
					'wp-util'
					), 
				NULL, TRUE );
				
				
		wp_register_script( 'royalslider', THEME_JS . '/royalslider-config.js', array('jquery', 'forefront-project'), '', true );	
				
		wp_enqueue_script( 'forefront-general' , trailingslashit( THEME_JS ) . 'general.js', 
				array(
					'jquery',
					'foundation',
					'forefront-project'
					), 
				NULL, TRUE );
}