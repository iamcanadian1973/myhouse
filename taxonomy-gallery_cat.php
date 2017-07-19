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
		
			<?php
			if ( have_posts() ) : ?>
	
				<header class="page-header">
					<?php
					printf( '<h1 class="page-title">%s</h1>', single_term_title( '', false ) );
					the_archive_description( '<div class="taxonomy-description featured">', '</div>' );	?>
				</header>
	
				<?php
				
				print( '<div class="row small-up-1 medium-up-2 large-up-3 grid">' );
				
				while ( have_posts() ) :
	
					the_post();
	
					?>

					<article id="post-<?php the_ID(); ?>" <?php post_class( 'column' ); ?>>
						
						<div class="entry-content">
							<?php
							$title = sprintf( '<h2>%s</h2>', get_the_title() );
							$thumbnail = get_the_post_thumbnail( get_the_ID(), array(400,250) ); // 'gallery-thumbnail'
 							printf( '<a href="%s" class="">%s<header class="entry-header">%s</header>', get_permalink(), $thumbnail, $title );
							echo '</a>';
							?>
							
						</div><!-- .entry-content -->
					
					</article><!-- #post-## -->
					<?php
	
				endwhile;
								
				echo '</div>';
				
				$queried_object = get_queried_object(); 
				$taxonomy = $queried_object->taxonomy;
				$term_id = $queried_object->term_id;  
				$category_footer_text = get_field( 'category_footer_text', $taxonomy . '_' . $term_id );
				
				if( !empty( $category_footer_text ) ) {
					echo $category_footer_text;
				}
	
				the_posts_pagination( array( 'mid_size' => 2 ) );
	
			else :
	
				get_template_part( 'template-parts/content', 'none' );
	
			endif; ?>
			
			</div>
		</div>

	</main>

</div>

<?php
get_footer();
