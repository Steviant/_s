/**
 * customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {
	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	} );

	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	wp.customize('header-padding', function( value ) {
		value.bind(function( to ) {
			$('.site-header').css('padding-top', to + 'px');
			$('.site-header').css('padding-bottom', to + 'px');
		});
	});

	wp.customize('logo-width', function( value ) {
		value.bind(function( to ) {
			$('.site-logo').css('width', to + 'px');
		});
	});
} )( jQuery );
