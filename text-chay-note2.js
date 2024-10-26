 document.addEventListener("DOMContentLoaded", function() {
    const scrollingTextNote = document.getElementById("scrollingText-note");
    const part2Note = document.querySelector(".part2-note");

    function checkPosition() {
        const textRectNote = scrollingTextNote.getBoundingClientRect();
        const part3RectNote = document.querySelector('.part3-note').getBoundingClientRect();

        // Kiểm tra nếu vị trí bên trái của văn bản cuộn chạm đến bên trái của phần chứa, cộng thêm 20px
        if (textRectNote.left <= part3RectNote.left + 15) {
            scrollingTextNote.style.animationPlayState = "paused";
            setTimeout(() => {
                scrollingTextNote.style.animationPlayState = "running";
                part2Note.style.visibility = "hidden"; // Ẩn phần tử part2Note sau khi tạm dừng
            }, 1000);
        }
    }

    // Kiểm tra vị trí mỗi 100ms
    setInterval(checkPosition, 100);
});