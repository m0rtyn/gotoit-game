
module.exports = function(grunt) {
  'use strict';

  var autoprefixer = require('autoprefixer')({
    browsers: [
      'Chrome >= 45'
    ]
  });
  var customProperties = require('postcss-custom-properties');
  var colorFunctions = require('postcss-color-mod-function');
  var flexbugsFixes= require('postcss-flexbugs-fixes');
  var postcssReporter = require('postcss-reporter');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    // pkg: grunt.file.readJSON('package.json'),
    // banner: '/*!\n' +
    //         ' * <%= pkg.banner_name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    //         ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    //         ' * Licensed under the Themeforest Standard Licenses\n' +
    //         ' */\n',


    // Task configuration
    // -------------------------------------------------------------------------------


    // Complile SCSS
    //
    sass: {

      expanded: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
        files: {
          'src/assets/styles/main.css': 'src/assets/styles/scss/main.scss'
        }
      },

      compressed: {
        options: {
          sourceMap: true,
          outputStyle: 'compressed'
        },
        files: {
          'src/assets/styles/main.min.css': 'src/assets/styles/scss/main.scss'
        }
      }

    },



    // Watch on SCSS and JS files
    //
    watch: {
      sass: {
        files: ['src/assets/styles/**/*.scss'],
        tasks: ['sass:compressed']
      },
      css: {
        files: ['src/assets/styles/*.css', '!src/assets/styles/*.min.css'],
        tasks: ['css']
      },
      // js: {
      //   files: ['src/assets/js/*.js', '!src/assets/js/*.min.js'],
      //   tasks: ['js']
      // },
      // script_dir: {
      //   files: ['src/assets/js/script/*.js', 'src/assets/js/script/**/*.js'],
      //   tasks: ['neuter:js']
      // },
    },



    // Browser Sync
    //
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'src/assets/styles/*.min.css',
            // 'src/assets/js/*.min.js',
            // 'src/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: "src"
        }
      }
    },





    // Clean files and directories
    //
    // clean: {
    //   dist: ['dist'],

    //   dist_copied: [
    //     'dist/assets/styles/*',
    //     'dist/assets/styles/scss/',
    //     'dist/assets/styles/sass/',
    //     'dist/assets/scss/',
    //     'dist/assets/sass/',
    //     'dist/assets/js/*',
    //     '!dist/assets/styles/*.min.css',
    //     '!dist/assets/js/*.min.js',
    //   ]
    // },





    // Copy files
    //
    // copy: {

    //   dist: {
    //     files: [
    //       {expand: true, cwd: 'src/', src: ['**'], dest: 'dist'}
    //     ],
    //   },

    // },






    // Import file for script.js
    //
    // neuter: {
    //   options: {
    //     template: "{%= src %}"
    //   },
    //   js: {
    //     src: 'src/assets/js/script/app.js',
    //     dest: 'src/assets/js/script.js'
    //   },
    // },





    // Uglify JS files
    //
    // uglify: {
    //   options: {
    //     mangle: true,
    //     preserveComments: /^!|@preserve|@license|@cc_on/i,
    //     banner: '<%= banner %>'
    //   },
    //   script: {
    //     src:  'src/assets/js/script.js',
    //     dest: 'src/assets/js/script.min.js'
    //   }
    // },




    // Do some post processing on CSS files
    //
    postcss: {
      options: {
        processors: [
          autoprefixer,
          flexbugsFixes,
          customProperties,
          colorFunctions,
          postcssReporter,
        ]
      },
      style: {
        src: 'src/assets/styles/main.min.css'
      },
    },





    // Minify CSS files
    //
    cssmin: {
      options: {
        sourceMap: false,
        advanced:  false
      },
      core: {
        src:  'src/assets/styles/main.css',
        dest: 'src/assets/styles/main.min.css'
      }
    },


    svgstore: {
      options: {
        prefix : 'icon-',
      },
      default : {
          files: {
            // 'dest/svg-defs.svg': ['svgs/*.svg'],
            'src/assets/svg/svg-sprite.svg': ['src/assets/svg/symbols/*.svg'],
          }
        }
      }



    // -------------------------------------------------------------------------------
    // END Task configuration

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies', pattern: ['grunt-*'] });
  require('autoprefixer')(grunt);
  //require('time-grunt')(grunt);


  // Run "grunt" to watch SCSS and JS files as well as running browser-sync
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('dist', ['start']);
  grunt.registerTask('serve', ['watch']); //['browserSync', 'watch']);


  // Run "grunt build" to publish the template in a ./dist folder
  grunt.registerTask('start',
    [
      // 'clean:dist',
      // 'svgstore',
      'sass',
      'css',
      // 'js',
      // 'copy:dist',
      // 'clean:dist_copied'
      'watch'
    ]
  );

  grunt.registerTask( 'css', ['cssmin', 'postcss'] );

  // grunt.registerTask( 'js', ['neuter:js', 'uglify'] );


};
