import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './SlotManagementStyles';
import { supabase } from '../../../config/supabase';
import { realtimeService } from '../../../services/realtimeService';

const SlotManagement = () => {
  const [slots, setSlots] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Available', 'Occupied', 'EV Charging', 'Maintenance'

  // Modals and Form States
  const [modalVisible, setModalVisible]       = useState(false);
  const [lotModalVisible, setLotModalVisible] = useState(false);
  const [editingSlot, setEditingSlot]         = useState(null);
  
  const [formNumber, setFormNumber] = useState('');
  const [formFloor, setFormFloor]   = useState('Ground Floor');
  const [formLotId, setFormLotId]   = useState(1);
  const [formType, setFormType]     = useState('4-WHEELER'); // '4-WHEELER' | '2-WHEELER' | 'EV' | 'ACCESSIBLE'
  const [formStatus, setFormStatus] = useState('AVAILABLE'); // 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE'

  // New Location Form State (matching schema)
  const [newLotName, setNewLotName]       = useState('');
  const [newLotAddress, setNewLotAddress] = useState('');
  const [newLotCity, setNewLotCity]       = useState('Sathyamangalam');

  // ── 1. Fetch live slots & locations from Supabase ────────────────────────
  const loadSlotsFromDB = useCallback(async () => {
    try {
      // Fetch locations (schema: location_id, name, address, city, total_capacity, latitude, longitude)
      const { data: locs } = await supabase
        .from('parking_locations')
        .select('*')
        .order('location_id', { ascending: true });
      if (locs) setLocations(locs);

      // Fetch slots joined with location (schema: slot_id, location_id, slot_number, floor_level, slot_type, status, is_active)
      const { data: slotsData, error } = await supabase
        .from('parking_slots')
        .select('*, parking_locations(name, address, city)')
        .eq('is_active', true)
        .order('slot_id', { ascending: true });

      if (!error && slotsData) {
        const mapped = slotsData.map((s) => {
          let typeLabel = s.slot_type || '4-WHEELER';
          if (s.slot_type === 'EV') typeLabel = 'EV Charging';
          else if (s.slot_type === 'ACCESSIBLE') typeLabel = 'Accessible';
          else if (s.slot_type === '2-WHEELER') typeLabel = '2-Wheeler';
          else if (s.slot_type === '4-WHEELER') typeLabel = '4-Wheeler';

          let statusLabel = s.status || 'AVAILABLE';
          if (s.status === 'AVAILABLE') statusLabel = 'Available';
          else if (s.status === 'OCCUPIED') statusLabel = 'Occupied';
          else if (s.status === 'RESERVED') statusLabel = 'Reserved';
          else if (s.status === 'MAINTENANCE') statusLabel = 'Maintenance';

          return {
            id:         String(s.slot_id),
            rawId:      s.slot_id,
            number:     s.slot_number,
            floor:      s.floor_level || 'Ground Floor',
            lot:        s.parking_locations?.name || 'Main Parking Lot',
            lotCity:    s.parking_locations?.city || 'Sathyamangalam',
            type:       typeLabel,
            rawType:    s.slot_type || '4-WHEELER',
            status:     statusLabel,
            rawStatus:  s.status || 'AVAILABLE',
            raw:        s,
          };
        });
        setSlots(mapped);
      }
    } catch (e) {
      console.log('SlotManagement DB fetch error:', e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSlotsFromDB();

    // Subscribe to Realtime updates on parking_slots
    const channelSlots = realtimeService.subscribeToSlots(1, () => {
      loadSlotsFromDB();
    });

    return () => {
      realtimeService.unsubscribe(channelSlots);
    };
  }, [loadSlotsFromDB]);

  // Handle open modal for new slot
  const handleAddNewSlot = () => {
    setEditingSlot(null);
    setFormNumber('');
    setFormFloor('Ground Floor');
    setFormLotId(locations.length > 0 ? locations[0].location_id : 1);
    setFormType('4-WHEELER');
    setFormStatus('AVAILABLE');
    setModalVisible(true);
  };

  // Handle open modal for edit
  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setFormNumber(slot.number);
    setFormFloor(slot.floor || 'Ground Floor');
    setFormLotId(slot.raw?.location_id || 1);
    setFormType(slot.rawType || '4-WHEELER');
    setFormStatus(slot.rawStatus || 'AVAILABLE');
    setModalVisible(true);
  };

  // Save Slot (Create or Update in Supabase Table DB matching schema)
  const handleSaveSlot = async () => {
    if (!formNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter a slot number.');
      return;
    }

    try {
      if (editingSlot) {
        // Update DB row (schema: location_id, slot_number, floor_level, slot_type, status)
        const { error } = await supabase
          .from('parking_slots')
          .update({
            location_id: formLotId || 1,
            slot_number: formNumber.trim().toUpperCase(),
            floor_level: formFloor || 'Ground Floor',
            slot_type:   formType,
            status:      formStatus,
          })
          .eq('slot_id', editingSlot.rawId);

        if (error) throw error;
        Alert.alert('Success', `Slot ${formNumber.trim().toUpperCase()} updated successfully.`);
      } else {
        // Insert new DB row (schema: location_id, slot_number, floor_level, slot_type, status, is_active)
        const { error } = await supabase
          .from('parking_slots')
          .insert([
            {
              location_id: formLotId || 1,
              slot_number: formNumber.trim().toUpperCase(),
              floor_level: formFloor || 'Ground Floor',
              slot_type:   formType,
              status:      formStatus,
              is_active:   true,
            },
          ]);

        if (error) throw error;
        Alert.alert('Success', `Slot ${formNumber.trim().toUpperCase()} created and integrated in DB.`);
      }

      await loadSlotsFromDB();
      setModalVisible(false);
    } catch (e) {
      console.error('Save slot error:', e);
      Alert.alert('Error', e.message || 'Could not save slot configuration.');
    }
  };

  // Create New Location (schema: name, address, city, total_capacity)
  const handleSaveNewLot = async () => {
    if (!newLotName.trim()) {
      Alert.alert('Validation Error', 'Please enter a location name.');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('parking_locations')
        .insert([
          {
            name: newLotName.trim(),
            address: newLotAddress.trim() || 'BIT Campus Zone',
            city: newLotCity.trim() || 'Sathyamangalam',
            total_capacity: 0, // auto-updated by trg_sync_slot_count trigger on insertion of slots
          },
        ])
        .select();

      if (error) throw error;

      await loadSlotsFromDB();
      if (data && data.length > 0) {
        setFormLotId(data[0].location_id);
      }
      setNewLotName('');
      setNewLotAddress('');
      setLotModalVisible(false);
      Alert.alert('Success', `New Parking Location "${newLotName.trim()}" created and integrated in DB.`);
    } catch (e) {
      console.error('Save lot error:', e);
      Alert.alert('Error', e.message || 'Could not create new location.');
    }
  };

  // Delete Slot from Supabase Table DB
  const handleDeleteSlot = (id, rawId) => {
    Alert.alert(
      'Delete Slot',
      'Are you sure you want to delete this parking slot from the database?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await supabase.from('parking_slots').delete().eq('slot_id', rawId);
              await loadSlotsFromDB();
            } catch (e) {
              console.error('Delete slot error:', e);
            }
          } 
        }
      ]
    );
  };

  // Quick toggle status in Supabase Table DB
  const handleToggleStatus = async (slot) => {
    const statusCycle = {
      'Available':   'OCCUPIED',
      'Occupied':    'MAINTENANCE',
      'Maintenance': 'AVAILABLE'
    };
    const nextDbStatus = statusCycle[slot.status] || 'AVAILABLE';
    try {
      await supabase
        .from('parking_slots')
        .update({ status: nextDbStatus })
        .eq('slot_id', slot.rawId);

      await loadSlotsFromDB();
    } catch (e) {
      console.log('Toggle status error:', e);
    }
  };

  // Filter & Search Logic
  const filteredSlots = slots.filter(s => {
    const matchesSearch = s.number.toLowerCase().includes(search.toLowerCase()) || 
                          s.lot.toLowerCase().includes(search.toLowerCase()) ||
                          s.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || s.status === filter || s.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Slot Management</Text>
        <View style={styles.headerButtonsRow}>
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#DBEAFE' }]}
            onPress={() => setLotModalVisible(true)}
            activeOpacity={0.8}
          >
            <FeatherIcon name="folder-plus" size={16} color="#0052cc" />
            <Text style={[styles.addButtonText, { color: '#0052cc' }]}>+ Lot</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddNewSlot}
            activeOpacity={0.8}
          >
            <FeatherIcon name="plus" size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>+ Slot</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Lot Overview Banner (Live Table DB Metrics) */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View>
              <Text style={styles.overviewSubtitle}>LIVE TABLE DB INVENTORY</Text>
              <Text style={styles.overviewTitle}>{slots.length} Total Slots</Text>
            </View>
            <FeatherIcon name="layers" size={32} color="#DBEAFE" />
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricCol}>
              <Text style={styles.metricValue}>{slots.filter(s => s.status === 'Available').length}</Text>
              <Text style={styles.metricLabel}>Available</Text>
            </View>
            <View style={styles.metricCol}>
              <Text style={styles.metricValue}>{slots.filter(s => s.status === 'Occupied').length}</Text>
              <Text style={styles.metricLabel}>Occupied</Text>
            </View>
            <View style={styles.metricCol}>
              <Text style={styles.metricValue}>{slots.filter(s => s.status === 'Maintenance').length}</Text>
              <Text style={styles.metricLabel}>Maintenance</Text>
            </View>
          </View>
        </View>

        {/* Filter and Search Section */}
        <View style={styles.filterSection}>
          <View style={styles.searchBar}>
            <FeatherIcon name="search" size={16} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by slot number, lot, or type..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
            {search ? (
              <TouchableOpacity onPress={() => setSearch('')}>
                <FeatherIcon name="x" size={16} color="#94A3B8" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Filter Chips Scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChipsScroll}>
            {['All', 'Available', 'Occupied', 'EV Charging', 'Accessible', 'Maintenance'].map(chip => (
              <TouchableOpacity
                key={chip}
                style={[styles.chip, filter === chip && styles.chipActive]}
                onPress={() => setFilter(chip)}
              >
                <Text style={[styles.chipText, filter === chip && styles.chipTextActive]}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Slot Inventory List Cards */}
        {loading ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0052cc" />
            <Text style={{ marginTop: 10, color: '#64748B', fontSize: 13 }}>Loading slots from database...</Text>
          </View>
        ) : filteredSlots.length === 0 ? (
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <FeatherIcon name="layers" size={32} color="#94A3B8" style={{ marginBottom: 8 }} />
            <Text style={{ fontSize: 14, color: '#64748B', fontWeight: '600' }}>No matching parking slots found.</Text>
          </View>
        ) : (
          filteredSlots.map(item => (
            <View key={item.id} style={styles.slotCard}>
              <View style={styles.slotCardHeader}>
                <Text style={styles.slotNumber}>{item.number}</Text>
                <View style={
                  item.status === 'Available' ? styles.statusBadgeAvailable :
                  item.status === 'Occupied' ? styles.statusBadgeOccupied : styles.statusBadgeMaintenance
                }>
                  <Text style={
                    item.status === 'Available' ? styles.statusTextAvailable :
                    item.status === 'Occupied' ? styles.statusTextOccupied : styles.statusTextMaintenance
                  }>{item.status}</Text>
                </View>
              </View>

              <Text style={styles.lotName}>{item.lot}</Text>

              <View style={styles.metaRow}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{item.type}</Text>
                </View>
                <Text style={styles.rateText}>{item.floor}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.cardActionsRow}>
                <TouchableOpacity 
                  style={styles.iconActionBtn}
                  onPress={() => handleToggleStatus(item)}
                  activeOpacity={0.8}
                >
                  <FeatherIcon name="refresh-cw" size={16} color="#0052cc" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.iconActionBtn}
                  onPress={() => handleEditSlot(item)}
                  activeOpacity={0.8}
                >
                  <FeatherIcon name="edit-2" size={16} color="#0052cc" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.iconActionBtn, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}
                  onPress={() => handleDeleteSlot(item.id, item.rawId)}
                  activeOpacity={0.8}
                >
                  <FeatherIcon name="trash-2" size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

      </ScrollView>

      {/* Add / Edit Slot Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{editingSlot ? 'Edit Slot Configuration' : 'Add New Parking Slot'}</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Slot Number / Code</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. A-105"
                placeholderTextColor="#94A3B8"
                value={formNumber}
                onChangeText={setFormNumber}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Parking Location / Facility</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginVertical: 4 }}>
                {locations.map((loc) => (
                  <TouchableOpacity
                    key={loc.location_id}
                    style={[
                      styles.optionPill,
                      formLotId === loc.location_id && styles.optionPillActive,
                      { marginRight: 8 }
                    ]}
                    onPress={() => setFormLotId(loc.location_id)}
                  >
                    <Text style={[styles.optionPillText, formLotId === loc.location_id && styles.optionPillTextActive]}>
                      {loc.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Floor Level</Text>
              <View style={styles.optionPillRow}>
                {['Ground Floor', 'Floor 1', 'Floor 2', 'Basement'].map((fl) => (
                  <TouchableOpacity
                    key={fl}
                    style={[styles.optionPill, formFloor === fl && styles.optionPillActive]}
                    onPress={() => setFormFloor(fl)}
                  >
                    <Text style={[styles.optionPillText, formFloor === fl && styles.optionPillTextActive]}>{fl}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Slot Type (Vehicle Type Enum)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginVertical: 4 }}>
                {[
                  { key: '4-WHEELER',  label: '4-Wheeler' },
                  { key: '2-WHEELER',  label: '2-Wheeler' },
                  { key: 'EV',         label: 'EV Charging' },
                  { key: 'ACCESSIBLE', label: 'Accessible' },
                ].map((t) => (
                  <TouchableOpacity
                    key={t.key}
                    style={[styles.optionPill, formType === t.key && styles.optionPillActive, { marginRight: 8 }]}
                    onPress={() => setFormType(t.key)}
                  >
                    <Text style={[styles.optionPillText, formType === t.key && styles.optionPillTextActive]}>{t.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Status (Slot Status Enum)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', marginVertical: 4 }}>
                {[
                  { key: 'AVAILABLE',   label: 'Available' },
                  { key: 'OCCUPIED',    label: 'Occupied' },
                  { key: 'RESERVED',    label: 'Reserved' },
                  { key: 'MAINTENANCE', label: 'Maintenance' },
                ].map((st) => (
                  <TouchableOpacity
                    key={st.key}
                    style={[styles.optionPill, formStatus === st.key && styles.optionPillActive, { marginRight: 8 }]}
                    onPress={() => setFormStatus(st.key)}
                  >
                    <Text style={[styles.optionPillText, formStatus === st.key && styles.optionPillTextActive]}>{st.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveSlot}>
                <Text style={styles.saveBtnText}>Save Configuration</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add New Location Modal (schema: name, address, city) */}
      <Modal visible={lotModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Register New Parking Location</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location / Facility Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. BIT Plaza Parking"
                placeholderTextColor="#94A3B8"
                value={newLotName}
                onChangeText={setNewLotName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Street Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Sathyamangalam Main Rd"
                placeholderTextColor="#94A3B8"
                value={newLotAddress}
                onChangeText={setNewLotAddress}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Sathyamangalam"
                placeholderTextColor="#94A3B8"
                value={newLotCity}
                onChangeText={setNewLotCity}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setLotModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveNewLot}>
                <Text style={styles.saveBtnText}>Create Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default SlotManagement;
