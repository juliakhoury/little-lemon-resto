import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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

const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'];

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Greek Salad',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago...',
    price: '$12.99',
    initials: 'GS',
  },
  {
    id: '2',
    name: 'Brushetta',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garli...',
    price: '$7.99',
    initials: 'BR',
  },
  {
    id: '3',
    name: 'Grilled Fish',
    description:
      'Barbequed catch of the day, with red onion, crisp capers, chive creme fraiche.',
    price: '$20.00',
    initials: 'GF',
  },
  {
    id: '4',
    name: 'Pasta',
    description:
      'Penne with fried aubergines, tomato sauce, fresh chilli, garlic, basil & salted...',
    price: '$18.99',
    initials: 'PA',
  },
  {
    id: '5',
    name: 'Lemon Dessert',
    description:
      'Light and fluffy traditional homemade Italian Lemon and ricotta cake.',
    price: '$6.99',
    initials: 'LD',
  },
];

function Avatar({ initials, size = 40, onPress }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      onPress={onPress}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>{initials}</Text>
    </Wrapper>
  );
}

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const initials = user?.firstName ? user.firstName.slice(0, 2).toUpperCase() : 'LL';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoDot} />
          <Text style={styles.logoText}>LITTLE LEMON</Text>
        </View>
        {/* Tapping the avatar is the only entry point into the Profile screen,
            matching the flow you chose (Home -> Profile via avatar tap). */}
        <Avatar initials={initials} onPress={() => navigation.navigate('Profile')} />
      </View>

      <ScrollView>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <View style={styles.heroRow}>
            <Text style={styles.heroBody}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
            <View style={styles.heroImagePlaceholder}>
              <Text style={styles.heroImageEmoji}>🍽️</Text>
            </View>
          </View>
          <View style={styles.searchIcon}>
            <Text>🔍</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.deliveryTitle}>ORDER FOR DELIVERY!</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat} style={styles.pill}>
                <Text style={styles.pillText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {MENU_ITEMS.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <View style={styles.itemImagePlaceholder}>
                <Text style={styles.itemImageText}>{item.initials}</Text>
              </View>
            </View>
          ))}
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
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.yellow, marginRight: 8 },
  logoText: { fontWeight: '700', letterSpacing: 1, color: COLORS.dark },
  avatar: { backgroundColor: COLORS.green, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: COLORS.white, fontWeight: '700' },
  hero: { backgroundColor: COLORS.green, padding: 20 },
  heroTitle: { color: COLORS.yellow, fontSize: 32, fontWeight: '700' },
  heroSubtitle: { color: COLORS.white, fontSize: 20, marginBottom: 8 },
  heroRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  heroBody: { color: COLORS.white, fontSize: 13, lineHeight: 18, flex: 1, marginRight: 12 },
  heroImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#3d4f47',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImageEmoji: { fontSize: 36 },
  searchIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  menuSection: { padding: 16 },
  deliveryTitle: { fontWeight: '700', fontSize: 16, marginBottom: 12 },
  pillRow: { marginBottom: 12 },
  pill: {
    backgroundColor: COLORS.offWhite,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 10,
  },
  pillText: { fontWeight: '600', color: COLORS.dark },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  itemDesc: { color: COLORS.gray, fontSize: 13, marginBottom: 6, maxWidth: 240 },
  itemPrice: { color: COLORS.gray, fontWeight: '600' },
  itemImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: COLORS.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  itemImageText: { fontWeight: '700', color: COLORS.green },
});
