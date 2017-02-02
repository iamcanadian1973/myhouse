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
function _kr_get_grid_items( $prefix = '', $ret = 'string' ) {
	
	$prefix = set_field_prefix( $prefix );
	
	$rows = get_field( sprintf( '%sgrid', $prefix ) );
		
	if( empty( $rows ) ) {
		return;
	}
	
	$list_items = array();
	
	foreach( $rows as $row ) {
		
		$photo = isset(  $row['photo'] ) ? $row['photo']: '';
		
		if( $photo ) {
			$photo = wp_get_attachment_image( $photo, 'large' );
		}
		
		$description = isset(  $row['grid_description'] ) ? $row['grid_description']: '';
		
		$list_items[] = sprintf( '<div class="column">%s%s</div>', $photo, $description );
	}
	
	if( $ret == 'string' ) {
		return implode( '', $list_items );
	}
	
	return $list_items;
}