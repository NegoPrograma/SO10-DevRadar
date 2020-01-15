const { Router } = require('express');
/*declaração de uma variável com chaves
é o equivalente a:
  const {var} = object; <=> const var = object.var;
    
  significa que o que está do lado a direita da atribuição
  possui um parâmetro de nome igual ao da variável em cháves.

  */

//aqui, estamos definindo quem lida com as rotas de requisição.  
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

routes.get('/devs',DevController.index);
routes.post("/devs",DevController.store);


routes.get('/search',SearchController.index);

module.exports = routes;