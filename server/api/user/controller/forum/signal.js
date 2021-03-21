const Signal = require('../../model/forum/Signal')



exports.createSignal = async (req,res) => {
    try {
        console.log('------ SIGNAL -------')
        const signal = new Signal({
            motif : req.body.motif,
            postID : req.body.postID,
            content : req.body.content
        })
        let data = await signal.save()
        res.status(201).json({data})
    } catch (error) {
        console.log(error)
        res.status(409).json({err : error})
    }
}