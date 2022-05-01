var path = require("path");
var fs = require("fs");
var lunr = require("lunr");
var cheerio = require("cheerio");

// Change these constants to suit your needs
var HTML_FOLDER = "client/public/docs"
const EXCLUDE_DIRECTORIES = ["design", "procedures"];
console.log('EXCLUDE_DIRECTORIES=',EXCLUDE_DIRECTORIES);
const EXCLUDE_FILES = [];
console.log('EXCLUDE_FILES=',EXCLUDE_FILES);
const LUNR_INDEX = "lunr_index.json";  // Index file
console.log('LUNR_INDEX=',LUNR_INDEX);
const LUNR_PAGES = "lunr_pages.json";  // Index file
console.log('LUNR_PAGES=',LUNR_PAGES);


function isHtml(filename) {
    lower = filename.toLowerCase();
    return (lower.endsWith(".htm") || lower.endsWith(".html"));
}


function findHtml(folder) {
    if (!fs.existsSync(folder)) {
        console.log("Could not find folder: ", folder);
        return;
    }

    var files = fs.readdirSync(folder);
    var htmls = [];
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(folder, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
//            console.log('filename=',filename);
            if (EXCLUDE_DIRECTORIES.includes(filename.substring(HTML_FOLDER.length+1))) continue;
            var recursed = findHtml(filename);
            for (var j = 0; j < recursed.length; j++) {
                recursed[j] = path.join(files[i], recursed[j]).replace(/\\/g, "/");
            }
            htmls.push.apply(htmls, recursed);
        }
        else if (isHtml(filename) && !EXCLUDE_FILES.includes(files[i])) {
            htmls.push(files[i]);
        };
    };
    return htmls;
};


function readHtml(root, file, fileId) {
    var filename = path.join(root, file);
    var txt = fs.readFileSync(filename).toString();
    var $ = cheerio.load(txt);
//    var title = $("title").text();
//    if (typeof title == 'undefined') title = file;
//    var description = $("meta[name=description]").attr("content");
//    if (typeof description == 'undefined') description = "";
//    var keywords = $("meta[name=keywords]").attr("content");
//    if (typeof keywords == 'undefined') keywords = "";
//    var content = $("body").text()
//    if (typeof content == 'undefined') content = "";
    var title = $("h1:last").text();
    if (typeof title == 'undefined') {
        title = "";
    } else {
        $("h1:last").remove(); // Remove title's text so doesn't get added to the content's text below
    }
    var description = "";
    var keywords = "";
    var content = $("section:last").text();
    if (typeof content == 'undefined') content = "";
    var data = {
        "id": fileId,
        "href": file,
        "title": title,
        "description": description,
        "keywords": keywords,
        "content": content,
    }
    return data;
}


function buildIndex(docs) {
    var idx = lunr(function () {
        this.ref('href');
        this.field('title', {boost: 10});
        this.field('description');
        this.field('keywords');
        this.field('content');
        this.metadataWhitelist = ['position']
        docs.forEach(function (doc) {
                this.add(doc);
            }, this);
        });
    return idx;
}


function buildPreviews(docs) {
    var result = [];
    for (var i = 0; i < docs.length; i++) {
        var doc = docs[i];
//        var preview = doc["description"];
//        if (preview == "") preview = doc["body"];
//        if (preview.length > MAX_PREVIEW_CHARS)
//            preview = preview.slice(0, MAX_PREVIEW_CHARS) + " ...";
        result[doc["id"]] = {
            "title": doc["title"],
            "description": doc["description"],
            "content": doc["content"],
            "href": doc["href"],
            "id": doc["id"]
        }
    }
    return result;
}


function main() {
    if (process.argv.length > 2) HTML_FOLDER=process.argv.slice(2)[0];
    console.log('HTML_FOLDER=',HTML_FOLDER);
    files = findHtml(HTML_FOLDER);
    var docs = [];
    console.log("Building index for these files:");
    for (var i = 0; i < files.length; i++) {
        console.log("    " + files[i]);
        docs.push(readHtml(HTML_FOLDER, files[i], i));
    }
    var idx = buildIndex(docs);
    var previews = buildPreviews(docs);
//    var js = "const LUNR_DATA = " + JSON.stringify(idx) + ";\n" + 
//             "const PREVIEW_LOOKUP = " + JSON.stringify(previews) + ";";
//    fs.writeFile(OUTPUT_INDEX, js, function(err) {
//        if(err) {
//            return console.log(err);
//        }
//        console.log("Index saved as " + OUTPUT_INDEX);
//    }); 
    var index_json = JSON.stringify(idx, null, 2);
    fs.writeFile(LUNR_INDEX, index_json, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Index saved as " + LUNR_INDEX);
    }); 
    var pages_json = JSON.stringify(previews, null, 2);
    fs.writeFile(LUNR_PAGES, pages_json, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Pages saved as " + LUNR_PAGES);
    }); 
}

main();