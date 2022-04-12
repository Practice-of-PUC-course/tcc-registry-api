import dotenv from 'dotenv';
import express from 'express';
import { modelRouter } from './routes/model.js';
import { userRouter, userTypeRouter } from './routes/user.js';
import { addressRouter } from './routes/address.js';

dotenv.config({ silent: true });
var app = express();
var api = "/registry/v1";

app.use(api+"/health", (req, res) => {
    res.status(200).send("Ok");
});

app.use( api+"/model", modelRouter);
app.use( api+"/user", userRouter);
app.use( api+"/usertype", userTypeRouter);
app.use( api+"/address", addressRouter);

var server=app.listen((process.env.API_LISTEN_PORT || 5000), () => {
    console.log("The registry API is listening on: "+server.address().port);
});