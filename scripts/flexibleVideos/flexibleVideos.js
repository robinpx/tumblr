/* flexibleVideos script by @robinpx on github */

function fixFrame(selector) {
    zoom(selector);
       
    var height = selector.find("iframe").height();
    var wid = selector.find("iframe").width();
        
    if (height === wid) { 
        if (wid < 540) {
            height = 540; 
            wid = 540; 
        } 
        height = 540;
    }
        
    var heightPercent = (height  / wid) * 100;
    if (height > wid) { 
        heightPercent = (wid / height) * 100; 
    }
        
    selector.css({ position: "relative", width: "100%", height: "0", paddingBottom: heightPercent + "%" });
    selector.find("iframe").css({ position: "absolute", width: "100%", height: "100%", left: "0", bottom: "0" }); 
}

function flexibleVideos(selector) {
    selector.not(".resized").each(function() {
       fixFrame($(this).find("iframe:not(.instagram-media, .bandcamp_audio_player, .spotify_audio_player, .soundcloud_audio_player)").parent());
       $(this).addClass("resized");
    });
    $(".tumblr_video_container").css({ height: "auto", width: "auto" });
    selector.find(".tumblr_video_container").parent().css({ maxHeight : "540px" }); // back-up  
}

function zoom(selector) {
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
