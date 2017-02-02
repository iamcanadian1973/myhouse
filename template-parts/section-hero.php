<?php

/*
Section - Hero
*/

global $post;

$heading = get_post_meta( get_the_ID(), 'hero_title', true );
$description = get_post_meta( get_the_ID(), 'hero_description', true );
$background_image = get_post_meta( get_the_ID(), 'hero_background_image', true );

if( !empty( $background_image ) ) {
	$attachment_id = $background_image;
	$size = 'hero';
			
	if( wp_is_mobile() ) {
		$size = 'large';
	}
	
	// Add check for mobile size
	$background = wp_get_attachment_image_src( $attachment_id, $size );
	$background_image = sprintf( 'style="background-image: url(%s)"', $background[0] );
	
	
	if( !empty( $heading ) ) {
		$heading = sprintf( '<header class="hero-header"><h1>%s</h1></header>', $heading );
	}
	
	if( !empty( $description ) ) {
		$description = sprintf( '<div class="hero-description">%s</div>', wpautop( $description ) );
	}
	
	// Build Hero section
	printf( '<section class="section section-hero flex-wrapper" %s><div class="wrap flex"><div class="column row">%s%s</div></div></section>', $background_image, $heading, $description  );
	
}
