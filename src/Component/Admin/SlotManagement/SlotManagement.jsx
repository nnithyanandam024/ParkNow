import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './SlotManagementStyles';

const SlotManagement = () => {
  // Admin Slot Inventory State
  const [slots, setSlots] = useState([
    { id: '1', number: 'A-101', lot: 'Lot A - Central Plaza', type: 'Standard', status: 'Available', rate: '₹80' },
    { id: '2', number: 'A-102', lot: 'Lot A - Central Plaza', type: 'Standard', status: 'Occupied', rate: '₹80' },
    { id: '3', number: 'A-103', lot: 'Lot A - Central Plaza', type: 'EV Charging', status: 'Available', rate: '₹120' },
    { id: '4', number: 'B-101', lot: 'Lot B - Waterfront', type: 'Accessible', status: 'Available', rate: '₹100' },
    { id: '5', number: 'B-102', lot: 'Lot B - Waterfront', type: 'Standard', status: 'Occupied', rate: '₹100' },
    { id: '6', number: 'C-101', lot: 'Lot C - Skyline Hub', type: 'Standard', status: 'Maintenance', rate: '₹90' },
    { id: '7', number: 'C-102', lot: 'Lot C - Skyline Hub', type: 'EV Charging', status: 'Available', rate: '₹130' },
    { id: '8', number: 'A-104', lot: 'Lot A - Central Plaza', type: 'Standard', status: 'Available', rate: '₹80' },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Available', 'Occupied', 'EV Charging', 'Accessible', 'Maintenance'

  // Modals and Form States
  const [modalVisible, setModalVisible] = useState(false);
  const [lotModalVisible, setLotModalVisible] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  
  const [formNumber, setFormNumber] = useState('');
  const [formLot, setFormLot] = useState('Lot A - Central Plaza');
  const [formType, setFormType] = useState('Standard');
  const [formStatus, setFormStatus] = useState('Available');
  const [formRate, setFormRate] = useState('₹80');

  const [newLotName, setNewLotName] = useState('');

  // Handle open modal for new slot
  const handleAddNewSlot = () => {
    setEditingSlot(null);
    setFormNumber('');
    setFormLot('Lot A - Central Plaza');
    setFormType('Standard');
    setFormStatus('Available');
    setFormRate('₹80');
    setModalVisible(true);
  };

  // Handle open modal for edit
  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setFormNumber(slot.number);
    setFormLot(slot.lot);
    setFormType(slot.type);
    setFormStatus(slot.status);
    setFormRate(slot.rate);
    setModalVisible(true);
  };

  // Save Slot (Create or Update)
  const handleSaveSlot = () => {
    if (!formNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter a slot number.');
      return;
    }

    if (editingSlot) {
      setSlots(prev => prev.map(s => s.id === editingSlot.id ? {
        ...s,
        number: formNumber,
        lot: formLot,
        type: formType,
        status: formStatus,
        rate: formRate,
      } : s));
    } else {
      const newSlot = {
        id: Date.now().toString(),
        number: formNumber,
        lot: formLot,
        type: formType,
        status: formStatus,
        rate: formRate,
      };
      setSlots(prev => [newSlot, ...prev]);
    }
    setModalVisible(false);
  };

  // Create New Lot
  const handleSaveNewLot = () => {
    if (!newLotName.trim()) {
      Alert.alert('Validation Error', 'Please enter a parking lot name.');
      return;
    }
    const defaultSlot = {
      id: Date.now().toString(),
      number: 'A-01',
      lot: newLotName.trim(),
      type: 'Standard',
      status: 'Available',
      rate: '₹80',
    };
    setSlots(prev => [defaultSlot, ...prev]);
    setNewLotName('');
    setLotModalVisible(false);
    Alert.alert('Lot Created', `Parking Zone "${newLotName.trim()}" has been registered.`);
  };

  // Delete Slot
  const handleDeleteSlot = (id) => {
    Alert.alert(
      'Delete Slot',
      'Are you sure you want to delete this parking slot from the inventory?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => setSlots(prev => prev.filter(s => s.id !== id)) 
        }
      ]
    );
  };

  // Quick toggle status
  const handleToggleStatus = (slot) => {
    const statusCycle = {
      'Available': 'Occupied',
      'Occupied': 'Maintenance',
      'Maintenance': 'Available'
    };
    const nextStatus = statusCycle[slot.status] || 'Available';
    setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, status: nextStatus } : s));
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
        
        {/* Lot Overview Banner */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View>
              <Text style={styles.overviewSubtitle}>ADMIN INVENTORY</Text>
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
        {filteredSlots.length === 0 ? (
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
                <Text style={styles.rateText}>{item.rate}/hr</Text>
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
                  onPress={() => handleDeleteSlot(item.id)}
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
              <Text style={styles.inputLabel}>Parking Lot / Zone</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Lot A - Central Plaza"
                placeholderTextColor="#94A3B8"
                value={formLot}
                onChangeText={setFormLot}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Slot Type</Text>
              <View style={styles.optionPillRow}>
                {['Standard', 'EV Charging', 'Accessible'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.optionPill, formType === t && styles.optionPillActive]}
                    onPress={() => setFormType(t)}
                  >
                    <Text style={[styles.optionPillText, formType === t && styles.optionPillTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Status</Text>
              <View style={styles.optionPillRow}>
                {['Available', 'Occupied', 'Maintenance'].map((st) => (
                  <TouchableOpacity
                    key={st}
                    style={[styles.optionPill, formStatus === st && styles.optionPillActive]}
                    onPress={() => setFormStatus(st)}
                  >
                    <Text style={[styles.optionPillText, formStatus === st && styles.optionPillTextActive]}>{st}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Hourly Rate (₹)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. ₹80"
                placeholderTextColor="#94A3B8"
                value={formRate}
                onChangeText={setFormRate}
              />
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

      {/* Add New Lot Modal */}
      <Modal visible={lotModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Register New Parking Lot</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Lot / Facility Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Lot D - Tech Park"
                placeholderTextColor="#94A3B8"
                value={newLotName}
                onChangeText={setNewLotName}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setLotModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveNewLot}>
                <Text style={styles.saveBtnText}>Create Lot</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default SlotManagement;
