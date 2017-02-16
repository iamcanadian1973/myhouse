<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header(); ?>


<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
		
		<div class="wrap">
			<div class="column row">
				
				<header class="page-header">
					<?php
					//the_archive_title( '<h1 class="page-title">', '</h1>' );
					printf( '<h1 class="page-title">%s</h1>', __( 'Photo Gallery', '_s' ) );
					the_archive_description( '<div class="taxonomy-description">', '</div>' );	?>
				</header>
		
				<?php
				$tax = 'gallery_cat';
				$terms = get_terms( $tax, array(
					'hide_empty' => true,
				) );	
				
				if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
					
					foreach ( $terms as $term ) {
						$ids[] = get_field( 'featured_image', $term );
					}
					
					$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));
					
					print( '<div class="row small-up-1 medium-up-2 large-up-3 grid">' );
					
					foreach ( $terms as $term ) {
						
						$title = sprintf( '<h2>%s</h2>', $term->name );
						
						$thumbnail = '';
						$featured_image_ID = get_field( 'featured_image', $term );
 						if( '' != $featured_image_ID ) {
							$thumbnail = wp_get_attachment_image( $featured_image_ID, array(400,300), '', '' );
						}
						 						
						printf( '<article class="column"><a href="%s">%s<div class="entry-content">%s</div></a></article>', get_term_link( $term, $tax ), $thumbnail, $title );
					}
					
					echo '</div>';
				}
	
				?>
			
			</div>
		</div>

	</main>

</div>

<?php
get_footer();
