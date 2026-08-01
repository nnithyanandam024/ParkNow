import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/navbar';
import { styles } from './ManualBookingStyles';

const getTodayDateString = (offsetDays = 0) => {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const getCurrentDeviceTimeString = () => {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  return `${paddedHours}:${paddedMinutes} ${ampm}`;
};

const ManualBooking = ({ onBack, onBookingSuccess, onNavigateToScanner, onNavigateToScreen }) => {

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Sedan / Hatchback');
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [duration, setDuration] = useState('2 Hours');
  const [inDate, setInDate] = useState(getTodayDateString(0));
  const [outDate, setOutDate] = useState(getTodayDateString(0));
  const [inTime, setInTime] = useState(getCurrentDeviceTimeString());
  const [outTime, setOutTime] = useState('12:00 PM');
  const [availableSlot, setAvailableSlot] = useState('Level 1 - A-102 (Standard)');
  
  // Custom Date Picker Modal States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTarget, setDateTarget] = useState('in'); // 'in' or 'out'
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());

  // Custom Time Picker States
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeTarget, setTimeTarget] = useState('in'); // 'in' or 'out'

  const vehicleTypes = ['Sedan / Hatchback', 'SUV / MUV', 'Two Wheeler', 'Electric Vehicle'];

  const parseDateString = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.trim().split('/');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  };

  const parseTimeString = (str) => {
    if (!str) return null;
    const parts = str.trim().toLowerCase().match(/(\d+):(\d+)\s*(am|pm)?/);
    if (!parts) return null;
    let hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);
    const ampm = parts[3];
    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;
    return { hours, minutes };
  };

  useEffect(() => {
    if (duration === 'Custom') return;

    const dateObj = parseDateString(inDate);
    const timeObj = parseTimeString(inTime);
    if (!dateObj || !timeObj) return;

    dateObj.setHours(timeObj.hours, timeObj.minutes, 0, 0);

    let offsetMinutes = 0;
    if (duration === '2 Hours') offsetMinutes = 120;
    else if (duration === '4 Hours') offsetMinutes = 240;
    else if (duration === 'Full Day') offsetMinutes = 720;

    const outDateObj = new Date(dateObj.getTime() + offsetMinutes * 60 * 1000);

    const outHours = outDateObj.getHours();
    const outMinutes = outDateObj.getMinutes();
    const ampm = outHours >= 12 ? 'PM' : 'AM';
    const displayHours = outHours % 12 === 0 ? 12 : outHours % 12;
    const paddedHours = displayHours.toString().padStart(2, '0');
    const paddedMinutes = outMinutes.toString().padStart(2, '0');
    setOutTime(`${paddedHours}:${paddedMinutes} ${ampm}`);

    const displayDay = outDateObj.getDate().toString().padStart(2, '0');
    const displayMonth = (outDateObj.getMonth() + 1).toString().padStart(2, '0');
    const displayYear = outDateObj.getFullYear();
    setOutDate(`${displayDay}/${displayMonth}/${displayYear}`);
  }, [inDate, inTime, duration]);

  const calculateCustomHours = (inD, inT, outD, outT) => {
    const parseTime = (str) => {
      if (!str) return null;
      const parts = str.trim().toLowerCase().match(/(\d+):(\d+)\s*(am|pm)?/);
      if (!parts) return null;
      let hours = parseInt(parts[1], 10);
      const minutes = parseInt(parts[2], 10);
      const ampm = parts[3];
      if (ampm === 'pm' && hours < 12) hours += 12;
      if (ampm === 'am' && hours === 12) hours = 0;
      return { hours, minutes };
    };

    const dIn = parseDateString(inD);
    const tIn = parseTime(inT);
    const dOut = parseDateString(outD);
    const tOut = parseTime(outT);

    if (!dIn || !tIn || !dOut || !tOut) return null;

    dIn.setHours(tIn.hours, tIn.minutes, 0, 0);
    dOut.setHours(tOut.hours, tOut.minutes, 0, 0);

    const diffMs = dOut.getTime() - dIn.getTime();
    if (diffMs < 0) return null;

    const diffHours = diffMs / (1000 * 60 * 60);
    return parseFloat(diffHours.toFixed(1));
  };

  const parseTimeToDate = (timeStr) => {
    const d = new Date();
    const timeObj = parseTimeString(timeStr);
    if (timeObj) {
      d.setHours(timeObj.hours, timeObj.minutes, 0, 0);
    }
    return d;
  };

  const formatTimeToString = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const paddedHours = displayHours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes} ${ampm}`;
  };

  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (event.type === 'set' && selectedDate) {
      const formatted = formatTimeToString(selectedDate);
      if (timeTarget === 'in') {
        setInTime(formatted);
      } else {
        setOutTime(formatted);
      }
    }
  };

  const computedHours = calculateCustomHours(inDate, inTime, outDate, outTime);

  const handleProceedPayment = () => {
    if (!customerName.trim() || !vehicleNumber.trim()) {
      Alert.alert('Missing Information', 'Please fill in Customer Name and Vehicle Number.');
      return;
    }

    let finalDuration = duration;
    if (duration === 'Custom') {
      if (computedHours === null || isNaN(computedHours)) {
        Alert.alert('Invalid Time format', 'Please check In-Time and Out-Time formatting (e.g. 10:00 AM).');
        return;
      }
      finalDuration = `${computedHours} Hours (Custom)`;
    }

    if (onBookingSuccess) {
      onBookingSuccess({
        name: customerName,
        lpn: vehicleNumber.toUpperCase(),
        slotClass: vehicleType.split(' / ')[0],
        lot: 'Central Plaza',
        zone: 'Zone A',
        slotNum: 'A-102',
        time: finalDuration,
        payment: 'PAID',
      });
    }
  };

  const handleAssignSlotOnly = () => {
    if (!customerName.trim() || !vehicleNumber.trim()) {
      Alert.alert('Missing Information', 'Please fill in Customer Name and Vehicle Number.');
      return;
    }
    Alert.alert('Slot Assigned', `Slot A-102 has been pre-assigned to vehicle ${vehicleNumber.toUpperCase()}. Proceed to payment to complete booking.`);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.75}>
            <Feather name="arrow-left" size={24} color="#0052cc" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Booking</Text>
        </View>
        <TouchableOpacity onPress={() => Alert.alert('Menu', 'Options: Clear Form, Help')} activeOpacity={0.75}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Main Form Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Quick Walk-in Entry Banner */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>Quick Walk-in Entry</Text>
            <Text style={styles.bannerSub}>
              Efficiently log new arrivals and assign parking slots in real-time.
            </Text>
          </View>
          <View style={styles.bannerWatermarkContainer}>
            <Text style={styles.bannerWatermark}>P</Text>
          </View>
        </View>

        {/* Customer Details section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeaderRow}>
            <Feather name="user-plus" size={18} color="#0052cc" style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderTitle}>Customer Details</Text>
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Customer Name</Text>
            <View style={styles.inputFieldBox}>
              <Feather name="user" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="e.g. John Doe"
                placeholderTextColor="#94A3B8"
                value={customerName}
                onChangeText={setCustomerName}
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputFieldBox}>
              <Feather name="phone" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>
        </View>

        {/* Vehicle Information section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="car-outline" size={20} color="#0052cc" style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderTitle}>Vehicle Information</Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Vehicle Number</Text>
            <View style={styles.inputFieldBox}>
              <Feather name="hash" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.textInput}
                placeholder="ABC-1234"
                placeholderTextColor="#94A3B8"
                autoCapitalize="characters"
                autoCorrect={false}
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Vehicle Type</Text>
            <TouchableOpacity 
              style={styles.dropdownBox}
              activeOpacity={0.8}
              onPress={() => setShowVehicleModal(true)}
            >
              <View style={styles.dropdownLeft}>
                <MaterialCommunityIcons name="car-select" size={20} color="#94A3B8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{vehicleType}</Text>
              </View>
              <Feather name="chevron-down" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Duration & Slot section */}
        <View style={styles.formSection}>
          <View style={styles.sectionHeaderRow}>
            <Feather name="clock" size={18} color="#0052cc" style={{ marginRight: 8 }} />
            <Text style={styles.sectionHeaderTitle}>Duration & Slot</Text>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Booking Duration</Text>
            <View style={styles.chipsRow}>
              {['2 Hours', '4 Hours', 'Full Day', 'Custom'].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.chip, duration === opt ? styles.chipActive : styles.chipInactive]}
                  onPress={() => setDuration(opt)}
                  activeOpacity={0.8}
                >
                  <Text style={duration === opt ? styles.chipTextActive : styles.chipTextInactive}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

            {/* Dates row */}
            <View style={styles.customTimeRow}>
              <View style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>In-Date</Text>
                <TouchableOpacity 
                  style={styles.inputFieldBox}
                  activeOpacity={0.8}
                  onPress={() => {
                    setDateTarget('in');
                    const parsed = parseDateString(inDate);
                    setCurrentCalendarMonth(parsed || new Date());
                    setShowDatePicker(true);
                  }}
                >
                  <Feather name="calendar" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                  <Text style={styles.datePickerValueText}>{inDate}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Out-Date</Text>
                <TouchableOpacity 
                  style={[styles.inputFieldBox, duration !== 'Custom' && { backgroundColor: '#F1F5F9' }]}
                  activeOpacity={duration === 'Custom' ? 0.8 : 1}
                  onPress={() => {
                    if (duration === 'Custom') {
                      setDateTarget('out');
                      const parsed = parseDateString(outDate);
                      setCurrentCalendarMonth(parsed || new Date());
                      setShowDatePicker(true);
                    }
                  }}
                >
                  <Feather name="calendar" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                  <Text style={[styles.datePickerValueText, duration !== 'Custom' && { color: '#64748B' }]}>{outDate}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Timings row */}
            <View style={styles.customTimeRow}>
              <View style={[styles.inputWrapper, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>In-Time</Text>
                <TouchableOpacity 
                  style={styles.inputFieldBox}
                  activeOpacity={0.8}
                  onPress={() => {
                    setTimeTarget('in');
                    setShowTimePicker(true);
                  }}
                >
                  <Feather name="clock" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                  <Text style={styles.datePickerValueText}>{inTime}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputWrapper, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Out-Time</Text>
                <TouchableOpacity 
                  style={[styles.inputFieldBox, duration !== 'Custom' && { backgroundColor: '#F1F5F9' }]}
                  activeOpacity={duration === 'Custom' ? 0.8 : 1}
                  onPress={() => {
                    if (duration === 'Custom') {
                      setTimeTarget('out');
                      setShowTimePicker(true);
                    }
                  }}
                >
                  <Feather name="clock" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                  <Text style={[styles.datePickerValueText, duration !== 'Custom' && { color: '#64748B' }]}>{outTime}</Text>
                </TouchableOpacity>
              </View>
            </View>

          {duration === 'Custom' && computedHours !== null && !isNaN(computedHours) && (
            <View style={styles.computedHoursBox}>
              <Feather name="activity" size={14} color="#0052cc" style={{ marginRight: 6 }} />
              <Text style={styles.computedHoursText}>
                Calculated Duration: <Text style={{ fontWeight: '800', color: '#0052cc' }}>{computedHours} Hours</Text>
              </Text>
            </View>
          )}

          {/* Form Actions */}
          <View style={{ marginTop: 24 }}>
            <TouchableOpacity 
              style={styles.proceedPaymentBtn}
              onPress={handleProceedPayment}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.proceedPaymentBtnText}>Assign Slot</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SMS receipt alert card */}
        <View style={styles.smsAlertCard}>
          <Feather name="info" size={18} color="#16A34A" style={{ marginRight: 10, marginTop: 2 }} />
          <Text style={styles.smsAlertText}>
            Booking summary and digital receipt will be sent via SMS once payment is confirmed.
          </Text>
        </View>
      </ScrollView>

      {/* Global bottom Navbar configured to set Dashboard active */}
      <Navbar
        activeTab="Dashboard"
        onTabPress={(tab) => {
          if (tab === 'Dashboard') {
            onBack();
          } else if (tab === 'Scanner') {
            onNavigateToScanner();
          } else if (onNavigateToScreen) {
            onNavigateToScreen(tab);
          } else {
            onBack();
          }
        }}
      />
      {/* Vehicle Type Selection Modal */}
      <Modal
        visible={showVehicleModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowVehicleModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowVehicleModal(false)}
        >
          <View style={styles.pickerModalContent}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerHeaderTitle}>Select Vehicle Type</Text>
              <TouchableOpacity onPress={() => setShowVehicleModal(false)}>
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
            {vehicleTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.pickerOptionItem,
                  vehicleType === type && styles.pickerOptionItemActive
                ]}
                onPress={() => {
                  setVehicleType(type);
                  setShowVehicleModal(false);
                }}
              >
                <Text style={[
                  styles.pickerOptionText,
                  vehicleType === type && styles.pickerOptionTextActive
                ]}>
                  {type}
                </Text>
                {vehicleType === type && (
                  <Feather name="check" size={16} color="#0052cc" style={{ marginLeft: 8 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Calendar Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowDatePicker(false)}
        >
          <View style={styles.calendarModalContent}>
            {/* Calendar Month Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity 
                onPress={() => {
                  const newMonth = new Date(currentCalendarMonth);
                  newMonth.setMonth(newMonth.getMonth() - 1);
                  setCurrentCalendarMonth(newMonth);
                }}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Feather name="chevron-left" size={20} color="#1E293B" />
              </TouchableOpacity>
              <Text style={styles.calendarMonthTitle}>
                {currentCalendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Text>
              <TouchableOpacity 
                onPress={() => {
                  const newMonth = new Date(currentCalendarMonth);
                  newMonth.setMonth(newMonth.getMonth() + 1);
                  setCurrentCalendarMonth(newMonth);
                }}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              >
                <Feather name="chevron-right" size={20} color="#1E293B" />
              </TouchableOpacity>
            </View>

            {/* Weekdays labels */}
            <View style={styles.weekDaysRow}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <Text key={i} style={styles.weekDayLabel}>{day}</Text>
              ))}
            </View>

            {/* Days grid */}
            <View style={styles.daysGrid}>
              {(() => {
                const year = currentCalendarMonth.getFullYear();
                const month = currentCalendarMonth.getMonth();
                const firstDayIndex = new Date(year, month, 1).getDay();
                const totalDays = new Date(year, month + 1, 0).getDate();
                const cells = [];

                // Empty padding cells
                for (let i = 0; i < firstDayIndex; i++) {
                  cells.push(<View key={`empty-${i}`} style={styles.dayCellEmpty} />);
                }

                // Day cells
                const activeValStr = dateTarget === 'in' ? inDate : outDate;
                const activeParsed = parseDateString(activeValStr);

                for (let day = 1; day <= totalDays; day++) {
                  const dateObj = new Date(year, month, day);
                  const isSelected = activeParsed && 
                    activeParsed.getDate() === day && 
                    activeParsed.getMonth() === month && 
                    activeParsed.getFullYear() === year;

                  cells.push(
                    <TouchableOpacity
                      key={`day-${day}`}
                      style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                      onPress={() => {
                        const dStr = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
                        if (dateTarget === 'in') {
                          setInDate(dStr);
                        } else {
                          setOutDate(dStr);
                        }
                        setShowDatePicker(false);
                      }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                }
                return cells;
              })()}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Native Time Picker Dialog */}
      {showTimePicker && (
        <DateTimePicker
          value={timeTarget === 'in' ? parseTimeToDate(inTime) : parseTimeToDate(outTime)}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

export default ManualBooking;
