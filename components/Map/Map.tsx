import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function MapComponent(props:any){

    const center = { lat: 41.49268754076146, lng: 69.48898361759296 };
    return(
        <div className='container position-relative' style={props.style}>
            <Map
                google={props.google}
                //@ts-ignore
                zoom={14}
                initialCenter={center}
                className='position-relative'

            >
                {/*@ts-ignore*/}
                <Marker position={center} text='Global Solutions' />
            </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDEcXwCVfDdd5BPBaYi-jtPpXrSutfhddQ'
})(MapComponent);
