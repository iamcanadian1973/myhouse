<?php
/**
 * Template Name: Awards
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
	
	
	section_featured_awards();
	function section_featured_awards() {
		
		global $post;
		
		$content = _featured_awards();
		
		if( empty( $content ) )
			return false;
		
		$attr = array( 'class' => 'section-content section-featured-awards' );
		_s_section_open( $attr );	
			echo $content;
		_s_section_close();	
			
	}
	
	
	function _featured_awards() {
		$prefix = 'featured_awards';
		$grid = '';
		$args = array( 
			'prefix' => $prefix,
			'title_position' => 'after',
		);
		$grid_items = _kr_get_grid_items( $args );
		if( !empty( $grid_items ) ) {
			$grid = sprintf( '<div class="row small-up-1 medium-up-2 large-up-3 grid">%s</div>', $grid_items );
		}
		
		return $grid;
	}
	
	
	
	section_awards();
	function section_awards() {
	
	// arguments, adjust as needed
		$args = array(
			'post_type'      => 'award',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
			'order_by' => 'menu_order',
			'order' => 'ASC'
		);
	
		// Use $loop, a custom variable we made up, so it doesn't overwrite anything
		$loop = new WP_Query( $args );
		
		update_post_thumbnail_cache( $loop );
	
		// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
		// don't want to use $wp_query, use our custom variable instead.
		if ( $loop->have_posts() ):
			
			$attr = array( 'class' => 'section-content section-awards' );
			_s_section_open( $attr );	
			print( '<div class="row small-up-1 large-up-2 grid">' );
			
			while ( $loop->have_posts() ) : $loop->the_post(); 
	
				$thumbnail = get_the_post_thumbnail( get_the_ID(), 'large' );
				$title = the_title( '<h3>', '</h3>', false);
				$description = _s_get_textarea( get_post_meta( get_the_ID(), 'description', true ) );
				
				$title = sprintf( '<header class="entry-header"><h3>%s</h3></header>', get_the_title() );
				$awards_list = apply_filters( 'the_content', get_the_content() );
				
				$more = sprintf( '<div class="toggle-more"><span class="btn small">%s</span></div>', __('...see more Awards', '_s' ) );
				$morestring = '<!--more-->';

				$explode_content = explode( $morestring,  $loop->post->post_content );
				if( !empty( $explode_content ) && ( count( $explode_content ) > 1 ) ) {
					$content_before = apply_filters( 'the_content', $explode_content[0] );
					$content_after = apply_filters( 'the_content', $explode_content[1] );
					$awards_list = $content_before;
					$awards_list .= sprintf( '<div class="toggle-content"><div class="text">%s</div>%s</div>', $content_after, $more );
				}
				
				
				printf( '<div class="column">%s<div class="entry-content">%s%s%s</div></div>', $thumbnail, $title, $description, $awards_list );
				
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
