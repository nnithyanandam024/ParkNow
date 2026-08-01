import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  /* ───── Map ───── */
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  /* ───── Floating Header Overlay ───── */
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 36 : (Platform.OS === 'ios' ? 44 : 0),
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D20',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 13,
    color: '#1A5FB4',
    fontWeight: '500',
    marginLeft: 4,
  },
  avatarContainer: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A5FB4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  /* ───── Search Bar ───── */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#9CA3AF',
  },

  /* ───── Filter Chips ───── */
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  filterChipActive: {
    backgroundColor: '#1A5FB4',
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },

  /* ───── Price Markers ───── */
  markerContainer: {
    alignItems: 'center',
  },
  markerBubble: {
    backgroundColor: '#1A5FB4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerPrice: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1A5FB4',
    marginTop: -1,
  },

  /* ───── Bottom Cards ───── */
  cardsContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  cardsList: {
    paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D20',
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1e6b3ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#29e311ff',
    marginLeft: 3,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 5,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStat: {
    flex: 1,
  },
  cardStatLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1D20',
  },
  cardStatUnit: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  cardStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },

  /* ───── Card Action Buttons ───── */
  cardActions: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },
  detailsBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#1A5FB4',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A5FB4',
  },
  reserveBtn: {
    flex: 1,
    backgroundColor: '#1A5FB4',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#1A5FB4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  reserveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
