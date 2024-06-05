export default async function (app) {
    app.state.samples.push(`Tell something about me?`)

    app.bus.on('FileList', async function (e) {
        console.log(e)

        const file = e[0]

        if (file.name === 'your_address_books.json') {
            console.log('nice')
        }
        if (file.name === 'profile_information.json') {
            console.log('nice received profile_information.json')

            const text = await readAsTextFile(file)
            // console.log(text)
            const data = JSON.parse(text)
            console.log(data)

            const message = app.write({
                content: `I see you are ${data.profile.name}`,
                role: 'assistant',
                streaming: true
            })
        }
    })
}

export const plugin = {
    description: 'Plugin to import your facebook data',
    author: 'Jelle'
}


function readAsTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const fileContents = reader.result;
            resolve(fileContents)
        };

        reader.readAsText(file);
        // reader.readAsArrayBuffer(file)
    })
};