<?php
/**
 * The front-page.php template file.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */


add_action( 'wp_enqueue_scripts', '_s_scripts' );
function _s_scripts( ) {
	wp_enqueue_script( 'front-page' );
}


get_header(); ?>

<?php
// Slideshow
echo kr_module_slideshow( 'slider' );
?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
	<?php
	global $post;
	
	/*
	Make this a section
	- logos
	- testimonials
	*/
	
	
	// Default
	section_default();
	function section_default() {
		
		global $post;
		
		$right_column = $left_column = '';
		
		// Left column
		$left_column = sprintf( '<div class="small-12 medium-7 xxlarge-6 columns"><div class="entry-content featured">%s</div></div>', apply_filters( 'the_content', get_the_content() ) );
		
		// Right Column
		
		$galleries = sprintf( '<p class="cta"><a href="%s" class="btn large">%s</a></p>', get_post_type_archive_link( 'gallery' ), __( 'See Our Galleries', '_s' ) );
		//$video = wp_oembed_get( 'https://www.youtube.com/watch?v=L2KbXuXWt6Q' );
		$video = '';
		$video_id = get_field( 'video' );
		if( !empty( $video_id ) ) {
			$video = get_youtube_video_foobox_thumbnail( $video_id );
		}
				
		$content = $galleries . $video;
			
		$right_column = sprintf( '<div class="small-12 medium-5 xxlarge-6 columns">%s</div>', $content );
		
		// Output section
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			printf( '<div class="row">%s%s</div>', $left_column, $right_column );
		_s_section_close();	
		
	}
	
	// Logos & Testimonials
	get_template_part( 'template-parts/section', 'logos-testimonials' );
	
	?>
	</main>


</div>

<?php
// Footer Awards
get_template_part( 'template-parts/section', 'footer-awards' );


get_footer();
