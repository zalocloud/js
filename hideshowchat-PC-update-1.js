
  // Hàm để cập nhật textContent của nút #hideshowchat
  function updateHideshowChatButton() {
      var messenger = document.querySelector(".avenue-messenger");
      var button = document.getElementById("hideshowchat");
      var messengerSticker = document.querySelector(".messenger-sticker");

      // Cập nhật tên của nút tùy thuộc vào trạng thái hiển thị của messenger
      if (messenger.style.visibility === "hidden") {
          button.textContent = "Hiện đoạn chat";  // Nếu messenger ẩn, thay đổi nút thành "Hiện đoạn chat"
      } else {
          button.textContent = "Ẩn đoạn chat";  // Nếu messenger hiển thị, thay đổi nút thành "Ẩn đoạn chat"
      }

      // Cập nhật trạng thái của messenger-sticker dựa trên trạng thái của messenger
      if (messenger.style.visibility === "hidden") {
          messengerSticker.style.visibility = "visible";  // Hiển thị messenger-sticker nếu messenger ẩn
      } else {
          messengerSticker.style.visibility = "hidden";  // Ẩn messenger-sticker nếu messenger hiển thị
      }
  }

  // Ẩn .avenue-messenger và hiển thị .messenger-sticker khi nhấn vào phần tử có class .hideboxchatpc
  document.querySelectorAll(".hideboxchatpc").forEach(function(button) {
      button.addEventListener("click", function() {
          var messengerDarkmode = document.querySelector(".avenue-messenger");
          var messengerSticker = document.querySelector(".messenger-sticker");

          // Ẩn .avenue-messenger và hiển thị .messenger-sticker
          messengerDarkmode.style.visibility = "hidden";  // Ẩn .avenue-messenger
          messengerSticker.style.visibility = "visible";  // Hiển thị .messenger-sticker

          // Cập nhật nút #hideshowchat sau khi thay đổi trạng thái
          updateHideshowChatButton();
      });
  });

  // Chỉ ẩn .avenue-messenger và .messenger-sticker khi nhấn vào phần tử có class .closeboxchatpc
  document.querySelectorAll(".closeboxchatpc").forEach(function(button) {
      button.addEventListener("click", function() {
          var messengerDarkmode = document.querySelector(".avenue-messenger");
          var messengerSticker = document.querySelector(".messenger-sticker");

          // Ẩn cả .avenue-messenger và .messenger-sticker
          messengerDarkmode.style.visibility = "hidden";  // Ẩn .avenue-messenger
          messengerSticker.style.visibility = "hidden";  // Ẩn .messenger-sticker

          // Cập nhật nút #hideshowchat sau khi thay đổi trạng thái
          updateHideshowChatButton();
      });
  });

  // Hiển thị lại .avenue-messenger khi nhấn vào .messenger-sticker và ẩn nó lại
  document.querySelectorAll(".messenger-sticker").forEach(function(sticker) {
      sticker.addEventListener("click", function() {
          var messengerDarkmode = document.querySelector(".avenue-messenger");
          var messengerSticker = document.querySelector(".messenger-sticker");

          // Hiển thị lại .avenue-messenger và ẩn .messenger-sticker
          messengerDarkmode.style.visibility = "visible";  // Hiển thị .avenue-messenger
          messengerSticker.style.visibility = "hidden";  // Ẩn .messenger-sticker

          // Cập nhật nút #hideshowchat sau khi thay đổi trạng thái
          updateHideshowChatButton();
      });
  });

  // Chức năng sao chép hình ảnh từ #avatar-pc sang #avatar-pc-copy
  var avatarPc = document.getElementById("avatar-pc");
  var avatarPcCopy = document.getElementById("avatar-pc-copy");

  // Tạo một MutationObserver để theo dõi sự thay đổi của nội dung trong #avatar-pc
  var observer = new MutationObserver(function(mutationsList) {
      mutationsList.forEach(function(mutation) {
          if (mutation.type === "attributes" && mutation.attributeName === "src") {
              // Sao chép ảnh từ #avatar-pc sang #avatar-pc-copy khi có sự thay đổi
              var avatarImg = avatarPc.querySelector("img");
              var avatarImgCopy = avatarPcCopy.querySelector("img");
              avatarImgCopy.src = avatarImg.src;  // Sao chép đường dẫn ảnh
          }
      });
  });

  // Cấu hình observer để theo dõi thay đổi thuộc tính "src" trong #avatar-pc
  observer.observe(avatarPc, {
      attributes: true, // Theo dõi thay đổi thuộc tính
      childList: true,  // Theo dõi sự thay đổi trong danh sách con
      subtree: true      // Theo dõi cả cây DOM con của #avatar-pc
  });

  // Chức năng hiện tại của #hideshowchat (nếu bạn muốn giữ chức năng này)
  document.getElementById("hideshowchat").addEventListener("click", function() {
      var messenger = document.querySelector(".avenue-messenger");
      var button = document.getElementById("hideshowchat");
      var messengerSticker = document.querySelector(".messenger-sticker");

      if (messenger.style.visibility === "hidden") {
          messenger.style.visibility = "visible";  // Hiển thị messenger
          messengerSticker.style.visibility = "hidden";  // Ẩn messenger-sticker
          button.textContent = "Ẩn đoạn chat";  // Đổi tên button
      } else {
          messenger.style.visibility = "hidden";  // Ẩn messenger
          messengerSticker.style.visibility = "visible";  // Hiển thị messenger-sticker
          button.textContent = "Hiện đoạn chat";  // Đổi tên button
      }

      // Cập nhật lại trạng thái của nút
      updateHideshowChatButton();
  });

  // Cập nhật ban đầu khi trang được tải
  updateHideshowChatButton();
  
     
