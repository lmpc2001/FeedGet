import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props {
    screenshot: string | null;
    onTakeShot: () => void;
    onRemoveShot: () => void
}

export function ScreenShotButton({ screenshot, onRemoveShot, onTakeShot }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={screenshot ? onRemoveShot : onTakeShot}>

            {screenshot ?
                <View >
                    <Image source={{uri: screenshot}} style={styles.image} />
                    <Trash weight='fill' size={22} color={theme.colors.text_secondary} style={styles.removeIcon} />
                </View> :
                <Camera weight='bold' size={24} color={theme.colors.text_secondary} />}

        </TouchableOpacity>
    );
}