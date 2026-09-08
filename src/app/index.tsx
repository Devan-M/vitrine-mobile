import { router } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
      <View style={styles.topBackground} />

      {/* Frame 7 */}
      <View style={styles.formContainer}>
        <View style={styles.content}>
          <Text style={styles.welcomeTitle}>
            Bem-vindo de volta!
          </Text>

          <Text style={styles.subtitle}>
            Insira seus dados para entrar na sua conta.
          </Text>

          {/* Frame 2 */}
          <View style={styles.formContainerBox}>

            {/* Frame 4 */}
            <View style={styles.formFields}>

              {/* Usuário */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>
                  Usuário
                </Text>

                <TextInput
                  style={styles.input}
                  value={usuario}
                  onChangeText={setUsuario}
                />
              </View>

              {/* Senha */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>
                  Senha
                </Text>

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                  />

                  {/* Botão olho será colocado aqui */}
                </View>
              </View>

              {erro ? (
                <Text style={styles.error}>
                  {erro}
                </Text>
              ) : null}

              {/* Botão Entrar */}
              <Button
                title="Entrar"
                onPress={handleLogin}
              />

            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  formContainer: {
    padding: 24,
    marginHorizontal: 24,
    marginTop: '30%',
  },

  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#2567E8',
  },

  content: {
    gap: 16,
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  error: {
    color: 'red',
    textAlign: 'center',
  },

  formContainerBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 16,
    paddingTop: 50,
    paddingRight: 24,
    paddingBottom: 50,
    paddingLeft: 24,
  },

  formFields: {
    width: '100%',
    flexDirection: 'column',
  },

  fieldGroup: {
    width: '100%',
  },

  fieldLabel: {
    fontSize: 16,
  },

  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});