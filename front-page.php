<?php
/**
 * The front-page.php template file.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header(); ?>

<?php
// Hero
get_template_part( 'template-parts/section', 'hero' );
?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
	<?php
	global $post;
	
	// Benefits
	section_benefits();
	function section_benefits() {
		
		$right_column = $left_column = '';
		
		// Left Column
		
		$title = get_post_meta( get_the_ID(), 'benefits_title', true );
		$summary = get_post_meta( get_the_ID(), 'benefits_summary', true );
		
		if( !empty( $title ) ) {
			$title = sprintf( '<header class="entry-title"><h2>%s</h2></header>', $title );
		}
	
		if( !empty( $summary ) ) {
			$summary = sprintf( '<div class="entry-content">%s</div>', apply_filters( 'pb_the_content',  $summary ) );
		}
		
		$left_column = sprintf( '<div class="small-12 large-6 columns">%s%s</div>', $title, $summary );
		
		// Right column
		
		$benefits_list = kr_module_get_list( $prefix = 'benefits_list' );
		
		$right_column = sprintf( '<div class="small-12 large-6 columns">%s</div>', $benefits_list );
		
		// Output section
		
		_s_markup( array(
			'html5'   => '<section %s>',
			'context' => 'section-benefits',
			'attr' => array('class' => 'section section-content section-benefits')
		) );
		
		_s_structural_wrap();
		
		printf( '<div class="row">%s%s</div>', $left_column, $right_column );
		
		_s_structural_wrap( 'close' );
		
		echo '</section>';	
	}
	
	// Events/News & Opportunities
	section_events_news_opportunities();
	function section_events_news_opportunities() {
		
		$events_and_news_posts = events_and_news_posts();
		
		if( $events_and_news_posts ) {
			$events_and_news_posts = sprintf( '<div class="small-12 xlarge-6 columns events-news">%s</div>', $events_and_news_posts );
		}
		
		$featured_opportunities_posts = featured_opportunities_posts();
		
		if( $featured_opportunities_posts ) {
			$featured_opportunities_posts = sprintf( '<div class="small-12 xlarge-6 columns opportunities">%s</div>', $featured_opportunities_posts );
		}
		
		_s_markup( array(
			'html5'   => '<section %s>',
			'context' => 'section-events-news',
			'attr' => array('class' => 'section section-content section-events-news padding-top-none')
		) );
		
		_s_structural_wrap();
		
		printf( '<div class="row">%s%s</div>', $events_and_news_posts, $featured_opportunities_posts );
		
		_s_structural_wrap( 'close' );
		
		echo '</section>';	
	}
	
	//* Get the Events/News Posts from Relationship field
	function events_and_news_posts() {
		
		$events_news_posts = get_field( 'events_and_news_posts' );
		
		$out = '';
		$list = '';
		
		if( !empty( $events_news_posts ) ) {
			
			$out .= '<h2>The Latest Events & News</h2>';
			
			if( count( $events_news_posts > 1 ) ) {
				$first = array_shift( $events_news_posts );
				$out .= kr_get_post( $first );
			}
			
			// Any Opportunities left to show?
			if( !empty( $events_news_posts ) ) {		
				foreach( $events_news_posts as $key => $_post ) {
					$list .= sprintf( '<li>%s</li>', kr_get_post( $_post, 1 ) );
				}
			}
			
			$out = sprintf( '%s<ul class="list">%s</ul>', $out, $list );
		}
		
		return $out;	
	}
	
	//* Get the Opportunities Posts from Relationship field
	function featured_opportunities_posts() {
		
		$featured_opportunities_posts = get_field( 'opportunities_posts' );
		
		$out = '';
		$list = '';
		
		if( !empty( $featured_opportunities_posts ) ) {
			
			
			$out .= '<h2>Featured Opportunities</h2>';
			
			// is there more than 1?
			// Show featured first
			// then show list if more thna 1
			if( count( $featured_opportunities_posts > 1 ) ) {
				$first = array_shift( $featured_opportunities_posts );
				$out .= kr_get_opportunity( $first );
			}
			
			// Any Opportunities left to show?
			if( !empty( $featured_opportunities_posts ) ) {		
				
				$out .= '<h5>Other Opportunities</h5>';
				
				foreach( $featured_opportunities_posts as $key => $_post ) {
					$state_abrev = '';
					$state = _s_term_value( 'state', 'name', TRUE, $_post->ID );
					if( !empty( $state ) ) {
						$state_abrev = sprintf( ', %s', get_state_short_name( $state ) );
					}
					$list .= sprintf( '<li>> <a href="%s">%s%s</a></li>', get_permalink( $_post->ID ), $_post->post_title, $state_abrev );
				}
			}
			
			$read_more = sprintf( '<p><a href="%s" class="btn">View all opportunities</a></p>', get_post_type_archive_link( 'opportunities' ) );
			$out = sprintf( '%s<ul class="list">%s</ul>%s', $out, $list, $read_more );
		}
		
		return $out;	
	}
	
	function kr_get_opportunity( $_post ) {
		return kr_get_opportunity_post( $_post, false, 'opportunity' );
	}
	
	// Display a single post from the relationship field
	function kr_get_opportunity_post( $_post, $key = false, $type = false ) {
		
		$size = $key ? 'post-small': 'post-featured';								
		$_post_id = $_post->ID;
		$_post_type = $_post->post_type;
		$_post_type_label = $_post->post_type == 'news' ? 'news' : 'event';
		// over ride label
		if( $type ) {
			$_post_type_label = $type;
		}
		
		$state_abrev = '';
		$state = _s_term_value( 'state', 'name', TRUE, $_post->ID );
		if( !empty( $state ) ) {
			$state_abrev = sprintf( ', %s', get_state_short_name( $state ) );
		}
		
		$_post_title = sprintf( '<h4>%s%s</h4>', $_post->post_title, $state_abrev );
		$_post_excerpt = _s_get_custom_excerpt( $_post->post_content, $_post->post_excerpt );
		$attachment_id = get_post_meta( $_post_id, 'hero_background_image', true ); 
 		$post_thumbnail = sprintf( '<a href="%s">%s</a>', get_permalink( $_post_id ), wp_get_attachment_image( $attachment_id, $size ) );
				
		$read_more = sprintf( '<p><a href="%s" class="more">More about this %s ></a></p>', get_permalink( $_post_id ), $_post_type_label );
		
		
				
		return sprintf( '<div class="post %s">%s<div class="details">%s%s%s</div></div>', $size, $post_thumbnail, $_post_title, $_post_excerpt, $read_more );
	}
	
	
	// Display a single post from the relationship field
	function kr_get_post( $_post, $key = false, $type = false ) {
		
		$size = $key ? 'post-small': 'post-featured';								
		$_post_id = $_post->ID;
		$_post_type = $_post->post_type;
		$_post_type_label = $_post->post_type == 'news' ? 'news' : 'event';
		// over ride label
		if( $type ) {
			$_post_type_label = $type;
		}
		$_post_title = sprintf( '<h4>%s</h4>', $_post->post_title );
		$_post_excerpt = _s_get_custom_excerpt( $_post->post_content, $_post->post_excerpt );
 		$post_thumbnail = sprintf( '<a href="%s">%s</a>', get_permalink( $_post_id ), get_the_post_thumbnail( $_post_id, $size ) );
				
		$read_more = sprintf( '<p><a href="%s" class="more">More about this %s ></a></p>', get_permalink( $_post_id ), $_post_type_label );
				
		return sprintf( '<div class="post %s">%s<div class="details">%s%s%s</div></div>', $size, $post_thumbnail, $_post_title, $_post_excerpt, $read_more );
	}
	
	
	// Provider Testimonial
	section_provider_testimonial();
	function section_provider_testimonial() {
		$prefix = '';
		$right_column = $left_column = '';
		// important use get_post_meta to get raw field value from oembed
		$provider_video = get_post_meta( get_the_ID(), 'provider_video', true );
		$provider_video_thumbnail = '';
		$custom_video_thumbnail = get_post_meta( get_the_ID(), sprintf( '%sprovider_video_custom_thumbnail', $prefix ), true );
		
		if( empty( $provider_video ) ) {
			return false;	
		}
		
		$provider_video_thumbnail = sprintf( '<img src="%s" />', get_vimeo_thumb( $provider_video ) );
		
		// custom video thmbnail?
		if( !empty( $custom_video_thumbnail ) ) {
			
			$attachment_id = $custom_video_thumbnail;
			$size = 'large';
		
			// Add check for mobile size
			$provider_video_thumbnail = wp_get_attachment_image( $attachment_id, $size );
			
		}
		
		$provider_video_thumbnail = sprintf( '<a href="%s" class="video-link foobox" rel="foobox"><i class="video-play"></i>%s</a>', $provider_video, $provider_video_thumbnail );
		$left_column = sprintf( '<div class="small-12 large-6 columns">%s</div>', $provider_video_thumbnail );
		
		$provider_testimonial_title = get_post_meta( get_the_ID(), 'provider_testimonial_title', true );
		$provider_testimonial_title = _s_get_heading( $provider_testimonial_title );
				
		$provider_testimonial = get_post_meta( get_the_ID(), 'provider_testimonial_text', true );
		$provider_testimonial = _s_get_textarea( $provider_testimonial );
 		
		$provider_name = get_post_meta( get_the_ID(), 'provider_name', true );
 		if( !empty( $provider_name ) ) {
			$provider_name = sprintf( '<h4>%s</h4>', $provider_name );
		}
		
		$provider_specialties = get_post_meta( get_the_ID(), 'provider_specialties', true );
 		if( !empty( $provider_specialties ) ) {
			$provider_specialties = sprintf( '<div class="provider-specialties">%s</div>', wpautop( $provider_specialties ) );
		}
		
		$right_column = sprintf( '<div class="small-12 large-6 columns">%s%s%s%s</div>', $provider_testimonial_title,
																				  $provider_testimonial,
																				  $provider_name,
																				  $provider_specialties );
		
		if( !$left_column ) {
			return;
		}
		
		$attr = array( 'class' => 'section-content section-provider-testimonial-featured padding-top-none' );
		_s_section_open( $attr );
			printf( '<div class="row">%s%s</div>', $left_column, $right_column );
		_s_section_close();	

	}

	?>
	</main>


</div>

<?php
get_footer();
