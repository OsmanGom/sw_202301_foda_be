import express from 'express';
const router  = express.Router(); //se exporta hacia la raiz de la aplicacion 
import empresasRouter from './empresas/empresas';

// REST API
// Internet -> HTTP -> REST API -> DB
// SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// {llave : valor}
// valor: texto, numerico, booleano, array [valores], objeto{llave:valor}

// REST stateless, resource unique representation
// CRUD Create, Read, Update, Delete
//      POST, GET, PUT, DELETE
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version', (_req, res)=> {
  const version: string = "1.0.0";
  const jsonResp = { "name":"FODA Be", "Version": version};
  res.json(jsonResp);
 });

 router.use('/empresas',empresasRouter);

//router.get router.post router.put router.delete router.use


export default router;
