const container = document.getElementById('image-container');
const images = document.querySelectorAll('#image-container img');

let index = 0;
function carousel() {
    index++;
    if (index >= images.length) {
        index = 0;
    }

    container.style.transform = `translateX(${-index * 500}px`;
}

setInterval(() => {
    carousel()
}, 2000);