import AJAX from '../lib/ajax.js';

export const get = (url,callback) => {
	AJAX.get(url,callback);
}