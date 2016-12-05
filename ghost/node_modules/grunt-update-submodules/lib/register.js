"use strict";

module.exports = function( task ) {

	return function( grunt ) {
		grunt.registerMultiTask( task.name, function() {
			var done = this.async();

			var runner = {

				error: function( error ) {
					grunt.verbose.error( error );
					done( error );
					return this;
				},

				exec: function( command, callback ) {
					runner.log( command );
					command = command.split( " " );
					grunt.util.spawn( {
						cmd: command[ 0 ],
						args: command.slice( 1 )
					}, function( error , result ) {
						if ( error ) {
							runner.error( error );
						} else {
							callback( result );
						}
					} );
					return this;
				},

				log: function( message ) {
					grunt.verbose.writeln( message );
					return this;
				},

				ok: function() {
					runner.log( task.display + " done!" );
					done();
					return this;
				}

			};

			runner.log( task.display + "..." );

			var options = this.options();

			task.run( runner, options );

		} );
	};
};
