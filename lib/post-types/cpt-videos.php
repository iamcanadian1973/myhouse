<?php
// Query filters and template includes at bottom of page

/**
 * Create new CPT - Events
 */
class Videos_CPT extends CPT_Core {

    /**
     * Register Custom Post Types. See documentation in CPT_Core, and in wp-includes/post.php
     */
    public function __construct() {

        $this->post_type = 'videos';
		
		// Register this cpt
        // First parameter should be an array with Singular, Plural, and Registered name
        parent::__construct(
        
        	array(
				__( 'Video', '_s' ), // Singular
				__( 'Videos', '_s' ), // Plural
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
				'rewrite' => array('slug'=> 'feature-videos' ),
				'supports' => array( 'title', 'thumbnail', 'revisions', 'page-attributes' ),
				 )

        );
		
		add_filter('pre_get_posts', array( $this, 'query_filter' ) );
		
     }
	 
	 
	 function query_filter($query) {
						
 		
		if ( $query->is_main_query() && !is_admin() && is_post_type_archive( 'videos' ) ) {
			
			// get_option( 'posts_per_page' )
			$query->set('posts_per_page', 24 );
			
			// Order By
			$query->set( 'orderby', 'menu_order' );
			$query->set( 'order', 'ASC' );
			
		}
			
		return $query;
	}
 
}

new Videos_CPT();


$video_categories = array(
    __( 'Video Category', '_s' ), // Singular
    __( 'Video Categories', '_s' ), // Plural
    'video_cat' // Registered name
);

register_via_taxonomy_core( $video_categories, 
	array(
		'rewrite' => array('slug'=> 'video-categories', 'with_front' => false )
	), 
	array( 'videos' ) 
);


function videos_custom_filters() {

	
	$taxonomies = array( 
	    'video_cat',
	);

	$args = array(
	    'orderby'           => 'id', 
	    'order'             => 'ASC',
	    'hide_empty'        => true
	); 

	$categories = get_terms( $taxonomies, $args );
	
	?>
	
	<!-- Categories Filter -->
	<div id="category-names-filter" class="clearfix">
		<a class="filter" data-filter="all" rel="All"><?php _e('All', '_s'); ?></a>
		<?php foreach ( $categories as $category ) : 
		
			////if( current_query_terms_exist( $taxonomies[0], $category->slug ) ) {
				printf( '<a class="filter" data-filter=".video_cat-%s" rel="%s">%s</a>', $category->slug, $category->name, $category->name );
			//}
		
		?>
			
		<?php endforeach; ?>
	</div>
	<?php
	
}


function current_query_terms_exist( $tax, $slug) {

	// arguments, adjust as needed
	$args = array(
		'post_type'      => 'recipes',
		'posts_per_page' => -1,
		'post_status'    => 'publish',
		'tax_query' => array(                     //(array) - use taxonomy parameters (available with Version 3.1).
	      array(
	        'taxonomy' => $tax,            
	        'field' => 'slug',                    //(string) - Select taxonomy term by ('id' or 'slug')
	        'terms' => (array) $slug,    //(int/string/array) - Taxonomy term(s).
	      )
	    ),
	);
	
 
	// Use $loop, a custom variable we made up, so it doesn't overwrite anything
	$loop = new WP_Query( $args );

	return $loop->post_count;
	
}


function fix_term_post_class($attributes) {
  	
	global $post;
  
  	$terms = get_the_terms( get_the_ID(), 'recipe_cat' );
	
	print_r($terms);
						
	if ( $terms && ! is_wp_error( $terms ) ) {
		$tax_terms = wp_list_pluck( $terms,'slug' );
		$classes = implode( ' ', $tax_terms );
 		$attributes['class'] .= ' ' . $classes;
	}
  
  	return $attributes;
  
}