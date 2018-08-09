/* flexibleFrames script by @robinpx - github */

function fixFrame(selector) {
    fixVidRatio(selector); 
    var height = selector.find("iframe").height();
    var wid = selector.find("iframe").width();
    
    if (height === wid) { 
        if (wid < 540) {
            height = 540; 
            wid = 540; 
        } 
    }    
    if (height > 540) {
        height = 540;
    }
    var heightPercent = (height  / wid) * 100;
    if (height > wid) { 
        heightPercent = (wid / height) * 100; 
    }   
    selector.css({ position: "relative", width: "100%", height: "0", paddingBottom: heightPercent + "%" }); 
    selector.find("iframe").css({ position: "absolute", width: "100%", height: "100%", left: "0", bottom: "0" }); 
}

function flexibleFrames(selector) {
    $("iframe").on("load", function() {
       var w = [selector.parent().width(), $(".spotify_audio_player").width() + 80, $(".soundcloud_audio_player").width()];
       $("<style>.flickr-embed-frame {max-height:" + w[0] + "px!important;width:100%!important;} .instagram-media {max-width:calc(100% - 2px)!important;min-width:calc(100% - 2px)!important;} .spotify_audio_player {height:" + w[1] + "px!important;} .soundcloud_audio_player {height:" + w[2] + "px!important;} .spotify_audio_player, .soundcloud_audio_player, .bandcamp_audio_player {width:100%!important;}</style>").appendTo("head");
    });

        selector.not(".resized").each(function() {
           var frame = $(this).find("iframe:not(.bandcamp_audio_player, .spotify_audio_player, .soundcloud_audio_player)");
           frame.on("load", function() {
             fixFrame(frame.parent());
           });
           $(this).addClass("resized");
        });
        
     $(".tumblr_video_container").css({ height: "auto", width: "auto" });
     selector.find(".tumblr_video_container").parent().css({ maxHeight : "540px" }); // back-up 
        
     $(window).resize(function() {
         w = [selector.parent().width(), $(".spotify_audio_player").width() + 80, $(".soundcloud_audio_player").width()];
         $("<style> .flickr-embed-frame {max-height:" + w[0] + "px!important;} .spotify_audio_player {height:" + w[1] + "px!important;} .soundcloud_audio_player{height:" + w[2] + "px!important;} </style> ").appendTo("head");      
     });
     return true;
}

function fixVidRatio(selector) {
    var w = selector.find("iframe").width();
    var h = selector.find("iframe").height();
    var scale = selector.parent().width() / w;
    if (h > 540) {
           h = 540;
    }
    selector.find("iframe").css({ 
        width: scale * w,
        height: scale * h
    }); 
}
