import { StyleSheet, Dimensions } from 'react-native';
import { SPACING, RADIUS, COLORS, FONTS, FONT_SIZES } from './globalStyles';

const { width, height } = Dimensions.get('window');

export const roadmapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  roadmapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    gap: 25,
  },
  title: {
    fontSize: FONT_SIZES.huge,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  fileUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    padding: 40,
    gap: 10,
    borderRadius: 10,
    backgroundColor: '#1a1a2e',
  },
  fileUploadDragging: {
    borderColor: '#aaa',
    backgroundColor: '#2a2a4e',
    transform: [{ scale: 1.005 }],
  },
  uploadIcon: {
    width: 100,
    height: 100,
  },
  uploadText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.foreground,
    textAlign: 'center',
  },
  fileInfoContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  fileDetails: {
    flex: 1,
    gap: SPACING.md,
  },
  fileDetailsTitle: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.sm,
  },
  fileInfo: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.foreground,
  },
  creditsContainer: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  creditsTitle: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
  },
  previewCost: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.foreground,
  },
  userCredits: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.foreground,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginTop: SPACING.xl,
  },

  generateButtonDisabled: {
    backgroundColor: '#666',
  },



  pdfPreview: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '60%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  topicsModal: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    width: '90%',
    maxHeight: '80%',
  },
  topicsTitle: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  topicsContainer: {
    gap: SPACING.md,
  },
  topicButton: {
    backgroundColor: COLORS.hover,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  topicButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.foreground,
  },
  loadingModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    gap: SPACING.xl,
  },
  loadingContent: {
    alignItems: 'center',
    gap: SPACING.lg,
  },
  loadingText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: COLORS.foreground,
    textAlign: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: '#f3f3f3',
    borderTopColor: COLORS.hover,
    borderRadius: 25,
  },
  helpIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
  },
  tutorialIcon: {
    width: 60,
    height: 60,
  },
  videoModal: {
    backgroundColor: COLORS.hover,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    width: '90%',
    aspectRatio: 16/9,
  },
  closeButton: {
    backgroundColor: '#13131f',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  closeButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.foreground,
  },
  // New styles for reorganized layout
  pdfPreviewTop: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    minHeight: 250,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  previewTitle: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  pdfContainer: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    height: 400,
    borderWidth: 2,
    borderColor: COLORS.hover,
    overflow: 'hidden',
  },
  pdfViewer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: RADIUS.sm,
    minHeight: 300,
  },

  pdfPlaceholder: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.bold,
    color: COLORS.hover,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  pdfSize: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  fileDetailsBottom: {
    gap: SPACING.lg,
  },
  buttonsContainerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginTop: SPACING.xl,
    width: '100%',
  },
  generateButton: {
    backgroundColor: COLORS.hover,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  generateButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.foreground,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.7,
  },
  resetButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.foreground,
    textAlign: 'center',
  },

  pdfPlaceholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
    gap: SPACING.sm,
  },
  pdfIcon: {
    fontSize: 48,
    color: COLORS.hover,
    marginBottom: SPACING.sm,
  },
  pdfPreviewNote: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.regular,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: SPACING.sm,
  },

});