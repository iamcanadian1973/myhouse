<?php

/*
Section - Footer Awards
*/

footer_awards();
function footer_awards() {

	$homepage_id = get_option('page_on_front');
		 
	if( !$homepage_id ) {
		return false;
	 }
	
	
	$georgie_statue = sprintf('<div class="small-12 large-3 columns"><a href="%s"><img src="%s" alt="%s"/></a></div>', get_permalink(1224), THEME_IMG .'/footer-awards/georgie_statue.png', __( 'award-winning vancouver home builder, vancouver home builder, vancouver home builders, custom home builders vancouver', '_s' ) );
	
	$ovation = sprintf('<div class="small-12 large-3 columns"><img src="%s" alt="%s"/></div>', THEME_IMG .'/footer-awards/ovation.png', __( '2016 Ovation Awards Winner', '_s' ) );
	
	// Main content gets pulled from homepage
	$cta = sprintf( '<p class="cta"><a class="btn" href="%s" target="_blank">%s</a></p>', get_permalink(1224), __( 'See Full List', '_s' ) );
	$footer_awards = sprintf( '<div class="small-12 large-6 columns footer-awards text-center"><div class="entry-content">%s%s</div></div>', get_field( 'footer_awards', $homepage_id ), $cta );
	
	
	// Footer text
	$footer_text = sprintf( '<div class="column row footer-text text-center"><div class="entry-content"><p>%s</p></div></div>', __( 'For Renovations, Custom Homes & Home Improvements, My House Design/Build Team is a multi-award winning licensed builder serving Greater Vancouver & the Gulf Islands. For over 20 years Graeme Huguet and his team have been creating “Great Living Spaces”. From a small single room improvement to a full renovation of a condo or house, to building a new custom home, residential or commercial; our “in house” group of professionals allows us to put together the right team – specific to your project.', '_s' ) );
	
	// Build  section
	$attr = array( 'class' => 'section-content section-footer-awards' );
	_s_section_open( $attr );		
		printf( '<div class="row">%s%s%s</div>%s', $georgie_statue, $footer_awards, $ovation, $footer_text );
	_s_section_close();	
 	
}