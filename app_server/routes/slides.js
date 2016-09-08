
function Slide(name, imageLocation){
    this.name = name;
    this.imageLocation = imageLocation;
}

var slide1 = new Slide("lol", "/img/lol.jpg");
var slide2 = new Slide("troll", "/img/troll.jpg");
var slide3 = new Slide("y-u-no-guy", "/img/y-u-no-guy.jpg");




var slides = [slide1, slide2, slide3];




// var template = Handlebars.compile(source);
// var wrapper  = {objects: slides};

// console.log(template(wrapper));





// var slidesObj = {
//     slideShow: slides
// };



module.exports.getSlides = function() {
    return slides;
};