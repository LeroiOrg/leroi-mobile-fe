import { StyleSheet, Dimensions } from 'react-native';
import { SPACING, COLORS, FONTS, FONT_SIZES } from './globalStyles';

const { width: screenWidth } = Dimensions.get('window');

export const aboutStyles = StyleSheet.create({
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
  
  logoSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  
  logo: {
    width: screenWidth * 0.8,
    height: 200,
  },
  
  visionMissionSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    gap: SPACING.lg,
  },
  
  visionCard: {
    backgroundColor: COLORS.card,
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
  
  missionCard: {
    backgroundColor: COLORS.card,
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
  
  cardTitle: {
    fontSize: FONT_SIZES.xxl,
    fontFamily: FONTS.bold,
    color: COLORS.cardForeground,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  
  cardText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.cardForeground,
    lineHeight: 24,
    textAlign: 'center',
  },
  
  teamSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  
  sectionTitle: {
    fontSize: FONT_SIZES.huge,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  
  teamGrid: {
    gap: SPACING.lg,
  },
  
  teamCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  
  teamPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SPACING.lg,
  },
  
  teamInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  teamName: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground,
  },
  
  githubButton: {
    padding: SPACING.sm,
    borderRadius: 8,
    backgroundColor: 'rgba(131, 91, 252, 0.2)',
  },
});