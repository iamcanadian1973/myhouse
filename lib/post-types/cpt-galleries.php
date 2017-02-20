<?php
// Query filters and template includes at bottom of page

/**
 * Create new CPT - Events
 */
class Gallery_CPT extends CPT_Core {

    /**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

        $this->post_type = 'gallery';
		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Gallery', '_s' ), // Singular
				__( 'Galleries', '_s' ), // Plural
				$this->post_type // Registered name/slug
			),
			array( 
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'query_var'          => true,
				'capability_type'    => 'page',
				'has_archive'        => true,
				'hierarchical'       => true,
				'show_ui' 			 => true,
				'show_in_menu' 		 => true,
				'show_in_nav_menus'  => false,
				'exclude_from_search' => false,
				'rewrite' => array('slug'=> 'photo-gallery' ),
				'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes', 'revisions' ),
				 )

        );
		
		//add_filter('pre_get_posts', array( $this, 'query_filter' ) );
		
		
     }
	 
	 
	  function query_filter($query) {
						
 		
		if ( $query->is_main_query() && !is_admin() && is_tax( 'gallery_cat' ) ) {
			
			// get_option( 'posts_per_page' )
			$query->set('posts_per_page', 24 );
			
			// Order By
			$query->set( 'orderby', 'menu_order' );
			$query->set( 'order', 'ASC' );
			
		}
			
		return $query;
	}
 
}

new Gallery_CPT();


$gallery_categories = array(
    __( 'Gallery Category', '_s' ), // Singular
    __( 'Gallery Categories', '_s' ), // Plural
    'gallery_cat' // Registered name
);

register_via_taxonomy_core( $gallery_categories, 
	array(
		'rewrite' => array('slug'=> 'galleries' )
	), 
	array( 'gallery' ) 
);
