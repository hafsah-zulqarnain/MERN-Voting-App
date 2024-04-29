require('dotenv').config();
const express = require('express');
const handle = require('./controllers')
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const port= process.env.PORT
const connectToDatabase = require('./models/index').connectToDatabase; 
const routes = require('./routes')
//Connect to database
app.use(bodyParser.json());
connectToDatabase();
//Cors and body-parsers areexpress middlewares
app.use(cors({origin: 'http://localhost:3000',
    credentials:true}))
// In your main script or a dedicated module
const pollConfig = {
    pollStartTime: '2023-08-15T08:00:00Z', // Replace with the desired start time
    pollEndTime: '2023-08-15T18:00:00Z',   // Replace with the desired end time
};




app.get('/',(req,res) =>
{
    res.json({Hello: "world"})
})


app.use('/api/auth',routes.auth)
app.use('/api/polls',routes.poll)
// Error handler
//Any end point that is not recognizable goes to this 
app.use(handle.notFound)
app.use(handle.errors)


app.listen(port,console.log('Server started on port',port)) 

