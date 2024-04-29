const Express = require('express')
const App = Express()
const Mysql = require('mysql')
const Cors = require('cors')

App.use(Cors());
App.use(Express.json())





//connection
const Database = Mysql.createConnection({
        user:'uu4koa2rhixncrla',
        password: 'IidJpge9j1vJRGwfOVT4',
        host: 'baxikjjjyfxps6eisyo2-mysql.services.clever-cloud.com',
        database: 'baxikjjjyfxps6eisyo2'

    }
)


App.get("/students", (req, res) => {
    Database.query("SELECT * FROM  student_info", (err, result) => {
        err ? console.log(err) : res.send(result)
    })
})





App.post("/CreateStudent", (req, res) => {


    const {last_name,first_name,middle_name,sex, place_of_birth, month, day, year, permanent_address, lrn, email, MCMG, citizenship, phone_number, Religion,Campus}= req.body
    Database.query( "INSERT INTO student_info (last_name, first_name,middle_name, sex, place_of_birth, _month, _day, _year, permanent_address, lrn, email, MCMG, citizenship, phone_number, Religion,Campus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)",
        [last_name, first_name, middle_name, sex, place_of_birth, month, day, year, permanent_address, lrn, email, MCMG, citizenship, phone_number, Religion,Campus
        ], (err, result) => {
            err ? console.log(err) :res.status(200).json({ message: "Student inserted successfully" ,success: true});
        })


   })


App.post("/UpdateStudent/:id", (req, res) => {
    const UpdateId = req.params.id


    const {
        last_name,
        first_name,
        middle_name,
        sex,
        place_of_birth,
        month,
        day,
        year,
        permanent_address,
        lrn,
        email,
        MCMG,
        citizenship,
        phone_number,
        Religion,
        Campus
    } = req.body;

    Database.query(
        "UPDATE student_info SET last_name=?, first_name=?, middle_name=?, sex=?, place_of_birth=?, _month=?, _day=?, _year=?, permanent_address=?, lrn=?, email=?, MCMG=?, citizenship=?, phone_number=?, Religion=?, Campus=? WHERE id=?",
        [
            last_name,
            first_name,
            middle_name,
            sex,
            place_of_birth,
            month,
            day,
            year,
            permanent_address,
            lrn,
            email,
            MCMG,
            citizenship,
            phone_number,
            Religion,
            Campus,
            UpdateId
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Failed to update student information", success: false });
            } else {
                res.status(200).json({ message: "Student information updated successfully", success: true });
            }
        }
    );


})




//delete data using delete method
App.delete("/DeletePost/:id", (req, res) => {
    const DeleteId = req.params.id
    console.log(DeleteId)
    Database.query("DELETE FROM student_info WHERE Id=?", [DeleteId], (err, result) => {
        err ? console.log("error ..") : res.send(result)

    })

})





App.listen(3004, () => {
    console.log("fuck yeah, your server is running on port 3004sssssss")
})

