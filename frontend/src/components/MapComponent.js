import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

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

    const mapOptions = {
        disableDefaultUI: true, // This will disable all default UI controls
        styles:
            [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#bdbdbd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c9c9c9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                }
            ]
        // You can also selectively disable controls, for example:
        // zoomControl: false,
        // streetViewControl: false,
        // mapTypeControl: false,
        // etc.
    };

  return (
    <LoadScript
          googleMapsApiKey="AIzaSyD8SdwCqha6YE42TX2PvXguclCRBJDTPdA" // Replace with your actual API key
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
                    scaledSize: new window.google.maps.Size(30, 30) // Now safely accessed
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

export default MapComponent;