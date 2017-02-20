<?php

/*
Section - Logos & Testimonials
*/

section_logos_testimonials();
function section_logos_testimonials() {
	
	global $post;
	
	$logos = '<div class="award-logos">';
	$logos .= sprintf( '<a href="http://www.houzz.com/pro/myhousedesignbuildteam/my-house-design-build-team#11" target="_blank"><img src="%slogos-testimonials/houzz-service.png" alt="best custom home builder 2016, best interior design 2016 houzz, vancouver home builder" class="houzz" /></a>', trailingslashit( THEME_IMG ) );
	$logos .= sprintf( '<a href="http://www.houzz.com/pro/myhousedesignbuildteam/my-house-design-build-team#11" target="_blank"><img src="%slogos-testimonials/houzz-design.png" alt="best custom home builder 2016, best interior design 2016 houzz, vancouver home builder" class="houzz" /></a>', trailingslashit( THEME_IMG ) );
	$logos .= sprintf( '<img src="%slogos-testimonials/baeumler.png" alt="" class="baeumler" /></a>', trailingslashit( THEME_IMG ) );
	$logos .= '</div>';
	
	$free_consultation = sprintf( '<p class="cta"><a href="%s" class="btn medium">%s</a></p>', get_permalink( 1444 ), __( 'Request a free Consultation', '_s' ) );
	$left_column = sprintf( '<div class="small-12 large-4 columns"><div class="entry-content">%s%s</div></div>', $logos, $free_consultation );
			
	// Right Column
	$testimonials = get_testimonials();
				
	$right_column = sprintf( '<div class="small-12 large-8 columns">%s</div>', $testimonials );
			
	// Output section
			
	$attr = array( 'class' => 'section-content section-logos-testimonials' );
	_s_section_open( $attr );		
		printf( '<div class="row">%s%s</div>', $left_column, $right_column );
	_s_section_close();	

}
	
 
 function get_testimonials() {
	 
	 $homepage_id = get_option('page_on_front');
	 
	 if( !$homepage_id ) {
		 return false;
	 }
	 
	 $testimonials = get_field( 'testimonials', $homepage_id );
	 	 
	 // arguments, adjust as needed
	$args = array(
		'post_type'      => 'testimonials',
		'posts_per_page' => 50,
		'post_status'    => 'publish',
	);
	
	$args['post__in'] = $testimonials;
	$args['orderby'] = 'post__in';
	
	// Use $loop, a custom variable we made up, so it doesn't overwrite anything
	$loop = new WP_Query( $args );
	
	// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
	// don't want to use $wp_query, use our custom variable instead.
	if ( $loop->have_posts() ):
		
		$items = '';
		
		while ( $loop->have_posts() ) : $loop->the_post(); 
	
 			$title = get_the_title();
			$description = get_post_meta( get_the_ID(), 'testimonial_description', true );
			if( !empty( $description ) ) {
				$title = sprintf( '%s/ %s', $title, $description );
			}
			$content = apply_filters( 'pb_the_content', get_the_content() );	
			
			$items .= sprintf( '<div class="rsContent"><div class="rsTextSlide"><div class="quote">%s</div><div class="details"><p>%s</p></div></div></div>', $content, $title );		
			
		endwhile;
	wp_reset_postdata();
 	
	return sprintf( '<div id="testimonial-slider" class="royalSlider testimonial-slider rsHor">%s</div>', $items );
	
	endif;
			 
 }