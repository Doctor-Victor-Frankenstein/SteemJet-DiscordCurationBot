const fs = require('fs');


fs.readFile('./blacklist', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            else{
                var testing = data.indexOf("dames");
                console.log(testing);
                if(testing == -1){
                    return console.log(false);
                }
                else{
                    return console.log(true);
                }
                
            }
        });