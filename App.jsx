import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Opening from './src/Component/Opening_page/Opening';
import Login from './src/Component/Login/Login';
import Dashboard from './src/Component/staff/dashboard/dashboard';
import QRScanner from './src/Component/staff/qr sacnner/QRScanner';
import ManualBooking from './src/Component/staff/manualBooking/ManualBooking';
import SlotAssignment from './src/Component/staff/slotAssignment/SlotAssignment';
import CollectPayment from './src/Component/staff/collectPayment/CollectPayment';
import BookingSuccess from './src/Component/staff/bookingSuccess/BookingSuccess';
import BookingsList from './src/Component/staff/bookingsList/BookingsList';
import BookingDetails from './src/Component/staff/bookingDetails/BookingDetails';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Opening');
  const [pendingBooking, setPendingBooking] = useState(null);
  const [checkoutBooking, setCheckoutBooking] = useState(null);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: '1',
      name: 'John Doe',
      initials: 'JD',
      avatarBg: '#EFF6FF',
      avatarColor: '#1D64C6',
      lpn: 'ABC-1234',
      model: 'White Tesla Model 3 (Sedan)',
      status: 'Parked',
      slot: 'B-12',
      time: 'Today, 02:00 PM - 04:00 PM',
      phone: '+1 (555) 012-3456',
      amount: 12.50,
      paymentMethod: 'Paid via UPI',
      locationName: 'Downtown Plaza • Floor 2',
    },
    {
      id: '2',
      name: 'Sarah Rogers',
      initials: 'SR',
      avatarBg: '#FEF3C7',
      avatarColor: '#D97706',
      lpn: 'XYZ-9876',
      model: 'Audi E-Tron',
      status: 'Expected',
      slot: 'Slot B-04',
      time: '16:30 - 18:30',
      phone: '+1 (555) 987-6543',
      amount: 18.00,
      paymentMethod: 'Paid via Card',
      locationName: 'Downtown Plaza • Floor 1',
    },
    {
      id: '3',
      name: 'David Kim',
      initials: 'DK',
      avatarBg: '#FEE2E2',
      avatarColor: '#EF4444',
      lpn: 'EVO-4421',
      model: 'BMW i4',
      status: 'Overdue',
      slot: 'Slot C-22',
      time: '15:00 (Alert)',
      phone: '+1 (555) 442-1092',
      amount: 15.00,
      paymentMethod: 'Paid via Cash',
      locationName: 'Downtown Plaza • Floor 3',
      isOverdue: true,
    },
  ]);

  const getSafeAreaBg = () => {
    if (currentScreen === 'Login') return '#1D64C6';
    if (currentScreen === 'Opening') return '#F9FAFB';
    return '#FFFFFF';
  };

  const getStatusBarBg = () => {
    if (currentScreen === 'Login') return '#1D64C6';
    if (currentScreen === 'Opening') return '#F9FAFB';
    return '#FFFFFF';
  };

  const getStatusBarStyle = () => {
    if (currentScreen === 'Login') return 'light-content';
    return 'dark-content';
  };
  
  // Shared Parking Lot State
  const [availableSlots, setAvailableSlots] = useState(142);
  const [occupiedSlots, setOccupiedSlots] = useState(358);
  const [reservedSlots] = useState(25);
  const [todaysTotal, setTodaysTotal] = useState(1204);
  const [recentActivity, setRecentActivity] = useState([
    {
      id: '1',
      lpn: 'ABC-1234',
      details: 'Entry Gate 2 • 09:42 AM',
      status: 'SUCCESS',
      type: 'in',
    },
    {
      id: '2',
      lpn: 'XYZ-9876',
      details: 'Exit Gate 1 • 09:38 AM',
      status: '$12.50 PAID',
      type: 'out',
    },
  ]);

  const handleCheckIn = (lpn) => {
    setAvailableSlots(prev => Math.max(0, prev - 1));
    setOccupiedSlots(prev => prev + 1);
    setTodaysTotal(prev => prev + 1);
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newActivity = {
      id: Date.now().toString(),
      lpn: lpn,
      details: `Entry Gate 2 • ${timeStr}`,
      status: 'SUCCESS',
      type: 'in',
    };
    setRecentActivity(prev => [newActivity, ...prev]);
  };

  const handleBookingSuccess = (booking) => {
    setPendingBooking(booking);
    setCurrentScreen('SlotAssignment');
  };

  const handleFinalizeAssignment = (booking) => {
    setPendingBooking(booking);
    setCurrentScreen('CollectPayment');
  };

  const handleFinalizePayment = (booking) => {
    setAvailableSlots(prev => Math.max(0, prev - 1));
    setOccupiedSlots(prev => prev + 1);
    setTodaysTotal(prev => prev + 1);
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newActivity = {
      id: Date.now().toString(),
      lpn: booking.lpn,
      details: `Slot ${booking.slotNum} Assigned (${booking.paymentMethod}) • ${timeStr}`,
      status: 'SUCCESS',
      type: 'in',
    };
    setRecentActivity(prev => [newActivity, ...prev]);
    setPendingBooking(booking);
    setCurrentScreen('BookingSuccess');
  };

  const handleCheckOut = (lpn, amount) => {
    setOccupiedSlots(prev => Math.max(0, prev - 1));
    setAvailableSlots(prev => prev + 1);
    
    // Remove the checked out booking from state
    setBookings(prev => prev.filter(b => b.lpn.toUpperCase() !== lpn.toUpperCase()));
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newActivity = {
      id: Date.now().toString(),
      lpn: lpn,
      details: `Exit Gate 1 • ${timeStr}`,
      status: `$${amount.toFixed(2)} PAID`,
      type: 'out',
    };
    setRecentActivity(prev => [newActivity, ...prev]);
  };

  return (
    <SafeAreaProvider>
      <StatusBar translucent={false} backgroundColor={getStatusBarBg()} barStyle={getStatusBarStyle()} />
      <SafeAreaView style={{ flex: 1, backgroundColor: getSafeAreaBg() }} edges={['top']}>
        {currentScreen === 'Opening' && (
          <Opening onNavigateToLogin={() => setCurrentScreen('Login')} />
        )}
        {currentScreen === 'Login' && (
          <Login
            onBack={() => setCurrentScreen('Opening')}
            onLoginSuccess={() => setCurrentScreen('Dashboard')}
          />
        )}
        {currentScreen === 'Dashboard' && (
          <Dashboard
            availableSlots={availableSlots}
            occupiedSlots={occupiedSlots}
            reservedSlots={reservedSlots}
            todaysTotal={todaysTotal}
            recentActivity={recentActivity}
            onNavigateToScanner={() => setCurrentScreen('QRScanner')}
            onNavigateToManualBooking={() => setCurrentScreen('ManualBooking')}
            onNavigateToScreen={setCurrentScreen}
          />
        )}
        {currentScreen === 'QRScanner' && (
          <QRScanner
            onBack={() => {
              if (checkoutBooking) {
                setCurrentScreen('Bookings');
                setCheckoutBooking(null);
              } else {
                setCurrentScreen('Dashboard');
              }
            }}
            onCheckIn={handleCheckIn}
            onCheckOut={(lpn, fee) => {
              handleCheckOut(lpn, fee);
              if (checkoutBooking) {
                setCheckoutBooking(null);
              }
            }}
            checkoutBooking={checkoutBooking}
            availableSlots={availableSlots}
            occupiedSlots={occupiedSlots}
            onNavigateToManualBooking={() => setCurrentScreen('ManualBooking')}
          />
        )}
        {currentScreen === 'ManualBooking' && (
          <ManualBooking
            onBack={() => setCurrentScreen('Dashboard')}
            onBookingSuccess={handleBookingSuccess}
            onNavigateToScanner={() => setCurrentScreen('QRScanner')}
            onNavigateToScreen={setCurrentScreen}
          />
        )}
        {currentScreen === 'SlotAssignment' && (
          <SlotAssignment
            pendingBooking={pendingBooking}
            onBack={() => setCurrentScreen('Dashboard')}
            onFinalizeAssignment={handleFinalizeAssignment}
            onNavigateToScanner={() => setCurrentScreen('QRScanner')}
            onNavigateToScreen={setCurrentScreen}
          />
        )}
        {currentScreen === 'CollectPayment' && (
          <CollectPayment
            pendingBooking={pendingBooking}
            onBack={() => setCurrentScreen('Dashboard')}
            onFinalizePayment={handleFinalizePayment}
          />
        )}
        {currentScreen === 'BookingSuccess' && (
          <BookingSuccess
            pendingBooking={pendingBooking}
            onDone={() => setCurrentScreen('Dashboard')}
          />
        )}
        {currentScreen === 'Bookings' && (
          <BookingsList
            bookings={bookings}
            setBookings={setBookings}
            onNavigateToScreen={setCurrentScreen}
            onCheckoutPress={(booking) => {
              setCheckoutBooking(booking);
              setCurrentScreen('QRScanner');
            }}
            onViewDetailsPress={(booking) => {
              setViewingBooking(booking);
              setCurrentScreen('BookingDetails');
            }}
          />
        )}
        {currentScreen === 'BookingDetails' && (
          <BookingDetails
            booking={viewingBooking}
            onBack={() => {
              setCurrentScreen('Bookings');
              setViewingBooking(null);
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
