const fs = require('fs');
const path = require("path");

var lang = (str) => {

    var langDir = path.join(__dirname,'../','languages');

    try{
        // read the directory to get the language file list.
        var directory = fs.readdirSync(langDir);
        if(typeof(directory) == 'undefined' || directory.length == 0){
            throw(new Error('No language files are present'));
        }else{
            var langCode = typeof(app.locals.lang_code) != 'undefined' ? app.locals.lang_code : 'en';

            // check if file exists in the directoy
            if(!directory.includes(langCode + '.json') || !fs.existsSync(path.join(langDir,'/',langCode + '.json')))
            {
                throw(new Error('Failed to load language file'))
            }else{
                // read the file
                var strConst = require(path.join(langDir,'/', langCode));
                if(typeof(strConst) !== 'object' || Object.keys(strConst).length == 0){
                    throw(new Error('Invalid file i.e :' + path.join(langDir,'/','en-GB.json')));
                }else{
                    // check if constant is present in the file
                    if(typeof(strConst[str]) == "undefined"){
                        throw(new Error('String constant i.e. ' + str + ' not found in the file ' + path.join(langDir,'/','en-GB.json')));
                    }else{
                        return strConst[str];
                    }
                }
            }
        }
    }catch(e){
        JLog(e.toString(), __filename, __line);
        return str;
    }
}

module.exports = lang;