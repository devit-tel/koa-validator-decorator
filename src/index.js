const errorCode = {
    VALIDATION: {
      CODE: 'VALIDATION',
      STATUS: 400,
    }
  }

class BaseError extends Error {
    constructor (message) {
      super(message)
      this.name = this.constructor.name
      this.message = message
    }
  }
  
class ValidationError extends BaseError {
    constructor (message, errors, data, code = errorCode.VALIDATION.CODE, status = errorCode.VALIDATION.STATUS) {
      super(message)
      this.name = 'ValidationError'
      this.status = 400
      this.code = code
      this.data = data
      this.errors = errors
    }
  }

export default function(yupConfig) {
    return (target, key, descriptor) => {
        const { query, body, params } = yupConfig
        const validate = async (ctx, next) => {
            const validateQuery = (query) ? (await query.isValid(ctx.query)) : true
            const validateBody = (body) ? (await body.isValid(ctx.request.body)) : true
            const validateParams = (params) ? (await params.isValid(ctx.params)) : true
            if (validateQuery && validateBody && validateParams) {
            } else {
                throw new ValidationError('User Input Validate Error', {
                    validateQuery,
                    validateBody,
                    validateParams,
                })
            }
        }
        let oldDescriptor = descriptor.value
        descriptor.value = async function(...args) {
            await validate(args[0])
            await oldDescriptor(...args)
        }
        return descriptor
    }
}