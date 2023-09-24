const { Router } = require("express")
const LogModel = require('../../modules/db/models/generated_component.model.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json((await LogModel.find({})).sort((a, b) => b.version - a.version))
  } catch (e) {
    res.status(500).json(e) 
  }
})

router.get('/:componentId', async (req, res) => {
  try {
    const components = (await LogModel.find({ componentId: req.params.componentId }));
    res.json({
        ...components[0].toObject(),
        iterations: components.sort()
    })    
  } catch (e) {
    res.status(500).json(e) 
  } 
})

module.exports = router;