# LiveI18n React Native Expo Demo

This is a demo Expo application showcasing the LiveI18n React Native Expo SDK for real-time translation in Expo projects.

## Features Demonstrated

- **SDK Initialization**: How to set up and initialize the LiveI18n SDK in Expo
- **LiveText Component**: Using the `<LiveText>` component for seamless translations
- **Dynamic Language Switching**: Changing target language on the fly
- **Context & Tone**: Using context and tone parameters for better translations
- **Real-time Input**: Translating user-input text dynamically
- **Expo Integration**: AsyncStorage caching and Expo Localization features
- **Dark/Light Mode**: Full theme support with React Native's useColorScheme
- **Fallback Handling**: Graceful degradation when API is unavailable

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/LiveI18n/expo-demo.git
   cd expo-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API credentials:**
   - Copy `.env.local.example` to `.env.local` and update with your LiveI18n credentials:
   ```bash
   cp .env.local.example .env.local 
   # Edit .env.local with your actual credentials
   ```
   
   ```env
   EXPO_PUBLIC_LIVEI18N_API_KEY=your-actual-api-key
   EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID=your-actual-customer-id
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on your preferred platform:**
   - **iOS Simulator**: Press `i` in the terminal or scan QR code with Camera app
   - **Android Emulator**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Physical Device**: Install Expo Go app and scan the QR code
   - **Web Browser**: Press `w` in the terminal

## SDK Usage Examples

### 1. Initialize the SDK

The SDK provides a convenient context provider. Put it at the outermost layer. It should encompass every portion of your app that you want to be able to auto-translate.

```typescript
import { LiveI18nProvider } from '@livei18n/react-native-expo-sdk';

// Using environment variables (recommended)
const apiKey = process.env.EXPO_PUBLIC_LIVEI18N_API_KEY;
const customerId = process.env.EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID;

const config = {
  apiKey,
  customerId,
  // other configurations
};
<LiveI18nProvider config={config}>
  <YourApp />
</LiveI18nProvider>
```

### 2. Use the LiveText Component

```typescript
import { LiveText, useLiveI18n } from '@livei18n/react-native-expo-sdk';

const { updateDefaultLanguage } = useLiveI18n();

// Basic usage (uses global default language)
<LiveText>Hello, world!</LiveText>

// With context and tone
<LiveText 
  tone="formal"
  context="business communication"
>
  Thank you for your business
</LiveText>

// Update global default language
updateDefaultLanguage('es-ES'); // All LiveText components will now use Spanish
```

## Demo Features

### 📱 **Interactive UI**
- Language selector with 5 popular languages (Spanish, French, German, Japanese, Chinese)

### 🔄 **Real-time Translation**
- Static text examples showing common app strings
- Dynamic input field for testing custom text
- Context and tone examples comparing formal vs casual translations
- Global language management - change once, update everywhere

### 🌐 **Language Management**
- Use `updateDefaultLanguage()` from `useLiveI18n` hook to set the global default language
- All `<LiveText>` components automatically use the current default language

### ✅ **Expo-Specific Features**
- **AsyncStorage**: Persistent caching of translations
- **Expo Localization**: Automatic device locale detection

## Platform Support

- ✅ **iOS** (Simulator and Device)
- ✅ **Android** (Emulator and Device) 
- ✅ **Web Browser**
- ✅ **Expo Go** (Development)
- ✅ **EAS Build** (Production)

## Expo SDK Features

The LiveI18n React Native Expo SDK includes:

### Enhanced Caching
- Uses `@react-native-async-storage/async-storage` for persistent caching
- Survives app restarts and device reboots
- Configurable cache size and TTL

### Locale Detection
- Integrates with `expo-localization` for better device locale detection
- Supports region-specific locales (e.g., `en-US` vs `en-GB`)
- Fallback locale handling

### Expo Developer Experience
- Full TypeScript support with proper type definitions
- Works with Expo CLI, EAS Build, and Expo Go

## Learn More

- [LiveI18n Documentation](https://docs.livei18n.com)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

---

Built with ❤️ using Expo and LiveI18n React Native Expo SDK
