
    document.addEventListener("DOMContentLoaded", function () {
        const draggable = $('#window-mess');
        const title = $('#title-bar-mess');

        // Chức năng kéo thả popup
        title.on('mousedown', function (e) {
            var dr = $(draggable).addClass("drag-mess");
            var height = dr.outerHeight();
            var width = dr.outerWidth();
            var ypos = dr.offset().top + height - e.pageY,
                xpos = dr.offset().left + width - e.pageX;

            $(document.body).on('mousemove', function (e) {
                var itop = e.pageY + ypos - height;
                var ileft = e.pageX + xpos - width;
                if (dr.hasClass("drag-mess")) {
                    dr.offset({ top: itop, left: ileft });
                }
            }).on('mouseup', function () {
                dr.removeClass("drag-mess");
            });
        });
      
        $("#minimized-icon").hide();

        // Ẩn popup khi trang tải
        $("#window-mess").hide();

        // Kiểm tra và thêm class cho các liên kết Google Drive
        $('a').each(function () {
            var link = $(this).attr('href');
            if (link && (link.includes('docs.google.com') || link.includes('drive.google.com'))) {
                $(this).addClass('google-link-mess');
            }
        });

        // Hiển thị popup khi nhấp vào liên kết Google Drive
        $(document).on('click', '.google-link-mess', function (e) {
            e.preventDefault();
            var link = $(this).attr('href');
            var fileName = $(this).text(); // Lấy nội dung văn bản của liên kết

            $('#loading-message').show();
            $('#content-mess').hide();

            $('#content-mess').attr('src', link);
            var domain = link.split('/')[2];
            var path = link.split('/').slice(3).join('/');
            $('#domain-name-mess').text(domain);
            $('#domain-path-mess').text('/' + path);

            // Cập nhật nội dung cho id="file-name-mess"
            $('#file-name-mess').text(fileName);

            // Cập nhật icon theo phần mở rộng của file
            updateIconByExtension(fileName);

            $("#window-mess").fadeIn();
            $("body").addClass("no-scroll-mess");

            $('#content-mess').on('load', function () {
                $('#loading-message').hide();
                $('#content-mess').show();
            });
        });

        // Hàm cập nhật icon theo phần mở rộng của file
        function updateIconByExtension(fileName) {
            const extension = fileName.split('.').pop().toLowerCase();

            // Map phần đuôi mở rộng với icon Font Awesome
            const extensionIcons = {
                pdf: "fas fa-file-pdf",         // PDF file
                doc: "fas fa-file-word",        // Word document
                docx: "fas fa-file-word",       // Word document
                xls: "fas fa-file-excel",       // Excel file
                xlsx: "fas fa-file-excel",      // Excel file
                ppt: "fas fa-file-powerpoint",  // PowerPoint file
                pptx: "fas fa-file-powerpoint", // PowerPoint file
                jpg: "fas fa-file-image",       // Image file
                jpeg: "fas fa-file-image",      // Image file
                png: "fas fa-file-image",       // Image file
                gif: "fas fa-file-image",       // GIF file
                txt: "fas fa-file-alt",         // Text file
                zip: "fas fa-file-archive",     // Compressed file
                rar: "fas fa-file-archive",     // Compressed file
                mp4: "fas fas fa-video",        // video file
                mp3: "fas fa-file-audio",       // audio file
                default: "fas fa-file",         // Default icon
            };

            // Cập nhật class icon dựa trên extension
            const iconClass = extensionIcons[extension] || extensionIcons.default;
            $('#logo-mess').attr('class', iconClass); // Cập nhật lại class cho icon
        }

        // Nút đóng (exit) popup
        $("#exit-mess").click(function () {
            $("#window-mess").fadeOut();
            $("body").removeClass("no-scroll-mess");
            $('#content-mess').attr('src', '');
        });

        // Nút phóng to popup
        $("#square-mess").click(function () {
            if ($("#window-mess").hasClass("enlarged-mess")) {
                $("#window-mess").css("width", "30%");
                $("#window-mess").removeClass("enlarged-mess");
            } else {
                $("#window-mess").css("width", "70%");
                $("#window-mess").addClass("enlarged-mess");
            }
        });

        // Nút thu nhỏ popup
        $("#minimize-mess").click(function () {
            $("#window-mess").fadeOut();
            $("body").removeClass("no-scroll-mess");
            $("#minimized-icon").fadeIn(); // Hiển thị biểu tượng thu nhỏ
        });

        // Hiển thị lại popup khi nhấp vào biểu tượng thu nhỏ
        $("#minimized-icon").click(function () {
            $("#window-mess").fadeIn();
            $("body").addClass("no-scroll-mess");
            $("#minimized-icon").fadeOut(); // Ẩn biểu tượng thu nhỏ
        });
    });
