<?php
/**
 * Template Name: About Us
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
		
		$right_column = $left_column = '';
		
		// Left column
		$left_column = sprintf( '<div class="small-12 large-7 columns"><div class="entry-content">%s</div></div>', apply_filters( 'the_content', get_the_content() ) );
		
		// Right Column
		$prefix = 'awards';
						
		$content = get_post_meta( get_the_ID(), sprintf( '%s_content', $prefix ), true );
		$content = _s_get_textarea( $content );
			
		$right_column = sprintf( '<div class="small-12 large-5 columns">%s</div>', $content );
		
		// Output section
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s%s</div>', $left_column, $right_column );
		_s_section_close();	
		
	}
	
	
	
	// Why Work with Us
	section_why_work_with_us();
	function section_why_work_with_us() {
		
		global $post;
		
		$right_column = $left_column = '';
		
 		$prefix = 'why_work_with_us';
						
		$content = get_post_meta( get_the_ID(), sprintf( '%s_content', $prefix ), true );
		$content = _s_get_textarea( $content );
		
		$left_column = sprintf( '<div class="small-12 large-5 columns"><div class="entry-content">%s</div></div>', $content );	
		
		
		$grid = '';
		$grid_items = _kr_get_grid_items( $prefix );
		if( !empty( $grid_items ) ) {
			$grid = sprintf( '<div class="row small-up-1 medium-up-4 large-up-2 grid">%s</div>', $grid_items );
		}	
			
		$right_column = sprintf( '<div class="small-12 large-7 columns"><div class="entry-content">%s</div></div>', $grid );
		
		
		$attr = array( 'class' => 'section-content section-why-work-with-us' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s%s</div>', $left_column, $right_column );
		_s_section_close();	
		
	}
	
	
	section_details();
	function section_details() {
				
		$prefix = 'details';
		$grid = '';
		$grid_items = _kr_get_grid_items( $prefix );
		if( !empty( $grid_items ) ) {
			$grid = sprintf( '<div class="row small-up-1 medium-up-3 grid">%s</div>', $grid_items );
		}
		
		$attr = array( 'class' => 'section-content section-details' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $grid );
		_s_section_close();	
			
	}
	
	?>
	</main>


</div>

<?php
get_footer();
