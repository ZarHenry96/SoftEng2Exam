const bodyParser = require('body-parser');
const express = require('express');
const genericRoutes = require('./routes/genericRoutes.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Generic router
var genericRouter = express.Router();
genericRouter.route('/')
    .get(genericRoutes.getCollection)
	.delete(genericRoutes.deleteCollection)
	.post(genericRoutes.insertElement)

genericRouter.route('/:id')
    .get(genericRoutes.getElementById)
	.delete(genericRoutes.deleteElementById)
    .put(genericRoutes.updateElementById);

// Register our router on /v1/collection
app.use('/v1/collection',genericRouter);

// handle invalid requests and internal error
app.use((req, res, next) => {
	const err = new Error('Route Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});

// Set the port number
app.set('port', process.env.PORT || 3000);
// Start the server
app.listen(app.get('port'));
console.log('Server started! Running on port: ' + app.get('port'));
