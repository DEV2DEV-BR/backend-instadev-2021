const { Router } = require('express');
const { upload } = require('./configs/multer');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.schema.json');

const UserControler = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const FileController = require('./apps/controllers/FileController');

const PostController = require('./apps/controllers/PostController');
const postSchema = require('./schema/post.schema.json');

const routes = new Router();

routes.get('/health', (req, res) => res.send({
  message: 'Connected with success!',
}));

routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);
routes.post('/user', schemaValidator(userSchema), UserControler.create);

routes.use(AuthenticationMiddleware);

routes.put('/user', UserControler.update);
routes.delete('/user', UserControler.delete);
routes.get('/user/profile', UserControler.userProfile);

routes.post('/upload', upload.single('image'), FileController.upload);

routes.post('/post', schemaValidator(postSchema), PostController.create);
routes.delete('/post/:id', PostController.delete);
routes.put('/post/:id', PostController.update);
routes.put('/post/add-like/:id', PostController.addLike);
routes.get('/post/my-posts', PostController.listMyPosts);
routes.get('/post/all-posts', PostController.listAllPosts);

module.exports = routes;
