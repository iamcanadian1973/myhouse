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
					//the_archive_title( '<h1 class="page-title">', '</h1>' );
					printf( '<h1 class="page-title">%s</h1>', __( 'Feature Videos', '_s' ) );
					the_archive_description( '<div class="taxonomy-description">', '</div>' );	
                    videos_custom_filters();
                    ?>
				</header>
	
				<?php
				
				print( '<div class="row small-up-1 medium-up-2 large-up-3 xlarge-up-4 video-grid">' );
				
				while ( have_posts() ) :
	
					the_post();
	
					get_template_part( 'template-parts/content', 'videos' );
	
				endwhile;
	
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
