<?php


//add_filter('nav_menu_css_class', 'set_current_menu_class',1,2); 
function set_current_menu_class($classes) {
	global $post;
	
	if( is_singular( 'event' ) ) {
		
		$classes = array_filter($classes, "remove_parent_classes");
		
		if ( in_array('menu-item-33', $classes ) )
			$classes[] = 'current-menu-item';
	}

		
	return $classes;
}

// check for current page classes, return false if they exist.
function remove_parent_classes($class){
  return in_array( $class, array( 'current_page_item', 'current_page_parent', 'current_page_ancestor', 'current-menu-item' ) )  ? FALSE : TRUE;
}

