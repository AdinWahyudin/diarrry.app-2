import React from 'react';
import { Modal, View, Text, Image, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;

  const { title, date, body, heroUri, moodUri, isLocal } = entry;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      onRequestClose={onClose}
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image 
            source={isLocal ? moodUri : { uri: heroUri || moodUri }} 
            style={[
              styles.hero,
              // Jika landscape, tinggi gambar dibatasi maksimal 40% dari tinggi layar
              isLandscape && { aspectRatio: undefined, height: height * 0.4 }
            ]} 
          />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.body}>{body}</Text>
            <Pressable 
              onPress={onClose} 
              style={styles.button}
              accessible={true}
              accessibilityLabel="Tutup Modal Detail"
            >
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.surface 
  },
  scrollContent: {
    paddingBottom: SPACE.xl,
  },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9, // Rasio normal untuk portrait
    backgroundColor: '#DDDDDD',
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: { 
    padding: SPACE.l, 
    gap: SPACE.s 
  },
  title: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: COLORS.text 
  },
  date: { 
    fontSize: TYPO.caption, 
    color: COLORS.muted, 
    marginBottom: SPACE.s 
  },
  body: { 
    fontSize: TYPO.body, 
    color: COLORS.text, 
    lineHeight: 20 
  },
  button: {
    marginTop: SPACE.l, 
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent, 
    alignItems: 'center',
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontWeight: '700' 
  },
});