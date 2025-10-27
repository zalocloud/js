
  // dự phòng sử dụng drive: https://cdn.jsdelivr.net/gh/zalocloud/js/voice-mess-update-1.js
  const uploadButtonsMessenger = document.querySelectorAll('.uploadfile-messenger');
  const hiddenInputMessenger = document.getElementById('hidden-upload');
  const uploadingMessenger = document.getElementById('uploading-messenger');
  const uploadedMessenger = document.getElementById('uploaded-messenger');
  const pauseVoiceIconMessenger = document.getElementById('pause-voice-icon');
  const recordTimeMessenger = document.getElementById('record-time');
  const deleteButtonMessenger = document.getElementById('delete-voice');
  const iconContainerVoice = document.querySelector('.icon-container-voice');

  const audioPlayerContainer = document.getElementById('audio-player-container');
  const audioPlayer = document.getElementById('audio-player');
  const audioSource = document.getElementById('audio-source');

  let mediaRecorderMessenger;
  let audioChunksMessenger = [];
  let audioBlobMessenger;
  let audioUrlMessenger;
  let mediaStreamMessenger;

  let timeIntervalMessenger;
  let secondsMessenger = 0;

  const startVoiceIcons = document.querySelectorAll('.start-voice-icon');

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamMessenger = stream;
    mediaRecorderMessenger = new MediaRecorder(stream);

    mediaRecorderMessenger.ondataavailable = function (event) {
      audioChunksMessenger.push(event.data);
    };

    mediaRecorderMessenger.onstop = function () {
      audioBlobMessenger = new Blob(audioChunksMessenger, { type: 'audio/wav' });
      audioUrlMessenger = URL.createObjectURL(audioBlobMessenger);

      const newAudioPlayer = document.createElement('audio');
      newAudioPlayer.id = 'audio-player';
      newAudioPlayer.controls = true;
      audioPlayerContainer.innerHTML = '';
      audioPlayerContainer.appendChild(newAudioPlayer);

      newAudioPlayer.src = audioUrlMessenger;
      newAudioPlayer.load();
      newAudioPlayer.play();

      audioPlayerContainer.classList.remove('hidden');
      audioChunksMessenger = [];
      deleteButtonMessenger.classList.remove('hidden');
    };

    mediaRecorderMessenger.start();

    secondsMessenger = 0;
    timeIntervalMessenger = setInterval(function () {
      secondsMessenger++;
      const minutesMessenger = Math.floor(secondsMessenger / 60);
      const secondsLeftMessenger = secondsMessenger % 60;
      recordTimeMessenger.innerHTML = `${String(minutesMessenger).padStart(2, '0')}:${String(secondsLeftMessenger).padStart(2, '0')}`;
    }, 1000);
  }

  function stopStream() {
    if (mediaStreamMessenger) {
      mediaStreamMessenger.getTracks().forEach(track => track.stop());
    }
  }

  startVoiceIcons.forEach(startVoiceIconMessenger => {
    startVoiceIconMessenger.addEventListener('click', function () {
      startVoiceIconMessenger.classList.add('hidden');
      pauseVoiceIconMessenger.classList.remove('hidden');
      iconContainerVoice.classList.remove('hidden');
      startRecording();
      recordTimeMessenger.classList.remove('hidden');
    });
  });

  pauseVoiceIconMessenger.addEventListener('click', function () {
    if (mediaRecorderMessenger && mediaRecorderMessenger.state === "recording") {
      mediaRecorderMessenger.stop();
      clearInterval(timeIntervalMessenger);

      startVoiceIcons.forEach(startVoiceIcon => startVoiceIcon.classList.remove('hidden'));
      pauseVoiceIconMessenger.classList.add('hidden');

      uploadButtonsMessenger.forEach(button => button.classList.remove('hidden'));
      stopStream();

      audioBlobMessenger = new Blob(audioChunksMessenger, { type: 'audio/wav' });
      audioUrlMessenger = URL.createObjectURL(audioBlobMessenger);
      audioSource.src = audioUrlMessenger;
      audioPlayer.load();
      audioPlayerContainer.classList.remove('hidden');
    }
  });

  deleteButtonMessenger.addEventListener('click', function () {
    if (mediaRecorderMessenger && mediaRecorderMessenger.state === "recording") {
      mediaRecorderMessenger.stop();
    }
    recordTimeMessenger.innerHTML = "00:00";
    clearInterval(timeIntervalMessenger);
    audioChunksMessenger = [];
    deleteButtonMessenger.classList.add('hidden');
    uploadButtonsMessenger.forEach(button => button.classList.add('hidden'));
    recordTimeMessenger.classList.add('hidden');
    stopStream();

    iconContainerVoice.classList.add('hidden');
    startVoiceIcons.forEach(startVoiceIcon => startVoiceIcon.classList.remove('hidden'));
    audioPlayerContainer.classList.add('hidden');
    audioPlayer.src = '';
  });

  const CLOUDINARY_CLOUD_NAME = 'dtlfak5bk';
  const CLOUDINARY_UPLOAD_PRESET = 'upload_omechat';
  const CLOUDINARY_FOLDER = 'voices';

  uploadButtonsMessenger.forEach(uploadButtonMessenger => {
    uploadButtonMessenger.addEventListener('click', async function () {
      if (!audioBlobMessenger) return alert('Vui lòng ghi âm trước khi gửi!');

      uploadingMessenger.innerHTML = "Đang tải tệp lên, vui lòng đợi...";
      uploadingMessenger.style.display = "block";

      const minutesMessenger = Math.floor(secondsMessenger / 60);
      const secondsLeftMessenger = secondsMessenger % 60;
      const duration = `${String(minutesMessenger).padStart(2, '0')}m${String(secondsLeftMessenger).padStart(2, '0')}s`;

      const timestamp = new Date();
      const year = timestamp.getFullYear();
      const month = String(timestamp.getMonth() + 1).padStart(2, '0');
      const day = String(timestamp.getDate()).padStart(2, '0');
      const hour = String(timestamp.getHours()).padStart(2, '0');
      const minute = String(timestamp.getMinutes()).padStart(2, '0');
      const second = String(timestamp.getSeconds()).padStart(2, '0');
      
      const filename = `voice_${year}-${month}-${day} ${hour}h${minute}m${second}s_${duration}.mp3`;

      try {
        const fd = new FormData();
        fd.append('file', audioBlobMessenger, filename);
        fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        fd.append('folder', CLOUDINARY_FOLDER);

        const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`;
        const res = await fetch(uploadUrl, { method: 'POST', body: fd });
        const data = await res.json();

        uploadingMessenger.innerHTML = "";
        uploadingMessenger.style.display = "none";

        if (data.error) {
          console.error('Cloudinary upload error', data);
          uploadingMessenger.innerHTML = "Có lỗi xảy ra khi tải tệp lên.";
          return;
        }

        const publicId = data.public_id;
        const version = data.version;
        const encodedPublicId = publicId.split('/').map(encodeURIComponent).join('/');
        const mp3Url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_mp3/v${version}/${encodedPublicId}.mp3`;

        sendVoiceMessage(mp3Url, filename);

        iconContainerVoice.classList.add('hidden');
        uploadButtonsMessenger.forEach(button => button.classList.add('hidden'));
        startVoiceIcons.forEach(startVoiceIcon => startVoiceIcon.classList.remove('hidden'));
        audioPlayerContainer.classList.add('hidden');
        audioPlayer.src = '';
      }
      catch(error) {
        uploadingMessenger.innerHTML = "Có lỗi xảy ra khi tải tệp lên.";
        console.error(error);
        uploadingMessenger.style.display = "none";
      }
    });
  });

  function sendVoiceMessage(fileUrl, fileName) {
    if (currentUser) {
      var now = new Date();
      var timestamp = '';
      var messageTime = new Date();
      messageTime.setHours(now.getHours());
      messageTime.setMinutes(now.getMinutes());
      messageTime.setSeconds(0);

      var day = String(now.getDate()).padStart(2, '0');
      var month = String(now.getMonth() + 1).padStart(2, '0');
      var year = now.getFullYear();
      var hours = String(now.getHours()).padStart(2, '0');
      var minutes = String(now.getMinutes()).padStart(2, '0');
      timestamp = `${hours}:${minutes}, ${day} th${month}`;

      var messageId = 'msg-' + Date.now();
      var messageContent = `<a href="${fileUrl}" target="_blank">${fileName}</a>`;

      messages.child(messageId).set({
        id: messageId,
        user: currentUser,
        message: messageContent,
        time: timestamp
      });

      updateScrollbar();
    }
  }
  // Kết thúc phần script
