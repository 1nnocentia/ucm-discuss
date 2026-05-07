import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface ContributionModalProps {
  isVisible: boolean;
  onClose: () => void;
  post_count: number;
  comment_count: number;
}

export const ContributionModal = ({ isVisible, onClose, post_count, comment_count }: ContributionModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
              Contributions
            </Text>
            <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: theme.colors.textSecondary + '22' }]}>
              <Ionicons name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* <Text style={[styles.subTitle, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
            Total posts and comments
          </Text> */}

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>{post_count}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>Post</Text>
            </View>
            <View style={[styles.verticalDivider, { backgroundColor: theme.colors.textSecondary + '33' }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>{comment_count}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>Comment</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={18} color={theme.colors.textSecondary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
              Updates every 24 hours
            </Text>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
},
  modalContainer: { 
    width: '100%', 
    borderRadius: 24, 
    padding: 24 
},
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 24 
},
  title: { 
    fontSize: 20, 
    fontWeight: 'bold' 
},
  closeBtn: { 
    padding: 6, 
    borderRadius: 20 
},
  subTitle: { 
    fontSize: 16, 
    marginBottom: 24 
},
  statsGrid: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 32 
},
  statItem: { 
    flex: 1,
    alignItems: 'center'
},
  statValue: { 
    fontSize: 22, 
    fontWeight: 'bold' 
},
  statLabel: { 
    fontSize: 14 
},
  verticalDivider: { 
    width: 1, 
    height: 40,
    marginHorizontal: 20 
},
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
},
  infoText: { 
    fontSize: 12
}
});