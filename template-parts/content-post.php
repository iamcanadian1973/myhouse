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
	
	<?php
	if( !is_single() && has_post_thumbnail() ) {
		
		// Change image size for sticky post
		$sticky = is_sticky() ? '-sticky' : '';
		// Featured tag
		$featured = is_sticky() ? '<span>Featured</span>' : '';
		echo '<div class="thumbnail-box">';
		echo $featured;
		the_post_thumbnail( 'post-thumbnail' . $sticky );	
		echo '</div>';
	}
	?>
	
	<div class="entry-content">
		<?php 
		if( is_single() ) {
			the_content(); 
			
			// Add blockquote
			
			// Add secondary content block
			
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
			
			
		} else {
			
			?>
			<header class="entry-header">
				<?php the_title( '<h3 class="entry-title">', '</h3>' ); ?>
				<div class="entry-meta">
					<?php _s_posted_on(); ?>
				</div><!-- .entry-meta -->
			</header><!-- .entry-header -->
			<?php
			
			_s_the_excerpt( '', '' );
			
			printf( '<p class="read-more"><a href="%s" class="more">Continue Reading ></a></p>', get_permalink() ) ;
			
			echo _s_get_share_icons();
		}
		?>
		
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php _s_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
