import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from 'google-map-react';
import Marker from './Marker';

// const content = (
//     <div>
//         <p>Content</p>
//         <p>Content</p>
//     </div>
// );


// const AnyReactComponent = ({ text }) => <div>{text}</div>;

function SimpleMap(props) {
    debugger

    const getMapOptions = (maps) => {
        return {
            // disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            zoomControl: true,
            // gestureHandling: "cooperative",
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
    };

    const [center, setCenter] = useState({ lat: null, lng: null });

    const [zoom, setZoom] = useState(11);

    useEffect(() => {
        debugger
        setCenter(props.center)
        setZoom(props.zoom)
    }, [props])

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAgoNP0X5gFIcMBqkQUU7ank_pHzRPWGxk" }}
                defaultCenter={center}
                defaultZoom={zoom}
                options={getMapOptions}
            >


                <Marker
                    lat={center.lat}
                    lng={center.lng}
                    // text="GPS"
                    color="red"
                />

            </GoogleMapReact>
        </div>
    );

}

export default SimpleMap;