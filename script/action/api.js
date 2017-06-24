import AJAX from '../lib/ajax.js';

export const get = (url,callback) => {
	AJAX.get(url,callback);
}

export const post = (url,body,callback) => {
	AJAX.post(url,callback);
}