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

```typescript
import { initializeLiveI18n } from '@livei18n/react-native-expo-sdk';

// Using environment variables (recommended)
const apiKey = process.env.EXPO_PUBLIC_LIVEI18N_API_KEY;
const customerId = process.env.EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID;

initializeLiveI18n({
  apiKey,
  customerId,
});
```

### 2. Use the LiveText Component

```typescript
import { LiveText, updateDefaultLanguage } from '@livei18n/react-native-expo-sdk';

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
updateDefaultLanguage('es-ES'); // All LiveText components will now use Spanish on re-render
```

## Demo Features

### 📱 **Interactive UI**
- Language selector with 5 popular languages (Spanish, French, German, Japanese, Chinese)
- Clean, modern design with rounded corners and proper spacing
- Responsive layout that works on all screen sizes

### 🎨 **Theme Support**
- Automatic dark/light mode detection
- Smooth theme transitions
- Proper contrast ratios for accessibility

### 🔄 **Real-time Translation**
- Static text examples showing common app strings
- Dynamic input field for testing custom text
- Context and tone examples comparing formal vs casual translations
- Global language management - change once, update everywhere

### 🌐 **Global Language Management**
- Uses `updateDefaultLanguage()` to set the global default language
- All `<LiveText>` components automatically use the current default language
- Page re-renders when language changes to show updated translations
- Clean, centralized language switching without prop drilling

### ✅ **Expo-Specific Features**
- **AsyncStorage**: Persistent caching of translations
- **Expo Localization**: Automatic device locale detection
- **Hot Reload**: Instant updates during development
- **Universal Platform**: Runs on iOS, Android, and Web

## Platform Support

- ✅ **iOS** (Simulator and Device)
- ✅ **Android** (Emulator and Device) 
- ✅ **Web Browser**
- ✅ **Expo Go** (Development)
- ✅ **EAS Build** (Production)

## Demo vs Production Mode

### Demo Mode (Default)
The included `.env.local` file contains demo credentials:
- Shows fallback text (original English) instead of translations
- Demonstrates SDK integration and UI components
- Safe for development and testing

### Production Mode
To see real translations:
1. Get your API credentials from [LiveI18n API Keys](https://dashboard.livei18n.com/api-keys)
2. Update `.env.local` with your real credentials:
   ```env
   EXPO_PUBLIC_LIVEI18N_API_KEY=your-real-api-key
   EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID=your-real-customer-id
   ```
3. Restart the Expo development server
4. You'll now see actual translations instead of fallback text

**Note**: Never commit real API credentials to version control. The `.env.local` file is already excluded in `.gitignore`.

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
- Hot reload and fast refresh support
- Web compatibility for testing in browsers

## Development

To modify this demo:

1. **Edit the main app**: Modify `App.tsx`
2. **Add new languages**: Update the language selector array
3. **Test SDK features**: Add new LiveText components
4. **Customize styling**: Modify the StyleSheet object

## Learn More

- [LiveI18n Documentation](https://docs.livei18n.com)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

---

Built with ❤️ using Expo and LiveI18n React Native Expo SDK
