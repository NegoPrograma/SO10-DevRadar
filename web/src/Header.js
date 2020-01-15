//criando um componente novo:
/*
As regras de uso dizem que vc deve por apenas um componente por arquivo.

*/

import React from 'react';

//caso você queira passar atributos HTML como parâmetros
//usa-se o parâmetro props e se acessa ele por chaves
function Header(props){
    return <h1>{props.title}</h1>
  }

  //análogo ao module.exports, vc pode exportar a função diretamente ou desse jeito abaixo:
  export default Header;


  /*
  
  outra maneira seria na declaração do componente:

  export function header(){
      return(JSX);
  }

  */