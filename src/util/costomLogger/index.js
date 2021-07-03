module.exports = (req, res, next) => {
    const { method, originalUrl, body, query } = req;
    console.log('\nLogging request with following data:', { method, originalUrl, body, query, date: new Date().toGMTString() })
    next()
}