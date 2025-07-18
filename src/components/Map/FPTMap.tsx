import React, { useEffect, useRef } from 'react';

interface FPTMapProps {
  width?: string;
  height?: string;
  className?: string;
}

const FPTMap: React.FC<FPTMapProps> = ({ 
  width = "100%", 
  height = "100%", 
  className = "" 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    // FPT University HCMC coordinates
    const fptUniversity = {
      lat: 10.8416,
      lng: 106.8064,
      name: "Đại học FPT TP.HCM",
      address: "Lô E2a-7, Đường D1, Khu Công nghệ cao, P.Long Thạnh Mỹ, Q.9, TP.HCM"
    };

    const initMap = () => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: fptUniversity.lat, lng: fptUniversity.lng },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Add marker for FPT University
      const marker = new google.maps.Marker({
        position: { lat: fptUniversity.lat, lng: fptUniversity.lng },
        map: map,
        title: fptUniversity.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; color: #333; font-weight: bold;">${fptUniversity.name}</h3>
            <p style="margin: 0; color: #666; font-size: 12px;">${fptUniversity.address}</p>
          </div>
        `
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    };

    // Load Google Maps API
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    loadGoogleMapsAPI();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{ width, height }} 
      className={className}
    />
  );
};

export default FPTMap; 