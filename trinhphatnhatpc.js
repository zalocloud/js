var newSong = false;
var ad = document.querySelector('audio');
var lastPlayed = 0;
var loggedIn = false;

const ScaleBar = {
  min: 5,
  max: 0,
  get: function (fromMin, fromMax, valueIn) {
    const toMax = ScaleBar.max;
    const toMin = ScaleBar.min;

    fromMin = fromMax * 0.45;

    return (toMax - toMin) * (valueIn - fromMin) / (fromMax - fromMin) + toMin;
  } };


let canvas,
canvasContext,
analyser,
rafCall,
bufferLength,
frequencyData,
circle;


canvas = document.querySelector('.music-visuals');
circle = document.querySelector('.vis-circle');

canvasContext = canvas.getContext('2d');

canvas.width = canvas.offsetWidth * window.devicePixelRatio;
canvas.height = canvas.offsetHeight * window.devicePixelRatio;

canvasContext.imageSmoothingEnabled = false;

const audioContext = new AudioContext();
const source = audioContext.createMediaElementSource(document.querySelector('audio'));

analyser = audioContext.createAnalyser();

source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 4096;
analyser.minDecibels = -90;
analyser.maxDecibels = 0;

bufferLength = analyser.frequencyBinCount;
frequencyData = new Uint8Array(bufferLength);

var MusicVisuals = {
  start() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);

    let frequencyWidth = window.devicePixelRatio,
    frequencyHeight = 0,
    x = 0,
    scales = [],
    fd = [];


    const fdMin = Math.min.apply(Math, frequencyData);
    const fdMax = Math.max.apply(Math, frequencyData);

    for (let increment = 0; x < canvas.width; increment++) {
      frequencyHeight = frequencyData[increment] * (canvas.height / 250);

      if (increment < 15) {
        scales.push(frequencyHeight / 50);
      }

      fd.push(frequencyData[increment]);

      frequencyHeight = ScaleBar.get(fdMin, fdMax, frequencyData[increment]);
      frequencyHeight = frequencyData[increment];
      canvasContext.fillStyle = '#fff';

      let y = canvas.height - frequencyHeight;

      y = y > canvas.height - 1 ? canvas.height - 1 : y;
      y = y < 0 ? 0 : y;

      canvasContext.fillRect(x, y, frequencyWidth, canvas.height);
      x += frequencyWidth * 3;
    }

    let scale = scales.reduce((pv, cv) => pv + cv, 0) / scales.length * 0.5;

    scale = scale < 1 ? 1 : scale;
    scale = scale > 3 ? 3 : scale;

    circle.style.transform = 'scale(' + scale + ')';

    rafCall = requestAnimationFrame(MusicVisuals.start);
  },
  stop() {
    cancelAnimationFrame(rafCall);
  } };



function genWav(json, ap) {
  var url = json.preview_url;
  if (url === null) {
    alert("Preview not available for this song. :(");
    return;
  }
  document.querySelector('#artist').innerHTML = json.artists[0].name;
  document.querySelector('#album').innerHTML = json.album.name;document.querySelector('#song').innerHTML = json.name;
  document.querySelector('#cover').src = json.album.images[0].url;
  document.querySelector('.vis-circle').style.backgroundImage = 'url(' + json.album.images[0].url + ')';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    if (this.status == 200) {
      var ad = document.querySelector('audio');
      var paused = ad.paused;
      ad.src = URL.createObjectURL(this.response);
      ad.oncanplaythrough = function () {
        this.play();
      };
      newSong = false;
    }
  };
  xhr.send();
}

function playPrev() {
  document.querySelector('.stage').classList.remove('hover');
  lastPlayed -= 1;
  var n = songList[lastPlayed];
  if (n == undefined) {
    playSong(songList[songList.length - 1]);
    lastPlayed = songList.length - 1;
    return;
  } else
  {
    playSong(n);
  }
}

function playNext() {
  document.querySelector('.stage').classList.remove('hover');
  lastPlayed++;
  var n = songList[lastPlayed];
  if (n === undefined) {
    playSong(songList[0]);
    return;
  } else
  {
    playSong(n);
  }
}

document.querySelector('#play-btn').addEventListener('click', function () {
  ad.paused ? ad.play() : ad.pause();
});

ad.addEventListener('play', () => {
  document.querySelector('#play-btn').innerHTML = 'Pause';
  document.querySelector('.stage').classList.add('hover');
  MusicVisuals.start();
  document.querySelector('.cover-holder').style.animationPlayState = 'running';
});

ad.addEventListener('pause', () => {
  document.querySelector('#play-btn').innerHTML = 'Play';
  document.querySelector('.stage').classList.remove('hover');
  MusicVisuals.stop();
  document.querySelector('.cover-holder').style.animationPlayState = 'paused';
});

ad.addEventListener('timeupdate', () => {
  if (ad.duration - ad.currentTime <= 2) {
    document.querySelector('.stage').classList.remove('hover');
  }
});

ad.addEventListener('ended', () => playNext());

document.querySelector('#next-btn').addEventListener('click', () => playNext());
document.querySelector('#prev-btn').addEventListener('click', () => playPrev());

document.querySelector('#open-file').onclick = function () {
  document.querySelector('#file-input').click();
};

function getInfoFromFileName(name) {
  name = name == null ? 'Unkown' : name;
  name = name.replace(/_/g, ' ');
  var artist = artist == null ? 'Unkown' : artist;
  if (name.indexOf(' - ') !== -1) {
    name = name.split(' - ');
    artist = name[0];
    name = name[1];
  }
  name = name.split('.')[0];
  return {
    artist: artist,
    title: name };

}

function pictureDataToURL(picture) {
  if (!picture) {
    return undefined;
  }

  const byteArray = new Uint8Array(picture.data);
  const blob = new Blob([byteArray], { type: picture.format });

  return URL.createObjectURL(blob);
}

function fileLoad(file) {
  var fileInfo = getInfoFromFileName(file.name);
  ad.pause();
  window.spin = false;

  ad.src = URL.createObjectURL(file);
  ad.play();

  jsmediatags.read(file, {
    onSuccess: ({ tags }) => {
      document.querySelector('#artist').innerHTML = tags.artist === undefined ? fileInfo.artist : tags.artist;
      document.querySelector('#album').innerHTML = tags.album === undefined ? '' : tags.album;
      document.querySelector('#song').innerHTML = tags.title === undefined ? fileInfo.title : tags.title;


      const imageUrl = pictureDataToURL(tags.picture);

      if (imageUrl) {
        document.querySelector('#cover').src = imageUrl;
        document.querySelector('.vis-circle').style.backgroundImage = imageUrl;
      }
    } });

}

document.querySelector('#file-input').onchange = e => {
  audioContext.resume();
  fileLoad(e.target.files[0]);
};

document.querySelector('#show-audio').addEventListener('click', () => {
  const audioElement = document.querySelector('audio');
  const showAudioButton = document.querySelector('#show-audio');
  
  // Nếu audio đang được hiển thị, ẩn nó và đổi văn bản nút thành "Show play"
  if (audioElement.classList.contains('show')) {
    audioElement.classList.remove('show');  // Ẩn audio
    showAudioButton.textContent = 'Show play';  // Đổi văn bản nút thành "Show play"
  } 
  // Nếu audio đang ẩn, hiển thị nó và đổi văn bản nút thành "Ẩn play"
  else {
    audioElement.classList.add('show');  // Hiển thị audio
    showAudioButton.textContent = 'Ẩn play';  // Đổi văn bản nút thành "Ẩn play"
  }
});
