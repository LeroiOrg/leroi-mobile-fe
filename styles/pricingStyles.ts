import { StyleSheet } from 'react-native';
import { SPACING, COLORS, FONTS, FONT_SIZES } from './globalStyles';

export const pricingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.primary,
  },
  
  backButton: {
    marginRight: SPACING.md,
  },
  
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: '#fff',
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  pricingBox: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    borderRadius: 16,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  
  title: {
    fontSize: FONT_SIZES.huge,
    fontFamily: FONTS.bold,
    color: COLORS.cardForeground,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  
  formGroup: {
    marginBottom: SPACING.lg,
  },
  
  label: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground,
    marginBottom: SPACING.sm,
  },
  
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  picker: {
    color: '#fff',
    backgroundColor: 'transparent',
  },
  
  priceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  priceText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground,
    textAlign: 'center',
  },
  
  termsContainer: {
    marginBottom: SPACING.xl,
  },
  
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  termsText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.regular,
    color: COLORS.cardForeground,
  },
  
  termsLink: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.medium,
    color: '#835BFC',
    textDecorationLine: 'underline',
  },
  
  submitButton: {
    backgroundColor: '#835BFC',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#835BFC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  submitButtonDisabled: {
    backgroundColor: '#4b5563',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  submitButtonText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: '#fff',
  },
  
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.xl,
    width: '100%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#835BFC',
  },
  
  modalTitle: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.bold,
    color: COLORS.cardForeground,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  
  modalTextContainer: {
    maxHeight: 300,
    marginBottom: SPACING.lg,
  },
  
  modalText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.regular,
    color: COLORS.mutedForeground,
    lineHeight: 20,
    textAlign: 'justify',
  },
  
  modalCloseButton: {
    backgroundColor: '#835BFC',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  modalCloseButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: '#fff',
  },
});