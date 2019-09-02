const express = require('express');
const router = express.Router();
const path = require('path');
const handlebars = require('express-handlebars');

const User = require('../models/users')
const Note = require('../models/notes')


const hbs = handlebars.create({
    defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views')
  })

  const registration = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/reg.hbs", {
        precompiled: true
    });
    req.regTemp = template;
	next();
}

const login = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/login.hbs", {
        precompiled: true
    });
    req.logTemp = template;
	next();
}
const notes = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/notes.hbs", {
        precompiled: true
    });
    req.notesTemp = template;
	next();
}
const show = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/notesText.hbs", {
        precompiled: true
    });
    req.showTemp = template;
	next();
}

router.get('/',registration,login,notes,show, async (req,res) =>{
    const findNotes = await Note.find({user: req.session.user})
    if(req.session.user){
        res.render('index', {
            regTemp: req.regTemp,
            logTemp: req.logTemp,
            notesTemp: req.notesTemp,
            showTemp: req.showTemp,
            audioTemp: req.audioTemp,
            user:req.session.user,
            notes: findNotes
        })
    }
    else{
        res.render('index', {
            regTemp: req.regTemp,
            notesTemp: req.notesTemp,
            showTemp: req.showTemp,
            logTemp: req.logTemp,
            audioTemp: req.audioTemp,
        })
    }
})

router.post("/registration", async (req,res) =>{  
    let newUser = await new User({login:req.body.login, password: req.body.password}) 
    await newUser.save()
    req.session.user = newUser.login
    res.end()
})

router.post("/logOut", function (req,res){
        req.session.destroy()
        res.redirect('/')
})

router.post("/login", async (req,res) =>{  
    let findUser = await User.findOne({login:req.body.login, password: req.body.password}) 
    console.log(findUser)
    req.session.user = findUser.login
    res.end()
})
router.post("/notes", async (req,res) =>{  
    let newNote = await new Note({name:req.body.name, text: req.body.text, user: req.session.user})
    await newNote.save()
    const findNotes = await Note.find({user: req.session.user})
    res.json({
        notes: findNotes
    })
})
router.post("/notesView", async (req,res) =>{  
    const findNotes = await Note.find({user: req.session.user})
    let findNote = await Note.findOne({name: req.body.note})
    console.log(findNote.text)
    res.json({
        noteText: findNote.text,
        notes:findNote
    })
})

module.exports = router