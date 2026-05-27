import React, { useState } from 'react';
import { Image, TouchableOpacity, ImageStyle, StyleProp, ImageResizeMode } from 'react-native';
import ImageView from 'react-native-image-viewing';

interface ZoomableImageProps {
    uri: string;
    style?: StyleProp<ImageStyle>;
    resizeMode?: ImageResizeMode;
}

export default function ZoomableImage({ uri, style, resizeMode = 'cover' }: ZoomableImageProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => setIsVisible(true)}
            >
                <Image 
                    source={{ uri }} 
                    style={style} 
                    resizeMode={resizeMode}
                />
            </TouchableOpacity>

            <ImageView
                images={[{ uri }]}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
                swipeToCloseEnabled={true}
                doubleTapToZoomEnabled={true}
            />
        </>
    );
}