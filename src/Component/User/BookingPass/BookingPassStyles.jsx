import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
  },

  /* ───── Header ───── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : (Platform.OS === 'ios' ? 44 : 12),
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1D20',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ───── Scroll Area ───── */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },

  /* ───── Pass Card Ticket ───── */
  passCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EBF0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: 24,
  },

  /* Top Section */
  cardTop: {
    padding: 20,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.8,
  },
  confirmedBadge: {
    backgroundColor: '#E8F8EE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confirmedText: {
    color: '#0F7336',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  locationName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1D20',
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },

  /* Ticket Tear Cutout Line */
  tearLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 20,
    backgroundColor: 'transparent',
  },
  leftCircleCutout: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FAFBFD',
    marginLeft: -10,
    borderWidth: 1,
    borderColor: '#EBF0F5',
  },
  rightCircleCutout: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FAFBFD',
    marginRight: -10,
    borderWidth: 1,
    borderColor: '#EBF0F5',
  },
  dashedLine: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    height: 1,
    marginHorizontal: 10,
  },

  /* Middle QR Section */
  cardMiddle: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  qrScannerFrame: {
    width: 200,
    height: 200,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  qrWrapper: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Brackets around QR */
  cornerBracket: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderColor: '#1A5FB4',
  },
  topLeftBracket: {
    top: 10,
    left: 10,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  topRightBracket: {
    top: 10,
    right: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  bottomLeftBracket: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  bottomRightBracket: {
    bottom: 10,
    right: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },

  /* Mock QR Grid Pattern */
  qrGrid: {
    width: 120,
    height: 120,
    justifyContent: 'space-between',
  },
  qrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  qrBlock: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
    borderRadius: 2,
  },
  qrBlack: {
    backgroundColor: '#1A1D20',
  },
  qrCorner: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#1A1D20',
    backgroundColor: '#FFFFFF',
  },
  scanNotice: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },

  /* Card Bottom details panel */
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F6F9',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  footerCol: {
    flex: 1,
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A5FB4',
  },
  footerDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#D1D5DB',
  },

  /* ───── Action Buttons ───── */
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  navigateButton: {
    backgroundColor: '#1A5FB4',
    borderRadius: 28,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#4B5563',
    fontSize: 13,
    fontWeight: '700',
  },
});
