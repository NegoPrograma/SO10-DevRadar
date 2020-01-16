import React, {useState,useEffect} from 'react';



function DevForm({onSubmit}){


  async function handleSubmit(e){
      e.preventDefault();
      await onSubmit({
          github_username,
          techs,
          latitude,
          longitude
      });
      setGithubUsername('');
      setTechs('');
  }
  const [techs,setTechs] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
    
  //pegando a latitude e longitude automaticamente pelo api do navegador
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

  
  return(

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
    )
}

export default DevForm;