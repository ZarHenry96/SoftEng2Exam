const schema = require('../models/GenericObject.js');
const db = require('../db/database.js');

function getCollection(req, res, next){
	res.json(db.getAll());
}

function getElementById(req, res, next){
	var id = req.params.id;
	var element = db.getById(id);
	if(element){
		res.json(element);
	} else {
		const err = new Error('Element not Found');
		next(err);
	}
}

function deleteCollection(req, res, next){
	db.removeAll();
	res.json({message:'Collection successfully deleted.'});
}

function deleteElementById(req, res, next){
	var id = req.params.id;
	var deleted = db.removeById(id);
	if(deleted){
		res.json({message:'Element successfully deleted.'});
	}else{
		const err = new Error('Element not Found');
		next(err);
	}
}

function insertElement(req, res, next){
	var id = req.body.id;
	var field1 = req.body.field1;
	var field2 = req.body.field2;
	var field3 = req.body.field3;
	if(id && field1 && field2 && field3){
		var newItem = new schema.GenericObject(id,field1,field2,field3);
		var inserted = db.insertItem(newItem);
		if(inserted){
			res.json({message:'Element successfully inserted.'});
		}else{
			const err = new Error('Element already Inserted');
			next(err);
		}
	}else{
		const err = new Error('Not all required fields have been specified!');
		next(err);
	}
}

function updateElementById(req, res, next){
	var id = req.params.id;
	var field1 = req.body.field1;
	var field2 = req.body.field2;
	var field3 = req.body.field3;
	if(field1 && field2 && field3){
		var updatedItem = new schema.GenericObject(id,field1,field2,field3);
		var updated = db.updateItem(updatedItem);
		if(updated){
			res.json({message:'Element successfully updated.'});
		}else{
			const err = new Error('Element not Found');
			next(err);
		}
	}else{
		const err = new Error('Not all required fields have been specified!');
		next(err);
	}
}

module.exports = {
	'getCollection' : getCollection,
	'getElementById' : getElementById,
	'deleteCollection' : deleteCollection,
	'deleteElementById' : deleteElementById,
	'insertElement': insertElement,
	'updateElementById' : updateElementById
};
