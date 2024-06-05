export default function (app) {
    function handler(e) {
        if(!e.isFinal) return

        if(e[0].transcript.toLowerCase().includes('hello')) {
            app.say('Hi!')
        }
    }
    app.bus.on('voice', handler)
}

export const plugin = {
    description: 'A simple hello world plugin',
}