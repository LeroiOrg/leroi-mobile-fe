import { StyleSheet } from 'react-native';
import { SPACING, COLORS, FONTS, FONT_SIZES } from './globalStyles';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.medium,
    color: COLORS.foreground,
  },
  
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  errorText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.medium,
    color: '#f44336',
    textAlign: 'center',
  },
  
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  
  title: {
    fontSize: FONT_SIZES.huge,
    fontFamily: FONTS.bold,
    color: COLORS.foreground,
    textAlign: 'center',
  },
  
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: '#835BFC',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
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
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  
  cardHeaderWithCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  
  cardTitle: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground,
    marginLeft: SPACING.sm,
  },
  
  infoField: {
    marginBottom: SPACING.md,
  },
  
  fieldLabel: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground,
    marginBottom: SPACING.xs,
  },
  
  fieldValue: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.regular,
    color: COLORS.mutedForeground,
  },
  
  creditsAmount: {
    fontSize: FONT_SIZES.massive,
    fontFamily: FONTS.bold,
    color: COLORS.cardForeground,
    textAlign: 'center',
  },
  
  roadmapsCount: {
    fontSize: FONT_SIZES.massive,
    fontFamily: FONTS.bold,
    color: COLORS.cardForeground,
  },
  
  viewRoadmapsButton: {
    backgroundColor: '#835BFC',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  
  viewRoadmapsButtonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: '#fff',
    textAlign: 'center',
  },
  
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  securityInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  
  securityTitle: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.semiBold,
    color: COLORS.cardForeground,
    marginBottom: SPACING.xs,
  },
  
  securityDescription: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.regular,
    color: COLORS.mutedForeground,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: 'rgba(131, 91, 252, 0.1)',
    borderRadius: 8,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(131, 91, 252, 0.2)',
  },
  
  actionButtonText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.medium,
    color: COLORS.cardForeground,
    marginLeft: SPACING.sm,
  },
  
  deleteButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: 'rgba(244, 67, 54, 0.2)',
  },
  
  deleteButtonText: {
    color: '#f44336',
  },
  
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  
  logoutButtonText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.semiBold,
    color: '#f44336',
    marginLeft: SPACING.sm,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'rgba(30, 31, 38, 0.95)',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    borderWidth: 1,
    borderColor: 'rgba(131, 91, 252, 0.3)',
    minWidth: 300,
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
  },

  confirmButton: {
    flex: 1,
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },

  confirmButtonText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
  },

  // Edit Modal Styles
  editModalContent: {
    backgroundColor: 'rgba(30, 31, 38, 0.98)',
    borderRadius: 20,
    padding: 0,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(131, 91, 252, 0.3)',
  },

  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(131, 91, 252, 0.2)',
  },

  editModalTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#fff',
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  editForm: {
    padding: 24,
  },

  editInputGroup: {
    marginBottom: 20,
  },

  editInputLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#fff',
    marginBottom: 8,
  },

  editInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(131, 91, 252, 0.3)',
  },

  editModalButtons: {
    flexDirection: 'row',
    padding: 24,
    paddingTop: 0,
    gap: 12,
  },

  editCancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  editCancelButtonText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    textAlign: 'center',
  },

  editSaveButton: {
    flex: 1,
    backgroundColor: '#835BFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editSaveButtonText: {
    color: '#fff',
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    textAlign: 'center',
  },
});