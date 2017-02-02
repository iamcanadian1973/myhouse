<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package _s
 */

get_header(); ?>

<?php
// Hero
$heading = sprintf( '<header class="hero-header"><h1>%s</h1></header>', esc_html__( 'Oops! Page not found.', '_s' ) );
$description = '';
// Build Hero section
printf( '<section class="section section-hero short flex-wrapper"><div class="wrap flex"><div class="column row">%s%s</div></div></section>', $heading, $description  );
?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
	
		<?php
		// Default
		section_default();
		function section_default() {
				
		global $post;
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			print( '<div class="column row">' );
		
				echo '<p>';
				esc_html_e( 'It looks like nothing was found at this location.', '_s' );
				echo '</p>';
		
			echo '</div>';
		_s_section_close();	
		}
	
		?>

			

	</main><!-- #main -->

</div><!-- #primary -->


<?php
get_footer();
