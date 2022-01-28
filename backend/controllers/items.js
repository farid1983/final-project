const { response } = require('express');
const Item = require('../models/Item');

const createItems = async (req, res) => {
	try {
		req.body.createdBy = req.user.userId; //to show ID in postman
		req.body.createdByUser = req.user.name; //to show name in postman

		const item = await Item.create(req.body);

		res.status(200).json({ item });
	} catch (error) {
		res.status(500).send(error);
	}
};

const getAllItems = async (req, res) => {
	try {
		const items = await Item.find({ createdBy: req.user.userId }).sort(
			'createdAt'
		);
		res.status(200).json({ items, count: items.length });
	} catch (error) {
		res.status(500).send(error);
	}
};

const getItemById = async (req, res) => {
	try {
		const {
			params: { itemId: id },
			user: { userId },
		} = req;

		const item = await Item.findOne({
			_id: id,
			createdBy: userId,
		});

		if (!item) {
			return res.status(404).json({ msg: ` Item id ${id} not found` });
		}

		res.status(200).json({ item });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteItem = async (req, res) => {
	try {
		const {
			params: { itemId: id },
			user: { userId },
		} = req;

		const item = await Item.findByIdAndRemove({
			_id: id,
			createdBy: userId,
		});

		if (!item) {
			return res.status(404).json({
				status: true,
				code: 404,
				data: { msg: `item id ${id} not found` },
			});
		}

		res
			.status(200)
			.json({ status: true, code: 200, data: { deletedItem: [item] } });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateItem = async (req, res) => {
	try {
		const {
			body: { product, category, location, quantity },
			user: { userId },
			params: { itemId: id },
		} = req;

		//check body is not empty
		if (
			product === '' ||
			category === '' ||
			location === '' ||
			quantity === ''
		) {
			return res
				.status(400)
				.send('product, category, position & quantity fields can not be empty');
		}

		//update DB data
		const item = await Item.findByIdAndUpdate(
			{ _id: id, createdBy: userId },
			req.body,
			{ new: true, runValidators: true }
		);

		//item id not found
		if (!item) {
			return res.state(404).json({ msg: `item id ${id} not found` });
		}

		res.status(200).json({ status: true, code: 200, data: { item: [item] } });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	createItems,
	getAllItems,
	getItemById,
	deleteItem,
	updateItem,
};
