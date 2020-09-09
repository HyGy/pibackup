const drivelist = require('drivelist');

const myfunction = async function(x, y) {

	const drives = await drivelist.list();
	console.log(drives);


}

// Start function
const start = async function() {
	const result = await myfunction('test', 'test');

}

// Call start
start();


