<?php
/**
 * Template Name: Process
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
		
		global $post;
		
		$prefix = 'steps';
		$prefix = set_field_prefix( $prefix );		
		
		$heading = get_post_meta( get_the_ID(), sprintf( '%sheading', $prefix ), true );
		$heading = _s_get_heading( $heading );
		
		$grid = '';
		$grid_items = _process_steps();
		if( empty( $grid_items ) ) {
			return false;
 		}
		
		$grid = sprintf( '<div class="row small-up-1 medium-up-2 large-up-4 grid">%s</div>', $grid_items );
		
		$attr = array( 'class' => 'section-content section-steps' );
		_s_section_open( $attr );	
			printf( '<div class="column row">%s</div>', $heading );	
			printf( '<div class="column row">%s</div>', $grid );
		_s_section_close();	
			
	}
	
	// Helper function - process steps
	function _process_steps() {
	
 		$image_size =  'large';
 		$title_tag = 'h3';
		
 		$rows = get_field( 'steps' );
			
		if( empty( $rows ) ) {
			return;
		}
 		
		foreach ($rows as $row) {
			$ids[] = $row['photo'];
		}
		$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));
	
		
		$list_items = '';
		
		foreach( $rows as $row ) {
			
			$anchor_open = $anchor_close = '';
			$permalink = $row['page_link'];
			
			if( !empty( $permalink ) ) {
				$anchor_open = sprintf( '<a href="%s">', $permalink );
				$anchor_close = '</a>';
			}
						
			$title = isset(  $row['grid_title'] ) ? sprintf( '<%1$s>%2$s</%1$s>', $title_tag, $row['grid_title'] ) : '';
 			$title .= isset(  $row['grid_description'] ) ? sprintf( '<p>%s</p>', $row['grid_description'] ) : '';
			$title = sprintf( '<div class="step-title">%s</div>', $title );
			
			$photo = isset(  $row['photo'] ) ? $row['photo']: '';
			
			if( $photo ) {
				$photo = wp_get_attachment_image( $photo, $image_size );
			}
			
			$list_items  .= sprintf( '<div class="column">%s%s%s%s</div>', $anchor_open, $title, $photo, $anchor_close );
		}
	
		return $list_items;
	}
	
	
	// Process Guarantee
	get_template_part( 'template-parts/section', 'process-guarantee' );
	
	?>
	</main>


</div>

<?php
get_footer();
