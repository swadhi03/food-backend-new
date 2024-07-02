const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { usermodel } = require("./models/user")
const { foodmodel } = require("./model/Add")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://swathi:swathi2609@cluster0.em0miqo.mongodb.net/foodsdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword
    let user = new usermodel(input)
    user.save()
    console.log(user)
    res.json({ "status": "success" })
})

app.post("/signin", (req, res) => {
    let input = req.body
    usermodel.find({ "email": req.body.email }).then(
        (response) => {
            if (response.length > 0) {
                let dbPassword = response[0].password
                console.log(dbPassword)
                bcrypt.compare(input.password, dbPassword, (error, isMatch) => {
                    if (isMatch) {
                        jwt.sign({ email: input.email }, "food-app", { expiresIn: "1d" },
                            (error, token) => {
                                if (error) {
                                    res.json({ "status": "Unable to create token" })
                                }
                                else {
                                    res.json({ "status": "success", "userId": response[0]._id, "token": token })
                                }
                            }
                        )
                    }
                    else {
                        res.json({ "status": "Incorrect Password" })
                    }
                })
            } else {
                res.json({ "status": "User not found" })
            }
        }
    )
})

app.post("/viewuser", (req, res) => {
    let token = req.headers["token"]
    jwt.verify(token, "food-app", (error, decoded) => {
        if (error) {
            res.json({ "status": "unauthorized access" })
        } else {
            if (decoded) {
                usermodel.find().then(
                    (response) => {
                        res.json(response)
                    }
                ).catch()
            }
        }
    })
})

app.post("/add", (req, res) => {
    let input = req.body
    let food = new foodmodel(input)
    food.save()
    console.log(food)
    res.json({ "status": "success" })
})

app.post("/search", (req, res) => {
    let input = req.body
    foodmodel.find(input).then(
        data => {
            res.json(data)
        }
    ).catch(
        error => {
            res.json(error)
        }
    )
})
app.post("/foodview", (req, res) => {
    foodmodel.find().then((data) => {
        res.json(data)
    }).catch(
        (error) => {
            res.json(error)
        }
    )
})
app.post("/cart", (req, res) => {
    foodmodel.find().then((data) => {
        res.json(data)
    }).catch(
        (error) => {
            res.json(error)
        }
    )
})


app.listen(8088, () => {
    console.log("Server Started")
})