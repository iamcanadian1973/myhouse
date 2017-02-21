<?php

/*
Section - Resources
*/

section_resources();
function section_resources() {	
	
	global $post;
	
	// Main content gets pulled from page, defaults to "Default Process page" Guarantee
	$process_page_ID = 44;
	
	$prefix = 'resources';
	$prefix = set_field_prefix( $prefix );		
			
	$right_column = $left_column = '';
		
	$heading = get_post_meta( $process_page_ID, sprintf( '%sheading', $prefix ), true );
	$heading = _s_get_heading( $heading, 'h2' );
	
	if( !empty( $heading ) ) {
		$heading = sprintf( '<div class="column row">%s</div>', $heading );
	}
					
	$content = get_post_meta( $process_page_ID, sprintf( '%scontent', $prefix ), true );
 	$content = _s_get_textarea( $content );
	
	$left_column = sprintf( '<div class="small-12 large-4 xlarge-3 columns"><div class="entry-content featured">%s</div></div>', $content );	
	
	$args = array( 'prefix' => $prefix , 'show_link' => true, 'post_id' => $process_page_ID );
	$grid = '';
	$grid_items = _kr_get_grid_items( $args );
	if( !empty( $grid_items ) ) {
		$grid = sprintf( '<div class="row small-up-1 medium-up-3  grid">%s</div>', $grid_items );
	}	
		
	$right_column = sprintf( '<div class="small-12 large-8 xlarge-9 columns"><div class="entry-content">%s</div></div>', $grid );
	
	
	$attr = array( 'class' => 'section-content section-resources' );
	_s_section_open( $attr );		
		printf( '%s<div class="row">%s%s</div>', $heading, $left_column, $right_column );
	_s_section_close();	
	
}