<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package _s
 */


add_action( 'wp_enqueue_scripts', '_s_scripts' );
function _s_scripts( ) {
	wp_enqueue_script( 'gallery' );
}

get_header(); ?>


<div class="column row">

	<div id="primary" class="content-area">
	
		<main id="main" class="site-main" role="main">
		<?php
		while ( have_posts() ) :
	
			the_post();
	
			get_template_part( 'template-parts/content', 'gallery' );
	
			//the_post_navigation();
	
			endwhile; ?>
	
		</main>
	
	</div>

</div>

<?php
get_footer();
