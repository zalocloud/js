// Firebase reference cho trạng thái tin nhắn chưa đọc
var unreadMessagesRef = fb.child("unreadMessages");

// Biến cờ kiểm tra lần focus đầu tiên
var hasFocused = false;

// Hàm kiểm tra tin nhắn mới
function checkNewMessages() {
  // Sử dụng .limitToLast() để chỉ lắng nghe những tin nhắn mới nhất, ví dụ 50 tin nhắn
  messages.limitToLast(50).on("child_added", function (snap) {
    var message = snap.val();
    var user = message.user;

    // Chỉ tăng số lượng tin nhắn chưa đọc khi tin nhắn không phải của người dùng hiện tại
    if (user !== currentUser) {
      // Cập nhật số lượng tin nhắn chưa đọc cho người nhận
      unreadMessagesRef.child(user).transaction(function(currentUnreadCount) {
        return (currentUnreadCount || 0) + 1;
      }, function(error, committed, snapshot) {
        if (committed && hasFocused) {
          updateNotification(); // Cập nhật thông báo khi có tin nhắn mới và đã focus ít nhất một lần
        }
      });
    }
  });
}

// Hàm cập nhật thông báo về số lượng tin nhắn chưa đọc
function updateNotification() {
  // Lấy số lượng tin nhắn chưa đọc từ Firebase
  unreadMessagesRef.child(currentUser === "huyhoang" ? "mingcki" : "huyhoang").once("value", function(snapshot) {
    var unreadCount = snapshot.val() || 0;
    var otherUser = currentUser === "huyhoang" ? "mingcki" : "huyhoang";
    var otherUserName = (otherUser === "mingcki") ? "Vợ iu" : "Ck iu";  // Xác định tên người dùng

    // Cập nhật thông báo trong giao diện
    if (unreadCount > 0) {
      $('#notification').show().text(`${unreadCount}`);
    } else {
      $('#notification').hide();
    }

    // Chỉ cập nhật thẻ <title> nếu người dùng đã focus ít nhất một lần
    if (hasFocused) {
      // Cập nhật tên tiêu đề, kèm theo tên người dùng và số lượng tin nhắn chưa đọc
      document.title = unreadCount > 0 
        ? `(${unreadCount}) ${otherUserName}` 
        : "Huy Hoàng 💖 Minh Chi";
    }
  });
}

// Hàm xử lý khi người dùng focus vào ô nhập liệu
function markMessagesAsRead() {
  // Khi người dùng focus vào ô nhập liệu hoặc gõ chữ, reset số lượng tin nhắn chưa đọc
  var targetUser = currentUser === "huyhoang" ? "mingcki" : "huyhoang";
  unreadMessagesRef.child(targetUser).set(0, function(error) {
    if (error) {
      console.log("Lỗi khi cập nhật trạng thái tin nhắn chưa đọc:", error);
    }
  });

  // Cập nhật lại thông báo sau khi reset
  updateNotification();
}

// Lắng nghe sự kiện khi người dùng focus vào ô nhập liệu
$(document).on('focus', 'input.message', function () {
  if (!hasFocused) {
    hasFocused = true;  // Đánh dấu là đã focus ít nhất một lần
  }
  markMessagesAsRead(); // Reset khi focus vào ô nhập liệu
});

// Lắng nghe sự kiện khi người dùng gõ chữ vào ô nhập liệu
$(document).on('input', 'input.message', function () {
  if (!hasFocused) {
    hasFocused = true;  // Đánh dấu là đã gõ chữ, không chỉ focus
  }
  markMessagesAsRead(); // Reset khi gõ chữ vào ô nhập liệu
});

// Khôi phục trạng thái số lượng tin nhắn chưa đọc từ Firebase khi tải lại trang
function restoreUnreadMessages() {
  var targetUser = currentUser === "huyhoang" ? "mingcki" : "huyhoang";
  
  unreadMessagesRef.child(targetUser).once("value", function(snapshot) {
    var unreadCount = snapshot.val() || 0;
    if (unreadCount > 0 && hasFocused) {
      $('#notification').show().text(`Có ${unreadCount} tin nhắn mới`);
    } else {
      $('#notification').hide();
    }

    // Chỉ cập nhật thẻ <title> khi đã focus
    if (hasFocused) {
      document.title = unreadCount > 0 ? `(${unreadCount}) Ck iu` : "Huy Hoàng 💖 Minh Chi";
    }
  });
}

// Khởi chạy chức năng khi người dùng đăng nhập
if (currentUser) {
  restoreUnreadMessages(); // Khôi phục số lượng tin nhắn chưa đọc từ Firebase
  checkNewMessages(); // Bắt đầu theo dõi tin nhắn mới khi người dùng đã đăng nhập
}
