import express from 'express';
import cors from 'cors';
import { DiscussionRoute } from './routes/discussionRoute';
import { ExerciseRoute } from './routes/exerciseRoute';


if (require.main === module) { // Program hanya dijalankan jika dipanggil langsung 
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(
        cors({
            origin: '*',
        })
    );
    app.use(express.json());
    app.use('/discussion', new DiscussionRoute().getRoute());
    app.use('/exercise', new ExerciseRoute().getRoute())

    app.listen(port, () => console.log(`App listening on port ${port}!`));
}