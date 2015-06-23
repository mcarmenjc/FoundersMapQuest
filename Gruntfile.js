module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: [
                    'js/models/*.js', 
                    'js/views/*.js', 
                    'js/app.js'
                ],
                dest: 'js/dist/founders-map-quest.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! founders-map-quest <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'js/dist/founders-map-quest.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: [
                'js/models/*.js', 
                'js/views/*.js', 
                'js/app.js'
            ],
            options: {
                jshintrc: true,
                ignore: [
                    'js/dist/*.js', 
                    'Gruntfile.js'
                ]
            }
        },
        jasmine: {
            test: {
                src: [
                    'js/models/*.js', 
                    'js/views/*.js'
                ],
                options: {
                    vendor: [
                        'js/lib/jquery-2.1.3.js',  
                        'js/lib/underscore.js', 
                        'js/lib/backbone.js', 
                        'specs/lib/sinon-1.14.1.js', 
                        'specs/lib/jasmine-jquery.js'
                    ],
                    specs: [
                        'specs/models/*.js', 
                        'specs/views/*.js'
                    ]
                }
            }
        },
        jsdoc: {
            dist: {
                src: [
                    'js/models/*.js', 
                    'js/views/*.js', 
                    'js/app.js'
                ],
                options: {
                    destination: 'js/doc'
                }
            }
        },
        watch: {
            javascript: {
                files: [
                    'js/collections/*.js', 
                    'js/models/*.js', 
                    'js/routers/*.js', 
                    'js/views/*.js', 
                    'js/app.js', 
                    'specs/models/*.js', 
                    'specs/collections/*.js', 
                    'specs/routers/*.js', 
                    'specs/views/*.js'
                ],
                tasks: ['jshint', 'jasmine', 'jsdoc']
            }
        }
    });

    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['jshint', 'jasmine', 'jsdoc', 'concat', 'uglify']);
};