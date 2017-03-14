'use strict'

const Database = use('Database')

const Produto = use('App/Model/Produto')

const error = {
    error : 'error',
    message : "Houve um erro interno, confira os tipos de dados passados"
};

const success = {
    success : "success"
}

class ProdutoController {
    
    
    
    * getProdutos (request , response) {
        const id = request.param("id", null)
        try{
            if(id !== null && id.trim()){
                response.json(yield Produto.findBy("id_product", id))
            }
            var produtos = yield Produto.all()
            response.json(produtos)
        }catch(e){
            response.json(error)
        }
    }

    * storeProduto (request , response) {
        const data = request.all()
        try {
            const produto = yield Produto.create(data)
            return response.json(success)
        } catch(e){
            return response.json(error)
        }
    }
    
    * updateProduto (request , response) {
        const id = request.param("id", null)

        const data = request.all()

        if(id === null || !id.trim()){
            return response.json({
                error : "error",
                message : "parametro 'id' necessário"
            })
        }

        try {
            const affectedRows = yield Database
            .table('produtos')
            .where('id_product', id)
            .update(data)
            
            const produto = yield Produto.findBy("id_product", id)

            return response.json(success)

        } catch(e){
            return response.json(error)
        }

    }

    * deleteProduto (request, response){
        const id = request.param("id", null)
        if(id === null || !id.trim()){
            response.json({
                error : "error",
                message : "parâmetro 'id' necessário"
            })
        }
        try{
            const affectedRows = yield Database
            .table('produtos')
            .where('id_product', id)
            .delete()

            response.json({success : "success"})
        }catch(e){
            response.json({error : "error"})
        }
    }

    * getProdutosByFiltro(request, response){
        const nome = request.input("product_name", null)
        let produtos = []
        let byNome = null
        if(nome === null || !nome.trim()){
            response.json({
                error : "error",
                message : "parâmetro 'product_name' necessário"
            })
        }
        try{

            if(nome !== null && nome.trim()){
                byNome = yield Produto.query().where('product_name', 'like', "%"+nome+"%")
                
                produtos.push(byNome)
            }
            response.json(produtos)
         }catch(e){
            response.json(error)
        }

    }
    
}

module.exports = ProdutoController