const fs = require('fs');
const path = require('path');

var logger = (text,file_location,position) => {

	var log_path = path.join(__dirname,'../','/logs');

	return new Promise((resolve,reject) => {
		fs.readdir(log_path,function(error,directory){
			if(error){
				reject(error);
			}else{
				resolve(directory);
			}
		})
	})
	.then(directory => {

		return new Promise((resolve,reject) => {
			// create a log file
			var errorDate = new Date().toISOString();
			var string = "\n[" + errorDate + "] : \n";
			string += text + "\nError At : " + position + "\nFile Location : " + file_location
				
			// check if there is any file in the Directory
			if(directory.length > 0){
				var logFile = '';
				directory.forEach(filename => {

					// check if there is any file in the given path smaller then 2MB
					var stats = fs.statSync(path.join(log_path,filename));
					console.log(Math.round(stats.size / 1000000),2*1000000);
					if(Math.round(stats.size / 1000000) < 2*1000000)
					{
						logFile = filename;
					}
				})

				if(logFile){
					var fileData = fs.readFileSync(path.join(log_path,logFile));

					// add latest error on the top of the file so that user don't have to scroll down
					string = string + "\n" + fileData;
				}else{
					// create new log file
					logFile = 'development' + '-' + directory.length + '.log';
				}

				fs.writeFile(path.join(log_path,logFile),string,'utf-8',function(error,success){
					if(error){
						reject(error);
					}else{
						resolve(success);
					}
				})
			}else{
				fs.writeFile(path.join(log_path,'development.log'),string,'utf-8',function(error,success){
					if(error){
						reject(error);
					}else{
						resolve(success);
					}
				})
			}
		})
	})
	.catch(error => {
		console.log('Error in logging the errors in log file: ', error);
	})

}
module.exports = logger;
