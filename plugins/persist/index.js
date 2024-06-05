// TODO save as message-X

function debounce(fn, delay = 1000) {
    let timer
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
export default async function (app, { watch }) {
    const { state } = app
    
    const KEY = 'messages'

    const save = debounce((messages = []) => {
        console.log('SAVE')
        keep(messages)
    })
    /**
     * Local storage persistance
     */
    function keep(messages = []) {
        localStorage.setItem(KEY, JSON.stringify(messages))
    }

    watch(() => state.finals, e => {
        save(state.finals)
    }, { deep: true })

    function restore() {
        const messages = JSON.parse(localStorage.getItem(KEY) || '[]')
        state.finals = messages
    }
    restore()
}

export const plugin = {
    description: 'Plugin that syncs messages to local storage',
    author: 'Jelle'
}