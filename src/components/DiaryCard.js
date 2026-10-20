import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryCard({
  title, date, preview, moodUri, isLocal, moodType, onPress, variant = 'list'
}) {
  // Menentukan warna border dinamis berdasarkan mood (Fitur Tugas 2)
  const getBorderColor = () => {
    switch (moodType) {
      case 'happy':
        return '#10B981'; // Hijau
      case 'focus':
        return '#3B82F6'; // Biru
      case 'calm':
        return '#8B5CF6'; // Ungu
      case 'excited':
        return '#F59E0B'; // Oranye
      case 'tired':
        return '#6B7280'; // Abu-abu
      default:
        return COLORS.border;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#E5E7EB' }}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      accessible={true}
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
    >
      <View style={[
        styles.card, 
        { borderColor: getBorderColor() }, 
        variant === 'grid' && styles.cardGrid
      ]}>
        <Image 
          source={isLocal ? moodUri : { uri: moodUri }} 
          style={styles.mood} 
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 2, // Border tebal agar variasi warna terlihat jelas
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  cardGrid: {
    flexDirection: 'column',
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: '#EEF2FF',
  },
  content: { 
    flex: 1 
  },
  title: { 
    fontSize: TYPO.title, 
    fontWeight: '700', 
    color: COLORS.text 
  },
  date: { 
    fontSize: TYPO.caption, 
    color: COLORS.muted, 
    marginBottom: SPACE.xs 
  },
  preview: { 
    fontSize: TYPO.body, 
    color: COLORS.text 
  },
});
