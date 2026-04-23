//serveur.js

const express = require('express')
const app = express()

const pool = require('./db')

app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './');
app.use(express.static('./'));
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res)=>{
  try{
    const [result] = await pool.query('SELECT * FROM produits')
    res.render('indexAGS' ,{result});
  }catch(err){
    console.log(err)
    res.status(401).send(err);
  }
});


app.post('/produits', async (req, res)=>{
  try{

    let {id, nom, prix_a, prix_v, quantite, benefice} = req.body;

    id = parseInt(id);
    if (isNaN(id) || id <= 0) id = null;

    //id = req.body.id === "" ? null : req.body.id;

    const request = id === null ?
    'INSERT INTO produits(nom, prix_a, prix_v, quantite, benefice) VALUES (?, ?, ?, ?, ?)'
    :'UPDATE produits SET nom = ?, prix_a = ?, prix_v = ?, quantite = ?, benefice = ? WHERE id = ?';

    const tab = id === null ? [nom, prix_a, prix_v, quantite, benefice]
    :[nom, prix_a, prix_v, quantite, benefice, id];

    let result = await pool.query(request, tab);
    res.status(300).redirect('/');

  }catch(err){
    console.log(err)
    res.send(err);
  }

})

app.put('/vente', async (req, res)=>{
  try{
    let {id, nom, prix_a, prix_v, quantite, benefice} = req.body;

    const request = 'UPDATE produits SET quantite = ?, benefice = ? WHERE id = ?';
    const tab = [quantite, benefice, id];

    const r = await pool.query(request, tab);
    res.status(300).redirect('/');
  }catch(e){
    console.log(err);
    res.send(err);
  }
})

app.delete('/supprimer/:id', async (req, res) => {
  let id = req.params.id;

  if(id === 0){
    console.log('Objets non trouver !');
    res.send('Objets non trouver !');
    return;
  }

  const r = await pool.query('DELETE FROM produits WHERE id = ?', [id]);
  res.status(200).redirect('/');
})

app.use((req, res)=>{
  res.send('<h1> URL invalide ! </h1>');
})

app.listen(3000, '0.0.0.0', () =>{
  console.log('Serveur démarré sur localhost:3000')
});
