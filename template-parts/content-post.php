<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<header class="entry-header">
		<?php 
		if( is_single() ) {
			the_title( '<h1 class="entry-title">', '</h1>' );
		}
		else {
			printf( '<h2 class="entry-title"><a hre="%s">%s</a></h2>', get_permalink(), get_the_title() );
		}
		?>
		<div class="entry-meta">
			<?php _s_posted_on(); ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->
	
	<?php
	if( has_post_thumbnail() ) {
		the_post_thumbnail( 'post-thumbnail' );	
	}
	?>
	
	<div class="entry-content">
		<?php 
		if( is_single() ) {
			the_content(); 
			
			echo _s_get_share_icons();
			
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
			
			
		} else {
			
			_s_the_excerpt( '', '' );
			
			printf( '<p class="read-more"><a href="%s" class="more">Continue Reading ></a></p>', get_permalink() ) ;
			
			
		}
		?>
		
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php _s_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
