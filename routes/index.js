var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Analytics' });
});

router.post('/chats', (req, res) => {

  let {dataInicial, dataFinal} = req.body;

  console.log({dataInicial, dataFinal});

  request.post({
    header: {
      'Content-Type' : 'application/json'
    },
    url: 'https://batepaporest.herokuapp.com/chats-realizados',
    json: {dataInicial, dataFinal}
  }, (err, requestRes, body) => {

    request.post({
      header: {
        'Content-Type' : 'application/json'
      },
      url: 'https://batepaporest.herokuapp.com/chats-por-usuario',
      json: {dataInicial, dataFinal}
    }, (errr, requestRess, bodyy) => {

      res.send({chats: body, chatsUser: bodyy})

    })

  });
});

router.post('/acessos', (req, res) => {

  let {dataInicial, dataFinal} = req.body;

  request.post({
    header: {
      'Content-Type' : 'application/json'
    },
    uri: 'https://batepaporest.herokuapp.com/usuarios-acessos-rede',
    json: {dataInicial, dataFinal}
  }, (err, requestRes, body) => {
    res.send(body);
  });
});

router.post('/topicos', (req, res) => {

  let {dataInicial, dataFinal} = req.body;

  request.post({
    header: {
      'Content-Type' : 'applcation/json'
    },
    uri: 'https://batepaporest.herokuapp.com/topicos-mais-acessados',
    json: {dataInicial, dataFinal}
  }, (err, requestRes, body) => {
    res.send(body);
  });
});

module.exports = router;
