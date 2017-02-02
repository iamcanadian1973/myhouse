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

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">		
			
			<div class="wrap">
			<div class="column row">
			<?php
			if ( have_posts() ) :
				
				while ( have_posts() ) :
	
					the_post();
					
					get_template_part( 'template-parts/content', 'post' );
	
				endwhile;
	
				the_posts_navigation();	
				?>
				
 			<?php
			else :
	
				get_template_part( 'template-parts/content', 'none' );
	
			endif; ?>
		
		
			</div><!-- .colum.row -->
		</div><!-- .wrap -->
	
	</main>

</div>


<?php
get_footer();
