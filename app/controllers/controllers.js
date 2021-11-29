const db = require('../config/db.config.js');
const Child = db.Child;

/**
 * Save a Child object to database PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createChild = (req, res) => {
    let child = {};

    try{
        // Building Child object from upoading request's body
        child.name = req.body.name;
        child.legalSituation = req.body.legalSituation;
        child.education = req.body.education;
        child.typeIncome = req.body.typeIncome;
    
        // Save to database
        Child.create(child, 
                          {attributes: ['id', 'name', 'legalSituation', 'education', 'typeIncome']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/**
 * Retrieve Child information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.children = (req, res) => {
    // find all Child information from 
    try{
        Child.findAll({attributes: ['id', 'name', 'legalSituation', 'education', 'typeIncome']})
        .then(children => {
            res.status(200).json(children);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.getChild = (req, res) => {
    Child.findByPk(req.params.id, 
                        {attributes: ['id', 'name', 'legalSituation', 'education', 'typeIncome']})
        .then(child => {
          res.status(200).json(child);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

/**
 * Updating a Child
 * @param {*} req 
 * @param {*} res 
 */
exports.updateChild = async (req, res) => {
    try{
        let child = await Child.findByPk(req.body.id);
        //let childId = req.params.id;
        //let child = await Child.findByPk(childId)
        if(!child){
            // return a response to client
            res.status(404).json({
                //message: "Not Found for updating a child with id = " + childId,
                message: "Not Found for updating a child with id  " ,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                name: req.body.name,
                legalSituation: req.body.legalSituation,
                education: req.body.education,
                typeIncome: req.body.typeIncome
            }
            let result = await Child.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'name', 'legalSituation', 'education', 'typeIncome']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a child with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a child with id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a Child by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteChild = async (req, res) => {
    try{
        let childId = req.params.id;
        let child = await Child.findByPk(childId);
        //let child = await Child.findByPk(req.body.id);
        //let child = await Child.findByPk(req.body.id);
        if(!child){
            res.status(404).json({
                message: "Does Not exist a Child with id = " + childId,
                error: "404",
            });
        } else {
            await child.destroy();
            res.status(200).json({
                message: "Deleted child with id = " + childId,
               
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a child with id = " + req.params.id,
            error: error.message
        });
    }
}