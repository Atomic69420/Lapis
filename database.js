"use strict";

const mongoose = require("mongoose");

require('dotenv').config();

const accountSchema = new mongoose.Schema({
	xuid: String,
	// list of gamertags ever used with the string
	gamertags: Array,
	// known user device IDs
	deviceIds: Array,
	// known user device OSes
	deviceOs: Array
});

const account = mongoose.model("Account", accountSchema);

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL)
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

function createAccountDefaults(data) {
	if (!data.xuid) return TypeError("Missing XUID");

    console.log(`User didn't exist, Created new defaults.`)

	return new account({
		_id: data._id,
		xuid: data.xuid,
		gamertags: data.gamertags ?? [],
		deviceIds: data.deviceIds ?? [],
		deviceOs: data.deviceOs ?? []
	});
}

module.exports = {
	accountsModel: account,
	createAccountDefaults: createAccountDefaults
};