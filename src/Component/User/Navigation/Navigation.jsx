import React, { useState, useRef, useEffect } from 'react';
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
import { locationService } from '../../../services/locationService';
import { buildNavigationMapHTML } from '../../../services/leafletMapService';

const Navigation = ({ parking, slotId, onBack, onArrive }) => {
  const [isMuted, setIsMuted] = useState(false);
  const webViewRef = useRef(null);

  // Fallbacks for display variables
  const destinationName = parking?.name || 'Grand Central Parking';
  const targetSlot = slotId || 'B-12';
  const lat = parking?.lat || 11.5034;
  const lng = parking?.lng || 77.2444;

  const address = parking?.street
    ? `${parking.street}, ${parking.city || 'Sathyamangalam, TN'}`
    : parking?.address || 'Sathyamangalam, Tamil Nadu';

  const duration = parking?.time ? parking.time.replace('s', '') : '8 min';
  const distanceText = parking?.distance
    ? parking.distance.replace(' away', '').replace(' miles', ' mi').replace(' mile', ' mi')
    : '1.2 km';

  const [userLocation, setUserLocation] = useState(null);
  const [liveDistance, setLiveDistance] = useState(distanceText);

  useEffect(() => {
    let watchId = null;
    async function initLocation() {
      const hasPerm = await locationService.requestLocationPermission();
      if (hasPerm) {
        const loc = await locationService.getCurrentUserLocation();
        if (loc) {
          setUserLocation(loc);
          const dist = locationService.calculateDistance(loc.latitude, loc.longitude, lat, lng);
          setLiveDistance(`${dist} km`);
        }

        watchId = locationService.watchUserLocation((updatedLoc) => {
          if (updatedLoc) {
            setUserLocation(updatedLoc);
            const dist = locationService.calculateDistance(updatedLoc.latitude, updatedLoc.longitude, lat, lng);
            setLiveDistance(`${dist} km`);
            webViewRef.current?.postMessage(
              JSON.stringify({
                type: 'updateUserPosition',
                lat: updatedLoc.latitude,
                lng: updatedLoc.longitude,
              })
            );
          }
        });
      }
    }

    initLocation();

    return () => {
      if (watchId !== null) locationService.clearWatch(watchId);
    };
  }, [lat, lng]);

  const mapHTML = buildNavigationMapHTML(
    lat,
    lng,
    userLocation?.latitude,
    userLocation?.longitude
  );

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
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      {/* Interactive Map View */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: mapHTML, baseUrl: 'https://unpkg.com' }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
          allowUniversalAccessFromFileURLs
          allowFileAccess
          onError={(e) => console.warn('[NavMap] WebView error:', e.nativeEvent)}
        />

        {/* Floating Action Buttons */}
        <View style={styles.mapFloatingActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            <FeatherIcon name={isMuted ? 'volume-x' : 'volume-2'} size={20} color="#1A1D20" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleRecenter}>
            <MaterialIcon name="my-location" size={20} color="#1A1D20" />
          </TouchableOpacity>
        </View>

        {/* Dynamic Route Instruction Bar */}
        <View style={styles.routeBanner}>
          <View style={styles.turnCircle}>
            <MaterialIcon name="turn-left" size={26} color="#FFFFFF" />
          </View>
          <View style={styles.routeBannerTextCol}>
            <Text style={styles.distanceText}>In 200m</Text>
            <Text style={styles.instructionText}>Turn Left on 5th Avenue</Text>
          </View>
        </View>
      </View>

      {/* Bottom Control Drawer */}
      <View style={styles.bottomDrawer}>
        <View style={styles.dragHandle} />

        {/* Primary Target Info */}
        <View style={styles.destinationRow}>
          <View style={styles.destLeft}>
            <View style={styles.redPinCircle}>
              <FeatherIcon name="map-pin" size={18} color="#EA4335" />
            </View>
            <View style={styles.destTextCol}>
              <Text style={styles.destName} numberOfLines={1}>{destinationName}</Text>
              <Text style={styles.destAddress} numberOfLines={1}>{address}</Text>
            </View>
          </View>

          {/* Assigned Slot Badge */}
          <View style={styles.slotBadge}>
            <Text style={styles.slotBadgeLabel}>ASSIGNED SLOT</Text>
            <Text style={styles.slotBadgeValue}>{targetSlot}</Text>
          </View>
        </View>

        {/* Navigation Trip Metrics */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <FeatherIcon name="clock" size={16} color="#6B7280" />
            <Text style={styles.metricLabel}>Est. Time</Text>
            <Text style={styles.metricValue}>{duration}</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <FeatherIcon name="navigation" size={16} color="#6B7280" />
            <Text style={styles.metricLabel}>Distance</Text>
            <Text style={styles.metricValue}>{liveDistance}</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <FeatherIcon name="shield" size={16} color="#10B981" />
            <Text style={styles.metricLabel}>Security</Text>
            <Text style={[styles.metricValue, { color: '#10B981' }]}>Guarded</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.arriveBtn} onPress={onArrive} activeOpacity={0.85}>
          <Text style={styles.arriveBtnText}>ARRIVED AT PARKING</Text>
          <FeatherIcon name="check-circle" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Navigation;
