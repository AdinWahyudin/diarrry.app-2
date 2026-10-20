import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

// Import Gambar Lokal dari Tugas 2
import happyMood from '../../assets/moods/happy.png';
import avatarImg from '../../assets/avatar.png';

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi dan jalan santai...',
    body: 'Hari ini aku bangun lebih pagi jam 05.00 dan berjalan kaki 20 menit di sekitar kompleks. Udara terasa sejuk dan pikiran menjadi lebih jernih untuk memulai hari.',
    moodUri: happyMood,
    isLocal: true,
    moodType: 'happy',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum...',
    body: 'Menyelesaikan modul praktikum Mobile Programming di lab kampus, lalu berdiskusi dengan tim mengenai penyusunan tugas kelompok. Banyak insight baru!',
    moodUri: 'https://picsum.photos/seed/focus/200',
    isLocal: false,
    moodType: 'focus',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Membaca buku di sore hari...',
    body: 'Menikmati senja di taman kota sambil membaca buku favorit. Warna langit senja sangat indah dan membawa kedamaian.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    isLocal: false,
    moodType: 'calm',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: 4,
    title: 'Eksplorasi React Native',
    date: '2025-10-03',
    preview: 'Belajar layouting Flexbox dan FlatList...',
    body: 'Mencoba membuat layout responsif menggunakan FlatList dan hook useWindowDimensions. Aplikasi berhasil berpindah dari 1 kolom ke 2 kolom secara dinamis.',
    moodUri: 'https://picsum.photos/seed/excited/200',
    isLocal: false,
    moodType: 'excited',
    heroUri: 'https://picsum.photos/seed/excitedhero/800/450',
  },
  {
    id: 5,
    title: 'Akhir Pekan Santai',
    date: '2025-10-02',
    preview: 'Kumpul santai di kedai kopi...',
    body: 'Menghabiskan waktu akhir pekan dengan teman-teman di kedai kopi favorit. Mengobrol tentang banyak hal seru dan melepas penat.',
    moodUri: 'https://picsum.photos/seed/tired/200',
    isLocal: false,
    moodType: 'tired',
    heroUri: 'https://picsum.photos/seed/tiredhero/800/450',
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        isLocal={item.isLocal}
        moodType={item.moodType}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header dengan Avatar Pengguna (Mempertahankan Fitur Tugas 2) */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greeting}>Selamat Datang,</Text>
          <Text style={styles.header}>Buku Harian</Text>
        </View>
        <Image source={avatarImg} style={styles.avatar} />
      </View>

      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          paddingHorizontal: SPACE.l,
          paddingBottom: SPACE.l,
          gap: SPACE.m,
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: SPACE.m,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.muted,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemWrap: { 
    flex: 1 
  },
  itemWrap2: { 
    flex: 0.5 
  },
  empty: { 
    textAlign: 'center', 
    color: COLORS.muted, 
    marginTop: 40 
  },
});
