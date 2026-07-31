import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Opening from './src/Component/Opening_page/Opening';
import Login from './src/Component/Login/Login';
import Dashboard from './src/Component/staff/dashboard/dashboard';
import QRScanner from './src/Component/staff/qr sacnner/QRScanner';
import ManualBooking from './src/Component/staff/manualBooking/ManualBooking';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Opening');

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
    setAvailableSlots(prev => Math.max(0, prev - 1));
    setOccupiedSlots(prev => prev + 1);
    setTodaysTotal(prev => prev + 1);
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newActivity = {
      id: Date.now().toString(),
      lpn: booking.lpn,
      details: `Manual Booking • ${timeStr}`,
      status: 'SUCCESS',
      type: 'in',
    };
    setRecentActivity(prev => [newActivity, ...prev]);
  };

  const handleCheckOut = (lpn, amount) => {
    setOccupiedSlots(prev => Math.max(0, prev - 1));
    setAvailableSlots(prev => prev + 1);
    
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
          />
        )}
        {currentScreen === 'QRScanner' && (
          <QRScanner
            onBack={() => setCurrentScreen('Dashboard')}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
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
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
