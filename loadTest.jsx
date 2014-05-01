
var document = app.activeDocument;


var csvData = {
    "master" : ["A-Master", "B-Master", "C-Master"],
    "numberOfRows" : 3
};

document = loadPagesAndOverrideElements(document, csvData);


function loadPagesAndOverrideElements(document, csvData) {
    // add pages defined in CSV and correct layout
    for (var i=0; csvData.numberOfRows>i; i++) {
        var masterSpread = document.masterSpreads.itemByName(csvData["master"][i]);

        document.pages.add();
        document.pages[i+1].appliedMaster = masterSpread;
        var allItems = document.pages[i+1].appliedMaster.pageItems.everyItem().getElements();

        for(var j=0;j<allItems.length;j++){
            try {
            	var bounds = allItems[j].geometricBounds
                
                //Get x and y of position:
                var xB = bounds[1];
                var yB = bounds[0];

                var obj = allItems[j].override(document.pages[i+1]);

                //Move object to original position:
                obj.move([xB,yB]);
            } catch(e) {
                // alert(e);
            }
        }
    }

    document.pages[0].remove();

    return document;
}