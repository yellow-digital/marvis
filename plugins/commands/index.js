export default function (app) {
    app.commands.push({
        handler(e) {
            if (!e.isFinal) return

            if (e[0].transcript.toLowerCase().includes('clean')) {
                console.log('cleaning')
                return
            }
        }
    })
}