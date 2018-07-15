function haha(user) {
    console.log(user)
}

function makeDropDown (api_ranges, items, dropdown_class) {
    // parsing the data into JSON
    var items_json = []
    for (var i = 0; i < items.length; i++) {
        items_json.push(JSON.parse(items[i]))
    }

    var time_ranges = ["of a few weeks", "of half a year", "of all time"]

    // making the drop down
    var dropdown = d3.select("." + dropdown_class)
        .append('select')
            .attr('class','select')
            .on('change', onchange)

    var options = dropdown.selectAll('option')
            .data(time_ranges)
            .enter()
            .append('option')
                .text(function (d) { return d; });

    // remove current collage, make new one
    function onchange() {
        var selected = d3.select("." + dropdown_class + " select").property('value')
        var new_collage_items = items_json[time_ranges.indexOf(selected)]
        
        var collage = d3.select(".collage-" + dropdown_class + "-art")
        var overlay = d3.select(".overlay-" + dropdown_class)
        
        var html_string_collage = ""
        var html_string_overlay = ""

        if (dropdown_class == "artists") {
            //collage
            for (var i = 0; i < new_collage_items.length; i++) {
                html_string_collage += "<img class='artwork' src=" + new_collage_items[i].images[0].url + ">"
            }

            //overlay
            for (var i = 0; i < new_collage_items.length; i++) {
                html_string_overlay += new_collage_items[i].name + "<p>"
            }
        } else {
            for (var i = 0; i < new_collage_items.length; i++) {
                html_string_collage += "<img class='artwork' src=" + new_collage_items[i].album.images[0].url + ">"
            }

            //overlay
            for (var i = 0; i < new_collage_items.length; i++) {
                html_string_overlay += new_collage_items[i].name + " - " + new_collage_items[i].artists[0].name + "<p>"
            } 
        }
           
        collage.html(html_string_collage)
        overlay.html(html_string_overlay)
            
    }
}