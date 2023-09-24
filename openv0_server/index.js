const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ApiRouter = require('./routes/api/index.js')
const export_react = require(`./modules/export/react.js`)

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', ApiRouter)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, async () => {
	await mongoose.connect('mongodb://127.0.0.1:27017/openv0');
	console.log(`Server is running on port ${port} --------------------\n`);
	export_react.dump_webapp()
});
