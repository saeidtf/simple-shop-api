exports.successRequest = (res,data, message, status) => {
    res.status(status || 200).send({
        data,
        message,
        success: true
    });
}

exports.errorRequest = (res, message, status) => {
    res.status(status || 400).send({
        message,
        success: false
    });
}