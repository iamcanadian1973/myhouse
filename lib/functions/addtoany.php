<?php

add_action( 'wp_enqueue_scripts', 'load_addtoany_scripts' );
function load_addtoany_scripts() {
		wp_enqueue_script( 'addtoany', '//static.addtoany.com/menu/page.js', FALSE, NULL, TRUE );
		
		//wp_enqueue_script( 'addtoany-config', THEME_JS . '/addtoany-config.js', array('addtoany'), NULL, TRUE );
}

function addtoany_share( $label = 'Share' ) {
	return sprintf( '<span class="social-share">
					<a class="a2a_dd" href="https://www.addtoany.com/share">%s &nbsp;&nbsp;<i class="ion-icons ion-android-share-alt"></i></a></span>', $label );
	
}

// Social icons used in header/footer
function _s_get_addtoany_share_icons( $show_share_icon = true, $custom = '' ) {
	
	global $post;
	
	$socials = array(
			
			'twitter'     => 'twitter',
			'facebook'    => 'facebook',
			'pinterest'   => 'pinterest',
			'google_plus'  => 'google-plus',
			'linkedin'    => 'linkedin',
			'wechat'      => 'weixin',
			'email'       => 'envelope',
			
 	);
	
	
	$anchor_class = 'a2a_button_'; // a2a_button_
	
	$list = '';
	
	if( $show_share_icon ) {
		$list .= '<li><a class="a2a_dd" href="https://www.addtoany.com/share"><i class="fa fa-share-alt-square" aria-hidden="true"></i></a></li>';
	}
	
	foreach( $socials as $network => $icon ) {
		
		
		$list .= sprintf('<li class="%1$s"><a class="%2$s%1$s"><i class="fa fa-%3$s" aria-hidden="true"></i><span class="screen-reader-text">%3$s</span></a></li>', $network, $anchor_class, $icon );	
	}
	
	$list .= $custom;
		
	return sprintf( '<ul class="share-icons a2a_kit clearfix">%s</ul>', $list );
}



