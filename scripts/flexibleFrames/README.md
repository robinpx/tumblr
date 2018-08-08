## flexibleVideos.js
**flexibleVideos.js** is a short script in JS that makes Tumblr, Youtube, Vimeo, Instagram, Spotify, Bandcamp, and Soundcloud iframes flexible and responsive. Utilizes little HTML, no CSS, and fully JS reliant. Dependent on JQuery 1.7.1. 

[Demo](https://nouvae.tumblr.com/codes/flexibleFrames)

### Installation

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="https://rawgit.com/robinpx/tumblr/master/scripts/flexibleFrames/flexibleFrames.js"></script>
```
To use, all you need is to call the function resizeVideos(*parameter*). It passes a selector as an argument. 

Example:
```html
{block:Video}
<div class="video">{Video-500}</div>
{/block:Video}
```
```javascript
$(document).ready(function() {
  flexibleFrames($(".video"));  // $(".video") is the class selector passed in the argument
});
```

You can also resize the iframes in other containers like inside a caption.
**It must be wrapped in another element.**

Example:
```javascript
function flexFrame() {
   $(".caption").each(function() {
        $(this).find("iframe").wrap("<div class='iframe-flex'></div>"); // wrap iframe 
        flexibleFrames($(".iframe-flex"));
    });
    flexibleFrames($(".video"));
}

$(document).ready(flexFrame);
```

Implemented with infinite scroll:
```javascript
$(document).ready(function(){
    var $container = $('#posts');
    $container.infinitescroll({
            itemSelector: '.post',
            // options 
    },
    function(arrayOfNewElems) {
        flexFrame();
    });
});
```
