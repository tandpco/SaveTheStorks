module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('momentum.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['lib/js/*.js'],
        dest: 'public/js/build.js'
      }
    },
    s3: {
      staging : {
        options: {
          accessKeyId: "<%= config.aws.key %>",
          secretAccessKey: "<%= config.aws.secret %>",
          bucket: "<%= config.aws.bucket %>"
        },
        files: [
          {
            cwd: "public/",
            src: "**",
            dest: "<%= config.aws.client %>"+"/"
          }
        ]
      }
    },
    rainmaker: {
      options: {
        // domain:'http://sandbox.rainmaker.local',
        key: '<%= config.momentum.key %>',
        secret: '<%= config.momentum.secret %>',
        client: '<%= config.momentum.client %>'
      },
      files: {
        expand: true,
        cwd:'theme',
        src: ['**/*.{jade,html,lhtml,htm,xhtml,yaml}']
      }

    },
    // // to enable webfont compiling from svg files follow the readme isntructions in /lib/icons/readme.md
    // webfont: {
    //   icons: {
    //     src: 'lib/icons/*.svg',
    //     dest: 'public/fonts',
    //     destCss: 'lib/style/',
    //     options: {
    //       syntax: 'bem',
    //       ligatures:true,
    //       htmlDemo:false,
    //       hashes:false,
    //       stylesheet: 'styl',
    //       font: 'icons',
    //       relativeFontPath: '../fonts'
    //     }
    //   }
    // },
    coffee: {
      compile: {
        expand: true,
        flatten: true,
        src: ['lib/coffee/*.coffee'],
        dest: 'lib/js/',
        ext: '.js'
      }
    },
    jshint: {
      options: {
        jshintrc:true
      },
      uses_defaults: ['lib/js/*.js']
    },
    stylus: {
      compile: {
        options: {
          banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
          paths: ['lib/style']
        },
        files: {
          'public/css/main.css': 'lib/style/main.styl'
        }
      }
    },
    watch: {
      coffee: {
        files: ['lib/coffee/*.coffee'],
        tasks:['coffee']
      },
      js: {
        files: ['lib/js/*.js'],
        tasks:['jshint','uglify']
      },
      stylus: {
        files: ['lib/style/*.styl', 'lib/style/partials/*.styl'],
        tasks:['stylus']
      },
      s3: {
        files:['public/**'],
        tasks:['s3']
      },
      rainmaker: {
        files:['theme/**/*.{jade,lhtml,html,yaml}'],
        tasks:['rainmaker']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  // grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-rainmaker');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['rainmaker','coffee','jshint','uglify','stylus','s3']);
  grunt.registerTask('deploy', ['s3']);

};
