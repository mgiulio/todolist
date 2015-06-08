module.exports = function (grunt) {
    grunt.initConfig({
		cssnext: {
			main: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {
					'style.css': '_style.css'
				}
			}
		}
    });
	
	grunt.loadNpmTasks('grunt-cssnext')
	
	grunt.registerTask('default', ['cssnext']);
};
