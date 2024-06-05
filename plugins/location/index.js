export default function (app, { reactive }) {
    const { state } = app

    state.samples.push(`Where am I?`)
    // state.systems.push(`if user asks for location respond with here is your location: <a target="_blank" href='https://www.google.com/maps'>Google Maps</a>`)
    // state.systems.push(`if user asks for location respond with: %LOCATE%`)

    // app.bus.on('input', handler)

    // function handler(e) {
    //     console.log(e)
    // }
    // Use Geolocation API
    const currentLocation = reactive({
        lat: 0,
        lon: 0,
        accuracy: 0,
        timestamp: 0
    })

    function find() {
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition((position) => {
            currentLocation.lat = position.coords.latitude
            currentLocation.lon = position.coords.longitude
            currentLocation.accuracy = position.coords.accuracy
            currentLocation.timestamp = position.timestamp
            console.log(currentLocation)
            state.systems.push(`if user asks for location or where am I respond with: ${currentLocation.lat}, ${currentLocation.lon}`)
        })

    }
    find()

}