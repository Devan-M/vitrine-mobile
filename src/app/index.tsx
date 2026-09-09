import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleLogin() {
    if (!usuario || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    setErro('');

    router.push('/products');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Frame 1 */}
      <View style={styles.frame1} />

      {/* Frame 7 */}
      <View style={styles.frame7}>
        {/* Bem-vindo */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>
            Bem-vindo de volta!
          </Text>

          <Text style={styles.subtitle}>
            Insira seus dados para entrar na sua conta.
          </Text>
        </View>

        {/* Frame 2 */}
        <View style={styles.frame2}>
          {/* Frame 4 */}
          <View style={styles.frame4}>
            {/* FormControl Usuário */}
            <View style={styles.formControl}>
              <Text style={styles.fieldLabel}>
                Usuário
              </Text>

              <TextInput
                style={styles.input}
                value={usuario}
                onChangeText={setUsuario}
                placeholder=""
              />
            </View>

            {/* FormControl Senha */}
            <View style={styles.formControl}>
              <Text style={styles.fieldLabel}>
                Senha
              </Text>

              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholder=""
              />
            </View>

            {/* Mensagem de erro */}
            {erro ? (
              <Text style={styles.error}>
                {erro}
              </Text>
            ) : null}

            {/* Botão Entrar */}
            <Pressable
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>
                Entrar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* Tela Login Vazio */
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Frame 1 */
  frame1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 426,
    backgroundColor: '#2567E8',
  },

  /* Frame 7 */
  frame7: {
    position: 'absolute',
    top: 220,
    left: 29,
    width: 334,
    gap: 32,
  },

  /* Bem-vindo */
  welcome: {
    width: '100%',
    gap: 16,
  },

  welcomeTitle: {
    width: '100%',
    height: 39,
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: 'center',
  },

  subtitle: {
    width: '100%',
    height: 19,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
  },

  /* Frame 2 */
  frame2: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 16,

    paddingTop: 50,
    paddingRight: 24,
    paddingBottom: 50,
    paddingLeft: 24,
  },

  /* Frame 4 */
  frame4: {
    width: '100%',
    gap: 24,
  },

  /* FormControl */
  formControl: {
    width: '100%',
    gap: 6,
  },

  /* Label */
  fieldLabel: {
    color: '#262627',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14,
    letterSpacing: 0,
  },

  /* Input */
  input: {
    width: '100%',
    height: 39,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    paddingHorizontal: 12,
  },

  /* Mensagem de erro */
  error: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 14,
  },

  /* Botão Entrar */
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#2567E8',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});