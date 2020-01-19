import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    /*<View style={styles.container}>
      <Text style={styles.title}>Desenvolvimento obile!!</Text>
    </View>*/
    <>
    <StatusBar barStyle='light-content' backgroundColor='#7d40e7'/>
    <Routes />
    </>
  );
}
/*

Apesar de usarmos CSS, no react-native existem umas diferenças,
1-as propriedades com hífen são substituidas com camelCase,
2-no fim das propriedades usamos , e não ;, análogo a um objeto JSON
3-não existe herança direta de CSS, logo todo componente deve receber individualmente um sub-objeto da tag style:

em outras palavras, todo a estilização deve ser um atributo do tipo JSON, vide exemplo abaixo

4- os componentes só recebem a diferença em estilos com a tag style


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFF'
  },
});

*/
