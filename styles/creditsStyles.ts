import { StyleSheet } from 'react-native';
import { SPACING, COLORS, FONTS, FONT_SIZES } from './globalStyles';

export const creditsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  
  title: {
    fontSize: FONT_SIZES.huge,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  
  subtitle: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  pricingContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },
  
  pricingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 280,
  },
  
  cardTitle: {
    fontSize: FONT_SIZES.xxl,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground,
    marginBottom: SPACING.sm,
  },
  
  price: {
    fontSize: FONT_SIZES.massive,
    fontFamily: FONTS.bold,
    color: COLORS.cardForeground,
    marginVertical: SPACING.sm,
  },
  
  featuresList: {
    alignItems: 'flex-start',
    marginVertical: SPACING.md,
    gap: SPACING.sm,
    width: '100%',
  },
  
  featureItem: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.cardForeground,
  },
  
  buyButton: {
    backgroundColor: COLORS.hover,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    marginTop: SPACING.md,
    shadowColor: COLORS.hover,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  buyButtonText: {
    color: COLORS.primaryForeground,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },
  
  infoSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    marginTop: SPACING.lg,
  },
  
  infoTitle: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.semiBold,
    color: COLORS.foreground,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  
  infoText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    lineHeight: 24,
  },
});