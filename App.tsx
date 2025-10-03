/**
 * LiveI18n React Native Expo SDK Demo
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LiveText, LiveI18nProvider, useLiveI18n, type SupportedLanguage } from '@livei18n/react-native-expo-sdk';

function DemoContent({ onResetCredentials }: { onResetCredentials: () => void }) {
  const isDarkMode = useColorScheme() === 'dark';
  const { defaultLanguage, updateDefaultLanguage, getSupportedLanguages } = useLiveI18n();
  const [customText, setCustomText] = useState('Hello, how are you today?');
  const [supportedLanguages, setSupportedLanguages] = useState<SupportedLanguage[]>([]);
  const [languagesLoading, setLanguagesLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Load supported languages from API (top 20 only)
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setLanguagesLoading(true);
        const response = await getSupportedLanguages(); // Default to top 20
        setSupportedLanguages(response.languages);
      } catch (error) {
        console.error('Failed to load supported languages:', error);
        Alert.alert(
          'Language Loading Error',
          'Failed to load supported languages. Using fallback languages.',
          [{ text: 'OK' }]
        );
        // Fallback to basic languages
        setSupportedLanguages([
          { name: 'English (US)', locale: 'en-US', flag: '🇺🇸' },
          { name: 'Spanish (Spain)', locale: 'es-ES', flag: '🇪🇸' },
          { name: 'French (France)', locale: 'fr-FR', flag: '🇫🇷' },
          { name: 'German (Germany)', locale: 'de-DE', flag: '🇩🇪' },
          { name: 'Japanese', locale: 'ja-JP', flag: '🇯🇵' },
        ]);
      } finally {
        setLanguagesLoading(false);
      }
    };

    loadLanguages();
  }, [getSupportedLanguages]);

  const handleLanguageChange = (newLanguage: string) => {
    updateDefaultLanguage(newLanguage);
    setDropdownVisible(false);
  };

  const getCurrentLanguageDisplay = () => {
    const currentLang = supportedLanguages.find(lang => lang.locale === defaultLanguage);
    if (currentLang) {
      return `${currentLang.flag} ${currentLang.name}`;
    }
    return defaultLanguage || 'Select Language';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
            LiveI18n Expo Demo
          </Text>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#ccc' : '#666' }]}>
            Real-time translation SDK for Expo
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Language Selector
          </Text>

          {languagesLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={isDarkMode ? '#fff' : '#000'} />
              <Text style={[styles.loadingText, { color: isDarkMode ? '#ccc' : '#666' }]}>
                Loading languages...
              </Text>
            </View>
          ) : (
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  { 
                    backgroundColor: isDarkMode ? '#333' : '#f8f8f8',
                    borderColor: isDarkMode ? '#555' : '#ddd'
                  }
                ]}
                onPress={() => setDropdownVisible(true)}
                disabled={languagesLoading}
              >
                <Text style={[styles.dropdownButtonText, { color: isDarkMode ? '#fff' : '#000' }]}>
                  {getCurrentLanguageDisplay()}
                </Text>
                <Text style={[styles.dropdownArrow, { color: isDarkMode ? '#fff' : '#000' }]}>
                  ▼
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Static Text Examples
          </Text>
          
          <View style={[styles.exampleRow, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Original: "Welcome to our app!"
            </Text>
            <Text style={[styles.translatedText, { color: isDarkMode ? '#4CAF50' : '#2E7D32' }]}>
              Translated: <LiveText>Welcome to our app!</LiveText>
            </Text>
          </View>

          <View style={[styles.exampleRow, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Original: "Settings"
            </Text>
            <Text style={[styles.translatedText, { color: isDarkMode ? '#4CAF50' : '#2E7D32' }]}>
              Translated: <LiveText>Settings</LiveText>
            </Text>
          </View>

          <View style={[styles.exampleRow, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Original: "Save your progress"
            </Text>
            <Text style={[styles.translatedText, { color: isDarkMode ? '#4CAF50' : '#2E7D32' }]}>
              Translated: <LiveText>Save your progress</LiveText>
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Dynamic Text Example
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
                color: isDarkMode ? '#fff' : '#000',
                borderColor: isDarkMode ? '#555' : '#ddd',
              }
            ]}
            value={customText}
            onChangeText={setCustomText}
            placeholder="Enter text to translate..."
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            multiline
          />
          <View style={[styles.exampleRow, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Original: "{customText}"
            </Text>
            <Text style={[styles.translatedText, { color: isDarkMode ? '#4CAF50' : '#2E7D32' }]}>
              Translated: <LiveText>{customText}</LiveText>
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Context & Tone Examples
          </Text>
          
          <View style={[styles.exampleRow, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Formal tone: "Thank you for your business"
            </Text>
            <Text style={[styles.translatedText, { color: isDarkMode ? '#4CAF50' : '#2E7D32' }]}>
              <LiveText 
                tone="formal"
                context="business communication"
              >
                Thank you for your business
              </LiveText>
            </Text>
          </View>

          <View style={[styles.exampleRow, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              Casual tone: "Hey, what's up?"
            </Text>
            <Text style={[styles.translatedText, { color: isDarkMode ? '#4CAF50' : '#2E7D32' }]}>
              <LiveText 
                tone="casual"
                context="friendly greeting"
              >
                Hey, what's up?
              </LiveText>
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDarkMode ? '#888' : '#999' }]}>
            💡 Languages are fetched dynamically from the LiveI18n API.
            {'\n'}All LiveText components automatically re-render when language changes.
            {'\n'}Current language: {defaultLanguage || 'es-ES'}
            {'\n'}SDK version: @livei18n/react-native-expo-sdk@1.0.4
          </Text>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? '#222' : '#fff' }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
                Select Language
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDropdownVisible(false)}
              >
                <Text style={[styles.closeButtonText, { color: isDarkMode ? '#fff' : '#000' }]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={supportedLanguages}
              keyExtractor={(item) => item.locale}
              showsVerticalScrollIndicator={true}
              style={styles.languageList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    { 
                      backgroundColor: defaultLanguage === item.locale 
                        ? (isDarkMode ? '#007AFF' : '#007AFF') 
                        : (isDarkMode ? '#333' : '#f8f8f8')
                    }
                  ]}
                  onPress={() => handleLanguageChange(item.locale)}
                >
                  <Text style={[
                    styles.languageOptionText,
                    { 
                      color: defaultLanguage === item.locale 
                        ? '#fff' 
                        : (isDarkMode ? '#fff' : '#000')
                    }
                  ]}>
                    {item.flag} {item.name}
                  </Text>
                  <Text style={[
                    styles.languageLocaleText,
                    { 
                      color: defaultLanguage === item.locale 
                        ? '#fff' 
                        : (isDarkMode ? '#ccc' : '#666')
                    }
                  ]}>
                    {item.locale}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isInitialized, setIsInitialized] = useState(false);
  const [validatedConfig, setValidatedConfig] = useState<{apiKey: string, customerId: string} | null>(null);

  useEffect(() => {
    // Initialize LiveI18n using environment variables
    const apiKey = process.env.EXPO_PUBLIC_LIVEI18N_API_KEY;
    const customerId = process.env.EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID;

    if (!apiKey || !customerId) {
      console.error('LiveI18n: Missing API key or customer ID in environment variables');
      Alert.alert(
        'Configuration Required', 
        'Please set EXPO_PUBLIC_LIVEI18N_API_KEY and EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID in your .env.local file.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setValidatedConfig({
        apiKey,
        customerId
      });
      setIsInitialized(true);
      console.log('LiveI18n config validated successfully');
    } catch (error) {
      console.error('Failed to validate LiveI18n config:', error);
      Alert.alert(
        'Configuration Error', 
        'Failed to validate LiveI18n SDK config.',
        [{ text: 'OK' }]
      );
    }
  }, []);

  if (!isInitialized || !validatedConfig) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>
          {!validatedConfig ? 'Please configure API credentials' : 'Initializing LiveI18n...'}
        </Text>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </SafeAreaView>
    );
  }

  return (
    <LiveI18nProvider config={{
      apiKey: validatedConfig.apiKey,
      customerId: validatedConfig.customerId,
      defaultLanguage: 'es-ES'
    }}>
      <DemoContent onResetCredentials={() => setIsInitialized(false)} />
    </LiveI18nProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 50,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    marginLeft: 10,
  },
  languageInfo: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageList: {
    maxHeight: 400,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  languageOptionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  languageLocaleText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  exampleRow: {
    marginBottom: 15,
    padding: 16,
    borderRadius: 10,
  },
  originalLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  translatedText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
