var http = require('http');
var fs = require('fs');

var options = {
    host: 'people.sc.fsu.edu',
    path: '/~jburkardt/data/ply/airplane.ply',
    port: '80'
};

callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        var list = str.split("\n"),
            data = [],
            isPolygon = false;

        for(var i = 0; i < list.length; i++) {
            if(isPolygon) {
                var points = list[i].split(" ");

                if(points && points.length == 4) {
                    data.push({ x: points[0], y: points[1], z: points[2] });
                }
            }

            if(list[i].indexOf("end_header") != -1)
                isPolygon = true;
        }

        var buffer = [];

        buffer.push("{");
        buffer.push("\t\"data\": [");
        for(var i = 0; i < data.length; i++) {
            buffer.push("\t\t{ \"x\":" + data[i].x + ", \"y\":" + data[i].y + ", \"z\": " + data[i].z + " },");
        }
        buffer.push("\t]");
        buffer.push("}");

        fs.writeFile("polygon.json", buffer.join("\n"), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    });
}

var req = http.request(options, callback);
req.end();