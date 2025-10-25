require('dotenv').config();

export default {
  expo: {
    name: "Leroi",
    slug: "leroi-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "leroimobile",
    userInterfaceStyle: "dark",
    backgroundColor: "#040819",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.vanmo.leroimobile",
      icon: "./assets/images/icon.png",
      infoPlist: {
        CFBundleName: "Leroi",
        CFBundleDisplayName: "Leroi",
        UIStatusBarStyle: "UIStatusBarStyleLightContent",
        UIViewControllerBasedStatusBarAppearance: false
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      statusBar: {
        backgroundColor: "#040819",
        barStyle: "light-content"
      },
      navigationBar: {
        visible: "leanback",
        backgroundColor: "transparent"
      },
      softwareKeyboardLayoutMode: "pan",
      edgeToEdgeEnabled: true,
      package: "com.vanmo.leroimobile",
      permissions: [
        "INTERNET",
        "ACCESS_NETWORK_STATE"
      ],
      usesCleartextTraffic: true // Para desarrollo con HTTP
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow Leroi to access your photos.",
          savePhotosPermission: "Allow Leroi to save photos."
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "07537a9e-1102-4931-86bd-5b0d2cb961ec"
      },
      // Variables de entorno para la API Backend
      apiUrl: process.env.EXPO_PUBLIC_BACKEND_URL || "https://leroi-gateway-dpmrnwaj.ue.gateway.dev",
      apiKey: process.env.EXPO_PUBLIC_API_KEY || "AIzaSyC23cSLhu3-OemttZ1mZKKSpkoleI3INF4",
      
      // Variables de Firebase
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "AIzaSyDbUT2_AlOetbra8BtLnCQ_97wDCOeaTiQ",
      firebaseAuthDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || "leroi-1.firebaseapp.com",
      firebaseProjectId: process.env.EXPO_PUBLIC_PROJECT_ID || "leroi-1",
      firebaseStorageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || "leroi-1.firebasestorage.app",
      firebaseMessagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || "412989332451",
      firebaseAppId: process.env.EXPO_PUBLIC_APP_ID || "1:412989332451:web:65685d03775ca8fea25ed6",
      firebaseMeasurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID || "G-6BKTN32LFJ"
    },
    owner: "leroi-mobile"
  }
};
