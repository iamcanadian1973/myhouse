<?php
/**
 * Template Name: Magazines
 */
 
get_header(); ?>

<?php			
// Hero
get_template_part( 'template-parts/section', 'hero' );
?>

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
	
	// Magazines
	section_magazines();
	function section_magazines() {
		
		// arguments, adjust as needed
		$args = array(
			'post_type'      => 'magazine',
			'posts_per_page' => 100,
			'post_status'    => 'publish',
		);
	
		// Use $loop, a custom variable we made up, so it doesn't overwrite anything
		$loop = new WP_Query( $args );
		
		update_post_thumbnail_cache( $loop );
	
		// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
		// don't want to use $wp_query, use our custom variable instead.
		if ( $loop->have_posts() ):
			
			$attr = array( 'class' => 'section-content section-magazines' );
			_s_section_open( $attr );	
			print( '<div class="row small-up-1 medium-up-3 large-up-4 grid">' );
			
			while ( $loop->have_posts() ) : $loop->the_post(); 
	
				$thumbnail = get_the_post_thumbnail( get_the_ID(), 'large' );
				$title = the_title( '<h3>', '</h3>', false);
				$link = '';
				$anchor_open = $anchor_close = '';
				$pdf = get_post_meta( get_the_ID(), 'pdf', true );
				$url = get_post_meta( get_the_ID(), 'url', true );
				
				if( !empty( $pdf ) ) {
					$pdf = wp_get_attachment_url( $pdf );
					$link = $pdf;
				}
				
				if( !empty( $url ) ) {
					$link = $url;
				}
				
				if( !empty( $link ) ) {
					$anchor_open = sprintf( '<a href="%s" target="_blank">', $link );
					$anchor_close = '</a>';
					
					$thumbnail = sprintf( '%s%s%s', $anchor_open, $thumbnail, $anchor_close );
				}
				
				$title = sprintf( '<header class="entry-header"><h3>%s%s%s</h3></header>', $anchor_open, get_the_title(), $anchor_close );
				
				printf( '<div class="column">%s%s</div>', $thumbnail, $title );
				
			endwhile;
			wp_reset_postdata();
			echo '</div>';
			_s_section_close();	
			
			endif;
		
	}
	
	?>
	</main>


</div>

<?php
get_footer();
