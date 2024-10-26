document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('openBtn');
    const bottomSheet = document.getElementById('bottomSheet');
    const overlay = document.getElementById('overlay');
    const windowHeight = window.innerHeight;

    const sheetHeight = bottomSheet.clientHeight;

    let startY = 0;
    let currentY = 0;
    let isOpen = false;

    openBtn.addEventListener('click', function () {
      if (isOpen) {
        closeBottomSheet();
      } else {
        openBottomSheet();
      }
    });

    overlay.addEventListener('click', function() {
      closeBottomSheet();
    });

    function openBottomSheet() {
      bottomSheet.style.transition = 'transform 0.3s ease';
      bottomSheet.style.transform = 'translateY(0%)';
      overlay.style.display = 'block';
      isOpen = true;
    }

    function closeBottomSheet() {
      bottomSheet.style.transition = 'transform 0.3s ease';
      bottomSheet.style.transform = 'translateY(100%)';
      overlay.style.display = 'none';
      isOpen = false;
    }

    bottomSheet.addEventListener('touchstart', function (e) {
      startY = e.touches[0].clientY;
      currentY = parseInt(window.getComputedStyle(bottomSheet).getPropertyValue('transform').split(',')[5]);
    });

    bottomSheet.addEventListener('touchmove', function (e) {
      const deltaY = e.touches[0].clientY - startY;
      const newTranslateY = currentY + deltaY;
      if (newTranslateY >= 0 && newTranslateY <= sheetHeight) {
        bottomSheet.style.transition = 'none';
        bottomSheet.style.transform = `translateY(${newTranslateY}px)`;
      }
    });

    bottomSheet.addEventListener('touchend', function (e) {
      const deltaY = e.changedTouches[0].clientY - startY;
      if (deltaY > 0 && Math.abs(deltaY) > 200) { // Kéo trượt xuống và khoảng cách kéo lớn hơn 200px
        closeBottomSheet(); // Tắt bottom sheet
      } else {
        currentY = parseInt(window.getComputedStyle(bottomSheet).getPropertyValue('transform').split(',')[5]);
        if (currentY < -sheetHeight / 2) {
          closeBottomSheet(); // Nếu vị trí hiện tại của bottom sheet vượt qua một nửa chiều cao của nó, tự động đóng bottom sheet
        } else {
          openBottomSheet(); // Ngược lại, mở bottom sheet
        }
      }
    });
});