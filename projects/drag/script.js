const containers = document.querySelectorAll('.container')
const draggables = document.querySelectorAll('.draggable')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault() //cursor stay draggable

        const afterElement = getDragAfterElement(container, e.clientY) //y position
        const dragging = document.querySelector('.dragging')

        if (afterElement) {
            container.insertBefore(dragging, afterElement)
        } else {
            container.appendChild(dragging)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = container.querySelectorAll('.draggable:not(.dragging)')

    let afterElement
    let maxOffset = Number.NEGATIVE_INFINITY

    draggableElements.forEach(element => {
        const elementBox = element.getBoundingClientRect()
        const offset = y - elementBox.top - elementBox.height / 2

        if (offset < 0 && offset > maxOffset) {
            maxOffset = offset
            afterElement = element
        }
    })

    return afterElement
}