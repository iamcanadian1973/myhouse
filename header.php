<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php
// offcanvas menu
_s_off_canvas_menu();
_s_site_overlay();
?>

<div id="page" class="site-container">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '_s' ); ?></a>
	

	<header id="masthead" class="site-header" role="banner">
		<div class="wrap">
			<div class="row">
				<div class="site-branding small-4 large-3 columns">
					<?php		
					$logo = sprintf('<img src="%s" alt="%s"/>', THEME_IMG .'/logo.png', get_bloginfo( 'name' ) );
					$site_url = site_url();
					printf('<div class="site-title"><a href="%s" title="%s">%s</a></div>', $site_url, get_bloginfo( 'name' ), $logo );
					?>
				</div><!-- .site-branding -->
				<div class="header-widget-area small-8 large-9 columns">
				<?php
				
				// Social icons, Client login, WPML langauge switcher
				$social_icons =  _s_get_social_icons();
				
				// Client login <a href="javascript:;" id="client-login-btn">Client Login</a>
				$client_login = sprintf( '<div class="client-login"><button class="button" type="button" data-toggle="buildertrend">%s</button><div class="dropdown-pane small" id="buildertrend" data-dropdown data-hover="true" data-hover-pane="true">
  <iframe src="http://www.buildertrend.net/loginFrame.aspx?builderID=407&amp;bgcolor=&amp;fcolor=&amp;uwidth=100&amp;pwidth=100" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe></div></div>', __( 'Client Login', '_s' ) );
 				
  
  				// Language Switcher: coming soon
				$language_switcher = '';
				
				$mobile_toggle = _s_get_off_canvas_menu_button();
				
				printf( '<div class="column row">%s%s%s%s</div>', $social_icons, $client_login, $language_switcher, $mobile_toggle );
				
				wp_nav_menu( array(
					'theme_location' => 'secondary',
					'container' => 'nav',
					'container_class'  => 'secondary-menu',
					'menu_id'        => 'secondary-menu',
					'menu_class'     => 'menu',
					'link_before'	 => '<span>',
					'link_after'	 => '</span>'
				) );
 				?>				
				</div><!-- .column -->
			</div><!-- .row -->
		</div>
		
		<nav id="site-navigation" class="nav-primary" role="navigation">
			<div class="wrap">
				<div class="row">
					<div class="small-12 large-9 large-push-3 columns">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'menu_id'        => 'primary-menu',
							'menu_class'     => 'menu dropdown',
							'link_before'	 => '<span>',
							'link_after'	 => '</span>'
						) );
						
					?>	
					</div>			
				</div><!-- .column.row -->
		
			</div><!-- .wrap -->
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
