export default async function ({state}) {
    
    // https://github.com/ollama/ollama/blob/main/docs/api.md#list-local-models
    state.samples.push(`What is the capitol of France?`, { 
        context: ['https://github.com/ollama/ollama/blob/main/docs/api.md#list-local-models']
    })

    
}

