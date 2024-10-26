  document.addEventListener("DOMContentLoaded", function() {
      const scrollingText = document.getElementById("scrollingText");
      const part2 = document.querySelector(".part2");

      function checkPosition() {
        const textRect = scrollingText.getBoundingClientRect();
        const part3Rect = document.querySelector('.part3').getBoundingClientRect();

        if (textRect.left <= part3Rect.left) {
          scrollingText.style.animationPlayState = "paused";
          setTimeout(() => {
            scrollingText.style.animationPlayState = "running";
            part2.style.visibility = "hidden";
          }, 1500);
        }
      }

      setInterval(checkPosition, 100);
    });