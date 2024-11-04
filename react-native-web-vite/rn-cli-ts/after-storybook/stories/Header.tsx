import { Button } from './Button';
import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react';

export type HeaderProps = {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
};

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
}: HeaderProps) => (
  <View>
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Text style={styles.h1}>Acme</Text>
      </View>
      <View style={styles.buttonContainer}>
        {user ? (
          <Button
            style={styles.button}
            size='small'
            onPress={onLogout}
            label='Log out'
          />
        ) : (
          <>
            <Button
              style={styles.button}
              size='small'
              onPress={onLogin}
              label='Log in'
            />
            <Button
              style={styles.button}
              primary
              size='small'
              onPress={onCreateAccount}
              label='Sign up'
            />
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  h1: {
    fontWeight: '900',
    fontSize: 20,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 10,
    color: 'black',
    alignSelf: 'flex-start',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
