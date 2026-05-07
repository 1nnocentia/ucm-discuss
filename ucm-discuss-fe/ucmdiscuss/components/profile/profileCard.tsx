// src/components/profile/ProfileCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ProfileCardData } from '@/models/user';
import { ProfileChip } from './profileChip';

export const ProfileCard = ({ user }: { user: ProfileCardData }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header Image */}
            <Image 
                source={{ uri: user.headerImage || require('@/assets/profile/header.jpg') }} 
                style={styles.headerImg} 
            />

            <View style={styles.content}>
                {/* Name & Edit Chip */}
                <View style={styles.row}>
                    <Text style={[styles.name, { color: theme.colors.textPrimary, fontFamily: theme.fonts.montserrat }]}>
                        {user.name}
                    </Text>
                    <TouchableOpacity style={[styles.editChip, { borderColor: theme.colors.textSecondary }]}>
                        <Text style={[styles.editText, { color: theme.colors.textPrimary }]}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {/* NIM */}
                <Text style={[styles.nim, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]}>
                    {user.nim}
                </Text>

                {/* Academic Chips */}
                <View style={styles.chipRow}>
                    <ProfileChip label={user.major} />
                    <ProfileChip label={user.faculty} />
                </View>

                {/* Contribution Stats */}
                <View style={[styles.statsRow, { borderTopColor: theme.colors.textSecondary + '33' }]}>
                    <View style={styles.statBox}>
                        <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>{user.postCount}</Text>
                        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Posts</Text>
                    </View>
                    <View style={[styles.divider, { backgroundColor: theme.colors.textSecondary + '33' }]} />
                    <View style={styles.statBox}>
                        <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>{user.commentCount}</Text>
                        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Contributions</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        width: '100%' 
    },
    headerImg: { 
        width: '100%', 
        height: 150, 
        resizeMode: 'cover' 
    },
    content: { 
        padding: 16 
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },
    name: { 
        fontSize: 22, 
        fontWeight: 'bold' 
    },
    editChip: { 
        paddingHorizontal: 12, 
        paddingVertical: 4, 
        borderRadius: 20, 
        borderWidth: 1 
    },
    editText: { 
        fontSize: 12, 
        fontWeight: '600' 
    },
    nim: { 
        fontSize: 14, 
        marginTop: 4 
    },
    chipRow: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginBottom: 16 },
    statsRow: { 
        flexDirection: 'row', 
        paddingTop: 16, 
        borderTopWidth: 1, 
        marginTop: 8 
    },
    statBox: { 
        flex: 1, 
        alignItems: 'center' 
    },
    statValue: { 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    statLabel: { 
        fontSize: 12, 
        marginTop: 2 
    },
    divider: { 
        width: 1, 
        height: '80%', 
        alignSelf: 'center' 
    }
});