import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './SlotSelectionStyles';
import { parkingService } from '../../../services/parkingService';
import { realtimeService } from '../../../services/realtimeService';

// ── Helpers ────────────────────────────────────────────────────────────────────
/** Extract the letter-prefix zone from a slot number e.g. 'A-101' → 'A' */
const getZone = (slotNumber = '') => {
  const match = slotNumber.match(/^([A-Za-z]+)/);
  return match ? match[1].toUpperCase() : 'Z';
};

/** Group an array of slots by their zone prefix */
const groupByZone = (slots) => {
  return slots.reduce((acc, slot) => {
    const zone = getZone(slot.id);
    if (!acc[zone]) acc[zone] = [];
    acc[zone].push(slot);
    return acc;
  }, {});
};

// ── Component ──────────────────────────────────────────────────────────────────
const SlotSelection = ({ parking, onBack, onContinue }) => {
  const facilityName = parking?.name || 'Central Plaza Parking';
  const locationId   = parking?.id  || 1;

  const [slots, setSlots]               = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'available' | 'ev'

  // ── Load live slots from Supabase ──────────────────────────────────────────
  const loadLiveSlots = useCallback(async () => {
    try {
      // Fetch ALL slot types for this location (remove slot_type filter)
      const { data, error } = await (async () => {
        const { supabase } = await import('../../../config/supabase');
        return supabase
          .from('parking_slots')
          .select('*')
          .eq('location_id', locationId)
          .eq('is_active', true)
          .order('slot_number', { ascending: true });
      })();

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped = data.map((s) => ({
          id:     s.slot_number,
          rawId:  s.slot_id,
          type:   s.slot_type === 'EV' ? 'EV Charging' : s.slot_type === 'DISABLED' ? 'Accessible' : 'Standard',
          status: s.status.toLowerCase(),   // 'available' | 'reserved' | 'occupied' | 'maintenance'
          zone:   facilityName,
          floor:  s.floor_level || 'P1',
        }));
        setSlots(mapped);
      }
    } catch (e) {
      console.log('SlotSelection load error:', e.message);
    } finally {
      setLoading(false);
    }
  }, [locationId, facilityName]);

  useEffect(() => {
    loadLiveSlots();

    // ── Real-time subscription ─────────────────────────────────────────────
    const channel = realtimeService.subscribeToSlots(locationId, (payload) => {
      if (payload.eventType === 'UPDATE' && payload.new) {
        const updated = payload.new;
        setSlots((prev) =>
          prev.map((s) =>
            s.rawId === updated.slot_id
              ? { ...s, status: updated.status.toLowerCase() }
              : s
          )
        );
      }
      if (payload.eventType === 'INSERT' && payload.new) {
        const s = payload.new;
        if (String(s.location_id) === String(locationId)) {
          setSlots((prev) => [
            ...prev,
            {
              id:    s.slot_number,
              rawId: s.slot_id,
              type:  s.slot_type === 'EV' ? 'EV Charging' : 'Standard',
              status: s.status.toLowerCase(),
              zone:  facilityName,
              floor: s.floor_level || 'P1',
            },
          ].sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })));
        }
      }
      if (payload.eventType === 'DELETE' && payload.old) {
        setSlots((prev) => prev.filter((s) => s.rawId !== payload.old.slot_id));
      }
    });

    return () => realtimeService.unsubscribe(channel);
  }, [locationId]);

  // ── Derived state ──────────────────────────────────────────────────────────
  const selectedSlot = slots.find((s) => s.id === selectedSlotId);

  const displaySlots = filterStatus === 'available'
    ? slots.filter((s) => s.status === 'available')
    : filterStatus === 'ev'
    ? slots.filter((s) => s.type === 'EV Charging')
    : slots;

  const availableCount  = slots.filter((s) => s.status === 'available').length;
  const occupiedCount   = slots.filter((s) => s.status === 'occupied' || s.status === 'reserved').length;
  const zoneGroups      = groupByZone(displaySlots);
  const sortedZones     = Object.keys(zoneGroups).sort();

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSlotPress = (slot) => {
    if (slot.status === 'occupied' || slot.status === 'reserved') {
      Alert.alert('Slot Taken', `Slot ${slot.id} is currently occupied.`);
      return;
    }
    if (slot.status === 'maintenance') {
      Alert.alert('Under Maintenance', `Slot ${slot.id} is offline for maintenance.`);
      return;
    }
    setSelectedSlotId(slot.id === selectedSlotId ? null : slot.id);
  };

  const handleProceed = () => {
    if (!selectedSlotId) {
      Alert.alert('No Slot Selected', 'Please tap an available slot on the grid to continue.');
      return;
    }
    onContinue?.(selectedSlot);
  };

  // ── Slot Cell Renderer ─────────────────────────────────────────────────────
  const renderSlotCell = (slot) => {
    const isSelected = selectedSlotId === slot.id;
    const isOccupied = slot.status === 'occupied' || slot.status === 'reserved';
    const isMaint    = slot.status === 'maintenance';
    const isEV       = slot.type   === 'EV Charging';

    let cellBg    = '#DCFCE7';   // green tint: available
    let borderClr = '#22C55E';
    let iconColor = '#15803D';

    if (isOccupied) { cellBg = '#FEE2E2'; borderClr = '#EF4444'; iconColor = '#EF4444'; }
    if (isMaint)    { cellBg = '#F1F5F9'; borderClr = '#CBD5E1'; iconColor = '#94A3B8'; }
    if (isSelected) { cellBg = '#0052cc'; borderClr = '#003d99'; iconColor = '#FFFFFF'; }

    return (
      <TouchableOpacity
        key={slot.id}
        onPress={() => handleSlotPress(slot)}
        activeOpacity={0.75}
        style={{
          width: 58,
          height: 52,
          backgroundColor: cellBg,
          borderRadius: 8,
          borderWidth: 1.5,
          borderColor: borderClr,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 3,
          position: 'relative',
        }}
      >
        {isOccupied ? (
          <MaterialCommunityIcons name="car" size={20} color={iconColor} />
        ) : isMaint ? (
          <MaterialCommunityIcons name="alert-circle-outline" size={16} color={iconColor} />
        ) : (
          <>
            {isEV && !isSelected && (
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={10}
                color="#0052cc"
                style={{ position: 'absolute', top: 3, right: 4 }}
              />
            )}
            <Text style={{ fontSize: 10, fontWeight: '700', color: iconColor, textAlign: 'center' }}>
              {slot.id}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  // ── Zone Column Renderer ───────────────────────────────────────────────────
  const renderZoneColumn = (zoneName) => {
    const zoneSlots = zoneGroups[zoneName] || [];
    const half      = Math.ceil(zoneSlots.length / 2);
    const leftCol   = zoneSlots.slice(0, half);
    const rightCol  = zoneSlots.slice(half);

    return (
      <View key={zoneName} style={{ marginBottom: 12 }}>
        {/* Zone label */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <View style={{
            backgroundColor: '#EFF6FF',
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: '#BFDBFE',
          }}>
            <Text style={{ fontSize: 11, fontWeight: '800', color: '#0052cc', letterSpacing: 0.5 }}>
              ZONE {zoneName}
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0', marginLeft: 8 }} />
          <Text style={{ fontSize: 10, color: '#94A3B8', marginLeft: 8 }}>
            {zoneSlots.filter((s) => s.status === 'available').length}/{zoneSlots.length} free
          </Text>
        </View>

        {/* Two-column slot grid with driving lane in between */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Left column */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 130, justifyContent: 'flex-end' }}>
            {leftCol.map(renderSlotCell)}
          </View>

          {/* Driving lane */}
          <View style={{
            width: 28,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 6,
            marginHorizontal: 4,
          }}>
            <View style={{ width: 2, flex: 1, backgroundColor: '#E2E8F0', borderRadius: 1 }} />
            <MaterialCommunityIcons name="arrow-up-down" size={14} color="#CBD5E1" style={{ marginVertical: 4 }} />
            <View style={{ width: 2, flex: 1, backgroundColor: '#E2E8F0', borderRadius: 1 }} />
          </View>

          {/* Right column */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: 130, justifyContent: 'flex-start' }}>
            {rightCol.map(renderSlotCell)}
          </View>
        </View>
      </View>
    );
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#0052cc" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Parking Slot</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0052cc" />
          <Text style={{ marginTop: 12, color: '#64748B', fontSize: 14 }}>
            Loading facility map...
          </Text>
        </View>
      </View>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.75}>
            <Feather name="arrow-left" size={24} color="#0052cc" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Parking Slot</Text>
        </View>
        <View style={styles.avatarCircle}>
          <Feather name="user" size={18} color="#0052cc" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ── Availability Banner ── */}
        <View style={styles.occupancyCard}>
          <Text style={styles.occupancySubtitle}>FACILITY AVAILABILITY</Text>
          <Text style={styles.occupancyTitle}>{availableCount} Slots Available</Text>
          <View style={{ flexDirection: 'row', marginTop: 4, gap: 6 }}>
            <View style={[styles.chip, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.chipText}>🟢 {availableCount} Free</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.chipText}>🔴 {occupiedCount} Taken</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.chipText}>{facilityName}</Text>
            </View>
          </View>
        </View>

        {/* ── Legend ── */}
        <Text style={styles.legendTitle}>Status Legend</Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            {[
              { color: '#22C55E', label: 'Available' },
              { color: '#0052cc', label: 'Selected' },
              { color: '#EF4444', label: 'Occupied' },
              { color: '#94A3B8', label: 'Maintenance' },
            ].map((item) => (
              <View key={item.label} style={styles.legendItem}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Filter Pills ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Facility Spatial Grid Map</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {[
              { key: 'all',       label: 'All' },
              { key: 'available', label: '✓ Free' },
              { key: 'ev',        label: '⚡ EV' },
            ].map((f) => (
              <TouchableOpacity
                key={f.key}
                onPress={() => setFilterStatus(f.key)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                  backgroundColor: filterStatus === f.key ? '#0052cc' : '#EFF6FF',
                  borderWidth: 1,
                  borderColor: filterStatus === f.key ? '#003d99' : '#BFDBFE',
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '700', color: filterStatus === f.key ? '#fff' : '#0052cc' }}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Live Grid Map ── */}
        <View style={[styles.gridMapContainer, { padding: 14 }]}>
          {sortedZones.length === 0 ? (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <MaterialCommunityIcons name="car-off" size={40} color="#CBD5E1" />
              <Text style={{ marginTop: 10, color: '#94A3B8', fontSize: 14 }}>
                No slots found for this filter
              </Text>
            </View>
          ) : (
            sortedZones.map(renderZoneColumn)
          )}

          {/* Entrance/Exit indicator */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="arrow-left-right" size={20} color="#CBD5E1" />
              <Text style={{ fontSize: 10, color: '#CBD5E1', marginLeft: 4 }}>ENTRANCE</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 10, color: '#CBD5E1', marginRight: 4 }}>EXIT</Text>
              <MaterialCommunityIcons name="arrow-left-right" size={20} color="#CBD5E1" />
            </View>
          </View>
        </View>

        {/* ── Selected Slot Info Panel ── */}
        <View style={styles.detailsPanel}>
          {selectedSlot ? (
            <View style={styles.detailsContent}>
              <View style={styles.detailsHeaderRow}>
                <View>
                  <Text style={styles.detailsSlotId}>Slot {selectedSlot.id}</Text>
                  <Text style={styles.detailsMetadata}>Facility: {selectedSlot.zone}</Text>
                  <Text style={styles.detailsMetadata}>Type: {selectedSlot.type} • Floor: {selectedSlot.floor}</Text>
                </View>
                <View style={styles.badgeAvailable}>
                  <Text style={styles.badgeTextAvailable}>Available</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleProceed}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons name="credit-card-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.confirmBtnText}>Proceed to Confirm Booking</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.detailsPlaceholder}>
              <Feather name="info" size={20} color="#0052cc" style={{ marginBottom: 6 }} />
              <Text style={styles.placeholderText}>
                Select an available parking slot from the spatial map above to reserve.
              </Text>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

export default SlotSelection;
