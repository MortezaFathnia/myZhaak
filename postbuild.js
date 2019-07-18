var mv = require("mv");
console.log(1222);
mv("./build/static/", "./build/staticpanel", function(err) {
  console.log(err);
  // done. it tried fs.rename first, and then falls back to
  // piping the source file to the dest file and then unlinking
  // the source file.
});
