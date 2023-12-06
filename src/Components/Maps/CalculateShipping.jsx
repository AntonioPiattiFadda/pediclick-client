import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import styles from './CalculateShipping.module.css';
import { ShippingCostSkeleton } from '../../Utils/Skeletons';

const center = { lat: -31.427103, lng: -64.181931 };
const center2 = { lat: -31.421103, lng: -64.181141 };
const autocompleteBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};
const restrictions = {
  country: 'ar',
};
const options = {
  strictBounds: true,
};

//NOTE - Traer la direccion del local de la base de datos
const storeDirection = 'Ingeniero Lopez 100';

function CalculateShipping({ setShippingCost, shippingCost, setAdress }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    //NOTE - Places es la libreria donde se encuentra el Autocomplete de Google Maps cuando buscamos una direccion
    libraries: ['places'],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(false);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  useEffect(() => {
    //NOTE - No me trae las coordenaas de la direccion
    const calculateCenter = async () => {
      if (!isLoaded) return; // Asegúrate de que Google Maps esté cargado

      const geocoder = new window.google.maps.Geocoder();
      const address = storeDirection;
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          console.log({
            center: results[0].geometry.location,
            markerName: results[0].formatted_address,
          });
        } else {
          alert(
            'Geocode was not successful for the following reason: ' + status
          );
        }
      });
    };
    calculateCenter();
  }, [isLoaded]);
  useEffect(() => {
    if (distance === '') return;
    let price;
    switch (true) {
      case distance < 500:
        price = 200;
        break;
      case distance < 1000:
        price = 300;
        break;
      case distance < 1500:
        price = 400;
        break;
      case distance < 2000:
        price = 500;
        break;
      case distance < 2500:
        price = 600;
        break;
      case distance < 3000:
        price = 700;
        break;

      default:
        price = null;
    }
    setShippingCost(price);
  }, [distance]);

  if (!isLoaded) {
    return <ShippingCostSkeleton />;
  }

  async function calculateRoute() {
    const isEmpty = destiantionRef.current.value === '';
    const hasNumber = /\d/.test(destiantionRef.current.value);
    if (isEmpty && !hasNumber) {
      alert('Debes ingresar una direccion valida');
      setError(true);
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: storeDirection,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    const distanceText = results.routes[0].legs[0].distance.text;
    let distanceNumeric;

    if (distanceText.includes('km')) {
      distanceNumeric =
        parseFloat(distanceText.replace(' km', '').replace(',', '')) * 1000;
    } else if (distanceText.includes('m')) {
      distanceNumeric = parseFloat(
        distanceText.replace(' m', '').replace(',', '')
      );
    } else {
      console.error('Formato de distancia no reconocido');
      return;
    }

    setDistance(distanceNumeric);
    setDirectionsResponse(results);
    setDuration(results.routes[0].legs[0].duration.text);
    setAdress(destiantionRef.current.value);
    setError(false);
  }

  return (
    <div className={styles.mapContainer}>
      <div className={styles.map}>
        {}
        <GoogleMap
          center={center2}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            draggable: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center2} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.form} action="">
          <Autocomplete
            bounds={autocompleteBounds}
            restrictions={restrictions}
            options={options}
          >
            <input
              type="text"
              placeholder="Dirección de envío"
              ref={destiantionRef}
            />
          </Autocomplete>
          <button type="button" colorScheme="pink" onClick={calculateRoute}>
            Calcular envio
          </button>
        </div>
        {shippingCost === null && (
          <span
            style={{
              margin: '10px',
              textAlign: 'center',
            }}
          >
            Lamentablemente no llegamos a esa zona. Puedes retirar en el local.
          </span>
        )}

        {distance && shippingCost !== null && (
          <span
            style={{
              margin: '10px',
            }}
          >
            Precio: ${shippingCost}{' '}
          </span>
        )}

        {distance && (
          <span
            style={{
              margin: '10px',
            }}
          >
            Distancia: {distance} mts
          </span>
        )}

        {error && (
          <span
            style={{
              margin: '10px',
              color: 'red',
              textAlign: 'center',
            }}
          >
            Debes ingresar una direccion valida y que contenga números
          </span>
        )}

        {/*
        <span
          style={{
            margin: '10px',
          }}
        >
          Duration: {duration}{' '}
        </span> */}
      </div>
    </div>
  );
}

export default CalculateShipping;
