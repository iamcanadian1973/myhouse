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
			the_title( '<h1>', '</h1>' );
		?>
	</header><!-- .entry-header -->
	
	<div class="entry-content">
		<?php
		// Slideshow
		_s_gallery_slideshow();
		
		// Add social sharing, add custom Houzz link to sharing
		$houzz = '<li class="houzz"><a target="_blank" href="http://www.houzz.com/pro/myhousedesignbuildteam" rel="nofollow"><i class="fa fa-houzz" aria-hidden="true"></i><span class="screen-reader-text">houzz</span></a></li>';

		echo _s_get_addtoany_share_icons( false, $houzz );
				
		/*
		description_blurb
		long_description
		*/
		//$description_blurb = get_post_meta( get_the_ID(), 'description_blurb', true );
		//$description_blurb =  _s_get_textarea( $description_blurb );
		$long_description = get_post_meta( get_the_ID(), 'long_description', true );
		if( !empty( $long_description ) ) {
			$long_description = apply_filters( 'pb_the_content', $long_description );
			echo $long_description;
		}
		
		
		// Awards
		$awards = _s_get_awards();
		if( !empty( $awards ) ) {
			printf( '<div class="row small-up-1 medium-up-2 grid awards">%s</div>', $awards );
		}
		
		
		/*
		youtube_videos - parse iframes for now. Future goals is to just use links.
		*/
		$videos = _s_get_youtube_videos();
		
		if( !empty( $videos ) ) {
			printf( '<div class="row small-up-1 medium-up-2 grid">%s</div>', $videos );
		}
		
		?>		
	</div><!-- .entry-content -->

</article><!-- #post-## -->
