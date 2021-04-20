function redirect(filter){
    const urlParams = new URLSearchParams(window.location.search)
    const mode = urlParams.get('mode')
    window.location.href = `/geo-quiz/public/game.html?mode=${mode}&${filter}`
}