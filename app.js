const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());




app.get('/', (req, res) => {
    res.send('Bienvenue sur mon site');
}); 
//Récupération de toutes les notes 
app.get('/notes', (req, res) => {
    fs.readFile('data.json', 'utf8', function(err, notes){
        const data = JSON.parse(notes);
        res.status(200).json(data);
    });
});

//Affichage d'une note
app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('data.json', 'utf-8', function(err, notes){
        const data = JSON.parse(notes);
        const oneNote = data.find(note => note.id == id)
        if(oneNote == null){
            res.status(404).json({message: "Note non trouvé (404)"});
        }else{
            res.status(200).json(oneNote);
        }
    });

});

//Création d'une note 
app.post('/notes', (req, res) => {

    fs.readFile('data.json','utf-8', function(err,data){
        dataParse = JSON.parse(data)
        const id = dataParse.length + 1; 
        console.log(id)
        const  newNote = {
            id: id,
            title: req.body.title,
            message: req.body.message
        }
        dataParse.push(newNote);
        console.log(dataParse)
        fs.writeFile('data.json', JSON.stringify(dataParse), function (err) {
                if (err) throw err;
                res.status(201).json({message:'Note enregistré'});
            });
    });
});

// Modification d'une note 
app.patch('/notes/:id', (req, res) => {
    fs.readFile('data.json','utf-8', function(err,data){
        dataParse = JSON.parse(data);
        const id = parseInt(req.params.id);
        const oneNote = dataParse.find(note => note.id == id);

        if(oneNote == null){
            res.status(404).json({message: "Note non trouvé (404)"});
        }else{
           const  newNote = {
                id: id,
                title: req.body.title,
                message: req.body.message
            }
            dataParse.splice(id-1, 1, newNote);
            fs.writeFile('data.json', JSON.stringify(dataParse), function(err){
                if (err) throw err;
                res.status(201).json({message:'Note modifié'});
            });
            
        }
    });
});
//suppresion d'une note 
app.delete('/notes/:id', (req, res)=>{
    fs.readFile('data.json','utf-8', function(err,data){
        dataParse = JSON.parse(data);
        const id = parseInt(req.params.id);
        const oneNote = dataParse.find(note => note.id == id)
        if(oneNote == null){
            res.status(404).json({message: "Note non trouvé (404)"});
        }else{
    
            dataParse.splice(id-1, 1);
            fs.writeFile('data.json', JSON.stringify(dataParse), function(err){
                if (err) throw err;
                res.status(201).json({message:'Note supprimé'});
            });
        }
    });


});

app.listen(port, () => {
    console.log('Le serveur est lancé sur le port ' + port);
});