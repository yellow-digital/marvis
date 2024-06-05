export default async function ({state}) {
    // Inject blipmaps responses
    const locations = [
        'Soesterberg',
        'Hilversum',
        'KNMI',
        'Nistelrode',
    ]

    // const resp = await fetch('https://blipmaps.nl/NETHERLANDS/js/meteograms.js?v=1716295746140')
    // const data = await resp.text()
    // console.log(data)

    // https://blipmaps.nl/NETHERLANDS/NL+1/meteogram_Soesterberg.png

    state.systems.push(`if user asks for a meteogram, weather or blipmaps, 
    response with:
    for today <img src='https://blipmaps.nl/NETHERLANDS/NL+0/meteogram_LOCATION.png'/>
    for tomorrow <img src='https://blipmaps.nl/NETHERLANDS/NL+1/meteogram_LOCATION.png'/>
    for in two days <img src='https://blipmaps.nl/NETHERLANDS/NL+2/meteogram_LOCATION.png'/>
    and replace LOCATION with the location.
    only respond with one meteogram use by default today.
    LOCATION should be: ${locations.join(', ')}
    `)

    state.samples.push(`What is the weather in Soesterberg today?`)
}