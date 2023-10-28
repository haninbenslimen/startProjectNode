const Etudiant = require("../models/etudiant")

exports.addEtudiant = (req, res) => {
    const etudiant = new Etudiant(req.body)
    etudiant.save()
        .then(() => {
            res.status(201).json({
                model: etudiant,
                message: "created"
            })
        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "not created!!"
            })

        })
}


exports.getAllEtduiants = (req, res) => {
    Etudiant.find()
        .then((etudiants) => {
            res.status(200).json({
                model: etudiants,
                message: "success"
            })

        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "problem"
            })
        })
}

exports.getEtudiantById = (req, res) => {
    Etudiant.findOne({ _id: req.params.id })
        .then((etudiant) => {
            if (!etudiant) {
                res.status(400).json({
                    message: "error"
                })
            } else {
                res.status(200).json({
                    model: etudiant,
                    message: "success"
                })
            }
        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "problem 'extraction",
            })
        })

}

exports.updateEtudiant = (req, res) => {
    Etudiant.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((etudiant) => {
            if (!etudiant) {
                res.status(404).json({
                    message: "n'existe pas"
                })
            } else {
                res.status(200).json({
                    model: etudiant,
                    message: "Objet modifié",
                })
            }
        }).catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "problème 'extraction",
            })
        })
}

exports.deleteEtudiant = (req, res) => {
    Etudiant.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: " Objet supprimé !" }))
        .catch((error) => res.status(400).json({ error: error.message }))
}