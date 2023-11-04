import express from 'express';
import cors from 'cors';
import {discussionRoute} from './routes/discussionRoute';


if (require.main === module) { // Program hanya dijalankan jika dipanggil langsung 
    const app = express();
    const port = process.env.PORT || 3000;


    app.use(
        cors({
            origin: '*',
        })
    );
    app.use(express.json());
    app.use('/discussion', discussionRoute);

    
    app.listen(port ,() => console.log(`App listening on port ${port}!`));
}






