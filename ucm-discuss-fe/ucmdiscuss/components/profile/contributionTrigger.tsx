import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ContributionModal } from './contributionModal';

interface Props {
  postCount: number;
  commentCount: number;
}

export const ContributionTrigger = ({ postCount, commentCount }: Props) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalContributions = postCount + commentCount;

  return (
    <>
      <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.statBox} 
        onPress={() => setIsModalOpen(true)}
      >
        <Text style={[styles.statValue, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
          {totalContributions}
        </Text>
        <View style={styles.labelRow}>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
            Contributions
          </Text>
          <Text style={{ color: theme.colors.secondary, fontSize: 12 }}>{'>'}</Text>
        </View>
      </TouchableOpacity>

      <ContributionModal 
        isVisible={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        postCount={postCount}
        commentCount={commentCount}
      />
    </>
  );
};

const styles = StyleSheet.create({
  statBox: { 
    flex: 1, 
    alignItems: 'center' 
},
  statValue: { 
    fontSize: 16, 
    fontWeight: 'bold' 
},
  statLabel: { 
    fontSize: 10, 
    marginTop: 2 
},
  labelRow: { 
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 4 
}
});