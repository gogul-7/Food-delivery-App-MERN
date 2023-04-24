const express = require('express')
const router = express.Router()

router.post('/foodData',(req,res)=>{
    try {
        res.send({ data: global.data, catdata: global.catData });
    } catch (error) {
        console.error(error.message);
        res.send('Server Error')
    }
})

module.exports = router;