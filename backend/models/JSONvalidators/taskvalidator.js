const Joi = require('joi');


function validateBody(schema) {
    return ((req, res, next) => {
    const result = Joi.validate(req.body,schema);
    if (result.error) {
        return res.status(400).json(result.error);
    }
    next()    
    })
}


const schema = Joi.object().keys({
    operation: Joi.string().valid('Cloisonner','Décloisonner').required(),
    room: Joi.string().valid('Auditorium 1-2 Michelin, Eiffel', 'e.191 - e.192, Bouygues', 'EA.007 - EA.008, Eiffel', 'EE.004 - EE.005, Eiffel','h.201 - h.202, Bouygues', 'h.207 - h.208, Bouygues', 'h.213 - h.214, Bouygues', 'sa.104 - sa-108, Bouygues', 'sc.007 - sc.013, Bouygues', 'sd.101 - sd.103, Bouygues', 'sd.102 - sd.104, Bouygues', 'sd.201 - sd.203, Bouygues').required(),
    beginning: Joi.date(),
    end: Joi.date().min(Joi.ref('beginning')),
    done: Joi.boolean()
});

module.exports = {validateBody, schema}