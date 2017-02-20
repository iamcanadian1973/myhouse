<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header(); ?>

<div class="row">

	<div class="medium-7 large-7 columns">

		<div id="primary" class="content-area">

			<main id="main" class="site-main" role="main">
				<?php
				if ( have_posts() ) : ?>

					<header class="page-header">
						<?php
						printf( '<h1 class="page-title">%s</h1>', __( 'Blog' ) );	
						?>
					</header>

					<?php
					while ( have_posts() ) :

						the_post();

						get_template_part( 'template-parts/content', 'post' );

					endwhile;

					the_posts_pagination( array( 'mid_size' => 2 ) );

				else :

					get_template_part( 'template-parts/content', 'none' );

				endif; ?>

			</main>

		</div>

	</div>

	<div class="medium-4 large-4 columns">

		<?php get_sidebar(); ?>

	</div>

</div>

<?php
get_footer();
