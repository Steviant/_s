<?php
/**
 * Functions used to implement options
 *
 * @package _s
 */

/**
 * Enqueue Google Fonts Example
 */
function demo_fonts() {
	// Font options
	$fonts = array(
		get_theme_mod( 'primary-font', customizer_library_get_default( 'primary-font' ) ),
		get_theme_mod( 'secondary-font', customizer_library_get_default( 'secondary-font' ) )
	);
	$font_uri = customizer_library_get_google_font_uri( $fonts );
	// Load Google Fonts
	wp_enqueue_style( 'demo_fonts', $font_uri, array(), null, 'screen' );
}
add_action( 'wp_enqueue_scripts', 'demo_fonts' );


function remove_width_attribute( $html ) {
   $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
   return $html;
}

add_filter( 'jetpack_the_site_logo', 'remove_width_attribute', 10 );
