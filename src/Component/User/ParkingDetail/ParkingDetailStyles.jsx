import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ───── Header ───── */
  headerSafe: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerBtn: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1D20',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  /* ───── Image Carousel ───── */
  imageCarousel: {
    width: '100%',
    height: 200,
    backgroundColor: '#E8EDF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: '#1A5FB4',
    width: 20,
    borderRadius: 4,
  },

  /* ───── Name Section ───── */
  nameSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spotName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1D20',
    flex: 1,
    marginRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A5FB4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },

  /* ───── Info Cards Grid ───── */
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  infoCard: {
    width: (width - 48) / 2,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    margin: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  infoIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF0FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1D20',
  },

  /* ───── Sections ───── */
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1D20',
    marginBottom: 14,
  },

  /* ───── Amenities ───── */
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    width: (width - 52) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  amenityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EBF0FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  amenityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    lineHeight: 16,
  },

  /* ───── Description ───── */
  descriptionBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  descriptionText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  readMore: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A5FB4',
    marginTop: 8,
  },

  /* ───── Location Map ───── */
  miniMapContainer: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEF2F7',
  },
  miniMap: {
    flex: 1,
  },
  openMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  openMapText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A5FB4',
    marginLeft: 6,
  },

  /* ───── Bottom Reserve Bar ───── */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 10,
  },
  reserveButton: {
    backgroundColor: '#1A5FB4',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
