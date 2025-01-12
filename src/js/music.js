var music = new Audio('res/sounds/mtky.mp3');
var hasPlayed = false;
var nowPlayingButton = document.getElementById('now-playing-button');
var nowPlayingText = document.getElementById('now-playing');
var currentlyPlaying = false;

music.volume = 0.1;

music.play();

music.addEventListener('play', handleFirstPlay, false);

function handleFirstPlay(event) {
    if (!hasPlayed) {
        hasPlayed = true;
        nowPlayingText.style.display = "block";
    
        const musicPlayer = event.target;
        musicPlayer.removeEventListener("play", handleFirstPlay);
    }
}

nowPlayingButton.addEventListener('click', function() {
    music.play();
    nowPlayingButton.style.display = "none";
});

document.addEventListener('DOMContentLoaded', function() {
    if (music.paused) {
        nowPlayingButton.style.display = "block";
    }
});
