const Event = require('../models/event')
const Joi = require('joi')

const eventJoiSchema = Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required().greater(Joi.ref('startDate')).message('End date must be greater than start date')
})

exports.createEvent = async(req, res) => {
    try {
        const { error } = eventJoiSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const { title, startDate, endDate } = req.body
        const newEvent = new Event({ title, startDate, endDate })

        await newEvent.save()
        res.status(201).json({ message: 'Event created successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}