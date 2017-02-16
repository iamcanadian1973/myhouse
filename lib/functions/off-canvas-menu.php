<?php

function _s_off_canvas_menu() {
	
	$args = array( 
		'theme_location'  => 'secondary', 
		'container' => 'div',
		'container_class'  => 'secondary',
		'echo' => FALSE
		); 
	
	$secondary_menu = wp_nav_menu( $args );
	
	$args = array( 
		'theme_location'  => 'primary', 
		'container' => 'div',
		'container_class'  => 'primary',
		'echo' => FALSE
		); 
	
	$primary_menu = wp_nav_menu( $args );
			
	printf( '<div class="pushy pushy-left"><a href="#" class="close-btn"><span class="screen-reader-text">%s</span><span class="close"></span></a><nav class="nav-mobile">%s%s</nav></div>', __( 'Close', '_s' ), $secondary_menu, $primary_menu );
}

/**
  * Add the menu to the .site-header, but hooking right before the genesis_header_markup_close action.
  * @author Calvin Makes (@calvin_makes)
  * @link http://www.calvinmakes.com/add-a-mobile-friendly-off-canvas-menu-in-genesis
*/
function _s_get_off_canvas_menu_button() {
	
	//* Only add the Menu button if a primary navigation is set. You can switch this for whatever menu you are dealing with
	if ( has_nav_menu( "primary" ) ) {
		return sprintf('<a alt="Toggle Menu" href="#" class="menu-btn right small"><span class="screen-reader-text">%s</span><span class="line"></span><span class="line"></span><span class="line"></span></a>', __( 'Menu', '_s' ) );
	}
}



/** 
  * Add the overlay div that will be used for clicking out of the active menu.
  * @author Calvin Makes (@calvin_makes)
  * @link http://www.calvinmakes.com/add-a-mobile-friendly-off-canvas-menu-in-genesis
*/
function _s_site_overlay() {
	echo '<div class="site-overlay"></div>';
}

/** 
  * Include the JavaScript
  * @author Calvin Makes (@calvin_makes)
  * @link http://www.calvinmakes.com/add-a-mobile-friendly-off-canvas-menu-in-genesis
*/
//add_action( 'wp_enqueue_scripts', '_s_load_menu' );
function _s_load_menu() {
  wp_enqueue_script( 'off-canvas-menu', CHILD_THEME_JS . '/off-canvas-menu.js', array( 'jquery' ), 1.0, TRUE );
}
