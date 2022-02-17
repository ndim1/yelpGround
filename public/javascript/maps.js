mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([-74.5, 40])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                '<h3>Nemozam da stavam od product lokacija neznam koj e problemot</h3>'
            )
    )


    .addTo(map);