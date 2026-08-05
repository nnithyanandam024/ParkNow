import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './ParkingDetailStyles';

const { width } = Dimensions.get('window');

// Placeholder images (carousel dots)
const IMAGES = [0, 1, 2];

const buildMiniMapHTML = (lat, lng) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; }
    html, body, #map { width: 100%; height: 100%; border-radius: 16px; }
    .pin {
      width: 24px; height: 24px; background: #1A5FB4; border-radius: 50%;
      border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: false, attributionControl: false })
      .setView([${lat}, ${lng}], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    L.marker([${lat}, ${lng}], {
      icon: L.divIcon({ className: '', html: '<div class="pin"></div>', iconSize: [24, 24], iconAnchor: [12, 12] })
    }).addTo(map);
  </script>
</body>
</html>
`;

const ParkingDetail = ({ parking, onBack, onReserve }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Merge with defaults
  const spot = {
    name: parking?.name || 'Parking Spot',
    rating: parking?.rating || 4.5,
    address: parking?.street
      ? `${parking.street}, ${parking.city || 'Sathyamangalam, TN'}`
      : parking?.address || 'BIT Campus, Sathyamangalam, TN',
    distance: parking?.distance || '0.3 km',
    availableSlots: parking?.availableSlots || parking?.availability === 'Almost Full' ? 3 : 12,
    rate: parking?.rate || 20,
    type: 'Hourly',
    lat: parking?.lat || 11.4967,
    lng: parking?.lng || 77.2764,
    ...parking,
  };

  const description = `The ${spot.name} facility offers a premium urban parking experience. Strategically located in the heart of the city, our facility features state-of-the-art automated entry systems, wide parking bays designed for luxury vehicles, and climate-controlled floors. Experience peace of mind with our dedicated security personnel and high-definition surveillance.`;

  const amenities = [
    { icon: 'shield', label: 'Covered\nParking' },
    { icon: 'lock', label: '24/7\nSecurity' },
    { icon: 'battery-charging', label: 'EV\nCharging' },
    { icon: 'video', label: 'CCTV\nCameras' },
  ];

  const infoCards = [
    { icon: 'navigation', label: 'DISTANCE', value: spot.distance?.replace(' away', '')?.replace(' miles', ' mi') || '0.4 mi' },
    { icon: 'clock', label: 'STATUS', value: `${spot.availableSlots} Left` },
    { icon: 'tag', label: 'PRICE', value: `₹${spot.rate}/hr` },
    { icon: 'layers', label: 'TYPE', value: spot.type },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.headerBtn}>
            <Icon name="arrow-left" size={22} color="#1A1D20" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UrbanPark</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Icon
                name="heart"
                size={20}
                color={isFavorite ? '#EF4444' : '#6B7280'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Icon name="share-2" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image Carousel Placeholder */}
        <View style={styles.imageCarousel}>
          <View style={styles.imagePlaceholder}>
            <Icon name="image" size={48} color="#C4CCd8" />
            <Text style={styles.imagePlaceholderText}>Parking Photo</Text>
          </View>
          {/* Dots */}
          <View style={styles.dotsRow}>
            {IMAGES.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, activeImage === i && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Name + Rating */}
        <View style={styles.nameSection}>
          <View style={styles.nameRow}>
            <Text style={styles.spotName}>{spot.name}</Text>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={13} color="#FFFFFF" />
              <Text style={styles.ratingText}>{spot.rating}</Text>
            </View>
          </View>
          <View style={styles.addressRow}>
            <Icon name="map-pin" size={14} color="#6B7280" />
            <Text style={styles.addressText}>{spot.address}</Text>
          </View>
        </View>

        {/* Info Cards Grid */}
        <View style={styles.infoGrid}>
          {infoCards.map((card, i) => (
            <View key={i} style={styles.infoCard}>
              <View style={styles.infoIconCircle}>
                <Icon name={card.icon} size={18} color="#1A5FB4" />
              </View>
              <Text style={styles.infoLabel}>{card.label}</Text>
              <Text style={styles.infoValue}>{card.value}</Text>
            </View>
          ))}
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {amenities.map((item, i) => (
              <View key={i} style={styles.amenityItem}>
                <View style={styles.amenityIcon}>
                  <Icon name={item.icon} size={18} color="#1A5FB4" />
                </View>
                <Text style={styles.amenityLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.descriptionBox}>
            <Text
              style={styles.descriptionText}
              numberOfLines={showFullDesc ? undefined : 5}
            >
              {description}
            </Text>
            <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
              <Text style={styles.readMore}>
                {showFullDesc ? 'Show Less' : 'Read More ▸'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.miniMapContainer}>
            <WebView
              source={{ html: buildMiniMapHTML(spot.lat, spot.lng) }}
              style={styles.miniMap}
              scrollEnabled={false}
              javaScriptEnabled
              domStorageEnabled
            />
          </View>
          <TouchableOpacity style={styles.openMapBtn}>
            <Icon name="external-link" size={14} color="#1A5FB4" />
            <Text style={styles.openMapText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing for the fixed button */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Fixed Bottom Reserve Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.reserveButton}
          activeOpacity={0.85}
          onPress={() => onReserve?.(spot)}
        >
          <Text style={styles.reserveButtonText}>
            Reserve Now — ₹{spot.rate}.00
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ParkingDetail;
