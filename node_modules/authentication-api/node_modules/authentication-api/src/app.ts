import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import router from '@/routes/router';

app.use('/api/v1', router);

export default app