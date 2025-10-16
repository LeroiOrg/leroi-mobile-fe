import { StyleSheet, Dimensions } from 'react-native';
import { SPACING, RADIUS, COLORS, FONTS, FONT_SIZES } from './globalStyles';

const { width: screenWidth } = Dimensions.get('window');

export const generatedRoadmapStyles = StyleSheet.create({
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
  
  roadmapContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  
  roadmapTitle: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.bold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  
  topicSection: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  
  topicNode: {
    backgroundColor: '#ffca00',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    minWidth: screenWidth * 0.6,
    alignItems: 'center',
  },
  
  topicText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: '#000',
    textAlign: 'center',
  },
  
  subtopicsContainer: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  
  subtopicNode: {
    backgroundColor: '#96E6B3',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    minWidth: screenWidth * 0.7,
    alignItems: 'center',
  },
  
  subtopicText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.medium,
    color: '#000',
    textAlign: 'center',
  },
  
  controlsContainer: {
    position: 'absolute',
    top: 120,
    right: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: SPACING.sm,
    gap: SPACING.sm,
  },
  
  controlButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  saveMessage: {
    position: 'absolute',
    bottom: 100,
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: '#4CAF50',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
  },
  
  saveMessageText: {
    color: '#fff',
    fontFamily: FONTS.medium,
    fontSize: FONT_SIZES.sm,
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  
  modal: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.xl,
    width: '90%',
    alignItems: 'center',
  },
  
  modalTitle: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: '#fff',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  
  formatButton: {
    backgroundColor: '#fff',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    width: '100%',
    alignItems: 'center',
  },
  
  formatButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: SPACING.md,
    width: '100%',
    alignItems: 'center',
  },
  
  cancelButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.medium,
    color: '#fff',
  },
  
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  
  yesButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  
  yesButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.medium,
    color: '#fff',
  },
  
  noButton: {
    backgroundColor: '#f44336',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  
  noButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.medium,
    color: '#fff',
  },
  
  nodeModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: SPACING.xl,
    width: '90%',
    alignItems: 'center',
  },
  
  nodeModalTitle: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  
  nodeModalInfo: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: '#333',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  closeButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.medium,
    color: '#fff',
  },
  
  // Flow-based roadmap styles
  flowContainer: {
    position: 'relative',
    width: 1200,
    height: 1000,
  },
  
  svgContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  
  topicNodeFlow: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    width: 180,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  
  subtopicNodeFlow: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    width: 160,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  
  subSubtopicNodeFlow: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: 6,
    width: 180,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  
  nodeText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.medium,
    color: '#000',
    textAlign: 'center',
    flexWrap: 'wrap',
    numberOfLines: 2,
  },
});

export default generatedRoadmapStyles;