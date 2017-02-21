<?php
/**
 * Template Name: Our Team
 */
 
get_header(); ?>

<div id="primary" class="content-area">

	<main id="main" class="site-main" role="main">
	<?php
	global $post;
				
	// Default
	section_default();
	function section_default() {
				
		global $post;
		
		if( empty( get_the_content() ) )
			return false;
		
		$attr = array( 'class' => 'section-content section-default' );
		_s_section_open( $attr );		
			print( '<div class="column row">' );
		
				while ( have_posts() ) :
		
					the_post();
					
					the_content();
						
				endwhile;
		
			echo '</div>';
		_s_section_close();	
	}
	
	// Team
	section_team();
	function section_team() {
		
		global $post;
		
 		$prefix = '';
		
		$rows = get_field( 'team_members' );
		
		foreach ($rows as $row) {
			$people = $row['grid'];
			foreach( $people as $person ) {
				$ids[] = $person['photo'];
			}
			
		}
		$cache = get_posts(array('post_type' => 'attachment', 'numberposts' => -1, 'post__in' => $ids));
 		
		if( empty( $rows ) ) {
			return;
		}
		
		$groups = '';
		
		foreach( $rows as $row ) {
			
			$title = $row['title'];
			$people = $row['grid'];
			
			$out = '';
			
			foreach( $people as $person ) {
				
				$photo = isset(  $person['photo'] ) ? $person['photo']: '';
 				if( $photo ) {
					$photo = wp_get_attachment_image( $photo, 'large' );
				}
				
				$name = isset(  $person['name'] ) ? sprintf( '<h3>%s</h3>', $person['name'] ) : '';
 				$position = isset(  $person['position'] ) ? sprintf( '<p>%s</p>', $person['position'] ) : '';
				
				if( !empty( $photo ) && !empty( $name ) ) {
					$out .= sprintf( '<div class="column">%s<header class="entry-header">%s%s</header></div>', $photo, $name, $position );
				}
 				
			}
			
			if( empty( $title ) && empty( $out ) ) {
				continue;
			}
			
			$groups .= sprintf( '<h2>%s</h2><div class="row small-up-2 medium-up-3 large-up-4 xlarge-up-5 grid">%s</div>', $title, $out );
			
		}
		
		
		$attr = array( 'class' => 'section-content section-team' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $groups );
		_s_section_close();	
		
	}
	
	
	?>
	</main>


</div>

<?php
get_footer();
