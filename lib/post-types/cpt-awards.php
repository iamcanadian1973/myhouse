<?php
// Query filters and template includes at bottom of page

/**
 * Create new CPT - Events
 */
class Awards_CPT extends CPT_Core {

    /**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

        $this->post_type = 'award';
		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Award', '_s' ), // Singular
				__( 'Awards', '_s' ), // Plural
				$this->post_type // Registered name/slug
			),
			array( 
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'query_var'          => true,
				'capability_type'    => 'post',
				'has_archive'        => false,
				'hierarchical'       => false,
				'show_ui' 			 => true,
				'show_in_menu' 		 => true,
				'show_in_nav_menus'  => false,
				'exclude_from_search' => true,
				//'rewrite' => array('slug'=> 'magazines' ),
				'supports' => array( 'title', 'thumbnail', 'editor', 'page-attributes', 'revisions' ),
				 )

        );
		
     }
 
}

new Awards_CPT();
