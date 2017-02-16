<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'column' ); ?>>
	
	<div class="entry-content">
		<?php
		$video_url = add_query_arg( array( 'rel' => 0, 'autoplay' => 1 ), get_post_meta( get_the_ID(),  'video_url', true ) );
		$title = sprintf( ' data-caption-title="%s"', esc_html( get_the_title() ) );
 		$description  = get_post_meta( get_the_ID(),  'video_description', true );
		if( !empty( $description ) ) {
			$description = sprintf( ' data-caption-desc="%s"', $description );
		}
		printf( '<a href="%s" class="foobox youtube"%s%s><i class="icon video-icon"></i>', $video_url, $title, $description );
		the_post_thumbnail( 'video-thumbnail' );
		echo '</a>';
		?>
		<header class="entry-header">
			<?php 
				printf( '<h3><a href="%s" class="foobox youtube"%s%s>%s</a></h3>', $video_url, $title, $description, get_the_title() );
			?>
		</header><!-- .entry-header -->
		
	</div><!-- .entry-content -->

</article><!-- #post-## -->
