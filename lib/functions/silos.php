<?php

// Is this a Silo page?
function is_silo_page() {
	// Find silo pages by template slug
	$silo_pages = array( 'silo-landing-page', 'silo-process' );
	
	// needs to be a page
 	if( !is_page() ) 
		return false;
	
	$page_template = str_replace( '.php', '', basename( get_page_template() ) );
										
	if( !in_array( $page_template, $silo_pages ) )
		return false;
	
	return true;
}

function silo_category() {
	
	// Map categories to CSS class. This is a hack for now
	$silos = array(
		17 => 'silo-custom-homes',
		16 => 'silo-renovations',
		18 => 'silo-kitchen-bath',
		19 => 'silo-kitchen-bath',
		17 => 'silo-home-improvements',
		17 => 'mechanical-plus'
	);
	
	if( function_exists( 'icl_object_id' ) && $submenu_object ) {
			$translation = icl_object_id( $submenu_object->ID, 'megamenu', false );
			if( $translation ) {
				$submenu_object = get_post( $translation );
			}
		}
	
}


// get logo based on Silo or not
function _s_site_logo() {
	
	$logo = '';
	
	if( is_silo_page() ) {
		$logo = '-white';
	}
	
	$logos = sprintf('<div class="show-for-xxlarge"><img src="%slogo%s.png" alt="%s"/></div>', trailingslashit( THEME_IMG ) , $logo, get_bloginfo( 'name' ) );	
	
	$logos .= sprintf('<div class="show-for-xlarge hide-for-xxlarge"><img src="%stablet-logo%s.png" alt="%s"/></div>', trailingslashit( THEME_IMG ) , $logo, get_bloginfo( 'name' ) );	
	
	$logos .= sprintf('<div class="hide-for-xlarge"><img src="%smobile-logo%s.png" alt="%s"/></div>', trailingslashit( THEME_IMG ) , $logo, get_bloginfo( 'name' ) );	
	
	return $logos;
}

/**
 * Silo Body Class
 *
 * @param array $classes
 * @return array
 */
function add_silo_body_class( $classes ) {
  
	if( is_silo_page() ) {
		$silo_category = get_post_meta( get_the_ID(), 'silo_category', true );
		$silo_category = sanitize_title_with_dashes( $silo_category );
		$classes[] = 'silo-page';
		$classes[] = 'silo-' . $silo_category;
	}
  
  	return $classes;
}
add_filter( 'body_class', 'add_silo_body_class' );


