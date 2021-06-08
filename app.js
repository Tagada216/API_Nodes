const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const data = [
    { id: 1, title: "Le titre de ma note", message: "Le message de ma note"}
]


app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site');
}); 
//Récupération de toutes les notes 
app.get('/notes', (req, res) => {
    res.status(200).json(data);
});

//Affichage d'une note
app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const oneNote = data.find(note => note.id == id)
    if(oneNote == null){
        res.status(404).json({message: "Note non trouvé (404)"});
    }else{
        res.status(200).json(oneNote);
    }
});

//Création d'une note 
app.post('/notes', (req, res) => {
    const id = data.length + 1; 
    const  newNote = {
        id: id,
        title: req.body.title,
        message: req.body.message
    }
    data.push(newNote);
    res.status(201).json({message:'Note enregistré'});
});

// Modification d'une note 
app.patch('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const oneNote = data.find(note => note.id == id)
    if(oneNote == null){
        res.status(404).json({message: "Note non trouvé (404)"});
    }else{
       const  newNote = {
            id: id,
            title: req.body.title,
            message: req.body.message
        }
        data.splice(id-1, 1, newNote);
        res.status(201).json({message:'Note modifié'});
    }
    
});
//suppresion d'une note 
app.delete('/notes/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const oneNote = data.find(note => note.id == id)
    if(oneNote == null){
        res.status(404).json({message: "Note non trouvé (404)"});
    }else{

        data.splice(id-1, 1);
        res.status(201).json({message:'Note supprimé'});
    }
});

app.listen(port, () => {
    console.log('Le serveur est lancé sur le port ' + port);
});