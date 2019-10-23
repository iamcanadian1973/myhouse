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
		
		$right_column = $left_column = $video = '';
        
        // Heading
        $heading = the_title( '<h1>', '</h1>', false );
		
        // Content
 		$content = sprintf( '<div class="entry-content featured">%s</div>', apply_filters( 'the_content', get_the_content() ) );
		
 		// Gallery button
		$button = sprintf( '<p class="button-group cta"><a href="%s" class="btn large">%s</a><a href="%s" class="btn large">%s</a></p>', 
                            get_permalink( 1444 ), __( 'Free Consultation', '_s' ), 
                            get_post_type_archive_link( 'gallery' ), __( 'View Our Galleries', '_s' ) );
        
        // Video
 		$video_id = get_field( 'video' );
		if( !empty( $video_id ) ) {
			$video = get_youtube_video_foobox_thumbnail( $video_id );
		}
				
  		
		// Output section
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			 printf( '<div class="row"><div class="small-12 medium-6 columns">%s</div><div class="small-12 medium-6 columns show-for-medium">%s</div></div>', 
                     $heading, $button );
            
            printf( '<div class="row"><div class="small-12 medium-6 columns">%s</div><div class="small-12 medium-6 columns">%s<div class="hide-for-medium">%s</div></div></div>', 
                    $content, $video, $button );
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
