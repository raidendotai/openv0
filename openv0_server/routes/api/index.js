const { Router } = require("express")
const ComponentsRouter = require('../components/generated_components.route.js') 

const router = Router()

router.use('/components', ComponentsRouter);

module.exports = router;
