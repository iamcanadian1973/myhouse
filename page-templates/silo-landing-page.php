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
    
    section_default();
	function section_default() {
		
		global $post;
		
		$right_column = $video = $buttons = '';
        
        // Heading
        $heading = the_title( '<h1>', '</h1>', false );
		
        // Content
 		$content = sprintf( '<div class="entry-content featured">%s</div>', apply_filters( 'the_content', get_the_content() ) );
        
        
        // Silo Process button
        $silo_process_title = get_field( 'silo_process_title' );
        $silo_process_link = get_field( 'silo_process_link' );
        
        if( !empty( $silo_process_title ) && !empty( $silo_process_link ) ) {
             $buttons .= sprintf( '<div class="column"><a href="%s" class="btn medium flex" data-equalizer-watch><span>%s</span></a></div>', $silo_process_link, $silo_process_title  );
        }
  		
 		// Gallery button
		// Photo Gallery link?
		$photo_gallery_link = get_field( 'photo_gallery_link' );
		if( !empty( $photo_gallery_link ) ) {
			$photo_gallery_link_title = get_post_meta( get_the_ID(), 'photo_gallery_link_title', true );
			if( empty( $photo_gallery_link_title ) ) {
				$photo_gallery_link_title = __( 'View Our Galleries', '_s' );
			}
			$buttons .= sprintf( '<div class="column"><a href="%s" class="btn medium flex" data-equalizer-watch><span>%s</span></a></div>', $photo_gallery_link, $photo_gallery_link_title );
		}
        
        if( !empty( $buttons ) ) {
            $buttons = sprintf( '<div class="row small-up-1 medium-up-2 buttons" data-equalizer >%s</div>', $buttons );
        }
        
        // Video
 		$video_id = get_field( 'video' );
        $right_column = get_field( 'right_column' );
		if( !empty( $video_id ) ) {
			$right_column = get_youtube_video_foobox_thumbnail( $video_id );
        }
				
  		
		// Output section
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			 printf( '<div class="row"><div class="small-12 large-6 columns">%s</div><div class="small-12 large-6 columns show-for-large">%s</div></div>', 
                     $heading, $buttons );
            
            printf( '<div class="row"><div class="small-12 large-6 columns">%s</div><div class="small-12 large-6 columns">%s<div class="hide-for-large">%s</div></div></div>', 
                    $content, $right_column, $buttons );
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
