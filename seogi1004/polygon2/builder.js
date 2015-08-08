var fs = require('fs');
var path = '../polygon/resources/';

fs.readdir(path, function (err, files) {
    if(err) throw err;

    files.forEach(function(file) {
        var fPath = path + file;

        if(fPath.indexOf(".ply") != -1) {
            var file = fs.readFileSync(fPath, "utf8"),
                name = fPath.split(".ply").join(".json");

            createJSONFile(name, file.toString());
        }
    });
});

function createJSONFile(name, str) {
    var list = str.split("\n"),
        vertices = [],
        faces = [],
        isPolygon = false;

    for(var i = 0; i < list.length; i++) {
        if(isPolygon) {
            var points = list[i].split(" ");

            if(points) {
                if(points.length > 4) {
                    var face = [];

                    for(var j = 1; j < points.length - 1; j++) {
                        face.push(points[j]);
                    }

                    faces.push(face);
                } else if(points.length == 4) {
                    vertices.push({ x: points[0], y: points[1], z: points[2] });
                }
            }
        }

        if(list[i].indexOf("end_header") != -1)
            isPolygon = true;
    }

    fs.readFile("builder.tpl", "utf8", function(err, data) {
        if(err) {
            return console.log(err);
        }

        var text = data.toString(),
            buffer = [],
            newName = name.split("../polygon/resources/").join("").split(".json").join("");

        // 1. 이름 변경
        text = text.replace("${name}", newName);

        // 2. Vertex 변경
        for(var i = 0; i < vertices.length; i++) {
            var d = "\t\t\t{ \"x\":" + vertices[i].x + ", \"y\":" + vertices[i].y + ", \"z\":" + vertices[i].z + " }";
            buffer.push(d + ((i < vertices.length - 1) ? "," : ""));
        }
        text = text.replace("${vertices}", buffer.join("\n"));
        buffer = [];

        // 3. Face 변경
        for(var i = 0; i < faces.length; i++) {
            var d = "\t\t\t[ " + faces[i].join(", ") + " ]";
            buffer.push(d + ((i < faces.length - 1) ? "," : ""));
        }
        text = text.replace("${faces}", buffer.join("\n"));

        // 4. 파일 저장
        fs.writeFile("js/" + newName + ".js", text, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("'js/" + newName + ".js' created!!!");
        });
    });
}