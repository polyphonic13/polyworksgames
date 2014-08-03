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
				files: [
				{
					expand: true,
					cwd: '<%= srcDir %>/img/',
					src: [ '**' ],
					dest: '<%= buildDir %>/img/'
				},
				{
					expand: true, 
					cwd: '<%= srcDir %>/css/',
					src: [ '**' ],
					dest: '<%= buildDir %>/css/'
				},
				{
					expand: true, 
					cwd: '<%= srcDir %>/font-awesome-4.1.0/',
					src: [ '**' ],
					dest: '<%= buildDir %>/font-awesome-4.1.0/'
				},
				{
					expand: true, 
					cwd: '<%= srcDir %>/js/',
					src: [ '**' ],
					dest: '<%= buildDir %>/js/'
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
			server: { 
				port: 9090,
				base: 'public',
				keepAlive: true
			}
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
					cwd: '<%= buildDir %>/img/',
					src: '**/*',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/img/'
				},
				{
					cwd: '<%= buildDir %>/css/',
					src: '**/*',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/css/'
				},
				{
					cwd: '<%= buildDir %>/font-awesome-4.1.0/',
					src: '**/*',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/font-awesome-4.1.0/'
				},
				{
					cwd: '<%= buildDir %>/js/',
					src: '**/*',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/js/'
				},
				{
					cwd: '<%= buildDir %>',
					src: '**/*.html',
					filter: 'isFile',
					dest: '<%= meta.server.path %>/'
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