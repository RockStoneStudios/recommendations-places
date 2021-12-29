const app = require('./index');
const DB = require('./database');

app.listen(process.env.PORT,()=>{
    console.log('Starting Port . . . . ');
    DB;
});


