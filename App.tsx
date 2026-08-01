import React, { useState } from 'react';
import Opening from './src/Component/Opening_page/Opening';
import Login from './src/Component/Login/Login';
import Home from './src/Component/User/Home/Home';
import Search from './src/Component/User/Search/Search';
import ParkingDetail from './src/Component/User/ParkingDetail/ParkingDetail';
import SlotSelection from './src/Component/User/SlotSelection/SlotSelection';
import ConfirmBooking from './src/Component/User/ConfirmBooking/ConfirmBooking';
import Payment from './src/Component/User/Payment/Payment';
import BookingSuccess from './src/Component/User/BookingSuccess/BookingSuccess';
import BookingPass from './src/Component/User/BookingPass/BookingPass';
import Navigation from './src/Component/User/Navigation/Navigation';
import BookingsScreen from './src/Component/User/Bookings/BookingsScreen';
import ProfileScreen from './src/Component/User/Profile/ProfileScreen';
import BottomTabBar from './src/Component/User/BottomTabBar/BottomTabBar';
import { View } from 'react-native';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Opening');
  const [selectedParking, setSelectedParking] = useState<any>(null);
  const [previousScreenOfSlot, setPreviousScreenOfSlot] = useState('Home');
  const [selectedSlotId, setSelectedSlotId] = useState<any>(null);
  const [previousScreenOfNavigation, setPreviousScreenOfNavigation] = useState('BookingSuccess');

  const [previousScreenOfPass, setPreviousScreenOfPass] = useState('BookingSuccess');

  const navigateToDetail = (parking: any) => {
    setSelectedParking(parking);
    setCurrentScreen('ParkingDetail');
  };

  const navigateToReserve = (parking: any) => {
    setSelectedParking(parking);
    setPreviousScreenOfSlot(currentScreen);
    setCurrentScreen('SlotSelection');
  };

  const getSpotCoordinates = (name: string) => {
    if (name.includes('Grand Central')) return { lat: 40.7527, lng: -73.9772 };
    if (name.includes('Skyline')) return { lat: 40.7644, lng: -73.9735 };
    if (name.includes('Waterfront')) return { lat: 40.7725, lng: -73.9835 };
    return { lat: 40.7549, lng: -73.9840 };
  };

  const getActiveTab = () => {
    if (currentScreen === 'Bookings') return 'Bookings';
    if (currentScreen === 'Profile') return 'Profile';
    return 'Home';
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === 'Home') {
      setCurrentScreen('Home');
    } else if (tabId === 'Bookings') {
      setCurrentScreen('Bookings');
    } else if (tabId === 'Profile') {
      setCurrentScreen('Profile');
    }
  };

  const showTabBar = currentScreen !== 'Opening' && currentScreen !== 'Login';

  return (
    <>
      {showTabBar ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {currentScreen === 'Home' && (
              <Home
                onBack={() => setCurrentScreen('Login')}
                onSearch={() => setCurrentScreen('Search')}
                onParkingSelect={navigateToDetail}
                onReserve={navigateToReserve}
              />
            )}
            {currentScreen === 'Bookings' && (
              <BookingsScreen
                onViewDetails={(parkingName: any, slotId: any) => {
                  const coords = getSpotCoordinates(parkingName);
                  setSelectedParking({
                    name: parkingName,
                    lat: coords.lat,
                    lng: coords.lng,
                  });
                  setSelectedSlotId(slotId);
                  setPreviousScreenOfPass('Bookings');
                  setCurrentScreen('BookingPass');
                }}
              />
            )}
            {currentScreen === 'Profile' && (
              <ProfileScreen
                // @ts-ignore
                onLogout={() => {
                  setSelectedParking(null);
                  setSelectedSlotId(null);
                  setCurrentScreen('Opening');
                }}
                // @ts-ignore
                onNavigateToBookings={() => {
                  setCurrentScreen('Bookings');
                }}
              />
            )}
            {currentScreen === 'Search' && (
              <Search
                onBack={() => setCurrentScreen('Home')}
                onViewMap={() => setCurrentScreen('Home')}
                onParkingSelect={navigateToDetail}
              />
            )}
            {currentScreen === 'ParkingDetail' && (
              <ParkingDetail
                parking={selectedParking}
                onBack={() => setCurrentScreen(selectedParking?._from || 'Home')}
                onReserve={navigateToReserve}
              />
            )}
            {currentScreen === 'SlotSelection' && (
              <SlotSelection
                parking={selectedParking}
                onBack={() => setCurrentScreen(previousScreenOfSlot)}
                onContinue={(slotId: any) => {
                  setSelectedSlotId(slotId);
                  setCurrentScreen('ConfirmBooking');
                }}
              />
            )}
            {currentScreen === 'ConfirmBooking' && (
              <ConfirmBooking
                parking={selectedParking}
                slotId={selectedSlotId}
                onBack={() => setCurrentScreen('SlotSelection')}
                onConfirm={() => {
                  setCurrentScreen('Payment');
                }}
              />
            )}
            {currentScreen === 'Payment' && (
              <Payment
                parking={selectedParking}
                slotId={selectedSlotId}
                onBack={() => setCurrentScreen('ConfirmBooking')}
                onPaySuccess={() => {
                  setCurrentScreen('BookingSuccess');
                }}
              />
            )}
            {currentScreen === 'BookingSuccess' && (
              <BookingSuccess
                parking={selectedParking}
                slotId={selectedSlotId}
                onDone={() => {
                  setSelectedParking(null);
                  setSelectedSlotId(null);
                  setCurrentScreen('Home');
                }}
                onViewQR={() => {
                  setPreviousScreenOfPass('BookingSuccess');
                  setCurrentScreen('BookingPass');
                }}
                onNavigateToSlot={() => {
                  setPreviousScreenOfNavigation('BookingSuccess');
                  setCurrentScreen('Navigation');
                }}
              />
            )}
            {currentScreen === 'BookingPass' && (
              <BookingPass
                parking={selectedParking}
                slotId={selectedSlotId}
                onBack={() => setCurrentScreen(previousScreenOfPass)}
                onNavigateToSlot={() => {
                  setPreviousScreenOfNavigation('BookingPass');
                  setCurrentScreen('Navigation');
                }}
              />
            )}
            {currentScreen === 'Navigation' && (
              <Navigation
                parking={selectedParking}
                slotId={selectedSlotId}
                onBack={() => setCurrentScreen(previousScreenOfNavigation)}
                onArrive={() => {
                  setSelectedParking(null);
                  setSelectedSlotId(null);
                  setCurrentScreen('Home');
                }}
              />
            )}
          </View>
          <BottomTabBar
            activeTab={getActiveTab()}
            setActiveTab={handleTabChange}
          />
        </View>
      ) : (
        <>
          {currentScreen === 'Opening' && (
            <Opening onNavigateToLogin={() => setCurrentScreen('Login')} />
          )}
          {currentScreen === 'Login' && (
            <Login
              onBack={() => setCurrentScreen('Opening')}
              onLoginSuccess={() => setCurrentScreen('Home')}
            />
          )}
        </>
      )}
    </>
  );
};

export default App;
