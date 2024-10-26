document.addEventListener("DOMContentLoaded", function() {
        const scrollingTextNote = document.getElementById("scrollingText-note");
        const part2Note = document.querySelector(".part2-note");

        function checkPosition() {
            const textRectNote = scrollingTextNote.getBoundingClientRect();
            const part3RectNote = document.querySelector('.part3-note').getBoundingClientRect();

            if (textRectNote.left <= part3RectNote.left) {
                scrollingTextNote.style.animationPlayState = "paused";
                setTimeout(() => {
                    scrollingTextNote.style.animationPlayState = "running";
                    part2Note.style.visibility = "hidden";
                }, 1000);
            }
        }

        setInterval(checkPosition, 100);
    });