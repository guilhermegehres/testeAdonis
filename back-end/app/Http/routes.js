'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/teste', function (request, response) {
    response.sendView('teste')
});
Route.get('/produto/:id?', "ProdutoController.getProdutos");
Route.post('/produto/filtro', "ProdutoController.getProdutosByFiltro");
Route.post('/produto', "ProdutoController.storeProduto");
Route.put('/produto/:id?', "ProdutoController.updateProduto");
Route.delete('/produto/:id?', "ProdutoController.deleteProduto");
