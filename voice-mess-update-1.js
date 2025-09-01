 
// Lấy các phần tử cần thiết
const uploadButtonsMessenger = document.querySelectorAll('.uploadfile-messenger');
const hiddenInputMessenger = document.getElementById('hidden-upload');
const uploadingMessenger = document.getElementById('uploading-messenger');
const uploadedMessenger = document.getElementById('uploaded-messenger');
const pauseVoiceIconMessenger = document.getElementById('pause-voice-icon');
const recordTimeMessenger = document.getElementById('record-time');
const deleteButtonMessenger = document.getElementById('delete-voice');
const iconContainerVoice = document.querySelector('.icon-container-voice');  // Lấy phần tử chứa icon ghi âm

// Các phần tử trình phát âm thanh
const audioPlayerContainer = document.getElementById('audio-player-container');
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');

// Các biến cần thiết cho ghi âm
let mediaRecorderMessenger;
let audioChunksMessenger = [];
let audioBlobMessenger;
let audioUrlMessenger;
let mediaStreamMessenger;  // Lưu trữ stream của micro

// Biến lưu trữ thời gian ghi âm
let timeIntervalMessenger;
let secondsMessenger = 0;

// Lấy tất cả các phần tử start-voice-icon
const startVoiceIcons = document.querySelectorAll('.start-voice-icon');

// Hàm bắt đầu ghi âm
async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaStreamMessenger = stream;  // Lưu lại stream
  mediaRecorderMessenger = new MediaRecorder(stream);

  mediaRecorderMessenger.ondataavailable = function (event) {
    audioChunksMessenger.push(event.data);
  };

  mediaRecorderMessenger.onstop = function () {
  // Sau khi dừng ghi âm và tạo URL
  audioBlobMessenger = new Blob(audioChunksMessenger, { type: 'audio/wav' });
  audioUrlMessenger = URL.createObjectURL(audioBlobMessenger);

  // Tạo phần tử audio mới để đảm bảo việc tải lại đúng
  const newAudioPlayer = document.createElement('audio');
  newAudioPlayer.id = 'audio-player'; // Cung cấp lại id
  newAudioPlayer.controls = true; // Bật điều khiển cho audio player
  audioPlayerContainer.innerHTML = ''; // Xóa nội dung cũ
  audioPlayerContainer.appendChild(newAudioPlayer); // Thêm audio mới vào container

  // Thay đổi nguồn cho audio
  newAudioPlayer.src = audioUrlMessenger;

  // Hiển thị trình phát âm thanh
  newAudioPlayer.load(); // Tải lại trình phát âm thanh
  newAudioPlayer.play(); // Tự động phát âm thanh

  // Hiển thị trình phát âm thanh
  audioPlayerContainer.classList.remove('hidden'); // Hiển thị trình phát âm thanh

  // Reset dữ liệu âm thanh
  audioChunksMessenger = []; // Xóa dữ liệu âm thanh cũ
  deleteButtonMessenger.classList.remove('hidden'); // Hiển thị nút xóa
};




  mediaRecorderMessenger.start();

  // Hiển thị thời gian ghi âm
  secondsMessenger = 0;
  timeIntervalMessenger = setInterval(function () {
    secondsMessenger++;
    const minutesMessenger = Math.floor(secondsMessenger / 60);
    const secondsLeftMessenger = secondsMessenger % 60;
    recordTimeMessenger.innerHTML = `${String(minutesMessenger).padStart(2, '0')}:${String(secondsLeftMessenger).padStart(2, '0')}`;
  }, 1000);
}

// Dừng và giải phóng stream của micro
function stopStream() {
  if (mediaStreamMessenger) {
    mediaStreamMessenger.getTracks().forEach(track => track.stop());
  }
}

// Khi nhấn vào bất kỳ biểu tượng bắt đầu ghi âm nào
startVoiceIcons.forEach(startVoiceIconMessenger => {
  startVoiceIconMessenger.addEventListener('click', function () {
    startVoiceIconMessenger.classList.add('hidden'); // Ẩn biểu tượng bắt đầu
    pauseVoiceIconMessenger.classList.remove('hidden'); // Hiển thị biểu tượng dừng

    // Hiển thị phần ghi âm
    iconContainerVoice.classList.remove('hidden');  // Hiển thị icon container

    // Bắt đầu ghi âm
    startRecording();
    recordTimeMessenger.classList.remove('hidden');
  });
});

// Khi nhấn vào biểu tượng tạm dừng ghi âm
pauseVoiceIconMessenger.addEventListener('click', function () {
  if (mediaRecorderMessenger && mediaRecorderMessenger.state === "recording") {
    // Dừng ghi âm
    mediaRecorderMessenger.stop();
    clearInterval(timeIntervalMessenger);

    // Ẩn tất cả các start-voice-icon và pause-voice-icon
    startVoiceIcons.forEach(startVoiceIcon => startVoiceIcon.classList.remove('hidden'));
    pauseVoiceIconMessenger.classList.add('hidden'); // Ẩn biểu tượng dừng

    // Hiển thị nút gửi khi dừng ghi âm
    uploadButtonsMessenger.forEach(button => button.classList.remove('hidden')); // Hiển thị nút gửi khi dừng ghi âm
    stopStream();  // Dừng stream khi dừng ghi âm

    // Hiển thị trình phát âm thanh
    audioBlobMessenger = new Blob(audioChunksMessenger, { type: 'audio/wav' });
    audioUrlMessenger = URL.createObjectURL(audioBlobMessenger);
    audioSource.src = audioUrlMessenger;
    audioPlayer.load(); // Đảm bảo trình phát tải lại âm thanh
    audioPlayerContainer.classList.remove('hidden'); // Hiển thị trình phát âm thanh
  }
});

// Khi nhấn nút xóa
deleteButtonMessenger.addEventListener('click', function () {
  // Dừng ghi âm và xóa tất cả dữ liệu
  if (mediaRecorderMessenger && mediaRecorderMessenger.state === "recording") {
    mediaRecorderMessenger.stop();
  }
  recordTimeMessenger.innerHTML = "00:00";
  clearInterval(timeIntervalMessenger);
  audioChunksMessenger = [];
  deleteButtonMessenger.classList.add('hidden'); // Ẩn nút xóa
  uploadButtonsMessenger.forEach(button => button.classList.add('hidden')); // Ẩn nút gửi lại khi xóa
  // Ẩn thời gian ghi âm
  recordTimeMessenger.classList.add('hidden');
  stopStream();  // Giải phóng stream khi xóa

  // Ẩn phần icon container khi nhấn nút xóa
  iconContainerVoice.classList.add('hidden');  // Ẩn icon container

  // Hiển thị lại tất cả các nút bắt đầu ghi âm
  startVoiceIcons.forEach(startVoiceIcon => startVoiceIcon.classList.remove('hidden')); // Hiển thị lại nút bắt đầu ghi âm

  // Ẩn trình phát âm thanh
  audioPlayerContainer.classList.add('hidden');  // Ẩn trình phát
  audioPlayer.src = '';  // Xóa nguồn âm thanh
});

// Khi người dùng muốn gửi file
uploadButtonsMessenger.forEach(uploadButtonMessenger => {
  uploadButtonMessenger.addEventListener('click', async function () {
    if (!audioBlobMessenger) return alert('Vui lòng ghi âm trước khi gửi!');

    uploadingMessenger.innerHTML = "Đang tải tệp lên, vui lòng đợi...";

    // Hiển thị phần tử #uploading-messenger
    uploadingMessenger.style.display = "block";

    // Tính thời gian ghi âm (phút:giây)
    const minutesMessenger = Math.floor(secondsMessenger / 60);
    const secondsLeftMessenger = secondsMessenger % 60;
    const duration = `${String(minutesMessenger).padStart(2, '0')}m${String(secondsLeftMessenger).padStart(2, '0')}s`;

    // Đặt tên tệp theo dấu thời gian và thời lượng ghi âm
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const day = String(timestamp.getDate()).padStart(2, '0');
    const hour = String(timestamp.getHours()).padStart(2, '0');
    const minute = String(timestamp.getMinutes()).padStart(2, '0');
    const second = String(timestamp.getSeconds()).padStart(2, '0');
    
    const filename = `voice_${year}-${month}-${day} ${hour}h${minute}m${second}s_${duration}.mp3`;

    // Chuyển đổi âm thanh thành MP3 (có thể sử dụng thư viện chuyển đổi hoặc xử lý phía backend)
    const formData = new FormData();
    formData.append('file', audioBlobMessenger, filename);

    // URL Google Apps Script (cùng với API của bạn)
    const url = "https://script.google.com/macros/s/AKfycbzA7a3UeLPiHxXNlup4cF3vm_jZNyfo9uogojuIA8GNOhNxXYw8u5UCoJvJjnHeusT47A/exec";

    const qs = new URLSearchParams({ filename: filename, mimeType: audioBlobMessenger.type });  // Truyền tên tệp gốc
    const audioArrayBuffer = await audioBlobMessenger.arrayBuffer(); // Lấy ArrayBuffer của audio Blob
    fetch(`${url}?${qs}`, { 
      method: "POST", 
      body: JSON.stringify([...new Int8Array(audioArrayBuffer)])  // Chuyển đổi ArrayBuffer thành một mảng số nguyên 8-bit
    })
    .then(res => res.json())
    .then(e => {
      uploadingMessenger.innerHTML = "";

      // Ẩn phần tử #uploading-messenger khi tải lên xong
      uploadingMessenger.style.display = "none";

      // Gửi file vào tin nhắn (gọi hàm sendVoiceMessage sau khi tải lên thành công)
      sendVoiceMessage(e.fileUrl, filename);  // Gửi fileUrl và tên file

      // Ẩn icon container sau khi tải lên thành công
      iconContainerVoice.classList.add('hidden');  // Ẩn icon container
      
      uploadButtonsMessenger.forEach(button => button.classList.add('hidden'));

      // Hiển thị lại tất cả các nút bắt đầu ghi âm
      startVoiceIcons.forEach(startVoiceIcon => startVoiceIcon.classList.remove('hidden')); // Hiển thị lại nút bắt đầu ghi âm

      // Ẩn trình phát âm thanh khi đã gửi xong
      audioPlayerContainer.classList.add('hidden');
      audioPlayer.src = ''; // Reset nguồn âm thanh
    })
    .catch(error => {
      uploadingMessenger.innerHTML = "Có lỗi xảy ra khi tải tệp lên.";
      console.error(error);
      uploadingMessenger.style.display = "none";  // Ẩn thông báo lỗi nếu tải lên thất bại
    });
  });
});

// Chức năng gửi file vào tin nhắn
function sendVoiceMessage(fileUrl, fileName) {
  // Giả sử bạn đã có người dùng hiện tại (currentUser) và danh sách tin nhắn (messages)
  if (currentUser) {
    var now = new Date();
    var timestamp = '';
    var messageTime = new Date();
    messageTime.setHours(now.getHours());
    messageTime.setMinutes(now.getMinutes());
    messageTime.setSeconds(0);

    var currentTime = now.getTime();
    var day = String(now.getDate()).padStart(2, '0');
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var year = now.getFullYear();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    timestamp = `${hours}:${minutes}, ${day} th${month}`;

    // Tạo ID duy nhất cho mỗi tin nhắn
    var messageId = 'msg-' + Date.now();

    // Tạo nội dung tin nhắn với tên file và URL tải về
    var messageContent = `<a href="${fileUrl}" target="_blank">${fileName}</a>`;

    // Lưu tin nhắn vào danh sách (Giả sử bạn đã có mảng messages)
    messages.push({
      id: messageId,
      user: currentUser,
      message: messageContent,
      time: timestamp
    });

    // Cập nhật giao diện chat (giả sử bạn đã có hàm updateScrollbar)
    updateScrollbar();
  }
}



  // Chức năng gửi file vào tin nhắn
  function sendVoiceMessage(fileUrl, fileName) {
    // Giả sử bạn đã có người dùng hiện tại (currentUser) và danh sách tin nhắn (messages)
    if (currentUser) {
      var now = new Date();
      var timestamp = '';
      var messageTime = new Date();
      messageTime.setHours(now.getHours());
      messageTime.setMinutes(now.getMinutes());
      messageTime.setSeconds(0);

      var currentTime = now.getTime();
      var day = String(now.getDate()).padStart(2, '0');
      var month = String(now.getMonth() + 1).padStart(2, '0');
      var year = now.getFullYear();
      var hours = String(now.getHours()).padStart(2, '0');
      var minutes = String(now.getMinutes()).padStart(2, '0');
      timestamp = `${hours}:${minutes}, ${day} th${month}`;

      // Tạo ID duy nhất cho mỗi tin nhắn
      var messageId = 'msg-' + Date.now();

      // Tạo nội dung tin nhắn với tên file và URL tải về
      var messageContent = `<a href="${fileUrl}" target="_blank">${fileName}</a>`;

      // Lưu tin nhắn vào danh sách (Giả sử bạn đã có mảng messages)
      messages.push({
        id: messageId,
        user: currentUser,
        message: messageContent,
        time: timestamp
      });

      // Cập nhật giao diện chat (giả sử bạn đã có hàm updateScrollbar)
      updateScrollbar();
    }
  }
 