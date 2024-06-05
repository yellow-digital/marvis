export default async function ({state}) {

    state.systems.push(`if user asks for a direction respond with 
    <a target="_blank" href='https://www.google.nl/maps/dir/Amsterdam/Utrecht'>Directions from Amsterdam to Utrecht?</a>
    `)

    state.samples.push(`Directions from Amsterdam to Utrecht?`)
}

export const plugin = {
    description: 'A simple direction plugin',
}