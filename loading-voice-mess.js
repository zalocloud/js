
    let isRunning = false;
    let interval;
    const barsContainer = document.querySelector('.bars-container');
    const startButtons = document.querySelectorAll('.start-voice-icon');
    const pauseButton = document.getElementById('pause-voice-icon');
    const deleteButton = document.getElementById('delete-voice');
    const uploadFileButton = document.getElementById('uploadfile-messenger'); // Nút upload file

    // Sự kiện cho các nút Start
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!isRunning) {
                startAddingBars();
            }
        });
    });

    // Sự kiện cho nút Pause
    pauseButton.addEventListener('click', () => {
        stopAddingBars();
        //resetBars();
    });

    // Sự kiện cho nút Delete
    deleteButton.addEventListener('click', () => {
        resetBars();
    });

    // Sự kiện cho nút Upload File
    uploadFileButton.addEventListener('click', () => {
        resetBars();
    });

    // Hàm thêm vạch thấp cao
    function startAddingBars() {
        isRunning = true;
        interval = setInterval(() => {
            // Kiểm tra số lượng bar-voice hiện tại
            if (barsContainer.children.length >= 25) {
                stopAddingBars();
                return;
            }

            // Tạo vạch mới với lớp .bar-voice
            const bar = document.createElement('div');
            bar.classList.add('bar-voice');
            barsContainer.appendChild(bar);

            // Kiểm tra nếu vạch đã chạm vào lề bên phải, thì ẩn thanh cuộn
            if (barsContainer.scrollWidth > barsContainer.clientWidth) {
                barsContainer.scrollLeft = barsContainer.scrollWidth;
            }
        }, 300);  // Cập nhật mỗi 300ms
    }

    // Hàm dừng thêm vạch
    function stopAddingBars() {
        isRunning = false;
        clearInterval(interval);
    }

    // Hàm xóa tất cả vạch
    function resetBars() {
        isRunning = false;
        clearInterval(interval);
        barsContainer.innerHTML = '';  // Xóa tất cả vạch
    }
