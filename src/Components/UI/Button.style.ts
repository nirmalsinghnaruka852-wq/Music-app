import { useThemeStore } from '../../Stores/Theme';
import { ColorVariant, Variant } from '../../Stores/Theme/types';

export type ButtonVariantStyle = {
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
  contentColor: string;
};


export function useButtonVariant(variant: Variant, colour: ColorVariant) {
  const { bg, rgb, text } = useThemeStore(s => s.colors[colour]);
  const softBg = `rgba(${rgb.bg.join(',')}, 0.15)`;
  return {
    'solid': {
      backgroundColor: bg,
      borderWidth: 0,
      borderColor: 'transparent',
      contentColor: text,
    },
    'outlined': {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: bg,
      contentColor: bg,
    },
    'text': {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
      contentColor: bg,
    },
    'soft': {
      backgroundColor: softBg,
      borderWidth: 0,
      borderColor: 'transparent',
      contentColor: bg,
    },
    'soft-outlined': {
      backgroundColor: softBg,
      borderWidth: 1,
      borderColor: bg,
      contentColor: bg,
    },
  }[variant];
}
