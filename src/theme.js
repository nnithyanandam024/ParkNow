export const colors = {
  primary: '#0052cc',          // Indigo / Modern Electric Blue
  primaryDark: '#0747a6',      // Darker Indigo for press states
  primaryLight: '#EFF6FF',     // Soft Blue background
  bgMain: '#F8FAFC',           // Main page background
  bgCard: '#FFFFFF',           // Card surface background
  bgInput: '#F1F5F9',          // Input & inactive chip background
  
  // Text colors
  textDark: '#0F172A',         // Header text (Slate 900)
  textMedium: '#1E293B',       // Subheader text (Slate 800)
  textSecondary: '#64748B',    // Subtitle & label text (Slate 500)
  textMuted: '#94A3B8',        // Placeholder & detail label text (Slate 400)
  
  // Status & Badge colors
  success: '#16A34A',          // Emerald Green
  successBg: '#DCFCE7',        // Soft Emerald background
  successPillBg: '#D1FAE5',    // Soft Emerald pill background
  
  warning: '#F59E0B',          // Amber
  warningBg: '#FEF3C7',
  
  danger: '#EF4444',           // Red
  dangerBg: '#FEE2E2',
  
  // Borders
  borderLight: '#E2E8F0',      // Card & section borders
  borderSubtle: '#F1F5F9',
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 24,
  full: 9999,
};

export const shadows = {
  card: {
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
  },
  button: {
    ios: {
      shadowColor: '#0052cc',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    android: {
      elevation: 4,
    },
  },
};
