import dotenv from 'dotenv';
import express from 'express';
import { modelRouter } from './routes/model.js';

dotenv.config({ silent: true });
var app = express();
var api = "/registry/v1";

app.use(api+"/health", (req, res) => {
    res.status(200).send("Ok");
});

app.use( api+"/model", modelRouter);

var server=app.listen((process.env.API_LISTEN_PORT || 5000), () => {
    console.log("The address API is listening on: "+server.address().port);
});