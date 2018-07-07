exports.success = (message) => {
  return {
    status: 200,
    response: message,
    error: null
  }
}

exports.userError = (message) => {
  return {
    status: 400,
    response: null,
    error: message
  }
}

exports.serverError = (message) => {
  return {
    status: 500,
    response: null,
    error: message
  }
}

exports.notFound = (message) => {
  return {
    status: 404,
    response: null,
    error: message
  }
}

exports.unauthorized = (message) => {
  return {
    status: 403,
    response: null,
    error: message
  }
}

exports.validationError = (message) => {
  return {
    status: 422,
    response: null,
    error: message
  }
}