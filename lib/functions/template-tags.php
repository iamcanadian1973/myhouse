<?php
/**
 * Custom template tags for this theme.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package _s
 */

if ( ! function_exists( '_s_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function _s_posted_on() {
	echo  _s_get_posted_on();
}
endif;


if ( ! function_exists( '_s_get_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function _s_get_posted_on() {
	$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
	/*
	if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
		$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
	}
	*/

	$time_string = sprintf( $time_string,
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_attr( get_the_modified_date( 'c' ) ),
		esc_html( get_the_modified_date() )
	);

	$posted_on = sprintf(
		esc_html_x( '%s', 'post date', '_s' ),
		$time_string
	);

	if( get_post_meta( get_the_ID(), 'event_start_date', true ) ) {
		$date = sprintf( '<span>%s</span>', get_event_date() );
		$location = get_post_meta( get_the_ID(), 'event_location', true );
		if( $location ) {
			$location = sprintf( '<span>%s</span>', $location );
		}
		$time = get_post_meta( get_the_ID(), 'event_time', true );
		if( $time ) {
			$time = sprintf( '<span>%s</span>', $time );
		}
		$posted_on = $date . $location . $time;
	}

	return '<span class="posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.

}
endif;



if ( ! function_exists( '_s_entry_footer' ) ) :
/**
 * Prints HTML with meta information for the categories, tags and comments.
 */
function _s_entry_footer() {
	// Hide category and tag text for pages.
	if ( 'post' === get_post_type() ) {
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list( esc_html__( ', ', '_s' ) );
		if ( $categories_list && _s_categorized_blog() ) {
			printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', '_s' ) . '</span>', $categories_list ); // WPCS: XSS OK.
		}

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list( '', esc_html__( ', ', '_s' ) );
		if ( $tags_list ) {
						printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', '_s' ) . '</span>', $tags_list ); // WPCS: XSS OK.
		}
	}

	if ( ! is_single() && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
		echo '<span class="comments-link">';
		comments_popup_link( esc_html__( 'Leave a comment', '_s' ), esc_html__( '1 Comment', '_s' ), esc_html__( '% Comments', '_s' ) );
		echo '</span>';
	}

	edit_post_link(
		sprintf(
			/* translators: %s: Name of current post */
			esc_html__( 'Edit %s', '_s' ),
			the_title( '<span class="screen-reader-text">"', '"</span>', false )
		),
		'<span class="edit-link">',
		'</span>'
	);
}
endif;

/**
 * Returns true if a blog has more than 1 category.
 *
 * @return bool
 */
function _s_categorized_blog() {
	if ( false === ( $all_the_cool_cats = get_transient( '_s_categories' ) ) ) {
		// Create an array of all the categories that are attached to posts.
		$all_the_cool_cats = get_categories( array(
			'fields'     => 'ids',
			'hide_empty' => 1,

			// We only need to know if there is more than one category.
			'number'     => 2,
		) );

		// Count the number of categories that are attached to the posts.
		$all_the_cool_cats = count( $all_the_cool_cats );

		set_transient( '_s_categories', $all_the_cool_cats );
	}

	if ( $all_the_cool_cats > 1 ) {
		// This blog has more than 1 category so _s_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so _s_categorized_blog should return false.
		return false;
	}
}

/**
 * Flush out the transients used in _s_categorized_blog.
 */
function _s_category_transient_flusher() {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	// Like, beat it. Dig?
	delete_transient( '_s_categories' );
}
add_action( 'edit_category', '_s_category_transient_flusher' );
add_action( 'save_post',     '_s_category_transient_flusher' );

/**
 * Return SVG markup.
 *
 * @param  string   $icon_name   Use the icon name, such as "facebook-square"
 */
function _s_get_svg( $icon_name ) {

	$svg = '<svg class="icon icon-' . esc_html( $icon_name ) . '">';
	$svg .= '	<use xlink:href="#icon-' . esc_html( $icon_name ) . '"></use>';
	$svg .= '</svg>';

	return $svg;
}

/**
 * Echo SVG markup.
 *
 * @param  string   $icon_name   Use the icon name, such as "facebook-square"
 */
function _s_do_svg( $icon_name ) {
	echo _s_get_svg( $icon_name );
}



/**
 * Social icons
 */
function _s_get_social_icons() {
	
	$facebook = sprintf( '<li><a href="%s" target="_blank"><span><i class="fa fa-facebook" aria-hidden="true"></i></span></a></li>', 	
	'http://www.facebook.com/myhousedesignbuildteam' );
	
	$twitter = sprintf( '<li><a href="%s" target="_blank"><span><i class="fa fa-twitter" aria-hidden="true"></i></span></a></li>', 	
	'http://twitter.com/MyHouselive' );
	
	$instagram = sprintf( '<li><a href="%s" target="_blank"><span><i class="fa fa-instagram" aria-hidden="true"></i></span></a></li>', 	
	'http://instagram.com/myhousedesignbuild' );
	
	$youtube = sprintf( '<li><a href="%s" target="_blank"><span><i class="fa fa-youtube" aria-hidden="true"></i></span></a></li>', 	
	'http://www.youtube.com/user/MyHouseTeam' );
	
	$houzz = sprintf( '<li><a href="%s" target="_blank"><span><i class="fa fa-houzz" aria-hidden="true"></i></span></a></li>', 	
	'http://www.houzz.com/pro/myhousedesignbuildteam' );
    
    $pinterest = sprintf( '<li><a href="%s" target="_blank"><span><i class="fa fa-pinterest" aria-hidden="true"></i></span></a></li>', 	
	'https://www.pinterest.com/MyHouseDesignBuild/' );
	
	return sprintf( '<ul class="social-icons">%s%s%s%s%s%s</ul>', $facebook, $twitter, $instagram, $youtube, $houzz, $pinterest );
	
}


/**
 * Share icons
 */
function _s_get_share_icons() {
	
	$post_link = esc_url( get_permalink() );
	$post_title = esc_attr( get_the_title() );
	
	// Email
	$email_subject = 'Share This';
	$email_body = sprintf( '%s: %s', $post_link, $post_title );
	$email = sprintf( '<li><a href="mailto:?subject=%s&body=%s">Email</a></li>', $email_subject, $email_body );
 	
	// Twitter
	$twitter = sprintf( '<li><a href="http://twitter.com/share?text=%s&url=%s" target="_blank" title="Tweet" ><i class="fa fa-twitter" aria-hidden="true"></i><span class="screen-reader-text">Twitter</span></a></li>', $post_title, $post_link );
	
	// Facebook
	$facebook = sprintf( '<li><a href="http://www.facebook.com/sharer.php?u=%s&t=%s" target="_blank" title="Share on Facebook"><i class="fa fa-facebook" aria-hidden="true"></i><span class="screen-reader-text">Facebook</span></a></li>', $post_link, $post_title );
	
	// Google+
	$google_plus = sprintf( '<li><a href="https://plus.google.com/share?url=%s" target="_blank" title="Share on Google+"><i class="fa fa-google-plus" aria-hidden="true"></i><span class="screen-reader-text">Google+</span></a></li>', $post_link );
	
	return sprintf( '<ul class="share-icons">%s%s%s</ul>', $facebook, $twitter, $google_plus );
	
}

//* Get the post excerpt

function _s_the_excerpt( $more = '', $show_read_more = '' ) {
	echo _s_get_the_excerpt( $more, $show_read_more );
}

function _s_get_the_excerpt( $more = '', $show_read_more = '' ) {
	
	global $post;
		
	$post_content = $post->post_content;
    $post_excerpt = $post->post_excerpt;
	
	return _s_maybe_get_excerpt( $post_content, $post_excerpt, $more, $show_read_more );
}


function _s_get_custom_excerpt( $post_content, $post_excerpt ) {
	return _s_maybe_get_excerpt( $post_content, $post_excerpt, false, false );
}

function _s_maybe_get_excerpt( $post_content, $post_excerpt, $more = '<span class="meta-nav">&#8230;</span>', $read_more = 'read more' ) {
	
	$out = '';
                    
    if( strstr( $post_content,'<!--more-->') ) {
        $content_arr = get_extended ( $post_content );
		$excerpt = sprintf( '%s%s', $content_arr['main'], $more );
		
		if( $read_more ) {
			$out =  wpautop( sprintf( '%s <p class="read-more"><a href="%s" class="more">%s</a></p>', $excerpt, get_permalink(), $read_more ) );
		}	
		else {
			$out =  wpautop( $excerpt );
		}
    }
    elseif( !empty( $post_excerpt ) ) {
        $excerpt = sprintf( '%s%s', $post_excerpt, $more );
		if( $read_more ) {
			$out =  wpautop( sprintf( '%s <p class="read-more"><a href="%s" class="more">%s</a></p>', $excerpt, get_permalink(), $read_more ) );
		}	
		else {
			$out =  wpautop( $excerpt );
		}
    }
    else {
        $out = apply_filters( 'the_content', $post_content );
    }
		
	return $out;
}



/**
 * Echo an image, no matter what.
 *
 * @param string  $size  The image size you want to display.
 */
function _s_do_post_image( $size = 'thumbnail' ) {

	// If featured image is present, use that
	if ( has_post_thumbnail() ) {
		return the_post_thumbnail( $size );
	}

	// Check for any attached image
	$media = get_attached_media( 'image', get_the_ID() );
	$media = current( $media );

	// Set up default image path
	$media_url = get_stylesheet_directory_uri() . '/images/placeholder.png';

	// If an image is present, then use it
	if ( is_array( $media ) && 0 < count( $media ) ) {
		$media_url = ( 'thumbnail' === $size ) ? wp_get_attachment_thumb_url( $media->ID ) : wp_get_attachment_url( $media->ID );
	}

	echo '<img src="' . esc_url( $media_url ) . '" class="attachment-thumbnail wp-post-image" alt="' . esc_html( get_the_title() )  . '" />';
}

/**
 * Return an image URI, no matter what.
 *
 * @param  string  $size  The image size you want to return.
 * @return string         The image URI.
 */
function _s_get_post_image_uri( $size = 'thumbnail' ) {

	// If featured image is present, use that
	if ( has_post_thumbnail() ) {

		$featured_image_id = get_post_thumbnail_id( get_the_ID() );
		$media = wp_get_attachment_image_src( $featured_image_id, $size );

		if ( is_array( $media ) ) {
			return current( $media );
		}
	}

	// Check for any attached image
	$media = get_attached_media( 'image', get_the_ID() );
	$media = current( $media );

	// Set up default image path
	$media_url = get_stylesheet_directory_uri() . '/images/placeholder.png';

	// If an image is present, then use it
	if ( is_array( $media ) && 0 < count( $media ) ) {
		$media_url = ( 'thumbnail' === $size ) ? wp_get_attachment_thumb_url( $media->ID ) : wp_get_attachment_url( $media->ID );
	}

	return $media_url;
}
