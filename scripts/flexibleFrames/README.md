## flexibleVideos.js
**flexibleVideos.js** is a short script in JS that makes Tumblr, Youtube, Vimeo, Instagram, Spotify, Bandcamp, Flickr, and Soundcloud iframes flexible and responsive. Dependent on JQuery 1.7.1. 

[Demo](https://nouvae.tumblr.com/codes/flexibleFrames) / [Demo two](https://nouvae.tumblr.com/codes/flexibleFrames2)

### Installation

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="https://rawgit.com/robinpx/tumblr/master/scripts/flexibleFrames/flexibleFrames.js"></script>
```
To use, all you need is to call the function ```flexibleFrames(parameter)``` and pass the selector that wraps the video block as the argument. 

#### Basic example
```html
{block:Video}
<div class="video">{Video-500}</div> // the video variable can be any size {Video-250}, {Video-400}, etc.
{/block:Video}
```
```javascript
$(document).ready(function() {
  flexibleFrames($(".video"));  // $(".video") is the class selector passed in the argument
});
```

You can also resize the iframes in other containers like inside a caption.
**It must be wrapped in another element.**

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

#### Example implemented with Paul Irish's infinite scroll
```javascript
  $container.infinitescroll({
       // options 
  },
  function(arrayOfNewElems) {
      flexFrame(); // or flexibleFrames($(".video"));
  });
```
#### Example with masonry 

It also works with masonry, but I recommend integrating a callback function to the function that calls flexibleFrames() (like flexFrame in these examples). This will allow the posts to be arranged correctly and leave out random whitespace or margins.  

```javascript
var isPaused = true;
var $container = $("#posts");

function flexFrame() {
   $(".caption").each(function() {
        $(this).find("iframe").wrap("<div class='iframe-flex'></div>"); // wrap iframe 
        flexibleFrames($(".iframe-flex"));
    });
    flexibleFrames($(".video"));
    setTimeout(function() {
        isPaused = false;
    }, 3000);
}

function check(callback) {
    if (isPaused === true) {
        setTimeout(function() { check(callback) }, 3000);
    }
    else {
        callback();
        isPaused = true;
    }
}
 
$(document).ready(function() {
    flexFrame();
    
    $container.masonry({ 
        itemSelector: ".post"
    });
    
    check(function() {
       
       $container.imagesLoaded(function(){
           $container.masonry();
       });
       $(window).resize(function(){$container.masonry();});
      
      // you can also add a fading in function here ex. $container.fadeTo(600, 1);
    });
});
```

#### Example with infinite scroll
```javascript
  $container.infinitescroll({
       // options 
  },
  function(arrayOfNewElems) {
      flexFrame(); // or flexibleFrames($(".video"));
      
      var $newElems = $(arrayOfNewElems);
      check(function() {
         container.masonry();
         $newElems.imagesLoaded(function() {
             $container.masonry( 'appended', $newElems );
             $newElems.animate({ opacity: 1, zIndex: 1 });
         });
      });
  });
```

#### Optional

To make the Spotify or Soundcloud iframes "skinner" or "smaller," add CSS and adjust max-height.
```CSS
.soundcloud_audio_player {
    max-height:116px!important;
}

.spotify_audio_player {
    max-height:80px!important;
}
```

### Known issues
Flickr iframes do not fully resize correctly. 
