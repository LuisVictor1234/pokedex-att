import { StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  text: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
  },
  neonBorder: {
    borderColor: theme.colors.neon,
    borderWidth: 1.5,
    shadowColor: theme.colors.neon,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});
