import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { styles } from './OpeningStyles';

const Opening = ({ onNavigateToLogin }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      {/* Header Logo */}
      <View style={styles.header}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoP}>P</Text>
        </View>
        <Text style={styles.logoText}>ParkNow</Text>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../assets/illustration.jpg')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Find Parking Before You Arrive</Text>
        <Text style={styles.subtitle}>
          Discover nearby parking, reserve your slot, pay digitally, and navigate effortlessly.
        </Text>
      </View>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Create Account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={onNavigateToLogin}
        >
          <Text style={styles.secondaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Smart Parking, Made Simple.</Text>
    </SafeAreaView>
  );
};

export default Opening;
