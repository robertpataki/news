var port = chrome.runtime.connect();

var mongres = ['thesun.co.uk', 'mirror.co.uk', 'dailymail.co.uk', 'dailystar.co.uk'];

function _google() {
  // Generic result blocks
  var $g = $('.g, g-inner-card');
  $g.each(function(itemIndex, item){
     var $item = $(item);
     var $a = $item.find('a');

     var linkFound = false;
     $a.each(function(linkIndex, link) {
       var $link = $(link);
       var href = $link.attr('href');

       if (typeof href !== 'undefined') {
         for (var i = 0; i < mongres.length; i++) {
           if (href.indexOf(mongres[i]) >= 0) {
             linkFound = true;
             break;
           }
         }
       }

       if (linkFound) {
         _convertHateToLove($item);
         return false;
       }
     });
  });
}

function _convertHateToLove($item) {
  $item.addClass('mongre');

  var $blocker = $('<div class="mongre__box"><p>ლ(́◉◞౪◟◉‵ლ)</p></div>');
  $item.append($blocker);
}

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window) return;

  // Google search results page
  _google();
}, false);
