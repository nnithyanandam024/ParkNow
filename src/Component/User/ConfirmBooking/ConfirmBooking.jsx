import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './ConfirmBookingStyles';
import { bookingService } from '../../../services/bookingService';

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

const DURATION_OPTIONS = [
  { label: '1 Hr', value: '1 Hour', hours: 1 },
  { label: '2 Hrs', value: '2 Hours', hours: 2 },
  { label: '4 Hrs', value: '4 Hours', hours: 4 },
  { label: '8 Hrs', value: '8 Hours', hours: 8 },
  { label: 'Open Slot', value: 'Open Slot', hours: 2 },
  { label: 'Custom', value: 'Custom', hours: 3 },
];

const ConfirmBooking = ({ parking, selectedSlot, onBack, onConfirm }) => {
  const destinationName = parking?.name || 'BIT College Campus Parking';
  const address = parking?.address
    || (parking?.street
      ? `${parking.street}, ${parking.city || 'Sathyamangalam, TN'}`
      : 'BIT Campus, Sathyamangalam, TN');

  const hasSelectedSlot = Boolean(selectedSlot && (typeof selectedSlot === 'string' || selectedSlot?.id));
  const slotNumber = hasSelectedSlot
    ? (typeof selectedSlot === 'string' ? selectedSlot : String(selectedSlot?.id))
    : null;
  const slotRawId = selectedSlot?.rawId ? Number(selectedSlot.rawId) : null;

  // ── Date & Time State ──────────────────────────────────────────────────────
  const [duration, setDuration] = useState('2 Hours');
  const [durationHours, setDurationHours] = useState(2);
  const [inDate, setInDate] = useState(getTodayDateString(0));
  const [outDate, setOutDate] = useState(getTodayDateString(0));
  const [inTime, setInTime] = useState(getCurrentDeviceTimeString());
  const [outTime, setOutTime] = useState('12:00 PM');

  // Custom Calendar Modal State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateTarget, setDateTarget] = useState('in'); // 'in' or 'out'
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());

  // Native Time Picker Dialog State
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeTarget, setTimeTarget] = useState('in'); // 'in' or 'out'

  // Vehicle Info State
  const [vehicleNumber, setVehicleNumber] = useState('TN-38-AB-1234');
  const [vehicleType, setVehicleType] = useState('Sedan / Hatchback');
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editPlateInput, setEditPlateInput] = useState('TN-38-AB-1234');
  const [editTypeInput, setEditTypeInput] = useState('Sedan / Hatchback');

  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // ── Auto Calculate Duration & Out Time/Date ────────────────────────────────
  useEffect(() => {
    if (duration === 'Custom') {
      // Calculate exact duration from Start (inDate + inTime) and End (outDate + outTime)
      const dIn = parseDateString(inDate);
      const tIn = parseTimeString(inTime);
      const dOut = parseDateString(outDate);
      const tOut = parseTimeString(outTime);

      if (dIn && tIn && dOut && tOut) {
        dIn.setHours(tIn.hours, tIn.minutes, 0, 0);
        dOut.setHours(tOut.hours, tOut.minutes, 0, 0);

        let diffMs = dOut.getTime() - dIn.getTime();
        if (diffMs <= 0) {
          // If exit time is earlier on same date (e.g. 09:37 AM to 03:37 AM), assume overnight / next day
          diffMs += 24 * 60 * 60 * 1000;
        }

        const hoursCalc = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(1));
        setDurationHours(Math.max(0.5, hoursCalc));
      }
      return;
    }

    const dateObj = parseDateString(inDate);
    const timeObj = parseTimeString(inTime);
    if (!dateObj || !timeObj) return;

    dateObj.setHours(timeObj.hours, timeObj.minutes, 0, 0);

    let addHours = 2;
    if (duration === '1 Hour') addHours = 1;
    else if (duration === '2 Hours') addHours = 2;
    else if (duration === '4 Hours') addHours = 4;
    else if (duration === '8 Hours') addHours = 8;
    else if (duration === 'Open Slot') addHours = 2;

    setDurationHours(addHours);

    const outDateObj = new Date(dateObj.getTime() + addHours * 60 * 60 * 1000);
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
  }, [inDate, inTime, outDate, outTime, duration]);

  // Pricing Rules:
  // - Open Slot: Base Fee (₹20) + ₹35/hr
  // - Fixed Duration (1hr, 2hr, 4hr, 8hr, custom): ₹30/hr Flat Rate
  const isOpenSlot = duration === 'Open Slot';
  const totalPrice = isOpenSlot
    ? (20 + (durationHours * 35))
    : (durationHours * 30);

  // Handle Duration Chip Selection
  const handleSelectDuration = (opt) => {
    setDuration(opt.value);
    if (opt.value === 'Custom') {
      // Set initial logical exit time (+3 hrs after inTime) for Custom mode
      const dateObj = parseDateString(inDate) || new Date();
      const timeObj = parseTimeString(inTime) || { hours: 9, minutes: 0 };
      dateObj.setHours(timeObj.hours + 3, timeObj.minutes, 0, 0);

      const outHours = dateObj.getHours();
      const outMinutes = dateObj.getMinutes();
      const ampm = outHours >= 12 ? 'PM' : 'AM';
      const displayHours = outHours % 12 === 0 ? 12 : outHours % 12;
      const paddedHours = displayHours.toString().padStart(2, '0');
      const paddedMinutes = outMinutes.toString().padStart(2, '0');
      setOutTime(`${paddedHours}:${paddedMinutes} ${ampm}`);

      const displayDay = dateObj.getDate().toString().padStart(2, '0');
      const displayMonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const displayYear = dateObj.getFullYear();
      setOutDate(`${displayDay}/${displayMonth}/${displayYear}`);
      setDurationHours(3);
    } else {
      setDurationHours(opt.hours);
    }
  };

  const handleSaveVehicleInfo = () => {
    if (!editPlateInput.trim()) {
      Alert.alert('Validation Error', 'Please enter a vehicle license plate number.');
      return;
    }
    setVehicleNumber(editPlateInput.trim().toUpperCase());
    setVehicleType(editTypeInput);
    setShowVehicleModal(false);
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

  const toISOString = (dateStr, timeStr) => {
    const d = parseDateString(dateStr);
    const t = parseTimeString(timeStr);
    if (!d || !t) return new Date().toISOString();
    d.setHours(t.hours, t.minutes, 0, 0);
    return d.toISOString();
  };

  const handleConfirmBooking = () => {
    const startTimeIso = toISOString(inDate, inTime);
    const endTimeIso = isOpenSlot
      ? new Date(Date.now() + 24 * 3600000).toISOString()
      : toISOString(outDate, outTime);

    const bookingPayload = {
      locationId: Number(String(parking?.id || '1').replace(/\D/g, '')) || 1,
      slotId: slotRawId,
      slotNumber: slotNumber,
      vehicleNumber: vehicleNumber,
      vehicleType: vehicleType,
      durationHours: durationHours,
      durationLabel: duration,
      totalPrice: totalPrice,
      startTime: startTimeIso,
      endTime: endTimeIso,
      inDate,
      inTime,
      outDate,
      outTime,
      paymentMethod: paymentMethod,
    };

    onConfirm?.(bookingPayload);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Destination Card */}
        <View style={styles.card}>
          <View style={styles.destHeaderRow}>
            <View>
              <Text style={styles.cardLabel}>DESTINATION</Text>
              <Text style={styles.destTitle}>{destinationName}</Text>
            </View>
            <View style={styles.pBadge}>
              <Text style={styles.pBadgeText}>P</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Icon name="map-pin" size={12} color="#64748B" />
            <Text style={[styles.destAddress, { marginLeft: 4 }]}>{String(address)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>{hasSelectedSlot ? 'Assigned Slot' : 'Slot Selection'}</Text>
              <Text style={[styles.metaValue, !hasSelectedSlot && { color: '#0052cc', fontSize: 13 }]}>
                {hasSelectedSlot ? slotNumber : 'Select in Next Step'}
              </Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{duration === 'Open Slot' ? 'Open Ended' : `${durationHours} Hours`}</Text>
            </View>
          </View>

          {/* Select Duration Chips (Horizontally Scrollable) */}
          <Text style={[styles.metaLabel, { marginTop: 4 }]}>Select Duration</Text>
          <View style={styles.durationRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.durationScrollContent}>
              {DURATION_OPTIONS.map((opt) => {
                const active = duration === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.durationChip, active && styles.durationChipActive]}
                    onPress={() => handleSelectDuration(opt)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.durationChipText, active && styles.durationChipTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Schedule Date & Time Pickers */}
          <View style={[styles.dateTimeContainer, { marginTop: 14 }]}>
            <Text style={[styles.metaLabel, { marginBottom: 8 }]}>SCHEDULE DATE & TIME</Text>

            {/* Entry / Check-In Row (Interactive for ALL durations) */}
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dateTimeLabel}>ENTRY DATE</Text>
                <TouchableOpacity
                  style={styles.datePickerBox}
                  activeOpacity={0.85}
                  onPress={() => {
                    setDateTarget('in');
                    setShowDatePicker(true);
                  }}
                >
                  <Icon name="calendar" size={16} color="#0052cc" style={{ marginRight: 6 }} />
                  <Text style={styles.datePickerValueText}>{inDate}</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.dateTimeLabel}>ENTRY TIME</Text>
                <TouchableOpacity
                  style={styles.datePickerBox}
                  activeOpacity={0.85}
                  onPress={() => {
                    setTimeTarget('in');
                    setShowTimePicker(true);
                  }}
                >
                  <Icon name="clock" size={16} color="#0052cc" style={{ marginRight: 6 }} />
                  <Text style={styles.datePickerValueText}>{inTime}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Exit / Check-Out Row (Interactive ONLY for Custom duration) */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.dateTimeLabel}>EXIT DATE</Text>
                <TouchableOpacity
                  style={[styles.datePickerBox, duration !== 'Custom' && { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }]}
                  activeOpacity={duration === 'Custom' ? 0.85 : 1}
                  onPress={() => {
                    if (duration === 'Custom') {
                      setDateTarget('out');
                      setShowDatePicker(true);
                    }
                  }}
                >
                  <Icon name="calendar" size={16} color={duration === 'Custom' ? '#0052cc' : '#94A3B8'} style={{ marginRight: 6 }} />
                  <Text style={[styles.datePickerValueText, duration !== 'Custom' && { color: '#64748B' }]}>
                    {isOpenSlot ? 'Flexible' : outDate}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.dateTimeLabel}>EXIT TIME</Text>
                <TouchableOpacity
                  style={[styles.datePickerBox, duration !== 'Custom' && { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }]}
                  activeOpacity={duration === 'Custom' ? 0.85 : 1}
                  onPress={() => {
                    if (duration === 'Custom') {
                      setTimeTarget('out');
                      setShowTimePicker(true);
                    }
                  }}
                >
                  <Icon name="clock" size={16} color={duration === 'Custom' ? '#0052cc' : '#94A3B8'} style={{ marginRight: 6 }} />
                  <Text style={[styles.datePickerValueText, isOpenSlot ? { color: '#0052cc', fontWeight: '800' } : (duration !== 'Custom' && { color: '#64748B' })]}>
                    {isOpenSlot ? 'Open Ended' : outTime}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Vehicle Info Card */}
        <View style={styles.card}>
          <View style={styles.destHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="truck" size={18} color="#0F172A" style={{ marginRight: 8 }} />
              <Text style={styles.cardHeaderTitle}>Vehicle Info</Text>
            </View>
            <TouchableOpacity onPress={() => setShowVehicleModal(true)}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.vehicleDetailsRow, { marginTop: 10 }]}>
            <View style={styles.carIconContainer}>
              <Icon name="tag" size={20} color="#0052cc" />
            </View>
            <View>
              <Text style={styles.licensePlate}>{vehicleNumber}</Text>
              <Text style={styles.vehicleModel}>{vehicleType}</Text>
            </View>
          </View>
        </View>

        {/* Price Details Card */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
            <Icon name="credit-card" size={18} color="#0F172A" style={{ marginRight: 8 }} />
            <Text style={styles.cardHeaderTitle}>Price Details</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              {isOpenSlot
                ? `Open Slot Rate: Base ₹20 + (₹35/hr × ${durationHours} hrs)`
                : `Fixed Duration Rate: ₹30/hr × ${durationHours} hrs`}
            </Text>
            <Text style={styles.priceValue}>₹{totalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={[styles.priceRow, { marginTop: 10 }]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{totalPrice.toFixed(2)}</Text>
          </View>

          {/* Payment Method Option */}
          <TouchableOpacity style={styles.paymentMethodRow} activeOpacity={0.8}>
            <View style={styles.paymentLeft}>
              <View style={styles.visaBadge}>
                <Text style={styles.visaText}>{paymentMethod}</Text>
              </View>
              <Text style={styles.cardDigits}>Direct Digital Payment</Text>
            </View>
            <Icon name="check-circle" size={20} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Cancellation Notice */}
        <View style={styles.noticeRow}>
          <Icon name="info" size={16} color="#64748B" style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={styles.noticeText}>
            Free cancellation up to 30 minutes before your entry time.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Floating Confirm Button */}
      <View style={styles.footerButtonContainer} pointerEvents="box-none">
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking} activeOpacity={0.85}>
          <Text style={styles.confirmButtonText}>Proceed to Select Parking Slot</Text>
          <Icon name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

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
          <View style={styles.calendarModalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity 
                onPress={() => {
                  const newMonth = new Date(currentCalendarMonth);
                  newMonth.setMonth(newMonth.getMonth() - 1);
                  setCurrentCalendarMonth(newMonth);
                }}
              >
                <Icon name="chevron-left" size={20} color="#1E293B" />
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
              >
                <Icon name="chevron-right" size={20} color="#1E293B" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekDaysRow}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <Text key={i} style={styles.weekDayLabel}>{day}</Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {(() => {
                const year = currentCalendarMonth.getFullYear();
                const month = currentCalendarMonth.getMonth();
                const firstDayIndex = new Date(year, month, 1).getDay();
                const totalDays = new Date(year, month + 1, 0).getDate();
                const cells = [];

                for (let i = 0; i < firstDayIndex; i++) {
                  cells.push(<View key={`empty-${i}`} style={styles.dayCellEmpty} />);
                }

                const activeValStr = dateTarget === 'in' ? inDate : outDate;
                const activeParsed = parseDateString(activeValStr);

                for (let day = 1; day <= totalDays; day++) {
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

      {/* Edit Vehicle Info Modal */}
      <Modal visible={showVehicleModal} transparent animationType="fade" onRequestClose={() => setShowVehicleModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowVehicleModal(false)}
        >
          <View style={styles.modalCard} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Edit Vehicle Info</Text>
            
            <Text style={styles.inputLabel}>License Plate Number</Text>
            <TextInput
              style={styles.textInput}
              value={editPlateInput}
              onChangeText={setEditPlateInput}
              placeholder="e.g. TN-38-AB-1234"
              autoCapitalize="characters"
            />

            <Text style={styles.inputLabel}>Vehicle Type</Text>
            <TextInput
              style={styles.textInput}
              value={editTypeInput}
              onChangeText={setEditTypeInput}
              placeholder="e.g. Sedan / Hatchback"
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowVehicleModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSaveVehicleInfo}>
                <Text style={styles.modalSaveText}>Save Vehicle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ConfirmBooking;
