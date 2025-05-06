import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { mapOptions } from './mapStyles.js';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

const MapComponent = ({ locations }) => {

    const mapRef = React.useRef(null);
    const [isMapLoaded, setIsMapLoaded] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState(null);
    const [apiKey, setApiKey] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(loc => {
            bounds.extend(new window.google.maps.LatLng(parseFloat(loc.gps.split(',')[0]), parseFloat(loc.gps.split(',')[1])));
        });
        map.fitBounds(bounds);
        mapRef.current = map;
        setIsMapLoaded(true);
    }, [locations]);

    const onMarkerClick = loc => {
        setSelectedLocation(loc);
    };
    
    

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await fetch('https://emmettscully.com/api/google-maps-key');
                const data = await response.json();
                setApiKey(data.apiKey);
            } catch (error) {
                console.error('Failed to fetch API key:', error);
            }
        };

        fetchApiKey();
    }, []);

    // Don't render map until we have the API key
    if (!apiKey) {
        return <div>Loading map...</div>;
    }

  return (
    <LoadScript
          googleMapsApiKey={apiKey}
          onLoad={() => setIsMapLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={mapOptions} 
      >
        {isMapLoaded && locations.map(loc => (
            <Marker
                key={loc.id}
                position={{ lat: parseFloat(loc.gps.split(',')[0]), lng: parseFloat(loc.gps.split(',')[1]) }}
                icon={{
                    url: "https://trkstrbkt.s3.amazonaws.com/media/shoe_images/map_marker.svg",
                    scaledSize: new window.google.maps.Size(30, 30)
                }}
                onClick={() => onMarkerClick(loc)}
            />
        ))}
        {selectedLocation && (
            <InfoWindow
                position={{ lat: parseFloat(selectedLocation.gps.split(',')[0]), lng: parseFloat(selectedLocation.gps.split(',')[1]) }}
                onCloseClick={() => setSelectedLocation(null)}
            >
                <div>
                    <h4>{selectedLocation.name}</h4>
                    <p>{selectedLocation.company}</p>
                </div>
            </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent);