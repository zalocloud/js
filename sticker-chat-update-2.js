
 
        const smileyEmojis = [
            "😊", "😁", "😂", "🤣", "😃", "😆", "😅", "😃", "😉", "😊",
            "😜", "😗", "😍", "😘", "😋", "😛", "😝", "😧", "🥰", "😢",
            "😭", "🥺", "😶", "😨", "😣", "😳", "😱", "😖", "😄", "💗"
        ];

        const containerSmileys = document.getElementById('emoji-smileys-container');

        smileyEmojis.forEach(emoji => {
            const spanElement = document.createElement('span');
            spanElement.classList.add('emoji');
            spanElement.setAttribute('data-emoji', emoji);
            spanElement.textContent = emoji;
            containerSmileys.appendChild(spanElement);
        });

    const emojiImages = [
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby1.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby1.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby2.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby2.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby3.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby3.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby4.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby4.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby5.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby5.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby6.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby6.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby7.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby7.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby8.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby8.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby9.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby9.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby10.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby10.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby11.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby11.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby12.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby12.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby13.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby13.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby14.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby14.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby15.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby15.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby16.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby16.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby17.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby17.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby18.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby18.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby19.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby19.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby20.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby20.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby21.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby21.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-01.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-01.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-02.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-02.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-08.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-08.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-07.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-07.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-05.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-05.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-09.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-09.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-10.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-10.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-11.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-11.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-33.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-33.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-34.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-34.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-14.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-14.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-16.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-16.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-17.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-17.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-18.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-18.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-19.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-19.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-35.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-35.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-36.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-36.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-37.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-37.gif" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-23.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-23.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-24.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-24.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-25.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-25.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-27.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-27.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-28.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-28.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-29.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-29.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-30.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-30.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-31.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-31.webp" },
      { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-32.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-32.webp" },
	  { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-38.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-38.gif" },
	  { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-39.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-39.gif" },
	  { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-40.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-40.gif" },
	  { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-41.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-41.gif" },
	  { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-42.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-42.gif" },
	  { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-43.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby-new-43.gif" },
	  
    ];

    const container = document.getElementById('emoji-container');

    emojiImages.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.setAttribute('loading', 'lazy');
      imgElement.setAttribute('src', image.src);
      imgElement.setAttribute('class', 'emoji-sticker');
      imgElement.setAttribute('data-emoji', image.dataEmoji);
      container.appendChild(imgElement);
    });

    const foodImages = [
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/voiu1.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/voiu1.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau1.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau1.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau2.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau2.webp" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau3.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau3.webp" },
			{ src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau04.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau04.webp" },
			{ src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau05.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau05.webp" },
			{ src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau06.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau06.webp" },
			{ src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau07.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau07.webp" },
			{ src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau08.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau08.webp" },
			{ src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau09.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thobaymau09.webp" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa1.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa1.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa2.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa2.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa3.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa3.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa4.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa4.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa5.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa5.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa6.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa6.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa7.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa7.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa8.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa8.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa9.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa9.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa10.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa10.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa11.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa11.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa12.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa12.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa13.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa13.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa14.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa14.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa15.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa15.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa16.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa16.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa17.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/usa17.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby18.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby18.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby19.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby19.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby20.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby20.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby21.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quby21.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/ami1.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/ami1.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/troctrang1.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/troctrang1.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/troctrang2.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/troctrang2.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/troctrang3.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/troctrang3.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/conan1.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/conan1.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/conan3.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/conan3.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-01-1.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-01-1.webp" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-02-2.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-02-2.webp" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-03-3.webp", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-03-3.webp" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-04.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-04.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-05.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-05.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-06.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-06.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-07.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-07.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-08.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-08.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-09.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/new-09.png" }
        ];

        const containerFood = document.getElementById('emoji-food-container');

        foodImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.setAttribute('loading', 'lazy');
            imgElement.setAttribute('src', image.src);
            imgElement.setAttribute('class', 'emoji-sticker');
            imgElement.setAttribute('data-emoji', image.dataEmoji);
            containerFood.appendChild(imgElement);
        });

  
  
        const objectImages = [
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee1.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee1.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee2.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee2.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee3.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee3.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee4.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee4.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee5.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee5.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee6.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee6.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee7.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee7.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee8.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee8.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee9.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee9.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee10.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee10.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee11.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee11.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee12.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/quoobee12.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi1.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi1.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi2.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi2.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi3.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi3.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi4.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi4.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi5.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi5.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi6.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi6.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi7.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi7.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi8.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi8.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi9.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi9.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi10.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi10.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi11.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi11.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi12.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi12.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi13.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi13.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi14.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi14.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi15.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi15.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi16.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi16.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi17.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi17.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi18.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi18.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi19.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi19.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi20.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi20.gif" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi21.gif", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/mimi21.gif" }
        ];

        const containerObjects = document.getElementById('emoji-objects-container');

        objectImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.setAttribute('loading', 'lazy');
            imgElement.setAttribute('src', image.src);
            imgElement.setAttribute('class', 'emoji-sticker');
            imgElement.setAttribute('data-emoji', image.dataEmoji);
            containerObjects.appendChild(imgElement);
        });

        const symbolImages = [
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t88/1/32/1f600.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t88/1/32/1f600.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8c/1/32/1f604.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8c/1/32/1f604.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t9/1/32/1f601.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t9/1/32/1f601.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8e/1/32/1f606.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8e/1/32/1f606.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2d/1/32/1f979.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2d/1/32/1f979.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/td/1/32/1f605.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/td/1/32/1f605.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8a/1/32/1f602.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8a/1/32/1f602.png" },
          { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tc/1/32/1f923.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tc/1/32/1f923.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/ta6/1/32/1f972.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/ta6/1/32/1f972.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t1/1/32/263a.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t1/1/32/263a.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t39/1/32/1f60a.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t39/1/32/1f60a.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tf/1/32/1f607.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tf/1/32/1f607.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t6/1/32/1f642.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t6/1/32/1f642.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t87/1/32/1f643.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t87/1/32/1f643.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t11/1/32/1f609.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t11/1/32/1f609.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t97/1/32/1f9d0.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t97/1/32/1f9d0.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t91/1/32/1f928.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t91/1/32/1f928.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t5b/1/32/1f61d.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t5b/1/32/1f61d.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t59/1/32/1f61b.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t59/1/32/1f61b.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tba/1/32/1f60b.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tba/1/32/1f60b.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/32/1f61a.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/td8/1/32/1f61a.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tb0/1/32/1f619.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tb0/1/32/1f619.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tae/1/32/1f617.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tae/1/32/1f617.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2f/1/32/1f618.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2f/1/32/1f618.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/ta4/1/32/1f970.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/ta4/1/32/1f970.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tbc/1/32/1f60d.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tbc/1/32/1f60d.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t3b/1/32/1f60c.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t3b/1/32/1f60c.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t55/1/32/1f97a.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t55/1/32/1f97a.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t4f/1/32/1f629.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t4f/1/32/1f629.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2d/1/32/1f616.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2d/1/32/1f616.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/td9/1/32/2639.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/td9/1/32/2639.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t85/1/32/1f641.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t85/1/32/1f641.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tac/1/32/1f615.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tac/1/32/1f615.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t5d/1/32/1f61f.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t5d/1/32/1f61f.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2b/1/32/1f614.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t2b/1/32/1f614.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tdc/1/32/1f61e.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tdc/1/32/1f61e.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t29/1/32/1f612.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t29/1/32/1f612.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/32/1f60f.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/32/1f60f.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t12/1/32/1f929.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t12/1/32/1f929.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t3d/1/32/1f60e.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t3d/1/32/1f60e.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8/1/32/1f644.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8/1/32/1f644.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t79/1/32/1f62c.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t79/1/32/1f62c.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/ta8/1/32/1f611.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/ta8/1/32/1f611.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t27/1/32/1f610.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t27/1/32/1f610.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t5e/1/32/1fae0.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t5e/1/32/1fae0.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t60/1/32/1fae2.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t60/1/32/1fae2.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t60/1/32/1fae2.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t60/1/32/1fae2.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tbd/1/32/1f92d.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tbd/1/32/1f92d.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/te1/1/32/1fae3.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/te1/1/32/1fae3.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tee/1/32/1f914.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tee/1/32/1f914.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t71/1/32/1f917.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t71/1/32/1f917.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t4b/1/32/1f625.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t4b/1/32/1f625.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8b/1/32/1f636_200d_1f32b.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8b/1/32/1f636_200d_1f32b.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/taa/1/32/1f976.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/taa/1/32/1f976.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/te8/1/32/1f633.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/te8/1/32/1f633.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t89/1/32/1f920.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t89/1/32/1f920.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t6f/1/32/1f915.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t6f/1/32/1f915.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t77/1/32/1f62a.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t77/1/32/1f62a.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tc3/1/32/1f62e_200d_1f4a8.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tc3/1/32/1f62e_200d_1f4a8.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8d/1/32/1f924.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t8d/1/32/1f924.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t1e/1/32/1f635_200d_1f4ab.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t1e/1/32/1f635_200d_1f4ab.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t25/1/32/1f971.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t25/1/32/1f971.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t69/1/32/1f634.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t69/1/32/1f634.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t67/1/32/1f632.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t67/1/32/1f632.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t7b/1/32/1f62e.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t7b/1/32/1f62e.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/32/1f627.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/32/1f627.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/tcc/1/32/1f626.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/tcc/1/32/1f626.png" },
            { src: "https://static.xx.fbcdn.net/images/emoji.php/v9/t3/1/32/1faf6.png", dataEmoji: "https://static.xx.fbcdn.net/images/emoji.php/v9/t3/1/32/1faf6.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/love.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/love.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/wow.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/wow.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thuongthuong.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/thuongthuong.png" },
            { src: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/haha-emoji.png", dataEmoji: "https://cdn.jsdelivr.net/gh/zalocloud/sticker/haha-emoji.png" },
        ];

        const containerSymbols = document.getElementById('emoji-symbols-container');

        symbolImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.setAttribute('loading', 'lazy');
            imgElement.setAttribute('src', image.src);
            imgElement.setAttribute('class', 'emoji-sticker-fb');
            imgElement.setAttribute('data-emoji', image.dataEmoji);
            containerSymbols.appendChild(imgElement);
        });
 