module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      compile: {
          files: {
              'css/style.css': 'css/style.less'
          },
          compress : true,
          sourceMap: true,
          cleancss: true
      }
    },
    watch: {
        scripts: {
            files: ['css/*.less'],
            tasks: ['less']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'watch']);
};