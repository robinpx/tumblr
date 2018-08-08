/* flexibleFrames script by @robinpx on github */

function fixFrame(selector) {
    fixVidRatio(selector); 
    var height = selector.find("iframe").height();
    var wid = selector.find("iframe").width();
    console.log(selector.find("iframe").attr("src") + " and " + wid)
    if (height === wid) { 
        if (wid < 540) {
            height = 540; 
            wid = 540; 
        } 
    }    
    var heightPercent = (height  / wid) * 100;
    if (height > wid) { 
        heightPercent = (wid / height) * 100; 
    }   
    selector.css({ position: "relative", width: "100%", height: "0", paddingBottom: heightPercent + "%" }); 
    selector.find("iframe").css({ position: "absolute", width: "100%", height: "100%", left: "0", bottom: "0" }); 
}

function flexibleFrames(selector) {
    $("<style>.flickr-embed-frame {min-width:100%!important;width:100%!important;height:45vw!important;} .instagram-media {max-width:calc(100% - 2px)!important;min-width:calc(100% - 2px)!important;} .spotify_audio_player { height:80px!important;} .spotify_audio_player, .soundcloud_audio_player, .bandcamp_audio_player {width:100%!important;}</style>").appendTo("head"); 
        selector.not(".resized").each(function() {
           var frame = $(this).find("iframe:not(.bandcamp_audio_player, .spotify_audio_player, .soundcloud_audio_player)");
           frame.on("load", function() {
             fixFrame(frame.parent());
           });
           $(this).addClass("resized");
        });
        $(".tumblr_video_container").css({ height: "auto", width: "auto" });
        selector.find(".tumblr_video_container").parent().css({ maxHeight : "540px" }); // back-up  
}

function fixVidRatio(selector) {
    var w = selector.find("iframe").width();
    var h = selector.find("iframe").height();
    var scale = $(".post").width() / w;
    if (h > 540) {
           h = 540;
    }
    selector.find("iframe").css({ 
        width: scale * w,
        height: scale * h
    }); 
}
