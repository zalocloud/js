
  document.addEventListener('DOMContentLoaded', function () {
    const popupSheetContainer = document.getElementById('popupSheetContainer');
    const closePopupButton = document.getElementById('closePopupButton'); // Lấy nút đóng
    let touchStartY = 0;
    let currentY = 0;
    let isDragging = false;

    // Lắng nghe sự kiện bắt đầu kéo
    popupSheetContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY; // Lưu tọa độ Y khi bắt đầu kéo
        isDragging = true;
    });

    // Lắng nghe sự kiện khi kéo
    popupSheetContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        currentY = e.touches[0].clientY; // Lấy tọa độ Y khi đang kéo
        const deltaY = currentY - touchStartY; // Tính khoảng cách di chuyển

        // Nếu khoảng cách kéo xuống lớn hơn 0, thay đổi độ trong suốt của background và nút đóng
        if (deltaY > 0) {
            const opacity = Math.min(1 - deltaY / (popupSheetContainer.offsetHeight * 0.3), 1); 
            popupSheetContainer.style.backgroundColor = `rgba(48, 4, 53, ${opacity})`; // Cập nhật màu nền với opacity thay đổi
            closePopupButton.style.opacity = opacity; // Cập nhật opacity của nút đóng
        }
    });

    // Lắng nghe sự kiện khi kết thúc kéo
    popupSheetContainer.addEventListener('touchend', () => {
        isDragging = false;

        // Nếu kéo xuống quá 50% chiều cao thì có thể đóng bottom sheet (ví dụ, có thể gọi hàm closePopupSheet() ở đây)
        const deltaY = currentY - touchStartY;
        if (deltaY > popupSheetContainer.offsetHeight / 2) {
            // Đóng bottom sheet nếu kéo xuống quá 50%
            closePopupSheet();
        } else {
            // Giữ nguyên màu nền và opacity của nút đóng nếu không kéo đủ
            popupSheetContainer.style.backgroundColor = 'rgba(48, 4, 53, 1)';
            closePopupButton.style.opacity = 1; // Đặt opacity của nút đóng về 1
        }
    });

    // Hàm đóng bottom sheet (ví dụ)
    function closePopupSheet() {
        popupSheetContainer.style.transform = 'translateY(100%)';
        document.body.classList.remove('no-scroll');
    }
});
