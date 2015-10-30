var NameGenerator;
(function (NameGenerator) {
    //defaults
    var randomNamesList = [
        "Anders Hejlsberg", "Ted Henter", "Andy Hertzfeld", "Rich Hickey", "Grace Hopper", "Dave Hyatt", "Miguel de Icaza", "Roberto Ierusalimschy", "Dan Ingalls",
        "Toru Iwatani", "Bo Jangeborg", "Paul Jardetzky", "Lynne Jolitz", "William Jolitz", "Bill Joy", "Mitch Kapor", "Phil Katz", "Alan Kay", "Mel Kaye",
        "Brian Kernighan", "Dennis Ritchie", "Jim Knopf", "Andre LaMothe", "Leslie Lamport", "Butler Lampson", "Sam Lantinga", "Chris Lattner", "Samuel J Leffler",
        "Rasmus Lerdorf", "Linus torvalds"
    ];
    //List_of_programming_language_researchers
    //TODO Remove live link to wikipead if I put this live
    var nameDataSrc = "http://en.wikipedia.org/w/api.php?format=json&action=query&titles=List_of_programmers&prop=revisions&rvprop=content";
    // var nameDataSrc = "wikilocal.html";
    function init(callback) {
        //$.ajax({
        //    url: nameDataSrc,
        //    dataType: 'jsonp',
        //    success: function (data) =>
        //    {
        //        randomNamesList = [];
        //        randomNamesList = JSON.stringify(data).match(new RegExp("\\*\\[\\[[A-Z,a-z, ]+]]", "g"))
        //        for (var name in randomNamesList)
        //        {
        //            randomNamesList[name] = randomNamesList[name].replace("*", "");
        //            randomNamesList[name] = randomNamesList[name].replace(/\[/g, "")
        //            randomNamesList[name] = randomNamesList[name].replace(/]/g, "");
        //        }
        //        callback();
        //    }
        //});
    }

    NameGenerator.init = init;
    function randomName() {
        if (randomNamesList.length == 0)
            return "Error with genertor";
        return Utilies.pickUnqine(randomNamesList, "names");
    }

    NameGenerator.randomName = randomName;
})(NameGenerator || (NameGenerator = {}));
