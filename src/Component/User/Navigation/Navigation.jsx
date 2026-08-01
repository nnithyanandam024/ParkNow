import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './NavigationStyles';

// Build Leaflet HTML with dynamic path and red pin marker
const buildNavigationMapHTML = (lat, lng) => {
  // Define route points relative to the parking lot coordinates
  const p1 = [lat - 0.003, lng - 0.006];
  const p2 = [lat - 0.003, lng - 0.001];
  const p3 = [lat - 0.0008, lng - 0.0018];
  const p4 = [lat - 0.0006, lng - 0.0006];
  const destination = [lat, lng];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; }
    html, body, #map { width: 100%; height: 100%; }
    .red-pin {
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      background: #EA4335;
      position: absolute;
      transform: rotate(-45deg);
      left: 50%;
      top: 50%;
      margin: -24px 0 0 -16px;
      border: 1.5px solid #FFFFFF;
      box-shadow: -2px 2px 5px rgba(0,0,0,0.3);
    }
    .red-pin::after {
      content: '';
      width: 10px;
      height: 10px;
      margin: 11px 0 0 11px;
      background: #FFFFFF;
      position: absolute;
      border-radius: 50%;
    }
    .pulse-ring {
      border: 3px solid #EA4335;
      border-radius: 30px;
      height: 18px;
      width: 18px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -9px 0 0 -9px;
      animation: pulsate 1.5s ease-out infinite;
      opacity: 0;
    }
    @keyframes pulsate {
      0% {transform: scale(0.1, 0.1); opacity: 0.0;}
      50% {opacity: 1.0;}
      100% {transform: scale(1.2, 1.2); opacity: 0.0;}
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    // Focus slightly offset to center the route path nicely
    var map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView([${lat - 0.001}, ${lng - 0.003}], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Thick driving route line
    var routePoints = [
      [${p1[0]}, ${p1[1]}],
      [${p2[0]}, ${p2[1]}],
      [${p3[0]}, ${p3[1]}],
      [${p4[0]}, ${p4[1]}]
    ];

    var solidLine = L.polyline(routePoints, {
      color: '#1A5FB4',
      weight: 6,
      opacity: 0.95
    }).addTo(map);

    // Dashed path line into slot
    var dashedPoints = [
      [${p4[0]}, ${p4[1]}],
      [${destination[0]}, ${destination[1]}]
    ];

    var dashedLine = L.polyline(dashedPoints, {
      color: '#1A5FB4',
      weight: 5,
      opacity: 0.8,
      dashArray: '8, 8'
    }).addTo(map);

    // Marker pin
    var customIcon = L.divIcon({
      className: '',
      html: '<div class="pulse-ring"></div><div class="red-pin"></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    L.marker([${destination[0]}, ${destination[1]}], { icon: customIcon }).addTo(map);

    // Message handler to zoom or recenter
    function recenterMap() {
      map.flyTo([${lat - 0.001}, ${lng - 0.003}], 15, { duration: 0.8 });
    }

    window.addEventListener('message', function(e) {
      try {
        var data = JSON.parse(e.data);
        if (data.type === 'recenter') {
          recenterMap();
        }
      } catch(err) {}
    });
    document.addEventListener('message', function(e) {
      try {
        var data = JSON.parse(e.data);
        if (data.type === 'recenter') {
          recenterMap();
        }
      } catch(err) {}
    });
  </script>
</body>
</html>
  `;
};

const Navigation = ({ parking, slotId, onBack, onArrive }) => {
  const [isMuted, setIsMuted] = useState(false);
  const webViewRef = useRef(null);

  // Fallbacks for display variables
  const destinationName = parking?.name || 'Grand Central Parking';
  const targetSlot = slotId || 'B-12';
  const lat = parking?.lat || 40.7527;
  const lng = parking?.lng || -73.9772;

  const address = parking?.street
    ? `${parking.street}, ${parking.city || 'New York, NY'}`
    : parking?.address || '89 E 42nd St, New York, NY';

  const duration = parking?.time ? parking.time.replace('s', '') : '8 min';
  const distanceText = parking?.distance
    ? parking.distance.replace(' away', '').replace(' miles', ' mi').replace(' mile', ' mi')
    : '1.2 km';

  const mapHTML = buildNavigationMapHTML(lat, lng);

  const handleRecenter = () => {
    webViewRef.current?.postMessage(JSON.stringify({ type: 'recenter' }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <FeatherIcon name="arrow-left" size={24} color="#1A1D20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{destinationName}</Text>
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }}
            style={styles.avatarImage}
            defaultSource={require('../../../images/login_illustration.png')} // Fallback in case of no net
          />
        </View>
      </View>

      {/* Map Content */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />

        {/* Floating guidance banner */}
        <View style={styles.guidancePanel}>
          <View style={styles.directionIconContainer}>
            <MaterialIcon name="turn-right" size={26} color="#FFFFFF" />
          </View>
          <View style={styles.directionTextContainer}>
            <Text style={styles.directionLabel}>Next turn in 250m</Text>
            <Text style={styles.directionValue}>Right onto 42nd St</Text>
          </View>
        </View>

        {/* Floating map controls */}
        <View style={styles.floatingControls}>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={() => setIsMuted(!isMuted)}
            activeOpacity={0.8}
          >
            <FeatherIcon name={isMuted ? 'volume-x' : 'volume-2'} size={20} color="#1A5FB4" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.floatingBtn}
            onPress={handleRecenter}
            activeOpacity={0.8}
          >
            <FeatherIcon name="navigation" size={20} color="#1A5FB4" />
          </TouchableOpacity>
        </View>

        {/* Slide up Bottom Sheet details */}
        <View style={styles.bottomSheet}>
          <View style={styles.dragHandle} />
          
          <View style={styles.sheetHeader}>
            <Text style={styles.locationTitle} numberOfLines={1}>
              {destinationName}
            </Text>
            <View style={styles.slotBadge}>
              <Text style={styles.slotBadgeText}>Slot {targetSlot}</Text>
            </View>
          </View>

          <View style={styles.addressContainer}>
            <FeatherIcon name="map-pin" size={14} color="#6B7280" style={styles.addressIcon} />
            <Text style={styles.addressText} numberOfLines={1}>
              {address}
            </Text>
          </View>

          {/* Time & ETA cards */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <FeatherIcon name="clock" size={18} color="#1A5FB4" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>ETA</Text>
                <Text style={styles.statValue}>{duration}</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <FeatherIcon name="navigation" size={18} color="#1A5FB4" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statLabel}>Distance</Text>
                <Text style={styles.statValue}>{distanceText}</Text>
              </View>
            </View>
          </View>

          {/* Arrive Button */}
          <TouchableOpacity
            style={styles.arriveButton}
            onPress={onArrive}
            activeOpacity={0.85}
          >
            <FeatherIcon name="check-circle" size={20} color="#FFFFFF" />
            <Text style={styles.arriveButtonText}>Arrive</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navigation;
