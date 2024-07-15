import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const MapBox = ({ provider }) => {
    const mapContainer = useRef(null);
    const [userLocation, setUserLocation] = useState(null);

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    // If GPS fails, fall back to IP geolocation
                    fetch('https://ipapi.co/json/')
                        .then(response => response.json())
                        .then(data => {
                            resolve({
                                latitude: data.latitude,
                                longitude: data.longitude,
                                accuracy: 'low' // IP geolocation is generally less accurate
                            });
                        })
                        .catch(reject);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        });
    };

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtLTEyNTU1IiwiYSI6ImNseHNobzRtOTFoZncycXNodjZhZmk4b3oifQ.6LBEGKCBNh-pxPwez_Tl7g';

        getLocation().then((location) => {
            setUserLocation(location);

            const map = new mapboxgl.Map({
                container: mapContainer.current,
                center: [provider.longitude, provider.latitude],
                zoom: 15.1,
                pitch: 62,
                bearing: -20
            });

            const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving',
                controls: {
                    instructions: false
                }
            });

            map.addControl(directions, 'top-left');

            // Add marker for user's current position
            const userMarker = new mapboxgl.Marker()
                .setLngLat([location.longitude, location.latitude])
                .addTo(map);

            // Add popup for user's marker
            const userPopup = new mapboxgl.Popup({ offset: 25 }).setText('My Location');
            userMarker.setPopup(userPopup);

            map.on('style.load', () => {
                map.addSource('line', {
                    type: 'geojson',
                    lineMetrics: true,
                    data: {
                        type: 'LineString',
                        coordinates: [
                            [location.longitude, location.latitude],
                            [provider.longitude, provider.latitude]
                        ]
                    }
                });

                // Customize your markers
                const userMarkerElement = document.createElement('div');
                userMarkerElement.className = 'marker';
                const userRoot = createRoot(userMarkerElement);
                userRoot.render(<FontAwesomeIcon icon={faUser} />);

                const providerMarkerElement = document.createElement('div');
                providerMarkerElement.className = 'marker';
                const providerRoot = createRoot(providerMarkerElement);
                providerRoot.render(<FontAwesomeIcon icon={faUserTie} />);

                const providerMarker = new mapboxgl.Marker(providerMarkerElement)
                    .setLngLat([provider.longitude, provider.latitude])
                    .addTo(map);

                const popup = new mapboxgl.Popup({ offset: 25 }).setText('Provider Location');
                providerMarker.setPopup(popup);
            });

            const lightPresetSelect = document.getElementById('lightPreset');
            if (lightPresetSelect) {
                lightPresetSelect.addEventListener('change', function () {
                    map.setConfigProperty('basemap', 'lightPreset', this.value);
                });
            }

            document.querySelectorAll('.map-overlay-inner input[type="checkbox"]').forEach((checkbox) => {
                checkbox.addEventListener('change', function () {
                    map.setConfigProperty('basemap', this.id, this.checked);
                });
            });

            return () => {
                map.remove();
            };
        }).catch(error => {
            console.error('Error getting location:', error);
            // Handle error (e.g., show error message to user)
        });
    }, [provider]);

    return (
        <div className="bg-purple-500">
            <div id="map" ref={mapContainer} className='content-between' style={{ position: 'relative', width: '100%', height: '400px' }}></div>
            <div className="map-overlay-inner">
                <fieldset className="select-fieldset">
                    <label>Select light preset</label>
                    <select id="lightPreset" name="lightPreset">
                        <option value="dawn">Dawn</option>
                        <option value="day" defaultValue>Day</option>
                        <option value="dusk">Dusk</option>
                        <option value="night">Night</option>
                    </select>
                </fieldset>
                {/* Additional checkboxes or controls */}
            </div>
        </div>
    );
};

export default MapBox;