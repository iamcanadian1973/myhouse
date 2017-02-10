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
				$description = get_post_meta( get_the_ID(), 'testimonial_description', true );
				$content = apply_filters( 'pb_the_content', get_the_content() );	
				
				$items .= sprintf( '<div class="column"><div class="quote">%s</div><div class="details"><strong>%s</strong>%s</div></div>', $content, $description, $title );		
				
			endwhile;
		wp_reset_postdata();
 	
 	
	endif;
  		
		$grid = sprintf( '<div class="row small-up-1 large-up-3 grid">%s</div>', $items );	
					
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
