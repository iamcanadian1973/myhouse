<?php

add_action( 'wp_enqueue_scripts', 'load_addtoany_scripts' );
function load_addtoany_scripts() {
		wp_enqueue_script( 'addtoany', '//static.addtoany.com/menu/page.js', FALSE, NULL, TRUE );
		
		wp_enqueue_script( 'addtoany-config', CHILD_THEME_JS . '/addtoany-config.js', array('addtoany'), NULL, TRUE );
}

function addtoany_share( $label = 'Share' ) {
	return sprintf( '<span class="social-share">
					<a class="a2a_dd" href="https://www.addtoany.com/share">%s &nbsp;&nbsp;<i class="ion-icons ion-android-share-alt"></i></a></span>', $label );
	
}

// Social icons used in header/footer
function addtoany_share_icons() {
	
	global $post;
	
	$socials = array(
			
			'twitter'     => 'twitter',
			'facebook'    => 'facebook',
			'pinterest'   => 'pinterest',
			'googleplus'  => 'google-plus',
			'linkedin'   => 'linkedin',
			'email'       => 'envelope',
			
			//'rss'         => 'feed'
	);
	
	
	$anchor_class = 'a2a_button_'; // a2a_button_
	
	$list = '';
	
	foreach( $socials as $network => $icon ) {
		
		
		$list .= sprintf('<li class="%1$s"><a class="%2$s%1$s"><i class="fa fa-%3$s-square" aria-hidden="true"></i><span class="screen-reader-text">%3$s</span></a></li>', $network, $anchor_class, $icon );	
	}
	
		
	return sprintf( '<ul class="share-icons a2a_kit clearfix"><li><a class="a2a_dd" href="https://www.addtoany.com/share"><i class="fa fa-share-alt-square" aria-hidden="true"></i></a></li>%s</ul>', $list );
}



