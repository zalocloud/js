
  // Lấy tất cả các phần tử có class "uploadfile"
  const uploadButtons = document.querySelectorAll('.uploadfile');
  const hiddenInput = document.getElementById('hidden-upload');
  const uploading = document.getElementById('uploading');
  const uploaded = document.getElementById('uploaded');

  // Lặp qua tất cả các phần tử "uploadfile" và thêm sự kiện click
  uploadButtons.forEach(function(uploadButton) {
    uploadButton.addEventListener('click', function() {
      hiddenInput.click(); // Kích hoạt hộp thoại chọn file
    });
  });

  // Xử lý khi người dùng chọn file
  hiddenInput.addEventListener('change', function() {
    const file = this.files[0]; // Lấy tệp đã chọn
    if (!file) return; // Nếu không có tệp, thoát

    // Hiển thị thông báo đang tải lên
    uploading.innerHTML = "Đang tải tệp lên, vui lòng đợi...";

    const fr = new FileReader();
    fr.readAsArrayBuffer(file);

    fr.onload = (f) => {
      const orgName = file.name; // Lấy tên tệp gốc

      const url = "https://script.google.com/macros/s/AKfycbyEvwKzBn1kd3PF2WqWywGB9aQvNsTQ9sDn3jLNWldCXrdTRu6GvzBsNwBdhShI1fxMpA/exec";
      
      const qs = new URLSearchParams({ filename: orgName, mimeType: file.type });  // Truyền tên tệp gốc
      fetch(`${url}?${qs}`, { method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)]) })
        .then(res => res.json())
        .then(e => {
          // Ẩn thông báo đang tải lên
          uploading.innerHTML = "";

          // Gửi file vào tin nhắn (gọi hàm sendFileMessage sau khi tải lên thành công)
          sendFileMessage(e.fileUrl, orgName);  // Gửi fileUrl và tên file
        })
        .catch(err => {
          // Hiển thị lỗi nếu có
          uploading.innerHTML = "Có lỗi xảy ra khi tải tệp lên.";
          console.log(err);
        });
    };
  });

  // Chức năng gửi file vào tin nhắn
  function sendFileMessage(fileUrl, fileName) {
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
