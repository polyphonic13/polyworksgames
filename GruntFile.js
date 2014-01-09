module.exports = function(grunt) {

	grunt.log.writeln('Starting Grunt Processing:');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		srcDir: 'public/src',
		deployDir: 'public/deploy',

/////// CONCAT 
		concat: {
			// task docs: https://github.com/gruntjs/grunt-contrib-concat

			options: {

				// default banner inserted at top of the output file (overridden for some files below)
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("isoDateTime") %> */\n',

				// separator between each file
				// separator: '\n;\n',
				separator: '\n\n',

				// remove block comments at the head of input files
				stripBanners: true,

				process: true,

				// error on missing files
				nonull: true

			},
			site: {
				options: {
					banner: "(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- KEKE_GAME.JS v<%= pkg.version %> created: <%= grunt.template.today(\"isoDateTime\") %>')})();\n"
				},
				src: [
					// THIRD PARTY
					'<%= srcDir %>/js/third_party/phaser.min.js'
				],
				dest: '<%= deployDir %>/keke2/js/keke2_game.js'
			}
		},
/////// MINIFICATION
		uglify: {
			// task docs: https://github.com/gruntjs/grunt-contrib-uglify

			options: {

				// banner inserted at top of the output file
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				preserveComments: false,
				compress: true,
				// report: 'gzip'
				report: 'min'
			},

			site: {
				src: [ '<%= deployDir %>/keke2/js/keke2_game.js' ],
				dest: '<%= deployDir %>/keke2/js/keke2_game.min.js'
			}

		},
/////// COPYING
		copy: {
			// task docs: https://github.com/gruntjs/grunt-contrib-copy
			html: {
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/',
					src: [ '*.html' ],
					dest: '<%= deployDir %>/'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/images/',
					src: [ '**' ],
					dest: '<%= deployDir %>/images/'
				}]
			},

 			keke2_game_css: {
				files: [{
					expand: true, 
					cwd: '<%= srcDir %>/css/',
					src: [ '**' ],
					dest: '<%= deployDir %>/css/'
				}]
			}
		},
/////// LOCAL SERVER
		connect: {
			// docs: https://github.com/iammerrick/grunt-connect
			devel: {
				port: 9998,
				base: 'public',
				keepAlive: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-connect');
	
	grunt.registerTask('default', ['concat', 'uglify', 'copy']);
};