import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-qrcode-svg';
import { styles } from './BookingPassStyles';

const BookingPass = ({ parking, slotId, onBack, onNavigateToSlot }) => {
  const destinationName = parking?.name || 'Grand Central Parking';
  const bookingId = '#PN-88291'; // Mock ID to match screenshot

  // Combine details to encode inside the real QR code
  const qrValue = `BookingPass:${bookingId}|Location:${destinationName}|Slot:${slotId || 'B-12'}|Level:P3`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#1A1D20" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Pass</Text>
        <View style={styles.avatar}>
          <Icon name="user" size={16} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pass Card Container */}
        <View style={styles.passCard}>
          {/* Top section */}
          <View style={styles.cardTop}>
            <View style={styles.locationHeader}>
              <Text style={styles.locationLabel}>PARKING LOCATION</Text>
              <View style={styles.confirmedBadge}>
                <Text style={styles.confirmedText}>CONFIRMED</Text>
              </View>
            </View>
            <Text style={styles.locationName}>{destinationName}</Text>
            
            <View style={styles.metaRow}>
              <View>
                <Text style={styles.metaLabel}>Booking ID</Text>
                <Text style={styles.metaValue}>{bookingId}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>Date & Time</Text>
                <Text style={styles.metaValue}>Oct 24, 09:30 AM</Text>
              </View>
            </View>
          </View>

          {/* Ticket Tear line */}
          <View style={styles.tearLineContainer}>
            <View style={styles.leftCircleCutout} />
            <View style={styles.dashedLine} />
            <View style={styles.rightCircleCutout} />
          </View>

          {/* QR Code middle section */}
          <View style={styles.cardMiddle}>
            <View style={styles.qrScannerFrame}>
              {/* Corner brackets */}
              <View style={[styles.cornerBracket, styles.topLeftBracket]} />
              <View style={[styles.cornerBracket, styles.topRightBracket]} />
              <View style={[styles.cornerBracket, styles.bottomLeftBracket]} />
              <View style={[styles.cornerBracket, styles.bottomRightBracket]} />

              {/* Real QR Container */}
              <View style={styles.qrWrapper}>
                <QRCode
                  value={qrValue}
                  size={120}
                  color="#1A1D20"
                  backgroundColor="#FFFFFF"
                />
              </View>
            </View>
            <Text style={styles.scanNotice}>Scan at the entrance gate scanner</Text>
          </View>

          {/* Ticket Footer details */}
          <View style={styles.cardBottom}>
            <View style={styles.footerCol}>
              <Text style={styles.footerLabel}>SLOT</Text>
              <Text style={styles.footerValue}>{slotId || 'B-12'}</Text>
            </View>
            <View style={styles.footerDivider} />
            <View style={styles.footerCol}>
              <Text style={styles.footerLabel}>VEHICLE</Text>
              <Text style={styles.footerValue}>ABC-1234</Text>
            </View>
            <View style={styles.footerDivider} />
            <View style={styles.footerCol}>
              <Text style={styles.footerLabel}>LEVEL</Text>
              <Text style={styles.footerValue}>P3</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={onNavigateToSlot}
            activeOpacity={0.85}
          >
            <Icon name="navigation" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.navigateButtonText}>Navigate to Slot</Text>
          </TouchableOpacity>

          <View style={styles.secondaryButtonRow}>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Icon name="download" size={16} color="#4B5563" style={{ marginRight: 6 }} />
              <Text style={styles.secondaryButtonText}>Download QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Icon name="share-2" size={16} color="#4B5563" style={{ marginRight: 6 }} />
              <Text style={styles.secondaryButtonText}>Share QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingPass;
