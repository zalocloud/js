
  var CloudUploader = function(options) {
    this.cloudName = options.cloudName;
    this.uploadPreset = options.uploadPreset; // preset trên Cloudinary
    this.uploadButton = document.querySelector('.upload-images');
    this.uploadButtonCopy = document.querySelector('.upload-images-copy');
    this.spinner = this.uploadButton.querySelector('.spinner');
    this.fileInput = document.querySelector('.input');
    this.statusContainer = document.querySelector('.status');
    this.run();
  };

  CloudUploader.prototype = {
    handleFileSelect: function(file) {
      if (!file) return;

      // Check type: image or video
      const isImage = file.type.match(/image/);
      const isVideo = file.type.match(/video/);

      if (!isImage && !isVideo) {
        return this.showStatus('Invalid format – chỉ ảnh hoặc video', 'bg-danger');
      }

      // Giới hạn size video
      if (isVideo && file.size > 50 * 1024 * 1024) { // 50 MB
        return this.showStatus('Video vượt quá giới hạn 50MB', 'bg-danger');
      }

      this.uploadButton.disabled = true;
      if (this.uploadButtonCopy) this.uploadButtonCopy.disabled = true;
      this.spinner.style.display = 'inline-block';

      // chọn resource_type tùy video hoặc image
      const resourceType = isVideo ? 'video' : 'image';

      const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/upload`;
      var fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', this.uploadPreset);

      fetch(url, {
        method: 'POST',
        body: fd
      })
      .then(res => res.json())
      .then(data => {
        this.uploadButton.disabled = false;
        if (this.uploadButtonCopy) this.uploadButtonCopy.disabled = false;
        this.spinner.style.display = 'none';

        if (data.secure_url) {
          this.showStatus(data.secure_url, 'bg-success');
          this.sendMediaMessage(data.secure_url, resourceType);
        } else {
          this.showStatus('Upload failed', 'bg-danger');
        }
      })
      .catch(err => {
        console.error(err);
        this.showStatus('Upload failed', 'bg-danger');
        this.resetUI();
      });
    },

    showStatus: function(url, statusClass) {
      this.statusContainer.className = 'status ' + statusClass;
      this.statusContainer.innerHTML = statusClass === 'bg-success' ? 'Đã gửi!' : 'Chưa gửi!';
      setTimeout(() => { this.statusContainer.innerHTML = ''; }, 2000);
    },

    sendMediaMessage: function(mediaUrl, mediaType) {
  if (currentUser) {
    var now = new Date();

    // Đảm bảo format 2 chữ số cho giờ/phút/ngày/tháng
    var day = String(now.getDate()).padStart(2, '0');
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var timestamp = `${hours}:${minutes}, ${day} th${month}`;

    var messageId = 'msg-' + Date.now();

    messages.child(messageId).set({
      id: messageId,
      user: currentUser,
      message: mediaUrl,
      time: timestamp,
      type: mediaType
    });

    updateScrollbar();
  }
},


    uploadFile: function() { this.fileInput.click(); },

    resetUI: function() {
      this.uploadButton.disabled = false;
      if (this.uploadButtonCopy) this.uploadButtonCopy.disabled = false;
      this.spinner.style.display = 'none';
    },

    run: function() {
      this.uploadButton.addEventListener('click', this.uploadFile.bind(this));
      if (this.uploadButtonCopy) {
        this.uploadButtonCopy.addEventListener('click', this.uploadFile.bind(this));
      }
      this.fileInput.addEventListener('change', e => {
        if (e.target.files[0]) this.handleFileSelect(e.target.files[0]);
      });
    }
  };

  // Khởi tạo
  new CloudUploader({ cloudName: 'dtlfak5bk', uploadPreset: 'upload_omechat' });
