const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// chargement des fichiers statiques
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}))

// connexion à la DB mongoose
mongoose.connect('mongodb+srv://sergesgoma:sergesgoma@cluster0.mxqbj.mongodb.net/signupDB?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true });

// création d'un schéma de base de données
const signupSchema = {
    email: String
}

const Signup = mongoose.model("Signup", signupSchema);

const db = mongoose.connection; 

db.on('error', () => console.log('Error in connecting to Database'));
db.once('open', () => console.log('Connected to Database'));

// route du formulaire
app.post('/', (req, res) => {
    let newSignup = new Signup({
        email: req.body.email
    });
    newSignup.save();
    res.redirect('/');
})

// route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})