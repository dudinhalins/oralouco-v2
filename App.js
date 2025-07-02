import { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

export default function App() {
  const [previsao, setPrevisao] = useState(null);
  const [dissolvendo, setDissolvendo] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const girar = async () => {
    setPrevisao(null);
    setDissolvendo(false);
    fadeAnim.setValue(0);

    try {
      const res = await fetch('https://oralouco-api.onrender.com/api/previsao');
      const data = await res.json();
      setPrevisao(data);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setDissolvendo(true);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => setPrevisao(null));
      }, 5000); // tempo visível da profecia
    } catch (err) {
      console.error('Erro ao buscar profecia:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Oralouco 👁️</Text>

      <Pressable onPress={girar} style={styles.botao}>
        <Text style={styles.botaoTexto}>Girar o Inexplicável</Text>
      </Pressable>

      {previsao && (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.categoria}>{previsao.categoria}</Text>
          {previsao.intro && <Text style={styles.intro}>{previsao.intro}</Text>}
          <Text style={styles.texto}>{previsao.texto}</Text>
        </Animated.View>
      )}

      {dissolvendo && <Text style={styles.legenda}>A profecia retornou ao éter 🫧</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 32, color: '#f2f2f2', textAlign: 'center', marginBottom: 36, fontWeight: '600' },
  botao: {
    backgroundColor: '#8839ef',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    alignSelf: 'center',
    marginBottom: 32,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: '#1f1f1f',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    elevation: 5,
  },
  categoria: {
    color: '#ffcc66',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  intro: { fontStyle: 'italic', color: '#ccc', marginBottom: 10 },
  texto: { color: '#f2f2f2', fontSize: 18, lineHeight: 24 },
  legenda: { textAlign: 'center', marginTop: 20, color: '#888' },
});
