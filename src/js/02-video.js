import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const player = new Player('vimeo-player');


const savePlaybackTime = throttle(async () => {
  try {
    const currentTime = await player.getCurrentTime();
    localStorage.setItem('videoplayer-current-time', currentTime);
  } catch (error) {
    console.error('Error saving playback time:', error);
  }
}, 1000);


const loadPlaybackTime = async () => {
  try {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime !== null) {
      await player.setCurrentTime(savedTime);
    }
  } catch (error) {
    console.error('Error loading playback time:', error);
  }
};


player.on('timeupdate', savePlaybackTime);


window.addEventListener('DOMContentLoaded', loadPlaybackTime);

