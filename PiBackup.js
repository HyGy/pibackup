/* PiBackup is the guiding force and deity of Pandora and the Na'vi. */


class PiBackup {


	constructor() {

		this.fs = require('fs');

		this.config = {
			verbose: false,
			basePath: null,
			applicationEnv: {}
		};

		this.iniConfig = null; // this holds the pm application configuration values from the per site config file


		console.log('app started');

		var usbDetect = require('usb-detection');
		this.drivelist = require('drivelist');

		usbDetect.startMonitoring();
		this.checkUSBintervalID=null;

		// Detect add/insert
		usbDetect.on('add', this.addUSBhandler );
//		usbDetect.on('add:vid', function(device) { console.log('add', device); });
//		usbDetect.on('add:vid:pid', function(device) { console.log('add', device); });

		// Detect remove
		usbDetect.on('remove', function(device) { console.log('remove', device); });
//		usbDetect.on('remove:vid', function(device) { console.log('remove', device); });
//		usbDetect.on('remove:vid:pid', function(device) { console.log('remove', device); });

		// Detect add or remove (change)
		//usbDetect.on('change', function(device) { console.log('change', device); });
		//usbDetect.on('change:vid', function(device) { console.log('change', device); });
		//usbDetect.on('change:vid:pid', function(device) { console.log('change', device); });

		// Allow the process to exit
		//usbDetect.stopMonitoring()		

	}

	writeDebug(msg) {
		if (this.config.verbose) { process.stdout.write(msg+"\n"); }
	}

	addUSBhandler() {
		console.log('added event listener for usb ADD');
		var me=this;
		// Start interval to check if the USB is mounted
		this.checkUSBintervalID = setInterval(function() {
			this.writeDebug(me);
			this.drivelist.list(function(error, drives) {
				console.log('listening for USB mount...');
				if (error) { throw error; }

				// iterate through all drives
				for(var d = 0; d < drives.length; d++) {

					// if the drive is a removable usb
					if(drives[d].system == false) { 

						// if this drive is mounted
						if(drives[d].mountpoints.length > 0) {
							console.log('found removable USB');
							// the drive is mounted
							// do stuff here
							// the path is at drives[d].mountpoints[0].path
							clearInterval(checkUSBintervalID);
						}
					}
				}
			});
		}, 1000, this);
	}
}



module.exports = new PiBackup(); 

