<?php
/**
 * Template Name: Testimonials
 */
 
get_header(); ?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
	<?php
	global $post;
				
	// Default
	section_default();
	function section_default() {
				
		global $post;
		
		if( empty( get_the_content() ) )
			return false;
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			print( '<div class="column row">' );
		
				while ( have_posts() ) :
		
					the_post();
					
					the_content();
						
				endwhile;
		
			echo '</div>';
		_s_section_close();	
	}
	
	
	// Testimonials
	section_testimonials();
	function section_testimonials() {
		
		global $post;
	 
	 	$testimonials = get_field( 'testimonials' );
	 	 
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
				$photo =  get_the_post_thumbnail_url( get_the_ID(), array(200,200) );
				$thumbnail = '';
				if( !empty( $photo ) ) {
					$thumbnail = sprintf( '<div class="thumbnail" style="background-image: url(%s);"></div>', $photo );
				}
				$description = get_post_meta( get_the_ID(), 'testimonial_description', true );
				$content = apply_filters( 'pb_the_content', get_the_content() );
                
                $testimonial_project_details = get_field( 'testimonial_project_details' );	
				
				$items .= sprintf( '<div class="column"><div class="quote" data-equalizer-watch>%s%s<div class="details">%s<strong>%s</strong>%s</div></div></div>', $thumbnail, $content, $testimonial_project_details, $description, $title );		
				
			endwhile;
		wp_reset_postdata();
 	
 	
	endif;
  		
		$grid = sprintf( '<div class="row small-up-1 large-up-3 grid" data-equalizer data-equalize-on="medium">%s</div>', $items );	
					
		$attr = array( 'class' => 'section-content section-testimonials' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $grid );
		_s_section_close();	
		
	}
	
	
	?>
	</main>


</div>

<?php
get_footer();
