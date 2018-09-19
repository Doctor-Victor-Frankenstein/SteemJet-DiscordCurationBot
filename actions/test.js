const fs = require('fs');

var author = "elith";

fs.readFile('./blacklist.txt', 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            else{
                var testing = data.indexOf(author);

                if(testing != -1){
                    setup = 1;
                    return console.log("true");
                }
                else{
                    return console.log("false");
                }
                
            }
        });