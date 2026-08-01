import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './LoginStyles';
import { authService } from '../../services/authService';

const Login = ({ onBack, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState('client');
  const [email, setEmail] = useState('john@gmail.com');
  const [password, setPassword] = useState('user123');
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@parknow.com');   // matches seed: user_id=1
      setPassword('admin123');
    } else if (role === 'staff') {
      setEmail('marcus@parknow.com');  // matches seed: user_id=2
      setPassword('staff123');
    } else {
      setEmail('john@gmail.com');      // matches seed: user_id=4
      setPassword('user123');
    }
  };

  const handleLogin = async () => {
    console.log('Login attempt with role:', selectedRole, 'email:', email);
    try {
      const res = await authService.signIn({ email, password });
      if (res.success && res.user) {
        const userRole = res.user.role?.toLowerCase() || selectedRole;
        if (onLoginSuccess) {
          onLoginSuccess(res.user.email, userRole);
        }
        return;
      }
    } catch (e) {
      console.log('Supabase login fallback:', e.message);
    }

    // Default/Fallback behavior
    if (onLoginSuccess) {
      onLoginSuccess(email, selectedRole);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052cc" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Illustration Banner */}
          <View style={styles.bannerContainer}>
            <View style={styles.bannerGradient}>
              {/* Back button */}
              {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                  <Icon name="arrow-left" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              )}
              {/* Banner brand */}
              <View style={styles.bannerBrand}>
                <View style={styles.bannerLogoIcon}>
                  <Text style={styles.bannerLogoP}>P</Text>
                </View>
                <Text style={styles.bannerLogoText}>ParkNow</Text>
              </View>
              {/* Illustration image */}
              <Image
                source={require('../../assets/illustration.png')}
                style={styles.bannerImage}
                resizeMode="contain"
              />
              {/* Overlay text */}
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>ParkNow Ecosystem</Text>
                <Text style={styles.bannerSubtitle}>Multi-Role Unified Access</Text>
              </View>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.contentContainer}>
            {/* Logo & Heading */}
            <View style={styles.header}>
              <View style={styles.headerLogoRow}>
                <View style={styles.logoIcon}>
                  <Text style={styles.logoP}>P</Text>
                </View>
                <Text style={styles.logoText}>ParkNow</Text>
              </View>
              <Text style={styles.title}>Unified Portal Login</Text>
              <Text style={styles.subtitle}>
                Select your access role to proceed into the workspace.
              </Text>
            </View>

            {/* Role Selection Bar */}
            <View style={styles.roleSelectorGroup}>
              <Text style={styles.label}>SELECT ACCESS ROLE</Text>
              <View style={styles.roleSelectorRow}>
                <TouchableOpacity
                  style={[styles.rolePill, selectedRole === 'client' && styles.rolePillActive]}
                  onPress={() => handleRoleSelect('client')}
                  activeOpacity={0.8}
                >
                  <Icon
                    name="user"
                    size={16}
                    color={selectedRole === 'client' ? '#0052cc' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.rolePillText,
                      selectedRole === 'client' && styles.rolePillTextActive,
                    ]}
                  >
                    Client
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.rolePill, selectedRole === 'staff' && styles.rolePillActive]}
                  onPress={() => handleRoleSelect('staff')}
                  activeOpacity={0.8}
                >
                  <Icon
                    name="briefcase"
                    size={16}
                    color={selectedRole === 'staff' ? '#0052cc' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.rolePillText,
                      selectedRole === 'staff' && styles.rolePillTextActive,
                    ]}
                  >
                    Staff
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.rolePill, selectedRole === 'admin' && styles.rolePillActive]}
                  onPress={() => handleRoleSelect('admin')}
                  activeOpacity={0.8}
                >
                  <Icon
                    name="shield"
                    size={16}
                    color={selectedRole === 'admin' ? '#0052cc' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.rolePillText,
                      selectedRole === 'admin' && styles.rolePillTextActive,
                    ]}
                  >
                    Admin
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedInput === 'email' && styles.inputWrapperFocused,
                  ]}
                >
                  <Icon name="mail" size={18} color="#9CA3AF" style={styles.inputIconStyle} />
                  <TextInput
                    style={styles.input}
                    placeholder="name@company.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    focusedInput === 'password' && styles.inputWrapperFocused,
                  ]}
                >
                  <Icon name="lock" size={18} color="#9CA3AF" style={styles.inputIconStyle} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Icon
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={18}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.rememberForgotRow}>
                <TouchableOpacity
                  style={styles.rememberMeRow}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && (
                      <Icon name="check" size={12} color="#FFFFFF" />
                    )}
                  </View>
                  <Text style={styles.rememberMeText}>Remember Me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>
                  Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Google Sign In */}
              <TouchableOpacity
                style={styles.googleButton}
                activeOpacity={0.7}
              >
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
