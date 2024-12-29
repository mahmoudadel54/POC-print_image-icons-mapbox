
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoibWFobW91ZGFkZWwyMDIzIiwiYSI6ImNsbDN2dDF4dzAwZzYzbnJudGdleHp6cDcifQ.lxPfWRQAhxuPfeuJ_WV6TQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/dark-v11', // style URL
        zoom: 10, // starting zoom
        center: [-77.432, 25.0306] // starting position
    });

    map.on('load', () => {
        // Load an image from an external URL.
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style.
                map.addImage('cat', image);

                // Add a data source containing one point feature.
               

              
            }
        );
    });

    map.on('click',(e)=>{
        let id = Date.now().toString();
        map.addSource('point' + id, {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [e.lngLat.lng, e.lngLat.lat]
                        }
                    }
                ]
            }
        });
          // Add a layer to use the image to represent the data.
          map.addLayer({
            'id': 'points' + id,
            'type': 'symbol',
            'source': 'point' + id, // reference the data source
            'layout': {
                'icon-image': 'cat', // reference the image
                'icon-size': 0.25
            }
        });
    })

    map.addControl(new MapboxExportControl({
        PageSize: Size.A3,
        PageOrientation: PageOrientation.Portrait,
        Format: Format.PNG,
        DPI: DPI[96],
        Crosshair: true,
        PrintableArea: true,
    }), 'top-right');