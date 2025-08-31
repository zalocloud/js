
 document.addEventListener('DOMContentLoaded', function () {
    const zoomInButton = document.getElementById('zoomInButton');
    const zoomOutButton = document.getElementById('zoomOutButton');
    const imageContainer = document.getElementById('imageContainer'); // Phần tử chứa ảnh
    const prevImageButton = document.getElementById('prevImageButton'); // Nút trái
    const nextImageButton = document.getElementById('nextImageButton'); // Nút phải
    let imageElement = null; // Biến chứa phần tử ảnh
    let zoomLevel = 1; // Mức độ zoom ban đầu
    const imagesList = []; // Danh sách các URL ảnh từ Imgur
    let currentImageIndex = -1; // Chỉ số ảnh hiện tại

    // Hàm cập nhật tỷ lệ zoom cho ảnh
    function updateImageScale() {
        if (imageElement) {
            imageElement.style.transform = `scale(${zoomLevel})`; // Áp dụng scale
            imageElement.style.transition = 'transform 0.2s ease'; // Hiệu ứng mượt mà khi zoom
        }
    }

    // Hiển thị hình ảnh hiện tại
    function displayImage(imageUrl) {
        // Cập nhật phần tử ảnh và set lại scale
        imageContainer.innerHTML = `<img src="${imageUrl}" class="image-chat">`;
        imageElement = imageContainer.querySelector('img'); // Lấy phần tử ảnh mới
        zoomLevel = 1; // Đặt lại zoomLevel khi chuyển ảnh
        updateImageScale(); // Đảm bảo tỷ lệ zoom ban đầu là 1
    }

    // Khi nhấn nút zoom in
    zoomInButton.addEventListener('click', function () {
        if (imageElement) {
            zoomLevel += 0.25; // Tăng mức zoom (mỗi lần tăng 0.25)
            updateImageScale(); // Cập nhật tỷ lệ zoom cho ảnh
        }
    });

    // Khi nhấn nút zoom out
    zoomOutButton.addEventListener('click', function () {
        if (imageElement && zoomLevel > 1) { // Đảm bảo không thu nhỏ ảnh nhỏ hơn kích thước ban đầu
            zoomLevel -= 0.25; // Giảm mức zoom (mỗi lần giảm 0.25)
            updateImageScale(); // Cập nhật tỷ lệ zoom cho ảnh
        }
    });

    // Thực thi khi popup sheet mở và hiển thị ảnh
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

    // Lắng nghe sự kiện nhấp vào ảnh để mở bottom sheet
    document.addEventListener('click', function (event) {
        const imageElement = event.target;
        if (imageElement.tagName === 'IMG' && isImgurUrl(imageElement.src)) {
            openPopupSheet(imageElement.src); // Mở bottom sheet với ảnh được nhấp
        }
    });

    // Kiểm tra URL hình ảnh có phải từ Imgur không
    function isImgurUrl(url) {
        return url.includes('imgur.com');
    }

    // Hiển thị ảnh tiếp theo
    function showNextImage() {
        if (currentImageIndex < imagesList.length - 1) {
            currentImageIndex++;
            displayImage(imagesList[currentImageIndex]); // Hiển thị ảnh tiếp theo
        }
    }

    // Hiển thị ảnh trước
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            displayImage(imagesList[currentImageIndex]); // Hiển thị ảnh trước
        }
    }

    // Lắng nghe sự kiện click vào nút chuyển ảnh
    prevImageButton.addEventListener('click', showPreviousImage);
    nextImageButton.addEventListener('click', showNextImage);

    // Đóng bottom sheet khi nhấn nút đóng
    closePopupButton.addEventListener('click', closePopupSheet);

    // Hàm đóng bottom sheet
    function closePopupSheet() {
        popupSheetContainer.style.transform = 'translateY(100%)';
        document.body.classList.remove('no-scroll');
        isPopupOpen = false;
        // Reset zoom về ban đầu
        zoomLevel = 1; // Đặt lại zoomLevel khi đóng bottom sheet
        if (imageElement) {
            imageElement.style.transform = `scale(1)`; // Reset zoom của ảnh
        }
        history.pushState(null, "");
    }

    // Lắng nghe sự kiện quay lại (Back button)
    window.addEventListener('popstate', function (event) {
        if (isPopupOpen) {
            closePopupSheet();
        }
    });
});
