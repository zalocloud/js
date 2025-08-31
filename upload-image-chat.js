// upload image chat
    var Imgur = function(options) {
        this.clientid = options.clientid;
        this.endpoint = 'https://api.imgur.com/3/image';
        this.uploadButton = document.querySelector('.upload-images');
        this.uploadButtonCopy = document.querySelector('.upload-images-copy'); // Thêm phần tử mới cho upload-images-copy
        this.spinner = this.uploadButton.querySelector('.spinner');
        this.fileInput = document.querySelector('.input');
        this.statusContainer = document.querySelector('.status');
        this.run();
    };

    Imgur.prototype = {
        post: function(path, data, callback) {
            var xhttp = new XMLHttpRequest();
            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientid);
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) callback(JSON.parse(this.responseText));
            };
            xhttp.send(data);
        },
        handleFileSelect: function(file) {
            if (!file.type.match(/image/)) return this.showStatus('Invalid file format', 'bg-danger');
            
            // Vô hiệu hóa nút và hiển thị vòng quay
            this.uploadButton.disabled = true;
            this.uploadButtonCopy.disabled = true;
            this.spinner.style.display = 'inline-block';

            var fd = new FormData();
            fd.append('image', file);
            this.post(this.endpoint, fd, function(data) {
                // Kích hoạt lại nút và ẩn vòng quay
                this.uploadButton.disabled = false;
                this.uploadButtonCopy.disabled = false;
                this.spinner.style.display = 'none';

                if (data.success) {
                    this.showStatus(data.data.link, 'bg-success');
                    this.sendImageMessage(data.data.link); // Gửi ảnh vào chat trực tiếp
                } else {
                    this.showStatus('Upload failed', 'bg-danger');
                }
            }.bind(this));
        },
      
        showStatus: function(url, statusClass) {
            this.statusContainer.className = 'status ' + statusClass;

            // Hiển thị thông báo thành công hoặc thất bại
            if (statusClass === 'bg-success') {
                this.statusContainer.innerHTML = 'Đã gửi ảnh!';
            } else {
                this.statusContainer.innerHTML = 'Ảnh chưa được gửi!';
            }

            // Ẩn thông báo sau 2 giây
            setTimeout(function() {
                this.statusContainer.innerHTML = ''; // Xóa nội dung thông báo
            }.bind(this), 2000); // 2000ms = 2 giây
        },
      
        sendImageMessage: function(imageUrl) {
            // Kiểm tra người dùng đã đăng nhập chưa
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

                // Tin nhắn chứa URL ảnh
                var messageContent = imageUrl;

                // Lưu tin nhắn vào danh sách
                messages.push({
                    id: messageId,
                    user: currentUser,
                    message: messageContent,
                    time: timestamp
                });

                // Cập nhật giao diện chat (giả sử bạn đã có hàm updateScrollbar)
                updateScrollbar();
            }
        },
        uploadFile: function() { this.fileInput.click(); },
        resetUI: function() {
            // Reset trạng thái nút và spinner sau mỗi lần tải ảnh
            this.uploadButton.disabled = false;
            this.uploadButtonCopy.disabled = false;
            this.spinner.style.display = 'none';
        },
        run: function() {
            // Gắn sự kiện click cho nút tải ảnh chính
            this.uploadButton.addEventListener('click', this.uploadFile.bind(this));
            
            // Gắn sự kiện click cho nút mới .upload-images-copy
            if (this.uploadButtonCopy) {
                this.uploadButtonCopy.addEventListener('click', this.uploadFile.bind(this));
            }

            // Sự kiện thay đổi file
            this.fileInput.addEventListener('change', function(e) { 
                if (e.target.files[0]) {
                    this.handleFileSelect(e.target.files[0]);
                }
            }.bind(this));
        }
    };

    new Imgur({ clientid: 'f442ebe2efe3fc7' });
