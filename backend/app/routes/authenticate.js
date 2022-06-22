const { json } = require('body-parser');
const {
   randomBytes, pbkdf2Sync
} = require('crypto');
const crypto = require('crypto');
module.exports = function (express, pool, crypto) {


   let authRouter = express.Router();

   authRouter.get('/', function (req, res) {



      res.json({ message: 'Dobro dosli na nas API autentifikacije!' });
   });

   authRouter.route("/register").post(async function (req, res) {

      const user = {
         username: req.body.username,
         password: req.body.password,
         email: req.body.email,
         name: req.body.name,
         level: req.body.level,
         salt: req.body.salt
      }
      try {
         let salt = randomBytes(128).toString('base64');
         let hash = pbkdf2Sync(user.password, salt, 10000, 64, 'sha512');
         user.salt = salt;
         user.password = hash.toString("hex");
         let conn = await pool.getConnection();
         let q = await conn.query('INSERT INTO users SET ?', user);
         conn.release();
         res.json({ status: 'OK', insertId: q.insertId });


      } catch (e) {
         console.log(e);
         res.json({ status: 'NOT OK' });
      }
   })

   authRouter.route("/login").post(async function (req, res) {


      try {

         let conn = await pool.getConnection();
         let rows = await conn.query('SELECT * FROM users WHERE username=?', req.body.username);
         conn.release();

         if (rows.length == 0) {

            res.json({ status: 'NOT OK', description: 'Username doesnt exist' });

         } else {
            let compare = false;

            if (rows[0].salt) {

               let hash = pbkdf2Sync(req.body.password, rows[0].salt, 10000, 64, 'sha512');
               compare = hash.toString('hex') == rows[0].password;
            }



            // let compare = req.body.password===rows[0].password;

            if (compare) {
               /*const token = jwt.sign({
                  username: rows[0].username,
                  email: rows[0].email,
                  level: rows[0].level
               }, secret, {
                  expiresIn: 1440
               });
   
               res.json({ status: 200, token: token, user: rows[0] });*/
               res.json({ status: 200, user: rows[0] });

            } else if (rows.length > 0) {

               res.json({ status: 150, description: 'Wrong password' });

            }
         }

      } catch (e) {

         console.log(e);
         return res.json({ "code": 100, "status": "Error with query" });

      }



   });


   return authRouter;

};
