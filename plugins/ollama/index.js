import { generate, chat, config } from "./ollama"

// const service = new OllamaService()

export default function (app, { reactive }) {

    config.base = 'https://f929-31-201-191-127.ngrok-free.app'
    app.state.samples.push(`Explain superconductors`)

    app.bus.on('input', handler)

    async function handler() {
        // Use LLM
        // Create new message
        const message = reactive({
            content: '',
            role: 'assistant',
            streaming: true,
            // renderAs: 'pre'
        })
        app.state.finals.push(message)

        // With context
        await stream({}, (res) => {
            message.content += res
        })
        message.streaming = false

        app.say(message.content)
    }

    /**
     * stream a conversation
     * @param {*} options 
     * @param {*} callback 
     * @returns 
     */
    async function stream(options = {}, callback) {
        // Include attachments?

        return chat([
            {
                "role": "system",
                "content": app.state.systems.join('\n')
            },
            ...app.state.finals.map(handleAttachments),
        ], options, callback)
    }

}

function handleAttachments(message) {
    // console.log(message)
    // Pack the first attachment into the content and assume this is JSON
    const content = message.attachments?.length ? JSON.stringify(message.attachments[0].content) : message.content
    return {
        ...message,
        content
    }
}
export class UserMessage {
    content = ""
    createdAt = new Date()
    role = 'user'

    constructor(text) {
        this.content = text
    }
}