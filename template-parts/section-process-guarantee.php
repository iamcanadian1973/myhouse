<?php

/*
Section - Process Guarantee
*/

process_guarantee();
function process_guarantee() {

	$process_guide = sprintf( '<div class="column"><a href="%s" class="btn cta" data-equalizer-watch><span>%s</span></a></div>', get_permalink( 6313 ), __( 'Request our Renovation Process Guide', '_s' ) );
	$free_consultation = sprintf( '<div class="column"><a href="%s" class="btn cta" data-equalizer-watch><span>%s</span></a></div>', get_permalink( 1444 ), __( 'Request a free Consultation', '_s' ) );
	
	
	
	// Main content gets pulled from page, defaults to "Default Process page" Guarantee
	$process_page_ID = 44;
	
	$prefix = 'guarantee';
	$prefix = set_field_prefix( $prefix );		
	
	$photo = get_post_meta( $process_page_ID, sprintf( '%sphoto', $prefix ), true );
	if( $photo ) {
		$photo = wp_get_attachment_image( $photo, 'large' );
	}
	
	$left_column = sprintf( '<div class="small-12 large-6 columns"><div class="entry-content">%s</div></div>', $photo );
	
	// right column, buttons & Guarantee
	$content = sprintf( '<div class=" row small-up-1 medium-up-2 buttons" data-equalizer >%s%s</div>', $process_guide, $free_consultation );
	$content .= get_field( sprintf( '%scontent', $prefix ), $process_page_ID );
	$right_column = sprintf( '<div class="small-12 large-6 columns"><div class="entry-content">%s</div></div>', $content );
	
	// Build section
	$attr = array( 'class' => 'section-content section-process-guarantee' );
	_s_section_open( $attr );		
		printf( '<div class="row">%s%s</div>', $left_column, $right_column );
	_s_section_close();	
	
}