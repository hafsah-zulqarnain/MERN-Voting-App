module.exports ={
    ...require('./auth'),
    ...require('./poll'),
}

module.exports.notFound =(req, res, next) =>{
    const err =new Error('Not found')
    err.status = 404
    // It sends the error to next
    next(err)
}


module.exports.errors = (err, req, res, next)=>
{
    //At the final endpoint Here sends json object
    console.log(req.body)
    res.status(err.status || 400).json({
        err: err.message || 'Something went wrong'
    })
    
}