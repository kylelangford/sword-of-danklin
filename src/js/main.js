(function () {
  // Headroom
  $(".mast-head").headroom({
    onTop : function() {
      $('.hint').show();
    },
    offset : 100
  });

  // Tween Page Load
  $("body").addClass( "tween" );

  // Menu Trigger
  $('.primary-menu-btn').on('click touchstart',function (e) {
    $('nav.primary').toggleClass('overlay');
    $(this).toggleClass('active');
    $('.mast-head').toggleClass('active');
    $('.site-logo').toggleClass('active');
    e.preventDefault();
  });

  $(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
      // ajax call get data from server and append to the div
    }
  });


  var lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy"
      // ... more custom settings?
  });



})();

// Scroll To
// (function () {
  // $.mark = {
  //   jump: function (options) {
  //     var defaults = {
  //       selector: 'a.scroll-on-page-link'
  //     };
  //     if (typeof options == 'string') {
  //       defaults.selector = options;
  //     }
  //     options = $.extend(defaults, options);
  //     return $(options.selector).click(function (e) {
  //       var jumpobj = $(this);
  //       var target = jumpobj.attr('href');
  //       var thespeed = 1000;
  //       var offset = $(target).offset().top;
  //       $('html,body').animate({
  //         scrollTop: offset
  //       }, thespeed, 'swing');
  //       e.preventDefault();
  //     });
  //   }
  // };
  // $.mark.jump();
// })();



var photoStream = (function() {

  'use strict';

  // Check if Email Exists Already
  function getImages(email, subscriberData, submitCallback) {

    var http = new XMLHttpRequest();
    var url = settings.api.checkSubscriber + '/' + email; // HLE Endpoint
    
    http.onreadystatechange = function() {
      if (http.readyState == 4) {
        if (http.status == 200) {
          if (http.responseText == 'true') {
            showMessage(settings.messages.emailDuplicate);
            highlightField(emailField);
            disableSubmit(form, false); // Enable Submit on Fail
          } else {
            // Send Subscriber if email does not exist
            submitCallback(subscriberData);
          }
        } else {
          // error
          showMessage(settings.messages.submissionError);
        }
      }
    }

    http.open('GET', url, true);
    http.timeout = 8000;
    http.setRequestHeader('Content-type', 'application/json');
    http.send( null );
  }
})();




var HleBlock = (function() {

  'use strict';

  var getData = function(url, callback) {
    var request = new XMLHttpRequest();

    if (typeof url !== 'string') {
      throw new Error('Invalid URL: ', url);
    } else if (typeof callback !== 'function') {
      throw new Error('Callback provided is not a function: ', callback);
      // Show list of possible methods
    }

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        console.log('Connected');
        var json = JSON.parse(request.responseText);
        callback(json);
      } else {
        console.log('Connection has Failed');
      }
    };

    request.open('GET', url, true);
    request.send();
  }

  // Append HTML to target
  var appendHTML = function(json) {
    var data = json;
    var newDiv = document.createElement('div');
    _addAssets(data);
    newDiv.innerHTML = data.html;
    document.querySelector(data.target).appendChild(newDiv);
  }

  return {
    load: getData,
    append: appendHTML
  };

})();



