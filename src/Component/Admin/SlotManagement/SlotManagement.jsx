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
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { styles } from './SlotManagementStyles';

const SlotManagement = () => {
  // Mock Initial Slots
  const [slots, setSlots] = useState([
    { id: '1', number: 'A-101', lot: 'Lot A', type: 'Standard', status: 'Available', rate: '₹80' },
    { id: '2', number: 'A-102', lot: 'Lot A', type: 'Standard', status: 'Occupied', rate: '₹80' },
    { id: '3', number: 'A-103', lot: 'Lot A', type: 'EV Charging', status: 'Available', rate: '₹120' },
    { id: '4', number: 'B-101', lot: 'Lot B', type: 'Accessible', status: 'Available', rate: '₹100' },
    { id: '5', number: 'B-102', lot: 'Lot B', type: 'Standard', status: 'Occupied', rate: '₹100' },
    { id: '6', number: 'C-101', lot: 'Lot C', type: 'Standard', status: 'Maintenance', rate: '₹90' },
    { id: '7', number: 'C-102', lot: 'Lot C', type: 'EV Charging', status: 'Available', rate: '₹130' },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Available', 'Occupied', 'Maintenance'

  // Modals and Form States
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  
  const [formNumber, setFormNumber] = useState('');
  const [formLot, setFormLot] = useState('Lot A');
  const [formType, setFormType] = useState('Standard');
  const [formStatus, setFormStatus] = useState('Available');
  const [formRate, setFormRate] = useState('₹80');

  // Handle open modal for new slot
  const handleAddNewSlot = () => {
    setEditingSlot(null);
    setFormNumber('');
    setFormLot('Lot A');
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

  // Save (Create or Update)
  const handleSaveSlot = () => {
    if (!formNumber.trim()) {
      Alert.alert('Validation Error', 'Please enter a slot number.');
      return;
    }

    if (editingSlot) {
      // Update
      setSlots(prev => prev.map(s => s.id === editingSlot.id ? {
        ...s,
        number: formNumber,
        lot: formLot,
        type: formType,
        status: formStatus,
        rate: formRate,
      } : s));
    } else {
      // Create
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

  // Delete
  const handleDeleteSlot = (id) => {
    Alert.alert(
      'Delete Slot',
      'Are you sure you want to delete this parking slot?',
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
    const matchesFilter = filter === 'All' || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Slot Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddNewSlot}
        >
          <FeatherIcon name="plus" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Slot</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.filterSection}>
        <View style={styles.searchBar}>
          <FeatherIcon name="search" size={16} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by slot, lot, or type..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FeatherIcon name="x" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChips}
        >
          {['All', 'Available', 'Occupied', 'Maintenance'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                filter === item && styles.chipActive,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text style={[
                styles.chipText,
                filter === item && styles.chipTextActive,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Slots List */}
      <FlatList
        data={filteredSlots}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FeatherIcon name="info" size={32} color="#9CA3AF" />
            <Text style={styles.emptyText}>No slots match your search or filter.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.slotCard}>
            <View style={styles.cardInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.slotNumber}>{item.number}</Text>
                <View style={[
                  styles.statusIndicator,
                  item.status === 'Available' && { backgroundColor: '#D1FAE5' },
                  item.status === 'Occupied' && { backgroundColor: '#DBEAFE' },
                  item.status === 'Maintenance' && { backgroundColor: '#FEE2E2' },
                ]}>
                  <Text style={[
                    styles.statusText,
                    item.status === 'Available' && { color: '#065F46' },
                    item.status === 'Occupied' && { color: '#1E40AF' },
                    item.status === 'Maintenance' && { color: '#991B1B' },
                  ]}>{item.status}</Text>
                </View>
              </View>
              <Text style={styles.lotText}>{item.lot} • {item.type}</Text>
              <Text style={styles.rateText}>Rate: <Text style={{fontWeight: '700'}}>{item.rate}/hr</Text></Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#F3F4F6' }]} 
                onPress={() => handleToggleStatus(item)}
                title="Toggle Status"
              >
                <FeatherIcon name="refresh-cw" size={15} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#EFF6FF' }]} 
                onPress={() => handleEditSlot(item)}
              >
                <FeatherIcon name="edit-2" size={15} color="#1D64C6" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, { backgroundColor: '#FEE2E2' }]} 
                onPress={() => handleDeleteSlot(item.id)}
              >
                <FeatherIcon name="trash-2" size={15} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScrollContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{editingSlot ? 'Edit Slot' : 'Add New Slot'}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <FeatherIcon name="x" size={22} color="#374151" />
                </TouchableOpacity>
              </View>

              {/* Form fields */}
              <View style={styles.form}>
                <Text style={styles.label}>Slot Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. A-104"
                  placeholderTextColor="#9CA3AF"
                  value={formNumber}
                  onChangeText={setFormNumber}
                />

                <Text style={styles.label}>Parking Lot</Text>
                <View style={styles.dropdownSelector}>
                  {['Lot A', 'Lot B', 'Lot C'].map(l => (
                    <TouchableOpacity
                      key={l}
                      style={[styles.dropdownItem, formLot === l && styles.dropdownItemActive]}
                      onPress={() => setFormLot(l)}
                    >
                      <Text style={[styles.dropdownText, formLot === l && styles.dropdownTextActive]}>{l}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Slot Type</Text>
                <View style={styles.dropdownSelector}>
                  {['Standard', 'EV Charging', 'Accessible'].map(t => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.dropdownItem, formType === t && styles.dropdownItemActive]}
                      onPress={() => setFormType(t)}
                    >
                      <Text style={[styles.dropdownText, formType === t && styles.dropdownTextActive]}>{t}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Hourly Rate (₹)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. ₹80"
                  placeholderTextColor="#9CA3AF"
                  value={formRate}
                  onChangeText={setFormRate}
                />

                <Text style={styles.label}>Initial Status</Text>
                <View style={styles.dropdownSelector}>
                  {['Available', 'Occupied', 'Maintenance'].map(s => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.dropdownItem, formStatus === s && styles.dropdownItemActive]}
                      onPress={() => setFormStatus(s)}
                    >
                      <Text style={[styles.dropdownText, formStatus === s && styles.dropdownTextActive]}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSaveSlot}
                >
                  <Text style={styles.saveButtonText}>Save Slot</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default SlotManagement;
