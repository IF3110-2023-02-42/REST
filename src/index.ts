import express from 'express';
import cors from 'cors';
import { DiscussionRoute } from './routes/discussionRoute';
import { DiscussionViewRoute } from './routes/discussionViewRoute';
import { ExerciseRoute } from './routes/exerciseRoute';
import { ExerciseTaskRoute } from './routes/exerciseTaskRoute';


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
    app.use('/discussion_view', new DiscussionViewRoute().getRoute());
    app.use('/exercise', new ExerciseRoute().getRoute())
    app.use('/exercise_task', new ExerciseTaskRoute().getRoute())

    app.listen(port, () => console.log(`App listening on port ${port}!`));
}