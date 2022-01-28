//import express

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//connectDB
const connectDB = require('./db/connect');

const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');

const itemRouter = require('./routes/items');

app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.send('welcome to my homepage');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/items', authenticateUser, itemRouter);
// app.use('/api/v1/items', itemRouter);

//listen to port3000
// app.listen(3000, () => {
// 	console.log('server is listening to port 3000');
// });

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log('server is listening to port 5000');
		});
	} catch (error) {
		console.log(error);
	}
};

start();
