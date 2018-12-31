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

function validateQuery(schema) {
    return ((req, res, next) => {
    const result = Joi.validate(req.query,schema);
    if (result.error) {
        return res.status(400).json(result.error);
    }
    next()    
    })
}

const schemaAll = Joi.object().keys({
    operation: Joi.string().valid('Cloisonner','Décloisonner').required(),
    room: Joi.string().valid('Auditorium 1-2 Michelin, Eiffel', 'e.191 - e.192, Bouygues', 'EA.007 - EA.008, Eiffel', 'EE.004 - EE.005, Eiffel','h.201 - h.202, Bouygues', 'h.207 - h.208, Bouygues', 'h.213 - h.214, Bouygues', 'sa.104 - sa-108, Bouygues', 'sc.007 - sc.013, Bouygues', 'sd.101 - sd.103, Bouygues', 'sd.102 - sd.104, Bouygues', 'sd.201 - sd.203, Bouygues').required(),
    beginning: Joi.date().required(),
    end: Joi.date().min(Joi.ref('beginning')).required(),
    done: Joi.boolean()
});

const schemaDone = Joi.object().keys({
        done: Joi.boolean()
});

const schemaDate = Joi.object().keys({
    since: Joi.date(),
    until: Joi.date()
    // because we must be able to validate the end without refering to beginning
});

module.exports = {validateBody, validateQuery, schemaAll, schemaDone, schemaDate};