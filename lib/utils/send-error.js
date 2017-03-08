module.exports = ({ response, status, errors }) => {
  return response
    .status(status)
    .send({ error: { status, errors } })
}
