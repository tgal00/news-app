

module.exports = function (express, pool) {


   const apiRouter = express.Router();

   apiRouter.get('/', function (req, res) {

      res.json({ message: 'Dobro dosli na nas API!' });
   });

   apiRouter.route('/users')
   .get(async function (req, res) {

      try {
         let conn = await pool.getConnection();
         let rows = await conn.query('SELECT * FROM users');
         conn.release();
         res.json({ status: 'OK', users: rows });
         //res.send(rows);

      } catch (e) {

         console.log(e);
         return res.json({ "code": 100, "status": "Error with query" });
      }
   });


   apiRouter.route('/categories')
   .get(async function (req, res) {

      try {
         let conn = await pool.getConnection();
         let rows = await conn.query('SELECT * FROM categories');
         conn.release();
         res.json({ status: 'OK', categories: rows });
         //res.send(rows);

      } catch (e) {

         console.log(e);
         return res.json({ "code": 100, "status": "Error with query" });
      }
   }).post(async function (req, res) {

      let category = {
         category: req.body.category,
      }
      try {

         let conn = await pool.getConnection();
         let q = await conn.query('INSERT INTO categories SET ?', category);
         conn.release();
         res.json({ status: 'OK', insertId: q.insertId });

      } catch (e) {
         console.log(e);
         res.json({ status: 'NOT OK' });
      }})


   apiRouter.route('/articles')
   .get(async function (req, res) {

      try {
         let conn = await pool.getConnection();
         let rows = await conn.query('SELECT * FROM articles');
         conn.release();
         res.json({ status: 'OK', articles: rows });
         //res.send(rows);

      } catch (e) {

         console.log(e);
         return res.json({ "code": 100, "status": "Error with query" });
      }})
   .post(async function (req, res) {

      let article = {
         headline: req.body.headline,
         category: req.body.category,
         imgUrl: req.body.imgUrl,
         story: req.body.story,
         datePublished: req.body.datePublished
      }
      try {

         let conn = await pool.getConnection();
         let q = await conn.query('INSERT INTO articles SET ?', article);
         conn.release();
         res.json({ status: 'OK', insertId: q.insertId });

      } catch (e) {
         console.log(e);
         res.json({ status: 'NOT OK' });
      }})
   .put(async function (req, res) {

      let article = {
         headline: req.body.headline,
         category: req.body.category,
         imgUrl: req.body.imgUrl,
         story: req.body.story,
         datePublished: req.body.datePublished
      }

      try {

         let conn = await pool.getConnection();
         let q = await conn.query('UPDATE articles SET ? WHERE id = ?', [article, req.body.id]);
         conn.release();
         res.json({ status: 'OK', changedRows: q.changedRows });

      } catch (e) {
         console.log(e);
         res.json({ status: 'NOT OK' });
      }


   });


   apiRouter.route('/articles/:id')
   .delete(async function (req, res) {
      try {

         let conn = await pool.getConnection();
         let q = await conn.query('DELETE FROM articles WHERE id = ?', req.params.id);
         conn.release();
         res.json({ status: 'OK', affectedRows: q.affectedRows });

      } catch (e) {
         res.json({ status: 'NOT OK' });
      }

   });;


   apiRouter.route('/comments')
   .get(async function (req, res) {

      try {
         let conn = await pool.getConnection();
         let rows = await conn.query('SELECT * FROM comments');
         conn.release();
         res.json({ status: 'OK', comments: rows });
         //res.send(rows);

      } catch (e) {

         console.log(e);
         return res.json({ "code": 100, "status": "Error with query" });
      }
   })
   .post(async function (req, res) {

      let comment = {
         comment: req.body.comment,
         userId: req.body.userId,
         datePublished: req.body.datePublished,
         articleId: req.body.articleId,
      }
      try {

         let conn = await pool.getConnection();
         let q = await conn.query('INSERT INTO comments SET ?', comment);
         conn.release();
         res.json({ status: 'OK', insertId: q.insertId });

      } catch (e) {
         console.log(e);
         res.json({ status: 'NOT OK' });
      }
   });

   apiRouter.route('/comments/:id')
   .delete(async function (req, res) {
      try {

         let conn = await pool.getConnection();
         let q = await conn.query('DELETE FROM comments WHERE id = ?', req.params.id);
         conn.release();
         res.json({ status: 'OK', affectedRows: q.affectedRows });

      } catch (e) {
         res.json({ status: 'NOT OK' });
      }

   });;
   


   return apiRouter;

};
