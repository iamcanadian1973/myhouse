<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package _s
 */

get_header(); ?>

<?php
$heading = sprintf( '<header class="hero-header"><h1>%s</h1></header>', get_the_title() );
$description = sprintf( '<div class="hero-description">%s</div>', _s_get_posted_on() );
// Build Hero section
printf( '<section class="section section-hero flex-wrapper"><div class="wrap flex"><div class="column row">%s%s</div></div></section>', $heading, $description  );
?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
		
				<?php
				while ( have_posts() ) :
			
					the_post();
			
					$attr = array( 'class' => 'section-content section-default' );
					_s_section_open( $attr );
						printf( '<div class="column row">' );
						the_content();
						echo '</div>';
					_s_section_close();	
							
			
				// blockquote					
				$prefix = 'blockquote';
				
				$content  = get_module_testimonial( $prefix );
				
				if( !empty( $content ) ) {					
					$attr = array( 'class' => 'section-content section-testimonial min-width' );
					_s_section_open( $attr );
						printf( '<div class="column row">%s</div>', $content );
					_s_section_close();	
				}
				// Secondary content
							
				$prefix = 'content_block';
				$content = kr_module_get_content_block( $prefix );
				
				if( !empty( $content ) ) {					
					$attr = array( 'class' => 'section-content section-default' );
					_s_section_open( $attr );
						printf( '<div class="column row">%s</div>', $content );
					_s_section_close();	
				}

								
				wp_link_pages( array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
					'after'  => '</div>',
				) );
											 
				?>
							
					
				<footer class="entry-footer">
					<?php //_s_entry_footer(); ?>
				</footer><!-- .entry-footer -->

				<?php
		
				//the_post_navigation();
				
				/*	Remove comments
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;
				*/
				endwhile; ?>
	
	
	
	</main>

</div>

</div>


<?php
get_footer();
