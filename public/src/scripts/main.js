require.config({
    paths: {
        "jquery": "../vendors/jquery/jquery-1.11.1",

        "semantic": "../vendors/semantic/semantic"
    },
    shim: {

        "semantic" :["jquery"]
    }
});

require([
    "jquery",

    "semantic"
], function($, Controller) {

    $(document)
      .ready(function() {

        // fix menu when passed
        $('.masthead')
          .visibility({
            once: false,
            onBottomPassed: function() {
              $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function() {
              $('.fixed.menu').transition('fade out');
            }
          })
        ;

        // create sidebar and attach to menu open
        $('.ui.sidebar')
          .sidebar('attach events', '.toc.item')
        ;

      });
      //Controller.initPage();
});
