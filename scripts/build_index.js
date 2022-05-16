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
const SENTENCE_SEPARATOR = ' <> ';

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


function readHtml(root, file) {
    var filename = path.join(root, file);
    var txt = fs.readFileSync(filename).toString();
    var $ = cheerio.load(txt);
    var highlight_text = $("section").text()
    var title = $("h1:last").text();
    if (typeof title == 'undefined') {
        title = "";
    } else {
        $("h1:last").remove(); // Remove title's text so doesn't get added to the sentence_text's below
    }
    var sentence_text = SENTENCE_SEPARATOR;
    $("section:last").children().each(function(i,elm) {
      if (elm.type === "text") { // Direct text
        let line = $(this).text().replace(/\s+/g,' ').replace(/\r?\n/g,' ');
        if (line === '') return;
//        console.log('0\tline=',line);
        sentence_text += line + SENTENCE_SEPARATOR;
      } else if (elm.type === "tag" && elm.name === "p") { // Per Sentence, split on /\b\.\s/
          let split_text = $(this).text().replace(/\s+/g,' ').replace(/\r?\n/g,' ').split(/\b\.\s/);
          for (let text of split_text) {
            if (text.trim() === '') continue;
            let line = text.trim();
            if (!line.endsWith('.') && !line.endsWith(':')) {
              line += '.';
            }
//            console.log('1\tline=',line.trim());
            sentence_text += line.trim() + SENTENCE_SEPARATOR;
          }
      } else if (elm.type === "tag" && (elm.name === "ul" || elm.name === "ol")) { // Per li (1st level)
        $(this).children().each(function(i,elm) {
          let line = $(this).text().replace(/\s+/g,' ').replace(/\r?\n/g,' ').trim();
          if (line === '') return;
//          console.log('2\tline=',line);
          sentence_text += line + SENTENCE_SEPARATOR;
        })
      } else if (elm.type === "tag" && elm.name === "pre") { // Per Code line, split on /\r?\n/
        $(this).children().each(function(i,elm) {
          let split_text = $(this).text().split(/\r?\n/);
          for (let text of split_text) {
            let line = text.replace(/\s+/g,' ').trim();
            if (line === '') continue;
//            console.log('3\tline=',line);
            sentence_text += line + SENTENCE_SEPARATOR;
          }
        })
      } else if (elm.type === "tag" && elm.name === "table") { // Per Row (2nd level)
        $(this).children().each(function(i,elm) {
          $(this).children().each(function(i,elm) {
            let line = $(this).text().replace(/\s+/g,' ').replace(/\r?\n/g,' ').trim();
            if (line === '') return;
//            console.log('4\tline=',line);
            sentence_text += line + SENTENCE_SEPARATOR;
          })
        })
      } else { // Anything else sicj as h1-hN just get its text'
        let line = $(this).text().replace(/\s+/g,' ').replace(/\r?\n/g,' ').trim();
        if (line === '') return;
//        console.log('5\tline=',line);
        sentence_text += line + SENTENCE_SEPARATOR;
      }
    });
//    console.log('sentence_text=',sentence_text);
    var data = {
        "href": file,
        "title": title,
        "sentence_text": sentence_text,
        "highlight_text": highlight_text,
    }
    return data;
}


function buildIndex(docs) {
    var idx = lunr(function () {
        this.ref('href');
        this.field('title', {boost: 10});
        this.field('sentence_text');
        this.field('highlight_text');
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
        result [i] = {
            "title": doc["title"],
            "sentence_text": doc["sentence_text"],
            "highlight_text": doc["highlight_text"],
            "href": doc["href"]
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
        docs.push(readHtml(HTML_FOLDER, files[i]));
    }
    var idx = buildIndex(docs);
    var previews = buildPreviews(docs);
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