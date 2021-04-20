function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '💜';

    heart.style.left = Math.random() * 100 + "vw";
    let x = Math.random();
    heart.style.animationDuration = x * 2 + 3 + "s";;
    heart.style.fontSize = 2 - x + "rem";

    document.body.appendChild(heart);
    setTimeout(createHeart, Math.random() * 100 + 50);
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

createHeart();