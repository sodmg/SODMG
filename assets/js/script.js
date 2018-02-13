function generateRandom(min, max, exclude) {
    var num = Math.floor(Math.random() * (max - min)) + min;

    return (max > 1 && num == exclude) ? generateRandom(min, max, exclude) : num;
}

function setVolume() {
    var player = document.getElementById('player');
    var slider = document.getElementsByTagName('input')[0];

    player.volume = slider.value;
}

var titleKeyframes = {
    "keyframes": [ "SODMG", "GAMERS"],
    "currentKeyframe": 0,
    "interval": 700
};

var videos = [
    [ "xd.mp4", 1.0, 1.0 ],
];

var lastVideo = localStorage.getItem("lastVideo");
var currentVideo = generateRandom(0, videos.length, lastVideo);

var player = document.getElementById('player');
var slider = document.getElementsByTagName('input')[0];
var title = document.getElementsByTagName("title")[0];

localStorage.setItem("lastVideo", currentVideo);

player.innerHTML = "<source src='assets/videos/" + videos[currentVideo][0] + "' type='video/mp4'>";
player.volume = videos[currentVideo][1];
player.playbackRate = videos[currentVideo][2];

slider.value = videos[currentVideo][1];
slider.oninput = setVolume;
slider.onchange = setVolume;

window.addEventListener('touchstart', function videoStart() {
    document.querySelector('video').play();
    removeEventListener('touchstart', videoStart);
});

setInterval(function() {
    if (titleKeyframes.keyframes.length == titleKeyframes.currentKeyframe + 1) {
        titleKeyframes.currentKeyframe = 0;
    } else {
        titleKeyframes.currentKeyframe++;
    }

    title.innerHTML = titleKeyframes.keyframes[titleKeyframes.currentKeyframe];
}, titleKeyframes.interval);

[].forEach.call(document.getElementsByTagName('a'), function(element) {
    element.onclick = function() {
        if (element.getAttribute('data-url') !== undefined) {
            window.open(element.getAttribute('data-url'), '_blank').focus();

            return false;
        }

        return true;
    };
});
