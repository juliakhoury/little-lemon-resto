import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  green: '#495E57',
  yellow: '#F4CE14',
  offWhite: '#EDEFEE',
  dark: '#333333',
  gray: '#6b7280',
  white: '#ffffff',
};

const DEFAULT_NOTIFICATIONS = {
  orderStatuses: true,
  passwordChanges: true,
  specialOffers: true,
  newsletter: true,
};

function Checkbox({ checked, onToggle, label }) {
  return (
    <TouchableOpacity style={styles.checkboxRow} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const { user, updateUser, logout } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notifications, setNotifications] = useState(
    user?.notifications || DEFAULT_NOTIFICATIONS
  );

  const initials = firstName ? firstName.slice(0, 2).toUpperCase() : 'LL';

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDiscard = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setNotifications(user?.notifications || DEFAULT_NOTIFICATIONS);
  };

  const handleSave = () => {
    updateUser({ firstName, lastName, email, phone, notifications });
    navigation.goBack();
  };

  // Logging out clears AsyncStorage via context, which flips `user` to null.
  // App.js's RootNavigator reacts to that and swaps back to the Onboarding
  // stack automatically - no explicit navigation call needed here.
  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <View style={styles.logoDot} />
          <Text style={styles.logoText}>LITTLE LEMON</Text>
        </View>
        <View style={[styles.avatar, { width: 40, height: 40, borderRadius: 20 }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Personal information</Text>

        <Text style={styles.sectionLabel}>Avatar</Text>
        <View style={styles.avatarRow}>
          <View style={[styles.avatar, { width: 56, height: 56, borderRadius: 28 }]}>
            <Text style={[styles.avatarText, { fontSize: 22 }]}>{initials}</Text>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>First name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

        <Text style={styles.label}>Last name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.notificationsTitle}>Email notifications</Text>
        <Checkbox
          checked={notifications.orderStatuses}
          onToggle={() => toggleNotification('orderStatuses')}
          label="Order statuses"
        />
        <Checkbox
          checked={notifications.passwordChanges}
          onToggle={() => toggleNotification('passwordChanges')}
          label="Password changes"
        />
        <Checkbox
          checked={notifications.specialOffers}
          onToggle={() => toggleNotification('specialOffers')}
          label="Special offers"
        />
        <Checkbox
          checked={notifications.newsletter}
          onToggle={() => toggleNotification('newsletter')}
          label="Newsletter"
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
            <Text style={styles.discardText}>Discard changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { color: COLORS.white, fontSize: 18 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.yellow, marginRight: 8 },
  logoText: { fontWeight: '700', letterSpacing: 1, color: COLORS.dark },
  avatar: { backgroundColor: COLORS.green, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: COLORS.white, fontWeight: '700' },
  content: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  sectionLabel: { fontSize: 12, color: COLORS.gray, marginBottom: 8 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  changeButton: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 16,
  },
  changeButtonText: { color: COLORS.white, fontWeight: '600' },
  removeButton: {
    borderWidth: 1,
    borderColor: '#c7c7c7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  removeButtonText: { color: COLORS.dark, fontWeight: '600' },
  label: { fontSize: 13, color: COLORS.dark, marginTop: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  notificationsTitle: { fontWeight: '700', fontSize: 16, marginTop: 24, marginBottom: 12 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: { backgroundColor: COLORS.green },
  checkmark: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  checkboxLabel: { fontSize: 14, color: COLORS.dark },
  logoutButton: {
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  logoutText: { fontWeight: '700', color: COLORS.dark, fontSize: 16 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  discardButton: {
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  discardText: { color: COLORS.dark, fontWeight: '600' },
  saveButton: {
    backgroundColor: COLORS.green,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  saveText: { color: COLORS.white, fontWeight: '600' },
});
