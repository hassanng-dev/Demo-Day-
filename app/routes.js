module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/index', function(req, res) {
      res.render('index.ejs');
    });

    app.get('/workout', function(req, res) {
      res.render('workout.ejs');
    });

    // app.get('/mealplan', function(req, res) {
    //   res.render('mealplan.ejs');
    // });

    app.get('/signup', function(req, res) {
      res.render('signup.ejs');
    });

    app.get('/login', function(req, res) {
      res.render('login.ejs');
    });





  

// PROFILE SECTION =========================
     app.get('/profile', isLoggedIn, function(req, res) {
      db.collection('messages').find({user: req.user.local.email}).toArray((err, result) => {
        if (err) return console.log(err)
        res.render('profile.ejs', {
          user : req.user,
          info: result
        })
      })

      
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
      req.logout(() => {
        console.log('User has logged out!')
      });
      res.redirect('/');
  });

// message board routes ===============================================================



//post for calorie tracker
app.post('/info', (req, res) => {
  
  db.collection('messages').save({user: req.user.local.email, day: req.body.day, meal: req.body.meal, name: req.body.name.trim(), calories: req.body.calories, protein: req.body.protein, carbs: req.body.carbs, fats: req.body.fats, option: req.body.option, check: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/profile')
    })
  })


  // post for API MACROS
app.post('/apiInfo', (req, res) => {
  
  db.collection('apimacros').save({user: req.user.local.email, name: req.body.name.trim(), calories: req.body.calories.toString(), protein: req.body.protein, carbs: req.body.carbs, fats: req.body.fats}, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      // res.redirect('/mealplan')
    })
  })

  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('messages').find({user: req.user.local.email}).toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user : req.user,
        info: result
      })
    })
});

  app.get('/mealplan', isLoggedIn, function(req, res) {
    db.collection('apimacros').find({user: req.user.local.email}).toArray((err, result) => {
       
      res.render('mealplan.ejs', {
        user : req.user,
        test: result
      })
      
    })
});
  
app.put('/check', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({day: req.body.day, meal: req.body.meal, name: req.body.name}, {
    $set: {
      check: !req.body.check
    }
  }, {
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/info', (req, res) => {
  
  db.collection('messages').findOneAndDelete({day: req.body.day, meal: req.body.meal, name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})


//Delete macros from meal plans 

app.delete('/mealplan', (req, res) => {
  console.log(req.user.local.email, req.body.name, req.body.calories)
  db.collection('apimacros').findOneAndDelete({user: req.user.local.email, name: req.body.name, calories: req.body.calories}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // locally --------------------------------
      // LOGIN ===============================
      // show the login form
      app.get('/login', function(req, res) {
          res.render('login.ejs', { message: req.flash('loginMessage') });
      });

      // process the login form
      app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/login', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

      // SIGNUP =================================
      // show the signup form
      app.get('/signup', function(req, res) {
          res.render('signup.ejs', { message: req.flash('signupMessage') });
      });

      // process the signup form
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/profile', // redirect to the secure profile section
          failureRedirect : '/signup', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
      }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();

  res.redirect('/');
}