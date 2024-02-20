import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const center = {
  lat: 37.5649867,
  lng: 126.985575,
};

const OPTIONS = {
  clickableIcons: false,
};

const LocationInput = ({
  arrivalLocation = false,
  label,
  addressLabel,
  name,
  address,
  location,
  setLocation,
  errors,
}: any) => {
  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string,
  // });

  const [markerPosition, setMarkerPosition] = useState<any>(null);

  let autocomplete: any;

  const handleLoad = () => {
    const input = (
      !arrivalLocation
        ? document.getElementById('autocomplete')
        : document.getElementById('autocomplete-arrival')
    ) as HTMLInputElement;
    const options = {
      types: ['establishment'],
      fields: ['place_id', 'address_components', 'formatted_address', 'geometry', 'name'],
      strictBounds: false,
      componentRestrictions: { country: 'kr' },
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        document.getElementById('autocomplete')?.setAttribute('placeholder', 'Enter a location');
        alert('Enter an available location');
      } else {
        console.log('place', place);
        setLocation({
          placeName: place.name,
          input: place.name,
          address: place.formatted_address,
        });

        setMarkerPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
  };

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, place: string) => {
      setLocation({ ...location, [place]: e.target.value });
    },
    [location],
  );

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <div className='h-40 w-full'>
        <GoogleMap
          mapContainerStyle={{ position: 'relative', width: '100%', height: '100%' }}
          zoom={markerPosition ? 15.5 : 10}
          center={markerPosition || center}
          options={OPTIONS}
        >
          {markerPosition && (
            <>
              <Marker position={{ lat: markerPosition.lat - 0.0005, lng: markerPosition?.lng }} />
              <InfoWindow position={markerPosition}>
                <div>
                  <h1>{location.placeName}</h1>
                </div>
              </InfoWindow>
            </>
          )}
        </GoogleMap>
      </div>

      <div className='flex flex-col md:flex-row justify-between mt-3 gap-y-2'>
        <div className='flex flex-col md:w-1/2-20'>
          <label htmlFor={name} className='mb-1'>
            {label}
          </label>

          <input
            id={!arrivalLocation ? 'autocomplete' : 'autocomplete-arrival'}
            className={`input ${errors?.name ? 'border border-red-500' : 'border-gray-300'}`}
            type='text'
            placeholder={`Enter ${label}`}
            value={location?.input}
            onChange={(e) => handleInputChange(e, 'input')}
            required
          />
        </div>

        <div className='flex flex-col md:w-1/2-20'>
          <label htmlFor={address} className='mb-1'>
            {addressLabel}
          </label>

          <input
            className={`input ${errors?.name ? 'border border-red-500' : 'border-gray-300'}`}
            type='text'
            placeholder={`Enter ${addressLabel}`}
            value={location?.address}
            onChange={(e) => handleInputChange(e, 'address')}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
