<?php
/**
 * Template Name: Contact Us
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
		$left_column = sprintf( '<div class="small-12 large-4 columns"><div class="entry-content">%s</div></div>', apply_filters( 'pb_the_content', get_the_content() ) );
		
		// Right Column						
 		$content = get_field( 'second_column' );
			
		$right_column = sprintf( '<div class="small-12 large-8 columns">%s</div>', $content );
		
		// Output section
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			printf( '<div class="row">%s%s</div>', $left_column, $right_column );
		_s_section_close();	
		
	}
	
	
	?>
	</main>


</div>

<?php
get_footer();
