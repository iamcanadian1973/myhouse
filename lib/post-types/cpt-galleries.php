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
				'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
				 )

        );
		
		
		
		
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
            'thumbnail' => __( 'Thumbnail', '_s' )
         );
		
		//unset( $columns['date'] ); 
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
