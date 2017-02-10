<?php

/**
 * Module - Grid
 *
 *
 * @param string $prefix - ACF clone prefix
 *
 * @return formatted list
 */
function kr_module_get_grid( $prefix = '', $columns ) {
	
	$prefix = set_field_prefix( $prefix );
	
	$rows = get_field( sprintf( '%slist', $prefix ) );
		
	if( empty( $rows ) ) {
		return;
	}
	
	$list_items = _kr_get_grid_items( $prefix );
	
	return sprintf( '<ul class="list">%s</ul>', $list_items );
}

//* get list items
function _kr_get_grid_items( $args = '' ) {
	
	// Just incase this isn't an array
	if( !is_array( $args ) ) {
		$args = array( 'prefix' => $args );
	}
	
	$defaults = array(
		'prefix' => '',
		'ret' => 'string',
		'image_size' => 'large',
		'title_position' => 'before',
		'title_tag' => 'h3'
	);
	
	$args = wp_parse_args( $args, $defaults );
	
	extract( $args );
	
	$prefix = set_field_prefix( $prefix );
	
	$rows = get_field( sprintf( '%sgrid', $prefix ) );
		
	if( empty( $rows ) ) {
		return;
	}
	
	
	foreach ($rows as $row) {
		$ids[] = $row['photo'];
	}
	$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));

	
	$list_items = array();
	
	foreach( $rows as $row ) {
		
		$photo = isset(  $row['photo'] ) ? $row['photo']: '';
		
		if( $photo ) {
			$photo = wp_get_attachment_image( $photo, $image_size );
		}
		
		$title = isset(  $row['grid_title'] ) ? sprintf( '<%1$s>%2$s</%1$s>', $title_tag, $row['grid_title'] ) : '';
		$title_before = $title_after = $title;
 		if( $title_position == 'before' ) {
			$title_after = '';
		} else {
			$title_before = '';
		}
		
		$description = isset(  $row['grid_description'] ) ? $row['grid_description']: '';
		
		$list_items[] = sprintf( '<div class="column">%s%s%s%s</div>', $title_before, $photo, $title_after, $description );
	}
	
	if( $ret == 'string' ) {
		return implode( '', $list_items );
	}
	
	return $list_items;
}