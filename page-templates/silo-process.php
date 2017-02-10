<?php
/**
 * Template Name: Silo Process
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
		
 		$prefix = 'process';
		$prefix = set_field_prefix( $prefix );
						
		$heading = get_post_meta( get_the_ID(), sprintf( '%sheading', $prefix ), true );
		$heading = _s_get_heading( $heading, 'h1' );
		
		$right_column = $left_column = '';
		
		// Left column
		$content = get_field( sprintf( '%scontent', $prefix ) );
 		$left_column = sprintf( '<div class="small-12 medium-6 columns"><div class="entry-content">%s</div></div>', $content );
		
		$photo = get_post_meta( get_the_ID(), sprintf( '%sphoto', $prefix ), true );
		if( $photo ) {
			$photo = wp_get_attachment_image( $photo, 'large' );
		}
		$right_column = sprintf( '<div class="small-12 medium-6 columns">%s</div>', $photo );
		
		// Output section
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $heading );
			printf( '<div class="row">%s%s</div>', $left_column, $right_column );
		_s_section_close();	
		
	}
	
	
	section_steps();
	function section_steps() {
				
		$prefix = 'steps';
		$grid = '';
		$args = array( 
			'prefix' => 'steps',
			'title_position' => 'after',
		);
		$grid_items = _kr_get_grid_items( $args );
		if( !empty( $grid_items ) ) {
			$grid = sprintf( '<div class="row small-up-1 medium-up-2 large-up-4 grid">%s</div>', $grid_items );
		}
		
		$attr = array( 'class' => 'section-content section-steps' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $grid );
		_s_section_close();	
			
	}
	
	
	// Process Guarantee
	get_template_part( 'template-parts/section', 'process-guarantee' );
	
	?>
	</main>


</div>

<?php
get_footer();
