import React from 'react';
import { Pressable, Switch } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import styles from '../stylesheets/ThemeSwitcherStylesheet';
import { ThemedText } from './themed-text';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.container, 
        { 
          transform: [{ scale: pressed ? 0.95 : 1 }],
        }
      ]}
    >
      <ThemedText style={{
        color: theme === 'dark' ? 'white' : 'black',
        ...styles.text}}>
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </ThemedText>

      <Switch
        value={theme === 'dark'}
        onValueChange={toggleTheme}
        thumbColor={theme === 'dark' ? 'white' : 'black'}
        trackColor={{
          false: theme === 'dark' ? '#444' : '#ccc',
          true: theme === 'dark' ? '#6b8eff' : '#81b0ff',
        }}
        style={styles.switch}
      />
    </Pressable>
  );
};

export default ThemeSwitcher;
