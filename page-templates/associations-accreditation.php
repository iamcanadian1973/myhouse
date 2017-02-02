<?php
/**
 * Template Name: Associations & Accreditation
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
	
	
	
	// Repeatable, allows for multiple groups
	section_groups();
	function section_groups() {
		
		global $post;
				
 		$prefix = '';
		
		$groups = '';
		
		$rows = get_field( 'groups' );
		
		foreach( $rows as $row ) {
			
			$title = $row['title'];
			
			$grid = $row['grid'];
			
			$out = '';
			
			foreach( $grid as $item ) {
		
				$photo = isset(  $item['photo'] ) ? $item['photo']: '';
				$url = $item['url'];
				
				if( $photo ) {
					$link_open = '';
					$link_close = '';
					
					if( !empty( $url ) ) {
						$link_open = sprintf( '<a href="%s" target="_blank">', $url );
						$link_close = '</a>';
					}
					
					$photo = sprintf( '%s%s%s', $link_open,  wp_get_attachment_image( $photo, 'large' ), $link_close );
				}
				
				$description = isset(  $item['description'] ) ? $item['description']: '';
				
				if( !empty( $photo ) && !empty( $description ) ) {
					$out .= sprintf( '<div class="column">%s%s</div>', $photo, $description );
				}
			}
			
			if( empty( $title ) && empty( $out ) ) {
				continue;
			}
			
			$groups .= sprintf( '<h2>%s</h2><div class="row small-up-1">%s</div>', $title, $out );
			
		}
	
		$attr = array( 'class' => 'section-content section-group' );
		_s_section_open( $attr );		
			printf( '<div class="column row">%s</div>', $groups );
		_s_section_close();
		
	}
	
	
	?>
	</main>


</div>

<?php
get_footer();
