/**
 *
 * Firebase Security Rules UI
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
                    'javascript/app/**/*.js'
                ],
                dest: '<%= release_path %>js/modules/<%= pkg.name %>.js'
            },

            html : {
                src: [
                    'html/**/*.html'
                ],
                dest: '<%= release_path %>templates/<%= pkg.name %>.html'
            }

        },

        jshint : {

            files: ['javascript/app/**/*.js']

        },

        sass : {
            module :{

                files : {
                    '<%= release_path %>css/<%= pkg.name %>.css' : 'source/css/**/*.scss'
                }
            }

        },

        watch: {

            js_html : {
                files: [
                    '<%= concat.js.src %>',
                    '<%= concat.html.src %>,'
                ],

                options : {
                    spawn : false
                },

                tasks: ['jshint', 'concat']
            },

            scss : {
                files : ['css/**/*.scss'],
                tasks: ['sass']
            }

        },

        jasmine : {

            src : [
                '<%= concat.js.dest %>'
            ],

            options : {
                specs : 'tests/spec/**/*.js',
                helpers : [
                    'tests/helpers/SpecHelper.js',
                    'tests/helpers/*.js'
                ],
                vendor : [
                    'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js',
                    'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore.js',
                    'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone.js'
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

    grunt.registerTask('default', ['watch']);

};