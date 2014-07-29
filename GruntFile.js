module.exports = function(grunt) {

	grunt.log.writeln('Starting Grunt Processing:');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		meta: grunt.file.readJSON('grunt/data/meta.json'),

		srcDir: 'public/src',
		buildDir: 'public/build',

		// CLEAN
		// docs: https://github.com/gruntjs/grunt-contrib-clean
		clean:  {
			removeDeployDir: ['<%= buildDir %>']
		},
		// CONCAT 
		// task docs: https://github.com/gruntjs/grunt-contrib-concat
		concat: {
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
			main: {
				options: {
					banner: "(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- KEKE_GAME.JS v<%= pkg.version %> created: <%= grunt.template.today(\"isoDateTime\") %>')})();\n"
				},
				src: [],
				dest: ''
			}
		},
		// MINIFICATION
		// task docs: https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			options: {

				// banner inserted at top of the output file
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				preserveComments: false,
				compress: true,
				// report: 'gzip'
				report: 'min'
			},
			main: {
				src: [ '' ],
				dest: ''
			}
		},
		// COPYING
		// task docs: https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: '<%= srcDir %>/images/',
					src: [ '**' ],
					dest: '<%= buildDir %>/images/'
				},
				{
					expand: true, 
					cwd: '<%= srcDir %>/css/',
					src: [ '**' ],
					dest: '<%= buildDir %>/css/'
				},
				{
					expand: true,
					cwd: '<%= srcDir %>/',
					src: [ '*.html' ],
					dest: '<%= buildDir %>/'
				}]
			}
		},
		// LOCAL SERVER
		// docs: https://github.com/iammerrick/grunt-connect
		connect: {
			port: 9090,
			keepAlive: true
		},

		// SCP
		scp: {
			options: {
				host: '<%= meta.server.host %>',
				username: '<%= meta.server.user %>',
				password: '<%= meta.server.pass%>'
			},
			main: {
				files: [
				{
					cwd: '<%= buildDir %>/images/',
					src: '**/*',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/<%= tgt %>/images/'
				},
				{
					cwd: '<%= buildDir %>/css/',
					src: '**/*',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/<%= tgt %>/css/'
				},
				{
					cwd: '<%= buildDir %>/js/',
					src: '**/*',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/<%= tgt %>/js/'
				},
				{
					cwd: '<%= buildDir %>',
					src: '**/*.html',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/<%= tgt %>'
				}
				]
			}
			
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-scp');
	grunt.loadNpmTasks('grunt-connect');
	
	grunt.registerTask(
		'default', 
		[
			'clean',
			// 'concat', 
			// 'uglify', 
			'copy'
		]
	);
	
	grunt.registerTask(
		'deploy',
		[
			'default',
			'scp'
		]
	);
};