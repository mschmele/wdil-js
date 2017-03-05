module.exports = ({ response, status, message }) => {
  response.status(status)
  response.send({
    error: {
      status,
      message}
  })
}
