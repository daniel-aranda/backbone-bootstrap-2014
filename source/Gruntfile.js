/**
 *
 * Backbone Bootstrap 2014
 *
 * ::::::::::::::::::::::::::::
 *
 *
 *
 * @author: Daniel Aranda
 *
 * @since: 1.0
 *
 */


module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        release_path : '../public/',

        concat: {

            options: {

                separator: '\n',

                process : function(src, filepath){
                    var ext = filepath.split('.').pop();
                    var path = filepath.split('/');
                    var name = path.pop();
                    var folder = path.pop();
                    name = name.replace('.' + ext, '');
                    if ( ext.toLowerCase() == 'html'){
                        var templateName = folder + '_' + name;
                        return '<script type="text/x-FSRUI-tpl" class="tpl ' + templateName + '">\n' + src + '</script>\n';
                    }
                    return src;
                }

            },

            js: {
                src: [
                    'javascript/app/core.js',
                    'javascript/app/components/templates.js',
                    'javascript/app/**/*.js'
                ],
                dest: '<%= release_path %>js/modules/<%= pkg.name %>_<%= pkg.version %>.js'
            },

            plugins: {
                src: [
                    'javascript/plugins/**/*.js'
                ],
                dest: '<%= release_path %>js/plugins.js'
            },

            html : {
                src: [
                    'html/**/*.html'
                ],
                dest: '<%= release_path %>templates/<%= pkg.name %>_<%= pkg.version %>.html'
            },

            scss : {
                src: [
                    'scss/**/*.scss'
                ],
                dest : 'concat.scss'
            }

        },

        jshint : {

            files: [
                'javascript/app/**/*.js',
                '<%= jasmine.options.specs %>'
            ]

        },

        sass : {

            dist : {
                src : '<%= concat.scss.dest %>',
                dest : '<%= release_path %>css/<%= pkg.name %>_<%= pkg.version %>.css'
            }

        },

        preprocess : {

            options : {
                context : {
                    FILE_NAME : '<%= pkg.name %>_<%= pkg.version %>'
                }
            },

            dev : {
                src : 'index.template.html',
                dest : '<%= release_path %>index.html'
            }

        },

        watch: {

            js_html : {
                files: [
                    '<%= concat.js.src %>',
                    '<%= concat.plugins.src %>',
                    '<%= concat.html.src %>'
                ],

                options : {
                    spawn : false
                },

                tasks: ['jshint', 'concat']
            },

            plugins : {
                files: [
                    '<%= concat.plugins.src %>'
                ],

                options : {
                    spawn : false
                },

                tasks: ['concat']
            },

            scss : {
                files : ['scss/**/*.scss'],
                tasks: ['concat:scss', 'sass'],
                options : {
                    spawn : false
                }
            },

            preprocess : {
                files : ['index.template.html', 'package.json'],
                tasks: ['preprocess'],
                options : {
                    spawn : false
                }
            }

        },

        jasmine : {

            src : [
                '<%= concat.js.dest %>'
            ],

            options : {
                specs : 'tests/app/**/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions:{
                    requireConfig: {
                        baseUrl: '<%= release_path %>js/'
                    }
                },
                helpers : [
                    'tests/helpers/SpecHelper.js',
                    'tests/helpers/*.js'
                ],
                styles : [
                    '<%= release_path %>css/<%= pkg.name %>.css'
                ]
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-preprocess');

    grunt.registerTask('default', ['watch']);

};