export const config = {
    base: "http://localhost:11434",
    options: {
        num_predict: -1, // (Default: 128, -1 = infinite generation, -2 = fill context)
        seed: 1,
        temperature: 0,
    }
} 

/**
 * https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion
 * @param {*} prompt 
 * @param {*} options 
 * @param {*} callback 
 * @returns 
 */
export async function generate(prompt = "", options = {}, callback) {
    const resp = await fetch(`${config.base}/api/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama3",
            //   raw: true,
            //   stream: false,
            prompt,
            options: {
                ...config.options,
                ...options,
            },
        }),
    });

    // process readable stream
    return streamer(resp, callback)
}

const MESSAGES = [
    {
        "role": "user",
        "content": "why is the sky blue?"
    }
]

export async function chat(messages = MESSAGES, options = {}, callback) {
    const resp = await fetch(`${config.base}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama3",
            messages,
            options: {
                ...config.options,
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
