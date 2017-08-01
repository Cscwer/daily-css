// ls.js
var ls = {}; 

ls.save = (key, data) => (
	window.localStorage.setItem(key, JSON.stringify(data))
)

ls.get = key => (
	JSON.parse(
		window.localStorage.getItem(key)
	)
)

module.exports = ls; 
