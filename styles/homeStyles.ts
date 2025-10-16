import { StyleSheet, Dimensions } from 'react-native';
import { SPACING, RADIUS, COLORS, FONTS, FONT_SIZES } from './globalStyles';

const SECTION_PADDING_VERTICAL = 60;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
  },
  // Sections
  hookSection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    paddingTop: 100,
    minHeight: Dimensions.get('window').height * 0.8,
    position: 'relative',
  },
  featuresSection: {
    padding: SPACING.md,
    paddingVertical: SECTION_PADDING_VERTICAL,
    backgroundColor: COLORS.background,
  },
  pricingSection: {
    padding: SPACING.md,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  faqSection: {
    padding: SPACING.md,
    paddingVertical: SECTION_PADDING_VERTICAL,
    backgroundColor: COLORS.background,
  },

  // GIF Image
  hookGif: {
    width: 300,
    height: 200,
    marginBottom: 24,
    borderRadius: 12,
  },

  // Typography
  h1: {
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    fontSize: FONT_SIZES.xxxl,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 36,
  },
  h2: {
    textAlign: 'center',
    color: COLORS.foreground,
    fontSize: FONT_SIZES.huge,
    fontFamily: FONTS.bold,
    marginBottom: 40,
  },
  h3: {
    color: COLORS.cardForeground,
    fontSize: FONT_SIZES.xxl,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  h4: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground, 
    marginBottom: SPACING.sm,
  },
  definition: {
    marginHorizontal: SPACING.md,
    marginBottom: 48,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.regular,
    color: COLORS.foreground,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: SPACING.md,
  },

  // CTA Button
  ctaButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.hover,
    borderRadius: RADIUS.md,
    marginTop: SPACING.lg,
    shadowColor: COLORS.hover,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: COLORS.primaryForeground,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
  },

  // Feature Cards
  featuresContainer: {
    gap: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  featureCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  featureIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    backgroundColor: 'rgba(131, 91, 252, 0.1)',
    borderRadius: 20,
  },
  cardText: {
    color: COLORS.cardForeground,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Pricing Cards
  pricingContainer: {
    gap: SPACING.md,
    width: '100%',
    paddingHorizontal: SPACING.md,
  },
  pricingCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
    minHeight: 280,
  },
  price: {
    fontSize: FONT_SIZES.massive,
    fontFamily: FONTS.bold,
    marginVertical: SPACING.sm,
    color: COLORS.cardForeground,
  },
  list: {
    alignItems: 'flex-start',
    marginVertical: SPACING.md,
    gap: SPACING.sm,
  },
  listItem: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.cardForeground,
  },

  // FAQ
  faqContainer: {
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  faqCard: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  faqAnswer: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.foreground,
    marginTop: SPACING.md,
    lineHeight: 24,
  },

  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.hover,
    borderRadius: 8,
    marginTop: 16,
  },
  resetButtonText: {
    color: COLORS.hover,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
});