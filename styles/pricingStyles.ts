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
  
  errorContainer: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  
  errorText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.medium,
    color: '#f44336',
    textAlign: 'center',
  },
  
  // Payment failure styles
  errorIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  
  errorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  failureTitle: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  
  failureMessage: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  
  failureDetails: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  
  btnPrimary: {
    backgroundColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  
  btnSecondary: {
    backgroundColor: '#3498db',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#667eea',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  btnOutlineText: {
    color: '#667eea',
  },
  
  securityNote: {
    backgroundColor: '#d1ecf1',
    borderWidth: 1,
    borderColor: '#b8daff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  
  securityNoteText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#0c5460',
    lineHeight: 21,
    textAlign: 'center',
  },
  
  timestampContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 16,
  },
  
  timestampText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#6c757d',
    textAlign: 'center',
  },
  
  // Web version class names
  pricingContainerP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#040819',
    padding: 20,
  },
  
  pricingBoxP: {
    backgroundColor: 'rgba(30, 31, 38, 0.95)',
    borderRadius: 16,
    padding: 30,
    paddingTop: 20,
    marginTop: 40,
    marginHorizontal: 20,
    maxWidth: 480,
    shadowColor: 'rgba(31, 38, 135, 0.37)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 8,
  },
  
  pricingTitleP: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 32,
    marginBottom: 18,
    fontFamily: FONTS.bold,
  },
  
  errorIcon: {
    marginBottom: 24,
    alignItems: 'center',
  },
  
  buttonContainer: {
    marginBottom: 14,
  },
  
  infoNote: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  
  infoText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
  
  boldText: {
    fontWeight: '600',
    color: '#835bfc',
    fontFamily: FONTS.semiBold,
  },
  
  timestamp: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
    alignItems: 'center',
  },
  
  successIcon: {
    marginBottom: 24,
    alignItems: 'center',
  },
  
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#835bfc',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#835bfc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  successDetails: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: FONTS.regular,
  },
});