<?php
/**
 * Template Name: Preferred Partners
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
	
	
	
	// Preferred Partners
	section_partners();
	function section_partners() {
		
		global $post;
				
 		$prefix = 'preferred_partners';
	
		$grid = '';
		$grid_items = _kr_get_grid_items( $prefix );
		if( empty( $grid_items ) ) {
			return;
		}
		
		$grid = sprintf( '<div class="row small-up-1 grid">%s</div>', $grid_items );	
					
		$attr = array( 'class' => 'section-content section-partners' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $grid );
		_s_section_close();	
		
	}
	
	
	?>
	</main>


</div>

<?php
get_footer();
