<?php

/*
Section - Logos & Testimonials
*/

section_testimonials();
function section_testimonials() {
	
	global $post;
	
	$testimonials = get_testimonials();
				
	$attr = array( 'class' => 'section-content section-logos-testimonials' );
	_s_section_open( $attr );		
		echo $testimonials;
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
	
 			$photo =  get_the_post_thumbnail( get_the_ID(), 'large' );
				$thumbnail = '';
				if( !empty( $photo ) ) {
					$thumbnail = $photo;
				}
            
            $title = get_the_title();
			$description = get_post_meta( get_the_ID(), 'testimonial_description', true );
			if( !empty( $description ) ) {
				$title = sprintf( '%s/ %s', $title, $description );
			}
			$content = apply_filters( 'pb_the_content', get_the_content() );	
            
            $testimonial_project_details = get_field( 'testimonial_project_details' );	
			
			$items .= sprintf( '<div class="rsContent"><div class="rsTextSlide">
                <div class="row">
                        <div class="column column-block small-12 large-6">
                        <div class="hide-for-large"><h2>%s</h2></div>
                        %s</div>
                        <div class="column column-block small-12 large-6">
                            <div class="show-for-large"><h2>%s</h2></div>
                            <div class="quote">%s</div><div class="details">%s<p>%s</p></div>
                        </div>
                    </div>
            </div></div>', __( 'Client Reviews', '_s' ), $thumbnail, __( 'Client Reviews', '_s' ), $content, $testimonial_project_details, $title );		
			
		endwhile;
	wp_reset_postdata();
 	
	return sprintf( '<div id="testimonial-slider" class="royalSlider testimonial-slider rsDefault rsHor">%s</div>', $items );
	
	endif;
			 
 }