import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

import activityRoutes from './routes/activity.route';

const app = express();
const port = 3456;

app.use(cors());
app.use(express.json());
app.use('/api', activityRoutes);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});