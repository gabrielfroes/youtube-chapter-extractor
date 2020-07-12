const YoutubePlayer = {
    elementId: null,
    videoId: null,
    player: null,

    load: (elementId, videoId) => {
        YoutubePlayer.elementId = elementId
        YoutubePlayer.videoId = videoId

        if (YoutubePlayer.player) {
            YoutubePlayer.player.cueVideoById(videoId)
        } else {
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    },

    playVideo: (seconds) => {
        YoutubePlayer.player.seekTo(seconds, true);
    },

}

function onYouTubeIframeAPIReady() {
    YoutubePlayer.player = new YT.Player(YoutubePlayer.elementId, {
        videoId: YoutubePlayer.videoId,
    });
}