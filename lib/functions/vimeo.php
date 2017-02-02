<?php

/*
Examples:
  echo '<img src="' . get_vimeo_thumb(43096888) . '">';
  echo '<img src="' . get_vimeo_thumb(43096888, 'thumbnail_medium') . '">';
  echo '<img src="' . get_vimeo_thumb(43096888, 'thumbnail_large') . '">';
*/
function get_vimeo_thumb( $url, $size = 'thumbnail_large' ) {
  
  $id = _get_video_id( $url );
  
  if( get_transient( 'vimeo_' . $size . '_' . $id ) ) {
    $thumb_image = get_transient('vimeo_' . $size . '_' . $id);
  }
  else {
    $thumb_image = _get_video_thumbnail( $url );
     set_transient('vimeo_' . $size . '_' . $id, $thumb_image, 2629743);
  }
  return $thumb_image;
}

/**
 * Get Youtube/Vimeo Video ID
 * 
 * 
 * @param string $url
 * @return string
 */
function _get_video_id( $url ) {
	// Props to @rzen for lending his massive brain smarts to help with the regex
	$do_video_thumbnail = (
		( preg_match( '/\/\/(www\.)?(youtu|youtube)\.(com|be)\/(watch|embed)?\/?(\?v=)?([a-zA-Z0-9\-\_]+)/', $url, $youtube_matches )
			|| preg_match( '#https?://(.+\.)?vimeo\.com/.*#i', $url, $vimeo_matches ) )
	);
	
	$video_id = false;
	
	$youtube_id = ! empty( $youtube_matches ) ? $youtube_matches[6] : '';
	$vimeo_id = ! empty( $vimeo_matches ) ? preg_replace( "/[^0-9]/", "", $vimeo_matches[0] ) : '';
	if ( $youtube_id ) {
		$video_id = $youtube_id;
	} elseif ( $vimeo_id ) {
		$video_id = $vimeo_id;
	}	
	
	return $video_id;
}


/**
 * Get Youtube/Vimeo Video thumbnail url
 * 
 * 
 * @param string $url
 * @return string
 */
function _get_video_thumbnail( $url ) {
	// Props to @rzen for lending his massive brain smarts to help with the regex
	$do_video_thumbnail = (
		( preg_match( '/\/\/(www\.)?(youtu|youtube)\.(com|be)\/(watch|embed)?\/?(\?v=)?([a-zA-Z0-9\-\_]+)/', $url, $youtube_matches )
			|| preg_match( '#https?://(.+\.)?vimeo\.com/.*#i', $url, $vimeo_matches ) )
	);
	
	$video_thumbnail_url = false;
	
	$youtube_id = ! empty( $youtube_matches ) ? $youtube_matches[6] : '';
	$vimeo_id = ! empty( $vimeo_matches ) ? preg_replace( "/[^0-9]/", "", $vimeo_matches[0] ) : '';
	if ( $youtube_id ) {
		// Check to see if our max-res image exists
		$file_headers = get_headers( 'http://img.youtube.com/vi/' . $youtube_id . '/maxresdefault.jpg' );
		$video_thumbnail_url = $file_headers[0] !== 'HTTP/1.0 404 Not Found' ? 'http://img.youtube.com/vi/' . $youtube_id . '/maxresdefault.jpg' : 'http://img.youtube.com/vi/' . $youtube_id . '/hqdefault.jpg';
	} elseif ( $vimeo_id ) {
		$vimeo_data = wp_remote_get( 'http://www.vimeo.com/api/v2/video/' . intval( $vimeo_id ) . '.php' );
		if ( isset( $vimeo_data['response']['code'] ) && '200' == $vimeo_data['response']['code'] ){
			$response = unserialize( $vimeo_data['body'] );
			$video_thumbnail_url = isset( $response[0]['thumbnail_large'] ) ? $response[0]['thumbnail_large'] : false;
		}
	}	
	
	return $video_thumbnail_url;
}