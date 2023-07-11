const handleRegister=(req, res,db) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password){
       return res.status(400).json('incorret form submission');
    }
    db('users').insert({
      email:email,
      name:name,
      joined:new Date()
    }).then(console.log)
    .then(() => {
      db.select('*')
        .from('users')
        .where('email', '=', email)
        .then(user => {
          res.json(user[0]);
        })
        .catch(err => res.status(400).json('Error getting user'));
    })
    .catch(err => res.status(400).json('Unable to register'));
    
  }

  module.exports={
    handleRegister : handleRegister
  };