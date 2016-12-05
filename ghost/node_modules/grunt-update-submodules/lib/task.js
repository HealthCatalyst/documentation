"use strict";

module.exports = {

	name: "update_submodules",

	display: "Updating submodules",

	run: function( runner, options ) {

		runner.exec( "git submodule", function( result ) {
			var merge =  /(?:^|\n)-/.test( result.stdout ) ? "" : " --merge";
			var params = options.hasOwnProperty( "params" ) ? options.params || "" : "--init --recursive" + merge;
			var command = "git submodule update " + params;
			runner.exec( command.trim(), runner.ok );
		} );

	}

};
