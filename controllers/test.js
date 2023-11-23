const Test = require("../models/test")

exports.addTest = async(req, res) => {
    try {
        const test = new Test(req.body)
        await test.save()
        res.status(201).json({
            model: test,
            message: "Object created !"
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Invalid data",
        })
    }
}

exports.fetchTests = async(req, res) => {
    try {
        const tests = await Test.find()
        res.status(200).json({
            model: tests,
            message: "Success"
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Error extracting object",
        })
    }
}

// find with where name = "test1"

// exports.fetchTests = async(req, res) => {
//     try {
//         const tests = await Test.find({ name: "test1" })
//         res.status(200).json({
//             model: tests,
//             message: "success"
//         })
//     } catch (error) {
//         res.status(400).json({
//             error: error.message,
//             message: "problem extraction",
//         })
//     }
// }


exports.getTestsById = async(req, res) => {
    const test = await Test.findOne({ _id: req.params.id })
    try {
        if (!test) {
            res.status(404).json({
                message: "Object not found ",
            })
        } else {
            res.status(200).json({
                model: test,
                message: "Object found",
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Error extracting object",
        })
    }

}

//on findOneAndUpdate({on met ici le critère de recherche}, {les champs à modifier si n'importe quel champs onc: req.body})
exports.updateTests = async(req, res) => {
    try {
        const test = await Test.findOneAndUpdate({ _id: req.params.id },
            req.body, { new: true })

        if (!test) {
            res.status(404).json({
                message: "Object not found",
            })
        } else {
            res.status(200).json({
                model: test,
                message: "Object modified",

            })

        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: "Error extracting object",
        })
    }
}


exports.deleteTests = async(req, res) => {
    await Test.deleteOne({ _id: req.params.id })
    try {
        res.status(200).json({ message: " Object deleted !" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// exports.fetchActifTests = async(req, res) => {
//     try {
//         // Utilisez la méthode statique pour récupérer les tests actifs
//         const actifTests = await Test.getActifTests()

//         res.status(200).json({
//             model: actifTests,
//             message: "Success"
//         })
//     } catch (error) {
//         res.status(400).json({
//             error: error.message,
//             message: "Error extracting object",
//         })
//     }
// }