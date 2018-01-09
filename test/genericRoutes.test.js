const request = require('request-promise-native');
const baseUrl = 'https://softeng2exam.herokuapp.com/v1/collection';   // 'http://127.0.0.1:3000/v1/collection/';

const genericObjectExample = {
	"id": "100000000",
	"field1": "ciao",
	"field2": "come",
	"field3": "stai"
};
const updatedGenericObjectExample = {
	"id": "100000000",
	"field1": "ciao",
	"field2": "come",
	"field3": "va"
};

test('right post of new genericObject', () => {
	expect.assertions(1);
	return request.post(baseUrl,{
		form: genericObjectExample
	}).then( (res) => {
		return JSON.parse(res);
	}).then( (response) => {
		expect(response).toEqual({
			message: 'Element successfully inserted.'
		});
	});
});

test('post of new genericObject without all required fields', () => {
	expect.assertions(2);
	return request.post(baseUrl,{
		form: {
			"id": "100000001",
			"field1": "albero",
			"field2": "verde"
		}
	}).catch( (errorResponse) => {
		expect(errorResponse["statusCode"]).toBe(500);
		var error = JSON.parse(errorResponse["error"])
		expect(error).toEqual({
			error: {
				message: 'Not all required fields have been specified!'
			}
		})
	});
});

test('post of new genericObject with existent id', () => {
	expect.assertions(2);
	return request.post(baseUrl,{
		form: {
			"id": "100000000",
			"field1": "albero",
			"field2": "verde",
			"field3": "smeraldo"
		}
	}).catch( (errorResponse) => {
		expect(errorResponse["statusCode"]).toBe(500);
		var error = JSON.parse(errorResponse["error"])
		expect(error).toEqual({
			error: {
				message: 'Element already Inserted'
			}
		})
	});
});

test('get of genericObject collection', () => {
	expect.assertions(2);
	return request.get(baseUrl)
		.then( (res) => {
			return JSON.parse(res);
		}).then( (response) => {
			expect(response).toEqual(expect.any(Array));
			expect(response).toContainEqual(genericObjectExample);
		});
});

test('get of existent genericObject', () => {
	expect.assertions(1);
	return request.get(baseUrl+'/100000000')
		.then( (res) => {
			return JSON.parse(res);
		}).then( (response) => {
			expect(response).toEqual(genericObjectExample);
		});
});

test('get of unexistent genericObject', () => {
	expect.assertions(2);
	return request.get(baseUrl+'/100000001')
		.catch( (errorResponse) => {
			expect(errorResponse["statusCode"]).toBe(500);
			var error = JSON.parse(errorResponse["error"])
			expect(error).toEqual({
				error: {
					message: 'Element not Found'
				}
			})
		});
});

test('update of existent genericObject', () => {
	expect.assertions(2);
	return request.put(baseUrl+'/100000000',{
		form: {
			"field1": "ciao",
			"field2": "come",
			"field3": "va"
		}
	}).then( (res) => {
		return JSON.parse(res);
	}).then( (response) => {
		expect(response).toEqual({
			message: 'Element successfully updated.'
		});
		return request.get(baseUrl+'/100000000');
	}).then( (genericObjectResponse) => {
		return JSON.parse(genericObjectResponse);
	}).then( (genericObject) => {
		expect(genericObject).toEqual(updatedGenericObjectExample);
	});
});

test('update of existent genericObject without all required fields', () => {
	expect.assertions(2);
	return request.put(baseUrl+'/100000000',{
		form: {
			"field1": "albero",
			"field2": "verde"
		}
	}).catch( (errorResponse) => {
		expect(errorResponse["statusCode"]).toBe(500);
		var error = JSON.parse(errorResponse["error"])
		expect(error).toEqual({
			error: {
				message: 'Not all required fields have been specified!'
			}
		})
	});
});

test('update of unexistent genericObject', () => {
	expect.assertions(2);
	return request.put(baseUrl+'/100000001',{
		form: {
			"field1": "albero",
			"field2": "verde",
			"field3": "smeraldo"
		}
	}).catch( (errorResponse) => {
		expect(errorResponse["statusCode"]).toBe(500);
		var error = JSON.parse(errorResponse["error"])
		expect(error).toEqual({
			error: {
				message: 'Element not Found'
			}
		})
	});
});

test('delete of existent genericObject', () => {
	expect.assertions(3);
	return request.delete(baseUrl+'/100000000')
		.then( (res) => {
			return JSON.parse(res);
		}).then( (response) => {
			expect(response).toEqual({
				message: 'Element successfully deleted.'
			});
			return request.get(baseUrl+'/100000000');
		}).catch( (errorResponse) =>{
			expect(errorResponse["statusCode"]).toBe(500);
			var error = JSON.parse(errorResponse["error"])
			expect(error).toEqual({
				error: {
					message: 'Element not Found'
				}
			})
		});
});

test('delete of unexistent genericObject', () => {
	expect.assertions(2);
	return request.delete(baseUrl+'/100000000')
		.catch( (errorResponse) =>{
			expect(errorResponse["statusCode"]).toBe(500);
			var error = JSON.parse(errorResponse["error"])
			expect(error).toEqual({
				error: {
					message: 'Element not Found'
				}
			})
		});
});

/* Don't use this test case on the production server!!!

test('delete of genericObject collection', () => {
	expect.assertions(3);
	return request.delete(baseUrl)
		.then( (res) => {
			return JSON.parse(res);
		}).then( (response) => {
			expect(response).toEqual({
				message: 'Collection successfully deleted.'
			});
			return request.get(baseUrl);
		}).then( (res) => {
			return JSON.parse(res);
		}).then( (response) => {
			expect(response).toEqual(expect.any(Array));
			expect(response.length).toBe(0);
		});
});

*/
