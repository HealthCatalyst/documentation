"use strict";

var fs = require( "fs" );
var path = require( "path" );
var wrench = require( "wrench" );

function command( module ) {
	return path.resolve( __dirname, "node_modules/.bin/" + module + ( path.sep === "/" ? "" : ".cmd" ) );
}

module.exports = function( grunt ) {

	var lib = path.resolve( __dirname, "lib" );
	var libSave = lib + "-save";

	var lcov = "data.lcov";

	var coveralls = path.resolve( __dirname, "node_modules/.bin/coveralls" + ( path.sep === "/" ? "" : ".cmd" ) );
	var nodeunit = path.resolve( __dirname, "node_modules/.bin/nodeunit" + ( path.sep === "/" ? "" : ".cmd" ) );

	grunt.initConfig( {
		jscoverage: {
			lib: {
				src: lib,
				dest: libSave
			}
		},
		shell: {
			coveralls: {
				command: command( "coveralls" ) + " < " + lcov
			},
			nodeunit: {
				command: command( "nodeunit" ) + " --reporter=lcov test > " + lcov
			}
		}
	} );

	// load npm modules
	require( "load-grunt-tasks" )( grunt );

	grunt.registerTask( "switch-lib", function() {
		fs.renameSync( lib, "tmp" );
		fs.renameSync( libSave, lib );
		fs.renameSync( "tmp", libSave );
	} );

	grunt.registerTask( "lib-back", function() {
		wrench.rmdirSyncRecursive( lib );
		fs.renameSync( libSave, lib );
	} );

	grunt.registerTask( "cleanup", function() {
		fs.unlinkSync( lcov );
	} );

	// Tasks
	grunt.registerTask( "default", [
		"jscoverage",
		"switch-lib",
		"shell:nodeunit",
		"lib-back",
		"shell:coveralls",
		"cleanup"
	] );

};
