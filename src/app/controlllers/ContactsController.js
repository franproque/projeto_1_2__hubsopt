const hubspot = require('../services/hubspotConnect')
class ContactsController {


    static async getAllContacts(req, res) {
        try {
            var busca = await hubspot.crm.contacts.basicApi.getPage()
            if (busca.body.results.length != 0) {
                res.status(200)
                res.json(busca.body.results);
            } else {
                res.status(406)
                res.json({resposta:"Não foi encontrado nem um contact"});
            }
        } catch (error) {
            res.status(500)
            res.json({ resposta: "Ocorreu erro interno do servidor!!!" })
        }
       
    }

    static async getOneContact(req, res) {
        try{
        const filter = { propertyName: 'email',operator:'EQ', value: req.params.busca }
        const filterGroup = { filters: [filter] }     
        const properties = ['firstname', 'lastname','createdate','city','phone','email']
        const limit = 1
        const publicObjectSearchRequest = {
        filterGroups: [filterGroup],
           /*sorts: [sort],*/
           properties,
            limit,
           
        }

        const result = await hubspot.crm.contacts.searchApi.doSearch(publicObjectSearchRequest)
        if(result.body.total>0){
            res.status(200)
            res.send(result.body.results)
        }else{
            res.status(406)
            res.json({resposta:"Não foi encontrado nada com o email passado"});
        }
       

    }catch(err){
        res.status(500).json({erro:"Ocorreu erro interno no servidor"})
    }
    }
        
    static async createContacts(req, res) {
       
        try{   
        if (req.body != undefined) {
        await Promise.all(req.body.map(async(dado)=>{
                var contactObj = {
                    properties: dado
                }

           console.log(await hubspot.crm.contacts.basicApi.create(contactObj))
            }))
                res.status(201)
                res.json(req.body)
         
             
        }}catch(erro){
            res.status(500)
            res.json({erro:erro})
     
        } 
 
    }          
            }


module.exports = ContactsController;