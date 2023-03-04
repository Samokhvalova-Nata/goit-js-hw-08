import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(handleTimeUpdate, 1000));

function handleTimeUpdate(data) {
    console.log(data);
    localStorage.setItem("videoplayer-current-time", JSON.stringify(data));
}

const savedTime = localStorage.getItem("videoplayer-current-time");
const parsedTime = JSON.parse(savedTime);

player.setCurrentTime(parsedTime.seconds);