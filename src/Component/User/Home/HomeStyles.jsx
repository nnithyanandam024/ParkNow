import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E2E8F0',
  },

  /* ───── Map View ───── */
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#E2E8F0',
    zIndex: 1,
  },

  /* ───── Floating Top Header Overlay ───── */
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 44,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  /* ───── Filter Chips Scroll ───── */
  filterScroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  filterChipActive: {
    backgroundColor: '#0052cc',
    borderColor: '#0052cc',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },

  /* ───── Floating My Location Button ───── */
  myLocationBtn: {
    position: 'absolute',
    right: 18,
    bottom: Platform.OS === 'ios' ? 280 : 270,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    zIndex: 35,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  /* ───── Bottom Parking Cards Overlay ───── */
  cardsOverlay: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 95 : 85,
    left: 0,
    right: 0,
    zIndex: 30,
  },
  cardsScroll: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  spotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
    maxWidth: width * 0.48,
  },
  spotMeta: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#A16207',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0052cc',
  },
  slotsAvailable: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailsBtn: {
    paddingHorizontal: 14,
    height: 38,
    borderWidth: 1.5,
    borderColor: '#0052cc',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0052cc',
  },
  reserveBtn: {
    paddingHorizontal: 16,
    height: 38,
    backgroundColor: '#0052cc',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  reserveBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
