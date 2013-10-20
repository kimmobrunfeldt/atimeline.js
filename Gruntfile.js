module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            all: {
                options: { livereload: true },
                files: ['src/*']
            },
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    host: '0.0.0.0',
                    livereload: true,
                    base: 'src/'
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            build: {
                src: 'src/js/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', [
        'uglify'
    ]);

    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);

};