/*const sounds = [
    'applause',
    'witch',
    'gasp',
    'tada',
    'victory',
    'wrong'
];*/

const sounds = document.querySelectorAll("#sounds audio");

sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = sound.id;
    
    btn.addEventListener('click', () => {
        stopSongs();
        document.getElementById(sound.id).play()
    })

    document.body.appendChild(btn);
});

function stopSongs() {
    sounds.forEach(sound => {
        const song = document.getElementById(sound.id);
        song.pause();
        song.currentTime = 0;
    });
}