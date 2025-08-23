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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initializeLiveI18n, LiveText, updateDefaultLanguage } from '@livei18n/react-native-expo-sdk';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isInitialized, setIsInitialized] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState('es-ES');
  const [customText, setCustomText] = useState('Hello, how are you today?');
  const [rerenderKey, setRerenderKey] = useState(0);

  useEffect(() => {
    // Initialize LiveI18n using environment variables
    const apiKey = process.env.EXPO_PUBLIC_LIVEI18N_API_KEY;
    const customerId = process.env.EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID;

    if (!apiKey || !customerId) {
      console.warn('LiveI18n: Missing API key or customer ID in environment variables');
      Alert.alert(
        'Configuration Required', 
        'Please set EXPO_PUBLIC_LIVEI18N_API_KEY and EXPO_PUBLIC_LIVEI18N_CUSTOMER_ID in your .env.local file. Using demo mode with fallback text.'
      );
      setIsInitialized(true); // Still allow demo to show components
      return;
    }

    try {
      initializeLiveI18n({
        apiKey,
        customerId,
      });
      setIsInitialized(true);
      console.log('LiveI18n initialized successfully');
    } catch (error) {
      console.error('Failed to initialize LiveI18n:', error);
      Alert.alert('Initialization Error', 'Failed to initialize LiveI18n SDK. Using fallback text.');
      setIsInitialized(true); // Still allow demo to show components
    }
  }, []);

  const handleLanguageChange = (newLanguage: string) => {
    setDefaultLanguage(newLanguage);
    updateDefaultLanguage(newLanguage);
    setRerenderKey(prev => prev + 1); // Force re-render of all LiveText components
  };

  if (!isInitialized) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Initializing LiveI18n...</Text>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]} key={rerenderKey}>
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
          <View style={styles.languageButtons}>
            {['es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN'].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageButton,
                  defaultLanguage === lang && styles.activeLanguageButton
                ]}
                onPress={() => handleLanguageChange(lang)}
              >
                <Text style={[
                  styles.languageButtonText,
                  defaultLanguage === lang && styles.activeLanguageButtonText
                ]}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            Expo-Specific Features
          </Text>
          
          <View style={[styles.exampleRow, { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }]}>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              ✅ AsyncStorage caching enabled
            </Text>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              ✅ Expo Localization integration
            </Text>
            <Text style={[styles.originalLabel, { color: isDarkMode ? '#ccc' : '#666' }]}>
              ✅ Hot reload support
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDarkMode ? '#888' : '#999' }]}>
            💡 Language changes update the global default language setting.
            {'\n'}All LiveText components automatically use the current default language.
            {'\n'}Current language: {defaultLanguage}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeLanguageButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeLanguageButtonText: {
    color: '#fff',
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
