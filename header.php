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

<link rel="apple-touch-icon" sizes="180x180" href="<?php echo THEME_URL;?>/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" href="<?php echo THEME_URL;?>/favicons/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="<?php echo THEME_URL;?>/favicons/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="<?php echo THEME_URL;?>/favicons/manifest.json">
<link rel="mask-icon" href="<?php echo THEME_URL;?>/favicons/safari-pinned-tab.svg" color="#666666">
<meta name="theme-color" content="#ffffff">
<meta name="google-site-verification" content="k-2a6LvIwrfcUKVDKFmoz0NzmAuFsrx7YQIUW8o9LkI" />
<meta name="p:domain_verify" content="a4a3d4283889947bafa61d4471ce9b2a"/>
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
				<div class="site-branding small-4 large-2 xxlarge-3 columns">
					<?php		
					$logo = _s_site_logo();
					$site_url = site_url();
					printf('<div class="site-title"><a href="%s" title="%s">%s</a></div>', $site_url, get_bloginfo( 'name' ), $logo );
					?>
				</div><!-- .site-branding -->
				<div class="header-widget-area small-8 large-10 xxlarge-9 columns">
				<?php
				
				// Social icons, Client login, WPML langauge switcher
				$social_icons =  _s_get_social_icons();
				
				// Client login <a href="javascript:;" id="client-login-btn">Client Login</a>
				$client_login = sprintf( '<button class="button" type="button" data-toggle="buildertrend">%s</button><div class="dropdown-pane small" id="buildertrend" data-dropdown data-hover="true" data-hover-pane="true">
  <iframe src="http://www.buildertrend.net/loginFrame.aspx?builderID=407&amp;bgcolor=&amp;fcolor=&amp;uwidth=100&amp;pwidth=100" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe></div>', __( 'Client Login', '_s' ) );
 				
  
  				// Language Switcher: coming soon
				$language_switcher = '<a href="http://cn.myhousedesignbuild.com/" class="ch">中文</a>';
				
				$mobile_toggle = _s_get_off_canvas_menu_button();
				
				printf( '<div class="column row">%s<div class="header-buttons">%s%s</div>%s</div>', $social_icons, $client_login, $language_switcher, $mobile_toggle );
				
				$secondary_menu = wp_nav_menu( array(
					'theme_location' => 'secondary',
					'container' => 'nav',
					'container_class'  => 'secondary-menu',
					'menu_id'          => 'secondary-menu',
					'menu_class'       => 'menu',
					'link_before'	   => '<span>',
					'link_after'	   => '</span>',
					'echo' 			   => false
				) );
				
				$headercontent = $secondary_menu;
				
				if( is_silo_page() ) {
					
					$silo_title = get_post_meta( get_the_ID(), 'silo_title', true );
					$headercontent =  sprintf( '<div class="show-for-large"><h5 class="silo-title">%s</h5></div>', $silo_title );
				}
				
				echo $headercontent;
								
 				?>				
				</div><!-- .column -->
			</div><!-- .row -->
		</div>
		
		<nav id="site-navigation" class="nav-primary" role="navigation">
			<div class="wrap">
				<div class="row">
					<div class="small-12 xlarge-10 xlarge-push-2 xxlarge-9 xxlarge-push-3 columns">
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
