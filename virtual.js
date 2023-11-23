// const getAuthorById = (req, res) => {
//     Author.findOne({ _id: req.params.id })
//         .then((author) => {
//             if (!author) {
//                 res.status(404).json({
//                     message: "objet non trouvé"
//                 })
//                 return
//             }

//             //radditto MAJ
//             const f1 = author.fullName.toUpperCase();

//             res.status(200).json({
//                     model: author,
//                     message: "objet trouvé",
//                     f1
//                 })
//                 //res.status(200).json({f1})
//         })
// }