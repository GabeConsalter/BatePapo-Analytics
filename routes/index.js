var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Analytics' });
});

router.post('/chats', (req, res) => {

  request.get({
      uri: 'https://batepaporest.herokuapp.com/chats-realizados',
      form: {
        dataInicial: req.body.dataInicial,
        dataFinal: req.body.dataFinal
      }
    },
    (err, requestRes, body) => {

      request.get({
        uri: 'https://batepaporest.herokuapp.com/chats-por-usuario',
          form: {
            dataInicial: req.body.dataInicial,
            dataFinal: req.body.dataFinal
          }
      },
      (errr, requestRess, bodyy) => {

        res.send({chats: JSON.parse(body), chatsUser: JSON.parse(bodyy)});

      });
    });
});

router.post('/acessos', (req, res) => {

  request.get({
      uri: 'https://batepaporest.herokuapp.com/usuarios-acessos-rede',
      form: {
        dataInicial: req.body.dataInicial,
        dataFinal: req.body.dataFinal
      }
    },
    (err, requestRes, body) => {
      res.send(JSON.parse(body));
    });
});

router.post('/topicos', (req, res) => {

  request.get({
      uri: 'https://batepaporest.herokuapp.com/topicos-mais-acessados',
      form: {
        dataInicial: req.body.dataInicial,
        dataFinal: req.body.dataFinal
      }
    },
    (err, requestRes, body) => {
      res.send(JSON.parse(body));
    });
});

module.exports = router;
