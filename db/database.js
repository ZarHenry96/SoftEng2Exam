const db = new Array();

function findById(id){
	var index = -1;
	for(var i = 0; i < db.length && index == -1; i++){
		if(db[i]['id'] == id){
			index = i;
		}
	}
	return index;
}


function getAll(){
	return db;
};

function getById(id){
	var index = findById(id);
	if(index == -1){
		return null;
	}else{
		return db[index];
	}
};

function insertItem(item){
	if(findById(item['id']) == -1){
		db.push(item);
		return true;
	}else{
		return false;
	}
};

function updateItem(updatedItem){
	var index = findById(updatedItem['id']);
	if(index == -1){
		return false;
	}else{
		db[index] = updatedItem;
		return true;
	}
};

function removeById(id){
	var index = findById(id);
	if(index == -1){
		return false;
	}else{
		db.splice(index, 1);
		return true;
	}
};

function removeAll(){
	db.splice(0, db.length);
	return true;
};

module.exports = {
	'getAll' : getAll,
	'getById' : getById,
	'insertItem': insertItem,
	'updateItem': updateItem,
	'removeById' : removeById,
	'removeAll' : removeAll
};
