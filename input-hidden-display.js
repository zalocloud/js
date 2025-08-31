// ẩn hiện các icon khi focus vào input
$(document).ready(function() {
  // Lúc đầu ẩn nút gửi và hiển thị nút trái tim
  $('#reaction-heart').show();
  $('.send-btn').hide();

  // Khi người dùng bắt đầu nhập vào ô input
  $('.message').on('input', function() {
    var message = $(this).val().trim(); // Lấy giá trị trong ô input và loại bỏ khoảng trắng

    if (message.length > 0) {
      // Nếu có nhập dữ liệu thì ẩn trái tim và hiển thị nút gửi
      $('#reaction-heart').fadeOut(0); // Ẩn nút trái tim ngay lập tức
      $('.send-btn').fadeIn(0); // Hiển thị nút gửi ngay lập tức

      // Ẩn phần tử upload-images
      $('.upload-images').fadeOut(0);

      // Ẩn các phần tử .sticker-chatfb, .gif-chatfb, .upload-voice
      $('.sticker-chatfb').fadeOut(0);
      $('.gif-chatfb').fadeOut(0);
      $('.upload-voice').fadeOut(0);

      // Cập nhật margin-left của message-input-container
     // $('.message-input-container').css('margin-left', '25px');
    } else {
      // Nếu không có nhập dữ liệu thì ẩn nút gửi và hiển thị nút trái tim
      $('#reaction-heart').fadeIn(0); // Hiển thị nút trái tim ngay lập tức
      $('.send-btn').fadeOut(0); // Ẩn nút gửi ngay lập tức

      // Hiển thị lại phần tử upload-images
      $('.upload-images').fadeIn(0);

      // Hiển thị lại các phần tử .sticker-chatfb, .gif-chatfb, .upload-voice
      $('.sticker-chatfb').fadeIn(0);
      $('.gif-chatfb').fadeIn(0);
      $('.upload-voice').fadeIn(0);

      // Cập nhật margin-left của message-input-container trở lại giá trị cũ
      $('.message-input-container').css('margin-left', '10px');
    }
  });

  // Khi người dùng nhấn nút gửi
  $('.send-btn').on('click', function() {
    // Ẩn nút gửi và hiển thị lại nút trái tim
    $('#reaction-heart').fadeIn(0); // Hiển thị nút trái tim ngay lập tức
    $('.send-btn').fadeOut(0); // Ẩn nút gửi ngay lập tức

    // Xóa nội dung trong ô input sau khi gửi
    $('.message').val('');

    // Đặt lại margin-left của message-input-container
    $('.message-input-container').css('margin-left', '10px');

    // Hiển thị lại phần tử upload-images
    $('.upload-images').fadeIn(0);

    // Hiển thị lại các phần tử .sticker-chatfb, .gif-chatfb, .upload-voice
    $('.sticker-chatfb').fadeIn(0);
    $('.gif-chatfb').fadeIn(0);
    $('.upload-voice').fadeIn(0);
  });

  // Khi người dùng nhấn Enter trong ô nhập liệu
  $('.message').on('keydown', function(e) {
    if (e.key === "Enter" && $(this).val().trim().length > 0) {
      // Gửi tin nhắn
      $('.send-btn').click(); // Giả lập click nút gửi

      // Ẩn nút gửi và hiển thị lại nút trái tim sau khi gửi
      $('#reaction-heart').fadeIn(0); // Hiển thị nút trái tim ngay lập tức
      $('.send-btn').fadeOut(0); // Ẩn nút gửi ngay lập tức

      // Xóa nội dung trong ô input
      $(this).val('');

      // Đặt lại margin-left của message-input-container
      $('.message-input-container').css('margin-left', '10px');

      // Hiển thị lại phần tử upload-images
      $('.upload-images').fadeIn(0);

      // Hiển thị lại các phần tử .sticker-chatfb, .gif-chatfb, .upload-voice
      $('.sticker-chatfb').fadeIn(0);
      $('.gif-chatfb').fadeIn(0);
      $('.upload-voice').fadeIn(0);
    }
  });

  // Khi người dùng nhấn nút emoji-btn
  $('.emoji-btn').on('click', function() {
    // Hiển thị nút gửi và ẩn nút trái tim
    $('#reaction-heart').fadeOut(0); // Ẩn nút trái tim ngay lập tức
    $('.send-btn').fadeIn(0); // Hiển thị nút gửi ngay lập tức
  });
  
  // Khi người dùng nhấn emoji-sticker
  $('.emoji-sticker').on('click', function() {
    // Hiển thị nút gửi và ẩn nút trái tim
    $('.send-btn').fadeOut(0); // Ẩn nút gửi ngay lập tức
    $('#reaction-heart').fadeIn(0); // Hiển thị nút trái tim ngay lập tức
  });
});
//]]>
