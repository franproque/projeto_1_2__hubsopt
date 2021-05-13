const hubspot = require('../services/hubspotConnect')
class ContactsController {


    static async getAllContacts(req, res) {
        try {
            var busca = await hubspot.crm.contacts.basicApi.getPage()
            if (busca.body.results.length != 0) {
                res.status(200)
                res.json(busca.body.results);
            } else {
              
            }
        } catch (error) {
            res.status(500)
            res.json({ resposta: "Ocorreu erro interno do servidor!!!" })
        }
       
    }

    static async getOneContact(req, res) {
        const filter = { propertyName: 'email',operator:'EQ', value: req.params.busca }
        const filterGroup = { filters: [filter] }
        const sort = JSON.stringify({ propertyName: 'email', direction: 'DESCENDING' })
        const query = 'moseswalker@essensia.com'
        const properties = ['firstname', 'lastname','createdate','city','phone','email']
        const limit = 1
        const after = 0

        const publicObjectSearchRequest = {
        filterGroups: [filterGroup],
           sorts: [sort],
           properties,
            limit,
            after,
        }

        const result = await hubspot.crm.contacts.searchApi.doSearch(publicObjectSearchRequest)
        res.send(result)
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