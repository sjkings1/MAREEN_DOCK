import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Popover, Button } from 'antd';

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);


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
    //   static defaultProps = {
    //     center: {
    //       lat: 59.95,
    //       lng: 30.33
    //     },
    //     zoom: 11
    //   };
    // let center = {
    //     lat: 59.95,
    //     lng: 30.33
    // }

    // let zoom = 11

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

                {/* <Popover content={content} title="Title"> */}

                <Marker
                    tooltip={"ff"}
                    lat={center.lat}
                    lng={center.lng}
                    // text="GPS"
                    color="red"
                />
                {/* <InfoWindow>
                    <h4>Hi</h4>
                </InfoWindow> */}

                {/* </Popover> */}
            </GoogleMapReact>
        </div>
    );

}

export default SimpleMap;