//module.exports.index = function(req, res){
//	res.render('index', {name: 'wez'});
//};




module.exports.about = function (req, res) {
    res.render('about', {
        name: 'derp',
        info: 'i like turtles...',
        things: ['monsters', 'certain sounds', 'asdf']
    });
};



module.exports.contact = function (req, res) {
    res.render('contact');
};









var mysql = require('../models/mysql.js');


//NEW PROJECT


module.exports.process = function (req, res) {
    mysql.getConnection(function (err, con) {




        con.query("INSERT INTO projects (title, client, startdate, enddate, notes) VALUES ( " + "'" + req.body.title + "'," + "'" + req.body.client + "', '" + req.body.SD + "', '" + req.body.ED + "' , '" + req.body.notes + "' )");
        //        insert into projects (title, hours, notes, project_id) values ('design', 2, 'mockups in the works',1001);
    });
    res.redirect('/');
};









//DELETE TASK





module.exports.deleteTask = function (req, res) {
    var id = req.params.id;
    mysql.getConnection(function (err, con) {


        console.log(id);

        

        con.query("DELETE FROM tasks WHERE id =" + id, function (err, result) {
            if (err) throw err;

            console.log("DELETE FROM tasks WHERE id =" + id);
                        
            console.log('Deleted ' + result.affectedRows + ' rows');
            res.sendStatus(202);


        });

        
    });
};



//DELETE PROJECT

module.exports.deleteProject = function (req, res) {
    var id = req.params.id;
    mysql.getConnection(function (err, con) {


        console.log(id + "in delete project controller");



        con.query("DELETE FROM projects WHERE id =" + id, function (err, result) {
            if (err) throw err;

            console.log("DELETE FROM tasks WHERE id =" + id);

            console.log('Deleted ' + result.affectedRows + ' rows');
           
          
        });
        
     


    });
};



















//HOME PAGE




module.exports.index = function (req, res) {


    mysql.getConnection(function (err, con) {
        con.query('Select * from projects', function (err, project) {
            if (err) throw err;
           
            

            res.render('index', {
                row: project
            });
        });
    });
};









// GET TASKS ASSOCIATED TO THE PROJECT 


module.exports.tasks = function (req, res) {
    var project_id = req.params.id;
  
    



    mysql.getConnection(function (err, con) {
        con.query('Select * from tasks WHERE project_id = ' + project_id, function (err, tasks) {

           
            
            if (err) throw err;

            mysql.getConnection(function (err, con) {
                con.query('Select * from projects WHERE id = ' + project_id, function (err, project) {

                 
                    
                    if (err) throw err;

                    res.render('tasks', {
                        tasks: tasks,
                        row: project
                    });
                });




            });
        });
    });
};








//EDIT TASK


module.exports.editTask = function (req, res) {
    
    

    console.log(req.body);

    mysql.getConnection(function (err, con) {


        
        


        con.query('UPDATE tasks SET ? WHERE id = ?', [{
            title: req.body.title,
            hours: req.body.hours,
            notes: req.body.notes
        }, req.body.id], function (err, asdf) {



            if (err) throw err;






            res.sendStatus(202);
         
            

            

        });


    });

};




//NEW TASK



module.exports.newTask = function (req, res) {
    mysql.getConnection(function (err, con) {


        console.log(req.body);

        con.query("INSERT INTO tasks (title, hours, notes, project_id) VALUES ( " + "'" + req.body.title + "'," + req.body.hours + ", '" + req.body.notes + "', " + req.body.project_id + ")");
        
        if (err) throw err;
        
        res.sendStatus(202);
    });
   
};
























































module.exports.images = function (req, res) {

    var slides = require('../routes/slides');

    // var s = [];
    // for (var i = 0; i < slides.getSlides(); i++){
    // 	console.log(getSlides[i]);
    // 	s.push(slides.getSlides[i]);
    // 	re
    // }



    var slideShow = slides.getSlides();
    console.log(slideShow[1].name);


    var numb = req.params.num;
    console.log(slideShow[numb].imageLocation);


    res.render('images', {
        name: slideShow[numb].name,
        img: slideShow[numb].imageLocation

    });



};









// app.get('/image/:img', function(req, res){
//   var fileName = req.params.img + ".jpg";

//   res.sendFile(fileName,
//     {root : __dirname + '/public/images'},
//     function(err){
//       if(err){
//         res.send('No such image');
//       }
//     });
// });
