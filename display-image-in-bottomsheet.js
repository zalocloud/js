// hiển thị hình ảnh trong bottom sheet khi nhấp vào ảnh trong đoạn chat
 document.addEventListener('DOMContentLoaded', function () {
    const openLoginPopup = document.getElementById('openLoginPopup');
    const popupSheetContainer = document.getElementById('popupSheetContainer');
    const closePopupButton = document.getElementById('closePopupButton');
    const imageContainer = document.getElementById('imageContainer'); // Phần chèn ảnh
    const prevImageButton = document.getElementById('prevImageButton'); // Nút trái
    const nextImageButton = document.getElementById('nextImageButton'); // Nút phải
    const imagesList = []; // Danh sách các URL ảnh từ Imgur
    let currentImageIndex = -1; // Chỉ số ảnh hiện tại
    let isPopupOpen = false;

    let touchStartX = 0;
    let touchEndX = 0;
    let startX = 0;
    let currentX = 0;
    let touchStartY = 0;
    let currentY = 0;
    let isSwiping = false;
    let isDragging = false;

    // Lắng nghe sự kiện nhấp vào hình ảnh để mở bottom sheet
    document.addEventListener('click', function (event) {
        const imageElement = event.target;

        // Kiểm tra nếu là hình ảnh và nó từ Imgur
        if (imageElement.tagName === 'IMG' && isImgurUrl(imageElement.src)) {
            openPopupSheet(imageElement.src); // Mở bottom sheet và chèn hình ảnh vào
        }
    });

    // Kiểm tra URL hình ảnh có phải từ Imgur không
    function isImgurUrl(url) {
        return url.includes('imgur.com');
    }

    // Mở bottom sheet và chèn hình ảnh vào
    function openPopupSheet(imageUrl) {
        imagesList.length = 0; // Clear previous list
        currentImageIndex = -1; // Reset chỉ số ảnh hiện tại

        // Lấy tất cả các ảnh Imgur từ trang và thêm vào danh sách
        document.querySelectorAll('img').forEach((img) => {
            if (isImgurUrl(img.src) && !imagesList.includes(img.src)) {
                imagesList.push(img.src);
            }
        });

        // Lưu chỉ số của ảnh hiện tại trong danh sách
        currentImageIndex = imagesList.indexOf(imageUrl);

        // Nếu ảnh không có trong danh sách, không mở bottom sheet
        if (currentImageIndex === -1) {
            return;
        }

        displayImage(imagesList[currentImageIndex]); // Hiển thị ảnh hiện tại

        popupSheetContainer.style.transform = 'translateY(0)';
        document.body.classList.add('no-scroll'); // Khóa cuộn trang
        isPopupOpen = true;
        history.pushState({ isBottomSheetOpen: true }, ""); // Thêm trạng thái vào history
    }

    // Hiển thị hình ảnh hiện tại
    function displayImage(imageUrl) {
        imageContainer.innerHTML = `<img src="${imageUrl}" class="image-chat">`;
    }

    // Xử lý sự kiện trượt trái phải để thay đổi ảnh
    popupSheetContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        startX = touchStartX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
        isDragging = false;
    });

    popupSheetContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;

        touchEndX = e.touches[0].clientX;
        currentX = touchEndX;
        const deltaX = startX - currentX;

        // Nếu deltaX > 0, có nghĩa là đang trượt sang trái, còn ngược lại là sang phải
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                showNextImage(); // Chuyển đến ảnh tiếp theo
            } else {
                showPreviousImage(); // Quay lại ảnh trước
            }
            isSwiping = false;
        } else {
            currentY = e.touches[0].clientY;
            const translateY = currentY - touchStartY;

            if (translateY > 0) {
                isDragging = true; // Bắt đầu kéo xuống
                popupSheetContainer.style.transform = `translateY(${translateY}px)`;
            }
        }
    });

    popupSheetContainer.addEventListener('touchend', () => {
        if (isDragging) {
            const translateY = currentY - touchStartY;
            if (translateY > 100) {
                closePopupSheet(); // Đóng bottom sheet nếu kéo xuống quá 100px
            } else {
                popupSheetContainer.style.transform = 'translateY(0)'; // Giữ nguyên bottom sheet nếu không kéo đủ
            }
        }
        isSwiping = false;
        isDragging = false;
    });

    // Hiển thị ảnh tiếp theo
    function showNextImage() {
        if (currentImageIndex < imagesList.length - 1) {
            currentImageIndex++;
            displayImage(imagesList[currentImageIndex]);
        }
    }

    // Hiển thị ảnh trước
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            displayImage(imagesList[currentImageIndex]);
        }
    }

    // Thêm sự kiện cho nút "tiếp theo" và "trước"
    prevImageButton.addEventListener('click', showPreviousImage);
    nextImageButton.addEventListener('click', showNextImage);

    // Đóng bottom sheet khi nhấn nút đóng
    closePopupButton.addEventListener('click', closePopupSheet);

    function closePopupSheet() {
        popupSheetContainer.style.transform = 'translateY(100%)';
        document.body.classList.remove('no-scroll'); // Mở lại cuộn trang
        isPopupOpen = false;
        // Quay lại trạng thái trước đó trong lịch sử
        history.pushState(null, "");
    }

    // Lắng nghe sự kiện quay lại (Back button)
    window.addEventListener('popstate', function (event) {
        if (isPopupOpen) {
            closePopupSheet();
        }
    });
});
