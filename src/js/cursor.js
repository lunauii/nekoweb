jQuery(function($) {

    var mouseX = 0;
    var mouseY = 0;
    var xDelay = 0;
    var yDelay = 0;
     
    $(document).on("mousemove", function(e) {
      mouseX = e.pageX - 16.5;
      mouseY = e.pageY - 16.5; 
    });
      
    setInterval(function(){
      xDelay += ((mouseX - xDelay)/8);
      yDelay += ((mouseY - yDelay)/8);
      $("#circle").css({left: xDelay +'px', top: yDelay +'px'});
    }, 20);

    $(document).on("click", function(e) {
      var ripple = $('<div class="ripple"></div>');

      ripple.css({
        'pointer-events': 'none',
        left: e.pageX - 50 + 'px',
        top: e.pageY - 50 + 'px'
      });

      $("body").append(ripple);

      setTimeout(function() {
        ripple.remove();
      }, 1000);

      $("#circle").addClass("circle-shrink");

      setTimeout(function() {
        $("#circle").removeClass("circle-shrink");
      }, 100);
    });
  
  });