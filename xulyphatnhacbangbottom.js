 document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('openBtn');
    const bottomSheet = document.getElementById('bottomSheet');
    const audioId = document.getElementById('audio0'); // Đặt id cho audio element của bạn và thay thế 'audio0' bằng id tương ứng
    const playButton = document.getElementById('playable0');
    const playIcon = playButton.querySelector('.play');
    const pauseIcon = playButton.querySelector('.pause');

    // Bổ sung event listener để mở bottom sheet và phát nhạc tự động
    openBtn.addEventListener('click', function () {
        openBottomSheet();
        playAudio();
    });

    // Bổ sung event listener để xử lý sự kiện click trên SVG play/pause control
    playButton.addEventListener('click', function () {
        if (audioId.paused) {
            audioId.play();
        } else {
            audioId.pause();
        }
    });

    audioId.addEventListener('playing', function () {
        // Xử lý khi audio bắt đầu phát
        console.log('Audio is playing');
        playButton.classList.add('playing');
    });

    audioId.addEventListener('pause', function () {
        // Xử lý khi audio tạm dừng
        console.log('Audio is paused');
        playButton.classList.remove('playing');
    });

    audioId.addEventListener('timeupdate', function() {
        var duration = audioId.duration;
        var currentTime = audioId.currentTime;
        var progress = (currentTime / duration) * 100; // Tính toán phần trăm tiến trình

        var progressCircles = playButton.querySelectorAll('.progress-track, .precache-bar, .progress-bar');
        var circleRadius = parseFloat(progressCircles[0].getAttribute('r'));
        var circleCircumference = 2 * Math.PI * circleRadius;

        for (var i = 0; i < progressCircles.length; i++) {
            var dashOffset = circleCircumference * (1 - progress / 100); // Tính toán stroke-dashoffset
            progressCircles[i].style.strokeDashoffset = dashOffset;
        }
    });

    function openBottomSheet() {
        bottomSheet.style.transition = 'transform 0.3s ease';
        bottomSheet.style.transform = 'translateY(0%)';
    }

    function playAudio() {
        audioId.play();
    }
});
