module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n'
            + ' * Booklist v<%= pkg.version %>\n'
            + ' * <%= grunt.template.today("yyyy-mm-dd") %>\n'
            + ' */',

        // Task configuration
        clean: {
            build: ['build', 'src/styles/css']
        },

        // ����less�ļ�
        less: {
            compileCore: {
                options: {
                    strictMath: false
                },
                files: {
                    'src/styles/css/<%= pkg.name %>.css': 'src/styles/less/<%= pkg.name %>.less'
                }
            },
            minify: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'src/styles/css/<%=pkg.name%>.min.css': 'src/styles/css/<%= pkg.name %>.css'
                }
            }
        },
        // �ϲ�ѹ��js�ļ�
        requirejs: {
            compile: {
                options: {
                    preserveLicenseComments: false,
                    mainConfigFile: 'src/scripts/main.js',
                    name: 'main',
                    out: 'build/scripts/<%=pkg.name%>.min.js'
                }
            }
        },

        uglify: {
            // ѹ��require.js�ļ�
            minifyRequirejs : {
                options: {
                    compress: true
                },
                src: 'src/vendors/require/require.js',
                dest: 'build/scripts/require.min.js'
            }
        },

        // ��������ȥ���ļ����banner
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        'build/scripts/<%=pkg.name%>.min.js',
                        'src/styles/css/<%=pkg.name%>.css',
                        'src/styles/css/<%=pkg.name%>.min.css'
                    ]
                }
            }
        },
        copy: {
            css: {
                expand: true,
                cwd: 'src/styles/css',
                src: ['**'],
                dest: 'build/styles/css'
            },
            fonts: {
                expand: true,
                cwd: 'src/styles/fonts',
                src: ['**'],
                dest: 'build/styles/fonts'
            },
            images: {
                expand: true,
                cwd: 'src/styles/images',
                src: ['**'],
                dest: 'build/styles/images'
            }
        },

        // ѹ����zip
        compress: {
            main: {
                options: {
                    archive: 'build/<%=pkg.name%>.zip',
                    mode: 'zip'
                },
                files: [
                    {expand: true, cwd: 'build/', src: ['**']}
                ]
            }
        },


        // �Զ����������ڲ����޸�
        // ��������������:grunt watch���������ļ��޸�
        watch: {
            less: {
                files: ['src/styles/less/**/*.less'],
                tasks: ['less']
            }
        }
    });

    // Load plugin tasks
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', [
        'clean',
        'less',
        'requirejs',
        'uglify',
        'usebanner',
        'copy',
        'compress'
    ]);
};