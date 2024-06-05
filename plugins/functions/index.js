export const plugin = {
    description: 'A function example based on https://github.com/ollama/ollama/blob/main/examples/typescript-functioncalling/extractemail.ts',
}

export default function (app, { reactive }) {
    const systemprompt = `You will be given a text along with a prompt and a schema. You will have to extract the information requested in the prompt from the text and generate output in JSON observing the schema provided. If the schema shows a type of integer or number, you must only show a integer for that field. A string should always be a valid string. If a value is unknown, leave it empty. Output the JSON with extra spaces to ensure that it pretty prints.`

    app.state.samples.push(`Directions from Amsterdam to Utrecht?`)

    app.bus.on('input', handler)

    async function handler() {
        // Use LLM
        // Create new message
        const message = reactive({
            content: '',
            role: 'assistant',
            streaming: true
        })
        app.state.finals.push(message)

        // With context
        await app.stream({}, (res) => {
            message.content += res
        })
        message.streaming = false
    }
}

// ===

export async function chat(messages = [], options = {}, callback) {
    const resp = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama3",
            messages,
            options: {
                num_predict: -1, // (Default: 128, -1 = infinite generation, -2 = fill context)
                // seed: 123,
                // temperature: 0,
                ...options,
            },
        }),
    });

    // process readable stream
    return streamer(resp, (e) => {
        callback(e.message.content)
    })
}
export async function streamer(resp, callback) {
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let data = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        const text = decoder.decode(value, { stream: true });
        const json = JSON.parse(text);
        callback(json)

        data.push(json);
    }
    return data
}
