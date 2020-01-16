import React, { useState, useEffect } from 'react';
import api from './services/api';
//no React, tudo que vc importa é  pelo JS., seja css ou imagens
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem/';
import DevForm from './components/DevForm';
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




  /*é assim que se importa um sub-componente.
    <>
    <Header title="Dashboard"/>
    <Header title="titulo 2"/>
    <Header title="titulo 3"/>
    //colocamos um event listener em react dessa maneira:
    </>*/


  /*
  como fazer a alteração no DOM usando JS pelo react?
  criamos as funções dentro do próprio componente
  

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
  
  <>
    <h1>Counter: {counter}</h1>
    

    <button onClick={incrementCounter}>Incrementar</button>
    </>
*/

/*

<aside> é a tag semântica para side bar


vide que JS e html dividem algumas palavras, existem algumas alterações no react, vide abaixo:
htmlFor - for
className - class

*/    


function App() {

  const [devs, setDevs] = useState([]);
  //useEffect(() =>{} ,[])
  
  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  },[]);


  async function handleDev(data){
    const response =await api.post('/devs',data);
    setDevs([...devs,response.data]);
    
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleDev} />
      </aside>
      <main>
        <ul>
         {devs.map((dev) =>(     
           //o Key veio pro componente pq ele precisa vir pra
           //primeira linha dentro da função map.    
           <DevItem key={dev._id} dev={dev}/>
        ))}
        </ul>

      </main>

    </div>

  );
}

export default App;
