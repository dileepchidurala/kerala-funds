var express = require('express'),
  router = express.Router(),
  db = require('../dbconfig/ContributeTable'),
  mail = require('../mailling/outllokmail'),
  logfunc = require('../logs/logfunction');

router.get('/fullname/', (req, res) => {
  var query = `select full_name from ${db.usertable} where qlid='${
    req.query.id
  }'`;
  db.teradata
    .read(query)
    .then(response => {
      logfunc(`${req.query.id}`, `3getUserOk.txt`, false);
      res.send(JSON.stringify(response));
    })
    .catch(error => {
      logfunc(`${req.query.id}`, `2getUserErr.txt`, true, error);
      res.sendStatus(408);
    });
});

router.get('/validate/', (req, res) => {
  var query = `select * from ${db.db_name} where userid = '${req.query.id}'`;
  db.teradata.read(query).then(response => {
    if (response[0] === undefined) {
      res.sendStatus(200);
      logfunc(`${req.query.id}`, `5formOk.txt`, false);
    } else {
      res.sendStatus(405);
      logfunc(
        `${req.query.id}`,
        `4duplicateError.txt`,
        true,
        `Duplicate entry`
      );
    }
  });
});

router.post('/contribute', (req, res) => {
  var query = `INSERT INTO ${db.db_name} (userid,fullname,amount) values('${
    req.body.id
  }',
  '${req.body.name}',${req.body.amount});`;
  db.teradata
    .write(query)
    .then(response => {
      const userid = req.body.id;
      logfunc(`${userid} amount: ${req.body.amount}`, `7formSubmitOk.txt`);
      var query = `select full_name from ${
        db.usertable
      } where qlid='${userid}'`;
      db.teradata
        .read(query)
        .then(response => {
          mail.mailfunction(userid, response[0].Full_Name, req.body.amount);
        })
        .catch(error => {
          mail.mailfunction(userid, userid, req.body.amount);
        });
      res.sendStatus(201);
    })
    .catch(error => {
      logfunc(
        `${req.body.id} amount: ${req.body.amount}`,
        `6formSubmitError.txt`,
        true,
        error
      );
      res.sendStatus(501);
    });
});

module.exports = router;
