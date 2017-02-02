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
 

 
 
 function kr_footer_copyright() {
	$privacy_policy = sprintf( '| <a href="%s">Privacy Policy</a>', get_permalink(943) );
	printf('<div class="copyright"><p>&copy; Forefront Dermatology %1$s.<span>All rights reserved. %2$s</span></p></div>', date( 'Y' ), $privacy_policy );
  }
?>

	</div><!-- #content -->
	
	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="wrap dark">
			<div class="row">
 				<div class="small-12 large-6 columns">
				<p><?php printf( '<a href="%s"><strong>%s</strong></a>', get_permalink(54), __( 'Contact', '_s' ) );?><br />
				604 <strong>My House</strong> | 604.694.6873<br />
				Head Office/Showroom:  15356 Fraser Hwy, Surrey BC <br />
				Showroom (By Appointment):   #201 – 50 Fell Avenue, North Vancouver BC</p>
				</div>
				<div class="small-12 large-6 columns">
					<div class="footer-logos">
						<!-- footer logos go here -->
					</div>
				</div>
 			</div>	
	
		</div><!-- .wrap -->
		
		<div class="wrap">
			<div class="column row">
			<?php
			function _s_copyright() {
				$copyright = __( 'My House Design Build Team Ltd. All material on this site is copyrighted by My House Design Build Team Ltd.', '_s' );
				$trademark = __( 'My House Design Build Team® is a registered trademark.', '_s' );
				$permissions = __( 'No images or copy on this site may be used without written permission of My House Design Build Team Ltd.', '_s' );
				$terms = sprintf( '<a href="%s">%s</a>', get_permalink(6001), __( 'Terms & Conditions', '_s' ) );
				$privacy = sprintf( '<a href="%s">%s</a>', get_permalink(6003), __( 'Privacy Policy', '_s' ) );
 				$out = '';
				$out .= sprintf( '<p>© 2014-%s %s  • %s  </p>', date('Y'), $copyright, $trademark );
				$out .= sprintf( '<p>%s • %s • %s</p>', $permissions, $terms, $privacy );
				printf( '<div class="copyright text-center">%s</div>', $out );
			}
			_s_copyright();
			?>
			</div>
		</div>
	
	</footer><!-- #colophon -->

<?php wp_footer(); ?>
</body>
</html>
