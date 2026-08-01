import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './HomeStyles';
import { parkingService } from '../../../services/parkingService';
import { realtimeService } from '../../../services/realtimeService';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

// Sample parking data
const PARKING_SPOTS = [
  {
    id: '1',
    name: 'Grand Central Parking',
    rating: 4.9,
    distance: '0.4 miles away',
    time: '4 mins',
    availableSlots: 12,
    rate: 80,
    lat: 40.7527,
    lng: -73.9772,
    price: '₹80',
  },
  {
    id: '2',
    name: 'Plaza Parking Hub',
    rating: 4.8,
    distance: '0.8 miles away',
    time: '7 mins',
    availableSlots: 3,
    rate: 120,
    lat: 40.7644,
    lng: -73.9735,
    price: '₹120',
  },
  {
    id: '3',
    name: 'Lincoln Center Lot',
    rating: 4.5,
    distance: '1.2 miles away',
    time: '10 mins',
    availableSlots: 8,
    rate: 150,
    lat: 40.7725,
    lng: -73.9835,
    price: '₹150',
  },
  {
    id: '4',
    name: 'Midtown Secure Park',
    rating: 4.7,
    distance: '0.6 miles away',
    time: '5 mins',
    availableSlots: 5,
    rate: 100,
    lat: 40.7549,
    lng: -73.9840,
    price: '₹100',
  },
  {
    id: '5',
    name: 'Times Square Garage',
    rating: 4.3,
    distance: '0.9 miles away',
    time: '8 mins',
    availableSlots: 2,
    rate: 180,
    lat: 40.7580,
    lng: -73.9855,
    price: '₹180',
  },
];

const FILTERS = [
  { id: 'nearby', label: 'Nearby', icon: 'navigation' },
  { id: 'ev', label: 'EV Charging', icon: 'battery-charging' },
  { id: 'underground', label: 'Underground', icon: 'arrow-down-circle' },
  { id: 'covered', label: 'Covered', icon: 'umbrella' },
  { id: 'accessible', label: 'Accessible', icon: 'user' },
];

// Build Leaflet HTML with OpenStreetMap tiles
const buildMapHTML = (spots) => {
  const markersJS = spots
    .map(
      (s, i) => `
    var marker${i} = L.marker([${s.lat}, ${s.lng}], {
      icon: L.divIcon({
        className: 'price-marker',
        html: '<div class="marker-bubble">${s.price}</div><div class="marker-arrow"></div>',
        iconSize: [60, 40],
        iconAnchor: [30, 40],
      })
    }).addTo(map);
    marker${i}.on('click', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerPress', index: ${i} }));
    });
  `,
    )
    .join('\n');

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
    .price-marker { background: none; border: none; }
    .marker-bubble {
      background: #0052cc;
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      padding: 5px 10px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,82,204,0.35);
      white-space: nowrap;
    }
    .marker-arrow {
      width: 0; height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 8px solid #0052cc;
      margin: -1px auto 0 auto;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView([40.7580, -73.9855], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    ${markersJS}

    document.addEventListener('message', function(e) {
      try {
        var data = JSON.parse(e.data);
        if (data.type === 'flyTo') {
          map.flyTo([data.lat, data.lng], 15, { duration: 0.5 });
        }
      } catch(err) {}
    });
    window.addEventListener('message', function(e) {
      try {
        var data = JSON.parse(e.data);
        if (data.type === 'flyTo') {
          map.flyTo([data.lat, data.lng], 15, { duration: 0.5 });
        }
      } catch(err) {}
    });
  </script>
</body>
</html>
  `;
};

const Home = ({ onBack, onSearch, onParkingSelect, onReserve }) => {
  const [activeFilter, setActiveFilter] = useState('nearby');
  const [parkingSpots, setParkingSpots] = useState(PARKING_SPOTS);
  const webViewRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await parkingService.getParkingLocations();
        if (res.success && res.data && res.data.length > 0) {
          const dbSpots = res.data.map((loc, i) => ({
            id: String(loc.location_id),
            name: loc.name,
            rating: 4.8,
            distance: '0.5 miles away',
            time: '5 mins',
            availableSlots: loc.availableSlots ?? loc.total_capacity ?? 10,
            rate: 100,
            lat: loc.latitude ? Number(loc.latitude) : 40.7527 + i * 0.005,
            lng: loc.longitude ? Number(loc.longitude) : -73.9772 + i * 0.005,
            price: '\u20b9100',
          }));
          setParkingSpots(dbSpots);
        }
      } catch (err) {
        console.log('Supabase location load fallback:', err);
      }
    }
    loadLocations();

    // Real-time: when any slot status changes, re-fetch location available counts
    const channel = realtimeService.subscribeToSlots(1, (payload) => {
      if (payload.eventType === 'UPDATE' && payload.new) {
        const updated = payload.new;
        setParkingSpots((prev) =>
          prev.map((spot) => {
            if (String(spot.id) === String(updated.location_id)) {
              const delta =
                updated.status === 'AVAILABLE' ? 1
                : updated.status === 'RESERVED' || updated.status === 'OCCUPIED' ? -1
                : 0;
              return {
                ...spot,
                availableSlots: Math.max(0, (spot.availableSlots || 0) + delta),
              };
            }
            return spot;
          })
        );
      }
    });

    return () => realtimeService.unsubscribe(channel);
  }, []);

  const mapHTML = buildMapHTML(parkingSpots);

  const handleMapMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'markerPress') {
        flatListRef.current?.scrollToIndex({
          index: data.index,
          animated: true,
        });
      }
    } catch (e) {}
  };

  const handleCardScroll = (index) => {
    const spot = parkingSpots[index];
    if (spot && webViewRef.current) {
      webViewRef.current.postMessage(
        JSON.stringify({ type: 'flyTo', lat: spot.lat, lng: spot.lng }),
      );
    }
  };

  const renderParkingCard = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => handleCardScroll(index)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingBadge}>
          <Icon name="star" size={12} color="#16A34A" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.cardMeta}>
        <Icon name="navigation" size={13} color="#64748B" />
        <Text style={styles.cardMetaText}>
          {item.distance} • {item.time}
        </Text>
      </View>
      <View style={styles.cardDivider} />
      <View style={styles.cardFooter}>
        <View style={styles.cardStat}>
          <Text style={styles.cardStatLabel}>AVAILABLE SLOTS</Text>
          <Text style={styles.cardStatValue}>{item.availableSlots}</Text>
        </View>
        <View style={styles.cardStatDivider} />
        <View style={styles.cardStat}>
          <Text style={styles.cardStatLabel}>RATE</Text>
          <Text style={styles.cardStatValue}>
            ₹{item.rate}
            <Text style={styles.cardStatUnit}>/hr</Text>
          </Text>
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.detailsBtn}
          activeOpacity={0.7}
          onPress={() => onParkingSelect?.({ ...item, _from: 'Home' })}
        >
          <Text style={styles.detailsBtnText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reserveBtn}
          activeOpacity={0.8}
          onPress={() => onReserve?.({ ...item, _from: 'Home' })}
        >
          <Text style={styles.reserveBtnText}>Reserve Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Leaflet Map */}
      <WebView
        ref={webViewRef}
        source={{ html: mapHTML }}
        style={styles.map}
        onMessage={handleMapMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        scrollEnabled={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Header */}
      <View style={styles.headerOverlay} pointerEvents="box-none">
        <View pointerEvents="box-none">
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                  <Icon name="arrow-left" size={20} color="#0F172A" />
                </TouchableOpacity>
              )}
              <View>
                <Text style={styles.greeting}>Hello, Alex</Text>
                <View style={styles.locationRow}>
                  <Icon name="map-pin" size={12} color="#0052cc" />
                  <Text style={styles.locationText}>New York, NY</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon name="user" size={20} color="#0052cc" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={onSearch}
            activeOpacity={0.8}
          >
            <Icon name="search" size={18} color="#94A3B8" />
            <Text style={styles.searchPlaceholder}>Where to park?</Text>
          </TouchableOpacity>

          {/* Filter Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  activeFilter === filter.id && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(filter.id)}
                activeOpacity={0.7}
              >
                <Icon
                  name={filter.icon}
                  size={14}
                  color={activeFilter === filter.id ? '#FFFFFF' : '#64748B'}
                  style={styles.filterIcon}
                />
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter.id && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Parking Cards */}
      <View style={styles.cardsContainer} pointerEvents="box-none">
        <FlatList
          ref={flatListRef}
          data={parkingSpots}
          renderItem={renderParkingCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          contentContainerStyle={styles.cardsList}
        />
      </View>
    </View>
  );
};

export default Home;
