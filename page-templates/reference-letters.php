<?php
/**
 * Template Name: Reference Letters
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
	
	
	// Reference Letters
	// <strong><em><a href="http://www.myhousedesignbuild.com/renovation-gallery/coquitlam-gem/" target="_blank">Click here to view project details</a></em></strong>
	section_letters();
	function section_letters() {
		
		global $post;
	 	 	 
		 // arguments, adjust as needed
		$args = array(
			'post_type'      => 'reference_letter',
			'posts_per_page' => 50,
			'order_by'       => 'title',
			'order'          => 'ASC',
			'post_status'    => 'publish',
		);

	
		// Use $loop, a custom variable we made up, so it doesn't overwrite anything
		$loop = new WP_Query( $args );
		
		update_post_thumbnail_cache( $loop );
		
		// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
		// don't want to use $wp_query, use our custom variable instead.
		if ( $loop->have_posts() ):
			
			$tabs = '';
			$tabs_content = '';
			$items = '';
			
			while ( $loop->have_posts() ) : $loop->the_post(); 
				$is_active = ! $loop->current_post ? ' is-active' : '';
				$aria_selected = ! $loop->current_post ? 'true' : 'false';
				$count = $loop->current_post + 1;
				$tabs .= sprintf( '<li class="tabs-title%s"><a href="#letter-%s" aria-selected="%s">%s</a></li>', $is_active, get_the_ID(), $aria_selected, $count );
				$title = sprintf( '<h3>%s</h3>', get_the_title() );
				$title_before =  sprintf( '<div class="hide-for-large">%s</div>', $title );
				$title_after =  sprintf( '<div class="show-for-large">%s</div>', $title );
				$photo = get_the_post_thumbnail( get_the_ID(), 'large' );
 				$content = apply_filters( 'pb_the_content', get_the_content() );
				$photo_gallery = get_post_meta( get_the_ID(), 'photo_gallery', true );	
				$photo_gallery_link = '';
				if( $photo_gallery ) {
					$photo_gallery_link = sprintf( '<p><a href="%s">%s</a></p>', get_permalink( $photo_gallery ), __( 'Click here to view project details', '_s' ) );
				}
				
				
				$tabs_content .= sprintf( '<div class="tabs-panel%s" id="letter-%s">%s%s%s%s%s</div>', $is_active, get_the_ID(), $title_before, $photo, $title_after, $content, $photo_gallery_link );		
				
			endwhile;
		wp_reset_postdata();
 	
 	
	endif;
  		
		$grid = sprintf( '<div class="">%s</div>', $items );	
					
		$attr = array( 'class' => 'section-content section-reference-letters' );
		_s_section_open( $attr );
			$tabs = sprintf( '<ul class="tabs" data-tabs id="reference-letter-tabs">%s</ul>', $tabs );
			$tabs_content = sprintf( '<div class="tabs-content" data-tabs-content="reference-letter-tabs">%s</div>', $tabs_content );
			printf( '<div class="column row">%s%s</div>', $tabs, $tabs_content );
		_s_section_close();	
		
	}
	
	
	?>
	</main>


</div>

<?php
get_footer();
