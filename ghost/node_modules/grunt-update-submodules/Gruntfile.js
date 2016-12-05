"use strict";

var path = require( "path" );

module.exports = function( grunt ) {

	var lintTargets = [ "*.js", "lib/**/*.js", "tasks/**/*.js", "test/**/*.js" ];

	var nodeunit = path.resolve( __dirname, "node_modules/.bin/nodeunit" + ( path.sep === "/" ? "" : ".cmd" ) );

	grunt.initConfig( {
		jscs: {
			files: lintTargets,
			options: {
				config: ".jscs.json"
			}
		},
		jshint: {
			files: lintTargets,
			options: {
				jshintrc: ".jshint.json"
			}
		},
		shell: {
			nodeunit: {
				command: nodeunit + " test"
			}
		}
	} );

	// load npm modules
	require( "load-grunt-tasks" )( grunt );

	// Tasks
	grunt.registerTask( "lint", [ "jscs", "jshint" ] );
	grunt.registerTask( "default", [ "lint", "shell:nodeunit" ] );

};
