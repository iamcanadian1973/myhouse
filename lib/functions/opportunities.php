<?php

// Locations - this creates the markup for the location coordinates. We use this data to center the map by location when filtering.

function marker_state_locations() {
						
	global $opportunities_results;
	
	$states = $opportunities_results['states'];
						
	if( !empty( $states ) ) {
		
		echo '<div class="locations">';
		
		foreach( $states as $slug => $state ) {				
			
			extract( $state );
			
			if( !empty( $lat ) && !empty( $lng ) ) {
				printf( '<div class="location" data-location="%s" data-lat="%s" data-lng="%s"></div>',
					$slug, 
					$lat,
					$lng
				 );
			}									
			
		}
		
		echo '</div>';
	}	
}