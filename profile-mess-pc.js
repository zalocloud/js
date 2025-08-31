
 document.addEventListener('DOMContentLoaded', function () { 
  //chức năng mở list profile mess
        function toggleDropdown(element) {
            const content = element.nextElementSibling;
            content.classList.toggle('open-messenger');
            element.querySelector('i').classList.toggle('active-messenger');
        }
  
// chức năng cập nhật tên và ảnh đại diện mess
  updateAvatar();
  updateProfileName();
  updateOnlineStatus(); // Gọi lần đầu tiên
  setInterval(updateOnlineStatus, 2000); // Cập nhật mỗi 2 giây


function updateAvatar() {
  if (currentUser === 'mingcki') {
    document.querySelector('#avatar-profile-messenger img').src = avatars['huyhoang'];
  } else if (currentUser === 'huyhoang') {
    document.querySelector('#avatar-profile-messenger img').src = avatars['mingcki'];
  }
}

function updateProfileName() {
  if (currentUser === 'mingcki') {
    document.getElementById('profile-name-messenger').textContent = displayNames['huyhoang'];
  } else if (currentUser === 'huyhoang') {
    document.getElementById('profile-name-messenger').textContent = displayNames['mingcki'];
  }
}

// chức năng cập nhật trạng thái online mess   
function updateOnlineStatus() {
  onlineStatusRef.once('value', function (snapshot) {
    const onlineUsers = snapshot.val() || {};

    let statusText = '';

    if (currentUser === 'mingcki') {
      if (onlineUsers['huyhoang'] && onlineUsers['huyhoang'].online) {
        statusText = 'Đang hoạt động';
      } else {
        const lastActiveTime = onlineUsers['huyhoang']?.lastActiveTime;
        statusText = lastActiveTime ? getTimeAgo(lastActiveTime) : 'Hoạt động gần đây';
      }
    } else if (currentUser === 'huyhoang') {
      if (onlineUsers['mingcki'] && onlineUsers['mingcki'].online) {
        statusText = 'Đang hoạt động';
      } else {
        const lastActiveTime = onlineUsers['mingcki']?.lastActiveTime;
        statusText = lastActiveTime ? getTimeAgo(lastActiveTime) : 'Hoạt động gần đây';
      }
    }

    const onlineMessengerElement = document.getElementById('online-messenger');
    const onlineStatusElement = document.getElementById('online-status-messenger');

    onlineMessengerElement.textContent = statusText;

    // Cập nhật lớp hidden dựa trên nội dung
    if (statusText === 'Đang hoạt động') {
      onlineStatusElement.classList.remove('hidden');
    } else {
      onlineStatusElement.classList.add('hidden');
    }
  });
}

// lấy thời gian
function getTimeAgo(lastActiveTime) {
  const now = new Date().getTime();
  const timeDiff = now - lastActiveTime;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `Hoạt động ${seconds} giây trước`;
  } else if (minutes < 60) {
    return `Hoạt động ${minutes} phút trước`;
  } else if (hours < 24) {
    return `Hoạt động ${hours} giờ trước`;
  } else {
    return `Hoạt động ${days} ngày trước`;
  }
}

// chức năng ẩn hiển thị profile mess và khung tìm kiếm tin nhắn   
document.getElementById('icon-search-messenger').addEventListener('click', function () {
    document.getElementById('profile-container-messenger').classList.add('hidden');
    document.getElementById('container-search-mess').classList.remove('hidden');
  });

  // Thêm sự kiện nhấp chuột vào icon đóng tìm kiếm
document.getElementById('close-search-messenger').addEventListener('click', function () {
    document.getElementById('profile-container-messenger').classList.remove('hidden');
    document.getElementById('container-search-mess').classList.add('hidden');
    // Tự động nhấp vào nút gạt chế độ sáng tối
    document.getElementById('newThemeToggle').click();
  });
  
});

