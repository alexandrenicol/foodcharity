module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      dev: {
        tasks: ['jshint', 'nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'index.js', 'Lib/**/*.js', 'Models/**/*.js', 'Controllers/**/*.js', 'Routes/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
          
        },
        esversion: 6
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
      sass: {
        files: 'public/styles/main.scss',
        tasks: ['sass:dist']
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          watch: ['<%= jshint.files %>']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          'public/dist/styles/style.css': 'public/styles/main.scss'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '.',
          src: 'bower_components/**/*.*',
          dest: 'public/dist/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  
  grunt.registerTask('default', ['jshint']);
  
  grunt.registerTask('bower', ['copy:dist']);
  
  
  grunt.registerTask('serve', ['sass:dist', 'concurrent:dev']);

};
