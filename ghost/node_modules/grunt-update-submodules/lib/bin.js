"use strict";

try {

	require( "grunt" ).npmTasks( "grunt-update-submodules" ).cli();

} catch ( e ) {

	console.log( e.stack + "\n" );
	console.log( "An error occurred while loading grunt, please ensure that it has been" );
	console.log( "installed correctly before continuing. You can learn more about grunt" );
	console.log( "at the grunt project page, https://github.com/cowboy/grunt/" );

	process.exit( 31 );

}
