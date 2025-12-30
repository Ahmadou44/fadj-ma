/// <reference types="nativewind/types" />

import 'react-native';
// We need to import the module to augment it
import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';

declare module 'react-native' {
    interface ViewProps {
        className?: string;
    }
    interface TextProps {
        className?: string;
    }
    interface ImageProps {
        className?: string;
    }
    interface TouchableOpacityProps {
        className?: string;
    }
    interface ScrollViewProps {
        className?: string;
    }
    interface TextInputProps {
        className?: string;
    }
}

declare module 'react-native-safe-area-context' {
    interface NativeSafeAreaViewProps {
        className?: string;
    }
}
