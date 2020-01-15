import React, { useState } from 'react';
import Header from './Header';
/*
Exemplo de JSX.


Os 3 conceitos principais do React:

//Componente:

O mais importante, componentes são funções JS que retornam o
html,css e JS isolados e integrados, como por exemplo posts do facebook.

O desenvolvimento em React é orientado a blocos que contém diversos componentes.
Todos os blocos são independentes de uns dos outros

OBS: Não se pode colocar componentes um atrás do outro sem encapsular eles numa tag
seja ela uma div ou o componente especial fragment ( tags vazias que não quebram a estilização: <></>)


//Estado: Informações mantidas pelo componente por meio de imutabilidade


// Propriedade:

Assim como HTML, vc pode colocar atributos nas tags de componentes, como por exemplo:

< App title="Dashboard" />



*/




function App() {


  /*
  como fazer a alteração no DOM usando JS pelo react?
  criamos as funções dentro do próprio componente
  */

  //useState é uma função modular do  React que retorna 2 valores
  //um deles é uma variavel e a outra é uma função que faz algo meio específico
  //o que ela faz é sempre setar o valor da váriavel que retornou com ele
  //a variavel que foi retornada é imutável por meios comuns
  //análogo a um Get/Set de java, considere a variável como private e que
  // vc altera ela com a função que foi retornada junto com ela
  const [counter, setCounter] = useState(0);

  function incrementCounter(){
    setCounter(counter + 1);
  }

  return (
    /*é assim que se importa um sub-componente.
    <>
    <Header title="Dashboard"/>
    <Header title="titulo 2"/>
    <Header title="titulo 3"/>
    //colocamos um event listener em react dessa maneira:
    </>*/
    <>
    <h1>Counter: {counter}</h1>
    

    <button onClick={incrementCounter}>Incrementar</button>
    </>

  );
}

export default App;
