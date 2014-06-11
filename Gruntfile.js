module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt, {
        config: 'package.json',
        scope: 'devDependencies'
    });

    grunt.initConfig({
        typescript: {
            main: {
                src: ['src/main.ts'],
                dest: 'target/main.js',
                options: {
                    module: 'amd',
                    comments: true
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'hub-server.min.js': ['target/main.js']
                }
            }
        },
        watch: {
            typescript: {
                files: ['src/*.ts'],
                tasks: ['typescript', 'uglify']
            }
        }
    });

    grunt.registerTask('default', ['typescript', 'uglify']);
    grunt.registerTask('watchr',['watch']);

};

