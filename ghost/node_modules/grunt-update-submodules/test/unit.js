"use strict";

var path = require( "path" );

var exec = ( function() {

	var exec = require( "child_process" ).exec;

	return function( command, callback ) {

		exec( command, function( error, stdout ) {

			if ( error ) {
				throw error;
			}

			callback( stdout );
		} );

	};

} )();

var execGruntTask = ( function() {

	var grunt = require( "grunt" );

	grunt.task.init = function() {};

	grunt.initConfig( {
		"update_submodules": {
			default: {
				options: {
					// default command line parameters will be used: --init --recursive
				}
			},
			withCustomParameters: {
				options: {
					params: "--force" // specifies your own command-line parameters
				}
			},
			withNoParameter: {
				options: {
					params: false // blanks command-line parameters
				}
			}
		}
	} );

	// Load tasks
	grunt.loadTasks( path.resolve( __dirname, "../tasks" ) );

	//grunt.registerTask( "default", "update_submodules" );
	//grunt.registerTask( "withCustomParameters", "update_submodules:withCustomParameters" );
	//grunt.registerTask( "withNoParameter", "update_submodules:withNoParameter" );

	return function( task, callback ) {
		var stdout = "";
		var oldWrite = process.stdout.write;
		process.stdout.write = function( string ) {
			stdout += string;
		};
		grunt.tasks( [ task ], {
			verbose: true,
			color: false
		}, function() {
			process.stdout.write = oldWrite;
			callback( stdout );
		} );
	};
} )();

function createGitDir( dir, submodules, test ) {

	var wrench = require( "wrench" );

	dir = path.resolve( __dirname, dir );

	wrench.rmdirSyncRecursive( dir, true );
	wrench.mkdirSyncRecursive( dir );

	var oldDir = process.cwd();
	process.chdir( dir );

	exec( "git init", function() {

		var submodulesCommands = submodules.map( function( data ) {
			return "git submodule add " + data.url + " " + data.folder;
		} );

		( function next() {

			var submoduleCommand = submodulesCommands.shift();

			if ( submoduleCommand ) {

				exec( submoduleCommand, next );

			} else {

				submodules.forEach( function( data ) {
					wrench.rmdirSyncRecursive( path.join( dir, data.folder ), true );
				} );

				test( function() {
					// Get back to the previous dir
					process.chdir( oldDir );
					// Delete the newly created dir
					wrench.rmdirSyncRecursive( dir, true );
				} );

			}

		} )();

	} );

}

module.exports = {

	"test with a single submodule": function( _ ) {

		_.expect( 3 );

		var expectedCommand = "\ngit submodule update --init --recursive";

		createGitDir( "single", [ {

			folder: "grunt-update-submodules",
			url: "https://github.com/jaubourg/grunt-update-submodules.git"

		} ], function( done ) {

			execGruntTask( "update_submodules", function( stdout ) {

				_.ok( stdout.indexOf( expectedCommand + "\n" ) > 0, "Command with no merge" );

				execGruntTask( "update_submodules", function( stdout ) {

					_.ok( stdout.indexOf( expectedCommand + " --merge\n" ) > 0, "Command with merge" );

					_.strictEqual(
						require( path.resolve( __dirname, "single/grunt-update-submodules/package.json" ) ).name,
						"grunt-update-submodules",
						"Files pulled"
					);

					done();
					_.done();
				} );
			} );

		} );
	},

	"test with a couple submodules": function( _ ) {

		_.expect( 4 );

		var expectedCommand = "\ngit submodule update --init --recursive";

		createGitDir( "couple", [ {

			folder: "grunt-update-submodules",
			url: "https://github.com/jaubourg/grunt-update-submodules.git"

		}, {

			folder: "jquery-deferred-for-node",
			url: "https://github.com/jaubourg/jquery-deferred-for-node.git"

		} ], function( done ) {

			execGruntTask( "update_submodules", function( stdout ) {

				_.ok( stdout.indexOf( expectedCommand + "\n" ) > 0, "Command with no merge" );

				execGruntTask( "update_submodules", function( stdout ) {

					_.ok( stdout.indexOf( expectedCommand + " --merge\n" ) > 0, "Command with merge" );

					_.strictEqual(
						require( path.resolve( __dirname, "couple/grunt-update-submodules/package.json" ) ).name,
						"grunt-update-submodules",
						"Files pulled for grunt-update-submodules"
					);

					_.strictEqual(
						require( path.resolve( __dirname, "couple/jquery-deferred-for-node/package.json" ) ).name,
						"JQDeferredGenerator",
						"Files pulled for jquery-deferred-for-node"
					);

					done();
					_.done();
				} );
			} );

		} );
	},

	"test with custom parameters": function( _ ) {

		_.expect( 1 );

		var expectedCommand = "\ngit submodule update --force";

		createGitDir( "withCustomParameters", [ {

			folder: "grunt-update-submodules",
			url: "https://github.com/jaubourg/grunt-update-submodules.git"

		}, {

			folder: "jquery-deferred-for-node",
			url: "https://github.com/jaubourg/jquery-deferred-for-node.git"

		} ], function( done ) {

			execGruntTask( "update_submodules:withCustomParameters", function( stdout ) {

				_.ok( stdout.indexOf( expectedCommand + "\n" ) > 0, "Command with custom parameters" );

				done();
				_.done();
			} );

		} );
	},

	"test with no parameter": function( _ ) {

		_.expect( 1 );

		var expectedCommand = "\ngit submodule update";

		createGitDir( "withNoParameter", [ {

			folder: "grunt-update-submodules",
			url: "https://github.com/jaubourg/grunt-update-submodules.git"

		}, {

			folder: "jquery-deferred-for-node",
			url: "https://github.com/jaubourg/jquery-deferred-for-node.git"

		} ], function( done ) {

			execGruntTask( "update_submodules:withNoParameter", function( stdout ) {

				_.ok( stdout.indexOf( expectedCommand + "\n" ) > 0, "Command with no parameter" );

				done();
				_.done();
			} );

		} );
	}

};
