import { StyleSheet } from 'react-native';
import { COLORS } from './globalStyles';

export const tabsLayoutStyles = StyleSheet.create({
  // Scene background
  sceneStyle: {
    backgroundColor: COLORS.background,
  },

  // Tab bar style
  tabBarStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: 85,
    paddingBottom: 25,
    paddingTop: 10,
    position: 'absolute',
    elevation: 0,
  },

  tabBarItemStyle: {
    paddingVertical: 5,
  },

  // BlurView background for tab bar
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(131, 91, 252, 0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: '#6B47CC',
    borderTopWidth: 1,
    overflow: 'hidden',
  },

  // Tab icon container
  tabIconContainer: {
    borderRadius: 12,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIconContainerFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  tabIconContainerUnfocused: {
    backgroundColor: 'transparent',
  },
});

// Tab bar colors
export const TAB_COLORS = {
  activeTint: '#FFFFFF',
  inactiveTint: 'rgba(255, 255, 255, 0.5)',
  blurIntensity: 80,
  blurTint: 'dark' as const,
};
