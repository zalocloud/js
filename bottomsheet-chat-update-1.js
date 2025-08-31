// JS Bottom Sheet Danh Sách Nhạc
  document.addEventListener('DOMContentLoaded', function () {
      const customOpenButton = document.getElementById('customOpenButton');
      const customBottomSheetContainer = document.getElementById('customBottomSheetContainer');
      const customCloseButton = document.getElementById('customCloseButton');
      let isCustomOpen = false;

      customOpenButton.addEventListener('click', function () {
          if (isCustomOpen) {
              closeCustomBottomSheet();
          } else {
              openCustomBottomSheet();
          }
      });

      customCloseButton.addEventListener('click', closeCustomBottomSheet);

      function openCustomBottomSheet() {
          customBottomSheetContainer.style.transform = 'translateY(0)';
          isCustomOpen = true;
      }

      function closeCustomBottomSheet() {
          customBottomSheetContainer.style.transform = 'translateY(100%)';
          isCustomOpen = false;
      }
  });

  // JS Bottom Sheet Trình Phát Nhạc
  document.addEventListener('DOMContentLoaded', function () {
      const openBtnFace = document.getElementById('openBtn-face');
      const bottomSheetFace = document.getElementById('bottomSheet-face');
      const closeIcon = document.getElementById('closeIcon');
      let isOpenFace = false;

      openBtnFace.addEventListener('click', function () {
          if (isOpenFace) {
              closeBottomSheetFace();
          } else {
              openBottomSheetFace();
          }
      });

      closeIcon.addEventListener('click', closeBottomSheetFace);

      function openBottomSheetFace() {
          bottomSheetFace.style.transform = 'translateY(0)';
          isOpenFace = true;
      }

      function closeBottomSheetFace() {
          bottomSheetFace.style.transform = 'translateY(100%)';
          isOpenFace = false;
      }
  });

  // Toggle Table (Ẩn/Hiện bảng)
  function toggleTable() {
      var tableContainer = document.getElementById('table-container');
      if (tableContainer.style.maxHeight === '0px' || tableContainer.style.maxHeight === '') {
          tableContainer.style.maxHeight = '1000px';  // Điều chỉnh chiều cao theo bảng
      } else {
          tableContainer.style.maxHeight = '0px';
      }
  }

