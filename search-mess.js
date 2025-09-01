
  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const clearSearchButton = document.getElementById('clear-search');
    const searchResults = document.getElementById('search-results');
    const messagesRef = fb.child('messages');  // Tham chiếu đến Firebase Realtime Database

    // Biểu thức chính quy để tìm các liên kết hình ảnh
    const imageRegex = /https?:\/\/[^\s]+(\.(jpg|jpeg|png|webp|gif))/i;

    // Lọc thông minh các tin nhắn
    function filterMessages(query) {
      messagesRef.once('value', function(snapshot) {
        searchResults.innerHTML = ''; // Clear previous results
        const messages = snapshot.val();

        for (const id in messages) {
          const message = messages[id];
          
          // Kiểm tra nếu tin nhắn có chứa từ khóa tìm kiếm
          if (message.message.toLowerCase().includes(query.toLowerCase())) {
            const messageElement = document.createElement('li');
            
            // Kiểm tra nếu tin nhắn có liên kết hình ảnh hợp lệ
            let messageContent = message.message;
            const imageMatch = messageContent.match(imageRegex);
            
            if (imageMatch) {
              // Nếu có liên kết hình ảnh, thay thế URL đó bằng thẻ <img>
              const imageUrl = imageMatch[0];
              messageContent = messageContent.replace(imageUrl, `<img src="${imageUrl}" style="max-width: 70px; height: auto;" />`);
            }

            // Tạo phần tử hiển thị tin nhắn
            messageElement.innerHTML = `
              <img src="${avatars[message.user]}" alt="Avatar" class="avatar">
              <div class="message-info">
                <span class="sender">${displayNames[message.user]}</span>
                <span class="time">${message.time}</span>
                <p class="content">${messageContent}</p>
              </div>
            `;
            
            // Thêm tin nhắn vào kết quả tìm kiếm
            searchResults.appendChild(messageElement);
          }
        }
      });
    }

    // Xử lý khi nhập vào thanh tìm kiếm
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.trim();
      if (query) {
        filterMessages(query);  // Lọc tin nhắn dựa trên từ khóa
      } else {
        searchResults.innerHTML = '';  // Xóa kết quả nếu ô tìm kiếm trống
      }
    });

    // Xử lý khi nhấn nút xóa tìm kiếm
    clearSearchButton.addEventListener('click', function () {
      searchInput.value = '';  // Xóa nội dung ô tìm kiếm
      searchResults.innerHTML = '';  // Xóa kết quả tìm kiếm
    });
  });
