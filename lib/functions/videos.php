<?php
function get_youtube_video_foobox_thumbnail( $post_id ) {
	$video_url = add_query_arg( array( 'rel' => 0, 'autoplay' => 1 ), get_post_meta( $post_id,  'video_url', true ) );
 	if( empty( $video_url ) ) {
		return false;	
	}
	
	$title = sprintf( ' data-caption-title="%s"', esc_html( get_the_title( $post_id ) ) );
 	$description  = get_post_meta( $post_id, 'video_description', true );
	if( !empty( $description ) ) {
		$description = sprintf( ' data-caption-desc="%s"', $description );
	}
	$out = sprintf( '<a href="%s" class="foobox youtube"%s%s><i class="icon video-icon"></i>', $video_url, $title, $description );
	$out .= get_the_post_thumbnail( $post_id, 'video-thumbnail' );
	$out .= '</a>';
	
 	return $out;
}
