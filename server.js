const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema')
const path = require("path")

const app = express();

// middleware \\ allow cross origin here \\ had to do this to make request to backend !!!! // server uses cor to make request to backend
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// this say whenever route expect the graphql is hit reroute to the this pubic folder
app.use(express.static('public'))

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

// this allow me to connnect to heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));