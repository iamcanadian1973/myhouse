<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */
 
 
 // Footer Widgets
 
 function _s_footer_logo() {
	echo '<div class="widget">';
	printf('<img src="%sfooter-logo.png" alt="%s"/>', trailingslashit( THEME_IMG ), get_bloginfo( 'name' ) );	
	echo '</div>';	 
 }
 
 function _s_footer_contact_details() {
	echo '<div class="widget">';
	printf( '<h3>%s</h3>', __( 'Contact Us' ) );
	printf( '<div class="contact-details">%s</div>', get_field( 'footer_contact_us', 'option' ) );
	echo '</div>';
  }
  
  function _s_footer_follow_us() {
	echo '<div class="widget">';
	printf( '<h3>%s</h3>', __( 'Follow Us' ) );
	echo _s_get_social_icons();
	echo '</div>';
  }


function _s_footer_quick_links() {
	echo '<div class="widget">';
	printf( '<h3>%s</h3>', __( 'Quick Links' ) );
	
	if( has_nav_menu( 'footer' ) ) {
								
		$menu_locations = get_nav_menu_locations(); 

		$menu_id = $menu_locations['footer']; // Get the *primary* menu ID

		$footer_menu = wp_get_nav_menu_items( $menu_id );
		
		if( !empty(  $footer_menu ) ) {
			if( count( $footer_menu ) > 3 ) {
				$columns = '';
				$footer_menus = c2c_array_partition( $footer_menu, 2 );
				foreach( $footer_menus as $menu ) {
					$links = '';
					foreach( $menu as $item ) {
						$links .= sprintf( '<li><a href="%s">%s</a></li>', $item->url, $item->title );
					}
					
					$columns .= sprintf( '<div class="column"><ul class="menu">%s</ul></div>', $links );
				}
				
				printf( '<div class="row medium-up-2">%s</div>', $columns );
			}
			else {
			
				wp_nav_menu( array(
					'theme_location'   => 'footer',
					'container' 	   => 'nav',
					'container_class'  => 'footer-menu',
					'menu_id'          => 'footer-menu',
					'menu_class'       => 'menu',
					'link_before'	   => '<span>',
					'link_after'	   => '</span>'
				) );
				
			}
			
		}
	}
	echo '</div>';	
}
 
 
function _s_footer_join_us() {
	echo '<div class="widget">';
	printf( '<h3>%s</h3>', __( 'Join Us' ) );
 	printf( '%s', do_shortcode( '[gravityform id="2" title="false" description="true" ajax="true" tabindex="99"]' ));
	echo '</div>';
}

 
// Footer Logos 
 function _s_footer_logos() {
	// arguments, adjust as needed
		$args = array(
			'post_type'      => 'logos',
			'posts_per_page' => 100,
			'post_status'    => 'publish',
			'orderby' => 'menu_order',
			'order' => 'ASC'
		);
	
		// Use $loop, a custom variable we made up, so it doesn't overwrite anything
		$loop = new WP_Query( $args );
		
		update_post_thumbnail_cache( $loop );
		
		
	
		// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
		// don't want to use $wp_query, use our custom variable instead.
		if ( $loop->have_posts() ):
			
			$middle = ceil( $loop->post_count/2);
			
			$logos = '';
			
			while ( $loop->have_posts() ) : $loop->the_post(); 
	
				$thumbnail = get_the_post_thumbnail( get_the_ID(), array( 150, 55 ) );
 				$anchor_open = $anchor_close = '';
 				$url = get_post_meta( get_the_ID(), 'url', true );
				 				 
				if( !empty( $url ) ) {
					$anchor_open = sprintf( '<a href="%s" target="_blank">', $url );
					$anchor_close = '</a>';
					
					$thumbnail = sprintf( '%s%s%s', $anchor_open, $thumbnail, $anchor_close );
 				}
				
				/*
				if( $loop->current_post == $middle ) {
					$logos .= '<li class="divider">&nbsp;</li>';
				}
				*/
				
				$logos .= sprintf( '<li>%s</li>', $thumbnail );
				
			endwhile;
			wp_reset_postdata();
			
			printf( '<ul class="footer-logos">%s</ul>', $logos );
			
		endif;
 }
 
 
function _s_footer_copyright() {
	$copyright = __( 'My House Design Build Team Ltd. All material on this site is copyrighted by My House Design Build Team Ltd.', '_s' );
	$trademark = __( 'My House Design Build Team® is a registered trademark.', '_s' );
	$permissions = __( 'No images or copy on this site may be used without written permission of My House Design Build Team Ltd.', '_s' );
	$terms = sprintf( '<a href="%s">%s</a>', get_permalink(6001), __( 'Terms & Conditions', '_s' ) );
	$privacy = sprintf( '<a href="%s">%s</a>', get_permalink(943), __( 'Privacy Policy', '_s' ) );
	$swca = 	sprintf( '<a href="%s" target="_blank">%s</a>', 'http://www.swca.ca', __( 'Site by SWCA', '_s' ) );	
 	$out = '';
	$out .= sprintf( '<p>© 2014-%s %s  &bull; %s</p>', date('Y'), $copyright, $trademark );
	$out .= sprintf( '<p>%s &bull; %s &bull; %s &bull; %s</p>', $permissions, $terms, $privacy, $swca );
	printf( '<div class="copyright text-center">%s</div>', $out );
}
?>

	</div><!-- #content -->
	
	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="wrap dark">
			<div class="row">
 				<div class="small-12 medium-6 columns">
					<div class="row">
						<div class="small-12 large-6 columns">
						<?php
						_s_footer_logo();
						?>
						</div>
						<div class="small-12 large-6 columns">
						<?php
						 _s_footer_contact_details();
						?>
						</div>
					</div>
				</div>
				<div class="small-12 medium-6 columns">
 					<div class="row">
						<div class="small-12 large-6 columns">
						<?php
						_s_footer_follow_us();
						_s_footer_quick_links();
						?>
						</div>
						<div class="small-12 large-6 columns">
						<?php
						 _s_footer_join_us();
						?>
						</div>
					</div>
				</div>
 			</div>	
			
			<div class="column row">
				<?php
				_s_footer_logos();
				?>
			</div>
	
		</div><!-- .wrap -->
		
		<div class="wrap">
			<div class="column row">
			<?php
			_s_footer_copyright();
			
			if( has_nav_menu( 'copyright' ) ) {
				wp_nav_menu( array(
					'theme_location'   => 'copyright',
					'container' 	   => 'nav',
					'container_class'  => 'copyright-menu',
					'menu_id'          => 'copyright-menu',
					'menu_class'       => 'menu',
					'link_before'	   => '<h3>',
					'link_after'	   => '</h3>',
					'after'           => '<li class="menu-divider">|</li>'
				) );
			}
			?>
			</div>
		</div>
	
	</footer><!-- #colophon -->

<?php wp_footer(); ?>
</body>
</html>
