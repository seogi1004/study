var fs = require('fs');
var path = 'resources/';

fs.readdir(path, function (err, files) {
    if(err) throw err;

    var fNames = [];
    fNames.push("var samples = [\n");

    files.forEach(function(file) {
        var fPath = path + file;

        if(fPath.indexOf(".ply") != -1) {
            var file = fs.readFileSync(fPath, "utf8"),
                name = fPath.split(".ply").join(".json");

            createJSONFile(name, file.toString());
            fNames.push("\t\"" + name + "\",\n");
        }
    });

    fNames.push("];");
    fs.writeFile("samples.js", fNames.join(""), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("'index.js' created!!!");
    });
});

function createJSONFile(name, str) {
    var list = str.split("\n"),
        data = [],
        data2 = [],
        isPolygon = false,
        minX = 9999999,
        maxX = 0,
        minY = 9999999,
        maxY = 0;

    for(var i = 0; i < list.length; i++) {
        if(isPolygon) {
            var points = list[i].split(" ");

            if(points) {
                if(points.length > 4) {
                    var face = [];

                    for(var j = 1; j < points.length - 1; j++) {
                        face.push(points[j]);
                    }

                    data2.push(face);
                } else if(points.length == 4) {
                    if(points[0] > maxX) maxX = points[0];
                    if(points[1] > maxY) maxY = points[1];
                    if(points[0] < minX) minX = points[0];
                    if(points[1] < minY) minY = points[1];

                    data.push({ x: points[0], y: points[1], z: points[2] });
                }
            }
        }

        if(list[i].indexOf("end_header") != -1)
            isPolygon = true;
    }

    var buffer = [];

    buffer.push("{");
    buffer.push("\t\"x\": { \"min\":" + minX + ", \"max\":" + maxX + " },");
    buffer.push("\t\"y\": { \"min\":" + minY + ", \"max\":" + maxY + " },");

    buffer.push("\t\"points\": [");
    for(var i = 0; i < data.length; i++) {
        var d = "\t\t{ \"x\":" + data[i].x + ", \"y\":" + data[i].y + ", \"z\":" + data[i].z + " }";
        buffer.push(d + ((i < data.length - 1) ? "," : ""));
    }
    buffer.push("\t],");

    buffer.push("\t\"faces\": [");
    for(var i = 0; i < data2.length; i++) {
        var d = "\t\t[ " + data2[i].join(", ") + " ]";
        buffer.push(d + ((i < data2.length - 1) ? "," : ""));
    }
    buffer.push("\t]");

    buffer.push("}");

    fs.writeFile(name, buffer.join("\n"), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("'" + name + "' created!!!");
    });
}