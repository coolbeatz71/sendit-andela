import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import parcelRoutes from './routes/parcel';

const app = express();
const apiVersion = '/api/v1';

// use morgan for log
app.use(morgan('dev'));

// use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// handling CORS error
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    response.status(200).json({});
  }
  next();
});

// user endpoint
app.use(`${apiVersion}/users`, userRoutes);
app.use(`${apiVersion}/parcels`, parcelRoutes);

// handling request error
app.use((request, response, next) => {
  const error = new Error('Resource not found, invalid route');
  error.status = 404;
  next(error);
});

// customize error display
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message,
    },
  });
  next();
});

module.exports = app;
