<?php
// Query filters and template includes at bottom of page

/**
 * Create new CPT - Events
 */
class Letters_CPT extends CPT_Core {

    /**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

        $this->post_type = 'reference_letter';
		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Reference Letter', '_s' ), // Singular
				__( 'Reference Letters', '_s' ), // Plural
				$this->post_type // Registered name/slug
			),
			array( 
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'query_var'          => true,
				'capability_type'    => 'page',
				'has_archive'        => false,
				'hierarchical'       => false,
				'show_ui' 			 => true,
				'show_in_menu' 		 => true,
				'show_in_nav_menus'  => false,
				'exclude_from_search' => true,
				//'rewrite' => array( 'slug'=> 'reference-letters' ),
				'supports' => array( 'title', 'thumbnail', 'editor', 'revisions', 'page-attributes' ),
				 )

        );
		
		//add_filter('pre_get_posts', array( $this, 'query_filter' ) );
		add_filter('pre_get_posts', array( $this, 'set_custom_post_types_admin_order' ) );
     }
	 
	 
	 function query_filter($query) {
						
 	    $post_type = $query->get('post_type');
		
		if ( $query->is_main_query() && is_admin() && $post_type == 'reference_letter' ) {
			
			// Order By
			$query->set( 'orderby', 'title' );
			$query->set( 'order', 'ASC' );
			
		}
			
		return $query;
	}
	
	 //order numeric posts 
 	function orderby_post_title_int( $orderby ) { 
		
		global $wpdb;
		
		return '(' .$wpdb->prefix . 'posts.post_title+0) DESC';
	
	}

	 //order back-end posts in numeric order
	 function set_custom_post_types_admin_order($wp_query) {
	   if (is_admin()) {
	   // Get the post type from the query  
		 $post_type = $wp_query->query['post_type']; 		 
 		 
		  if ( $post_type == 'reference_letter') { 
			add_filter('posts_orderby', array( $this, 'orderby_post_title_int' ) );
		  }
	   }  
	 }  
 
 
}

new Letters_CPT();