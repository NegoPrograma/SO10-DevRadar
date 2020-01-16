import React, { useState, useEffect } from 'react';
import api from './services/api';
//no React, tudo que vc importa é  pelo JS., seja css ou imagens
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
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
  const [techs,setTechs] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  //useEffect(() =>{} ,[])
  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(
    (position)=>{
      const {latitude, longitude} = position.coords;
      
      setLatitude(latitude);
      setLongitude(longitude);

    },(err)=>{
      console.log(err);
    },{
      timeout: 30000,
    }
    )
  } ,[]);

  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  },[]);


  async function handleSubmit(e){
    e.preventDefault();
    const response =await api.post('/devs',{
      github_username,
      techs,
      latitude,
      longitude,
    })
    console.log(response);
    setGithubUsername('');
    setTechs('');

    //adicionando um array pela imutabilidade
    setDevs([...devs,response.data]);
    
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmit}>
      <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input name="github_username" 
          id="github_username"
           required
           value={github_username}
           onChange={ e => setGithubUsername(e.target.value)}
           ></input>
          </div>
      <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" required
          value={techs}
          onChange={ e => setTechs(e.target.value)}
          ></input>
      </div>
      <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
            type="number" 
            name="latitude" 
            id="latitude" 
            required 
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            ></input>
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input type="number" name="longitude" id="longitude" required value={longitude}
            onChange={e => setLongitude(e.target.value)}
            ></input>
          </div>
      </div>

      <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
         {devs.map((dev) =>(         
           <li key={dev._id} className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name}/>
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span> {dev.techs.join(',')}</span>
              </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
          </li>
        ))}
        </ul>

      </main>

    </div>

  );
}

export default App;
