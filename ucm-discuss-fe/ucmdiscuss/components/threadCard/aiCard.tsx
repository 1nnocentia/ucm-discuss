import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type AIVariant = 'post' | 'comment' | 'reply' | 'onCreate';

interface AICardProps {
    variant: AIVariant;
    style?: StyleProp<ViewStyle>;
    question?: string | null;
    answer?: string | null;
    full?: boolean;
}

export default function AICard({ variant, style, question, answer, full = false }: AICardProps) {
    const { theme } = useTheme();
    
    const getVariantConfig = (variant: AIVariant) => {
        switch (variant) {
            case 'post':
                return {
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    fontSize: 12,
                    iconSize: 16,
                    borderRadius: 8,
                };
            case 'comment':
                return {
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    fontSize: 11,
                    iconSize: 14,
                    borderRadius: 6,
                };
            case 'reply':
                return {
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    fontSize: 10,
                    iconSize: 12,
                    borderRadius: 4,
                };
            case 'onCreate':
                return {
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    fontSize: 12,
                    iconSize: 16,
                    borderRadius: 8,
                };
        }
    }

    const config = getVariantConfig(variant);

    return (
        <View style={[
            styles.boxContainer,
            {
                backgroundColor: theme.colors.primary + '22',
                borderColor: theme.colors.primary + '33',
                borderRadius: config.borderRadius,
                padding: config.paddingVertical * 1.5,
            },
            style
        ]}>
            <View style={[
                styles.container,
                {
                    backgroundColor: theme.colors.primary + '11', 
                    
                    borderColor: theme.colors.primary + '44',
                    borderRadius: config.borderRadius,
                    paddingVertical: config.paddingVertical,
                    paddingHorizontal: config.paddingHorizontal,
                    
                    // shadowColor: theme.colors.primary,
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.3,
                    // shadowRadius: 4,
                    
                    // elevation: 3,
                },
                // style
            ]}>
                <Ionicons 
                     name="sparkles"
                    size={config.iconSize} 
                    color={theme.colors.primary} 
                    style={styles.icon} 
                />
                <Text style={[
                    styles.text, 
                    { 
                        color: theme.colors.primary, 
                        fontSize: config.fontSize,
                        fontFamily: theme.fonts.montserrat 
                    }
                ]}>
                    AI Generated
                </Text>
            </View>
            {(question || answer) && (
                    <View style={styles.qaContainer}>
                        {question ? (
                            <Text 
                                style={[styles.questionText, { color: theme.colors.textPrimary, fontFamily: theme.fonts.openSans }]} 
                                numberOfLines={full ? undefined : 2}
                            >
                                Q: {question}
                            </Text>
                        ) : null}
                        {answer ? (
                            <Text 
                                style={[styles.answerText, { color: theme.colors.textSecondary, fontFamily: theme.fonts.openSans }]} 
                                numberOfLines={full ? undefined : 2}
                            >
                                A: {answer}
                            </Text>
                        ) : null}
                    </View>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: 'column',
        // alignSelf: 'flex-start',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderWidth: 1,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        fontWeight: 'bold',
    }
    ,
    qaContainer: {
        marginLeft: 8,
        marginTop: 6,
        maxWidth: 420,
    },
    questionText: {
        fontSize: 13,
        fontWeight: '600',
    },
    answerText: {
        fontSize: 13,
        marginTop: 2,
    }
})