<?php
// Query filters and template includes at bottom of page

/**
 * Create new CPT - Events
 */
class Events_CPT extends CPT_Core {

    /**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

        $this->post_type = 'event';
		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Event', '_s' ), // Singular
				__( 'Events', '_s' ), // Plural
				$this->post_type // Registered name/slug
			),
			array( 
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'query_var'          => true,
				'capability_type'    => 'post',
				'has_archive'        => true,
				'hierarchical'       => false,
				'show_ui' 			 => true,
				'show_in_menu' 		 => true,
				'show_in_nav_menus'  => false,
				'exclude_from_search' => false,
				'rewrite' => array('slug'=> 'events' ),
				'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
				'menu_icon' => 'dashicons-calendar' )

        );
		
		//add_action( 'template_redirect', array( $this, 'redirect_single_post' ) );
		
		add_filter('pre_get_posts', array( $this, 'query_filter' ) );
		
		add_action( 'pre_get_posts', array( $this, 'exclude_sticky_posts' ) );		
    }
	
	
	
	 /**
     * Registers admin columns to display. Hooked in via _s.
     * @since  0.1.0
     * @param  array  $columns Array of registered column names/labels
     * @return array           Modified array
     */
    public function columns( $columns ) {
        
		$current_screen = get_current_screen();
	   
	   if( $this->post_type != $current_screen->post_type )
			return;
		
		$new_column = array(
            'event_start_date' => __( 'Start Date', '_s' ),
			'event_end_date' => __( 'End Date', '_s' ),
        );
		
		//unset( $columns['date'] ); 
        //return array_merge( $new_column, $columns );
        return array_slice( $columns, 0, 3, true ) + $new_column + array_slice( $columns, 1, null, true );
    }

    /**
     * Handles admin column display. Hooked in via _s.
     * @since  0.1.0
     * @param  array  $column Array of registered column names
     */
    public function columns_display( $column, $post_id ) {
        
		$current_screen = get_current_screen();
	   
	   if( $this->post_type != $current_screen->post_type )
			return;
		
		switch ( $column ) {
            case 'event_start_date':
			echo get_field( 'event_start_date');
			break; 
			case 'event_end_date':
			echo get_field( 'event_end_date' );
			break;
        }
    }
	
	
	function query_filter($query) {
						
 		
		if ( $query->is_main_query() && !is_admin() && is_post_type_archive( 'event' ) ) {
														
			//$date_now = date('Y-m-d H:i:s');
			$date_now = date_i18n('Ymd'); // get date based on WP timezone setting
			
			$query->set('posts_per_page', get_option( 'posts_per_page' ) );
			
			// Order By
			$query->set( 'orderby', 'meta_value' );
			$query->set( 'order', 'ASC' );
			$query->set( 'meta_key', 'event_start_date' );
			$query->set( 'meta_type', 'DATE' );
 			
			// Only show future concerts
			$meta_query = array(
	
				array(
					'key'			=> 'event_end_date',
					'compare'		=> '>=',
					'value'			=> $date_now,
					'type'			=> 'DATE'
				)
    
			);
			
			$query->set( 'meta_query', $meta_query );
			
			$query->set( 'post__not_in', get_option( 'sticky_posts' ) );
		}
			
		return $query;
	}
	
	
	/**
	 * Exclude sticky posts from main query
	 */
	public function exclude_sticky_posts( $query ) {
	
		if ( $query->is_main_query() && !is_admin() && is_post_type_archive( 'event' ) ) {
			//$query->set( 'ignore_sticky_posts', 1 );
			$query->set( 'post__not_in', get_option( 'sticky_posts' ) );
		}
	}
	

	// redirect single event to the accordion title
	public function redirect_single_post()
	{
		if ( ! is_singular( 'event' ) )
			return;
		
		$event_id = get_the_ID();
		
		wp_redirect( sprintf( '%s#event-%s', get_post_type_archive_link( 'event' ), $event_id ), 301 );
		exit;
	}

 
}

new Events_CPT();

$event_categories = array(
    __( 'Event Category', '_s' ), // Singular
    __( 'Event Categories', '_s' ), // Plural
    'event_cat' // Registered name
);

register_via_taxonomy_core( $event_categories, 
	array(
		//'rewrite' => array('slug'=> 'event-category' )
	), 
	array( 'event' ) 
);

$event_categories = array(
    __( 'Event Category', '_s' ), // Singular
    __( 'Event Categories', '_s' ), // Plural
    'event_cat' // Registered name
);

register_via_taxonomy_core( $event_categories, 
	array(
		//'rewrite' => array('slug'=> 'event-category' )
	), 
	array( 'event' ) 
);

$event_states = array(
    __( 'State', '_s' ), // Singular
    __( 'States', '_s' ), // Plural
    'state' // Registered name
);

register_via_taxonomy_core( $event_states, 
	array(
		//'rewrite' => array('slug'=> 'event-category' )
	), 
	array( 'event', 'opportunities' ) 
);

/*
$event_cities = array(
    __( 'City', '_s' ), // Singular
    __( 'Cities', '_s' ), // Plural
    'city' // Registered name
);

register_via_taxonomy_core( $event_cities, 
	array(
		//'rewrite' => array('slug'=> 'event-category' )
	), 
	array( 'event', 'opportunities' ) 
);
*/


add_action( 'default_hidden_meta_boxes', 'kr_event_remove_meta_boxes', 10, 2 );
/**
 * Removes the category, author, post excerpt, and slug meta boxes.
 *
 * @since    1.0.0
 *
 * @param    array    $hidden    The array of meta boxes that should be hidden for Acme Post Types
 * @param    object   $screen    The current screen object that's being displayed on the screen
 * @return   array    $hidden    The updated array that removes other meta boxes
 */
function kr_event_remove_meta_boxes( $hidden, $screen ) {

	if ( 'event' == $screen->id ) {

		$hidden = array(
			'citydiv',
			'statediv',
			'revisionsdiv',
			'slugdiv'
    		);
		
	}

	return $hidden;
	
}

//add_filter('post_class','kr_add_accordion_event_class');
function kr_add_accordion_event_class( $classes ) {
	// sticky for Sticky Posts
	global $post;
	if ( get_post_type() == 'event' ) {
			$classes[] = 'accordion-item';
	}
	
	return $classes;
}
