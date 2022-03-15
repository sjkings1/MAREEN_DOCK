import React from 'react';
import { Map, Marker } from "google-maps-react";
import { GoogleApiWrapper } from 'google-maps-react';


function MapsGoogleNew({ google, locations = [] }) {

    return (

        <div>

            Map will appear here

            <Map
                google={google}
                containerStyle={{
                    position: "static",
                    width: "10%",
                    height: "10%"
                }}
                style={{
                    width: "20%",
                    height: "20%"
                }}
                center={locations[0]}
                initialCenter={locations[0]}
                zoom={locations.length === 1 ? 18 : 13}
                disableDefaultUI={true}
            >

                {locations.map(
                    coords => <Marker position={coords} />
                )}

            </Map>

        </div>

    );
}

// export default MapsGoogleNew;

export default GoogleApiWrapper({
    apiKey: ("")
})(MapsGoogleNew);
