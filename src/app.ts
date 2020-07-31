import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authroutes from './routes/auth.routes'
//inicializaciones
const app = express();

//config
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.send(`La API están en http://localhost:${app.get('port')}`);
});

app.use(authroutes);

export default app