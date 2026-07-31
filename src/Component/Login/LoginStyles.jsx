import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  /* ───── Banner ───── */
  bannerContainer: {
    width: '100%',
    height: 220,
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bannerGradient: {
    flex: 1,
    backgroundColor: '#1A5FB4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: -2,
  },
  bannerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerLogoIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  bannerLogoP: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A5FB4',
  },
  bannerLogoText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerImage: {
    width: width * 0.65,
    height: 100,
    marginVertical: 4,
  },
  bannerOverlay: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 28,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },

  /* ───── Content ───── */
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },

  /* ───── Header / Logo ───── */
  header: {
    marginBottom: 24,
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#1A5FB4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoP: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D20',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1D20',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  /* ───── Form ───── */
  formContainer: {},
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputWrapperFocused: {
    borderColor: '#1A5FB4',
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  inputIconStyle: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
  },
  eyeButton: {
    padding: 6,
    marginLeft: 4,
  },


  /* ───── Remember / Forgot ───── */
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#1A5FB4',
    borderColor: '#1A5FB4',
  },
  checkmark: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: -1,
  },
  rememberMeText: {
    fontSize: 13,
    color: '#374151',
  },
  forgotPasswordText: {
    color: '#1A5FB4',
    fontSize: 13,
    fontWeight: '600',
  },

  /* ───── Login Button ───── */
  loginButton: {
    backgroundColor: '#1A8CFF',
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#1A8CFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  /* ───── Divider ───── */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },

  /* ───── Google Button ───── */
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 28,
    paddingVertical: 13,
    marginBottom: 24,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  /* ───── Footer ───── */
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 13,
  },
  registerText: {
    color: '#1A5FB4',
    fontSize: 13,
    fontWeight: '700',
  },
});
