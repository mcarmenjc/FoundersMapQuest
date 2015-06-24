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
                        'js/libs/jquery-2.1.4.js',  
                        'js/libs/underscore.js', 
                        'js/libs/backbone.js',  
                        'specs/libs/jasmine-jquery.js'
                    ],
                    specs: [
                        'spec/models/*.js', 
                        'spec/views/*.js'
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
                    'js/models/*.js',  
                    'js/views/*.js', 
                    'js/app.js', 
                    'spec/models/*.js',  
                    'spec/views/*.js'
                ],
                tasks: ['jshint', 'jasmine']
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