<?php
/**
 * Template Name: Silo Landing Page
 */


add_action( 'wp_enqueue_scripts', '_s_scripts' );
function _s_scripts( ) {
	wp_enqueue_script( 'silo-landing' );
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
	
	// Default
	section_default();
	function section_default() {
		
		global $post;
		
		$right_column = $left_column = '';
		
		// Left column
		$left_column = sprintf( '<div class="small-12 large-6 columns"><div class="entry-content">%s</div></div>', apply_filters( 'pb_the_content', get_the_content() ) );
		
		// Right Column
		$photo_gallery = '';
		
		// Photo Gallery link?
		$photo_gallery_link = get_field( 'photo_gallery_link' );
		if( !empty( $photo_gallery_link ) ) {
			$photo_gallery_link_title = get_post_meta( get_the_ID(), 'photo_gallery_link_title', true );
			if( empty( $photo_gallery_link_title ) ) {
				$photo_gallery_link_title = __( 'Photo Gallery', '_s' );
			}
			$photo_gallery = sprintf( '<p><a href="%s" class="btn cta">%s</a></p>', $photo_gallery_link, $photo_gallery_link_title );
		}
		
		// Is there a video?
		/*
		$video = get_post_meta( get_the_ID(), 'video', true );
		if( !empty( $video ) ) {
			$video = wp_oembed_get( $video );
		}
		*/
		
		$video = '';
		$video_id = get_field( 'video' );
		if( !empty( $video_id ) ) {
			$video = get_youtube_video_foobox_thumbnail( $video_id );
		}
		
			
		$right_column = sprintf( '<div class="small-12 large-6 columns">%s%s</div>', $photo_gallery, $video );
		
		// Output section
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			printf( '<div class="row">%s%s</div>', $left_column, $right_column );
		_s_section_close();	
		
	}
	
	// Details Grid
	section_details();
	function section_details() {
				
		$args = array(
			'prefix' => 'details',
			'title_position' => 'after',
			'title_tag' => 'h3'
		);
		$grid = '';
		$grid_items = _kr_get_grid_items( $args );
		if( !empty( $grid_items ) ) {
			$grid = sprintf( '<div class="row small-up-1 medium-up-3 grid">%s</div>', $grid_items );
		}
		
		$attr = array( 'class' => 'section-content section-details' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $grid );
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
