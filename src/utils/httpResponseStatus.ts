export enum httpResponseStatus {
  // Indicates that the request has been processed successfully on server.
  // The response payload depends on HTTP method which was selected for request
  SUCCESS = 200,
  // Indicates that the request has been fulfilled and resulted in a new resource being created
  CREATED = 201,
  // Indicates that the server has successfully fulfilled the request
  // and that there is no content to send in the response payload body
  NO_CONTENT = 204,
  // Is the generic client-side error status, used when no other 4xx error code is appropriate.
  // Errors can be like malformed request syntax, invalid request message parameters, or deceptive request routing etc
  // The client SHOULD NOT repeat the request without modifications.
  BAD_REQUEST = 400,
  // Indicates that the client tried to operate on a protected resource without providing the proper authorization.
  UNAUTHORIZED = 401,
  // Indicates that the user does not have the necessary permissions for the resource.
  FORBIDDEN = 403,
  // Indicates that the REST API can’t map the client’s URI to a resource
  NOT_FOUND = 404,
  // Indicates that the request could not be completed due to a conflict with the current state of the resource (usually when there is a duplicate key violation at database side)
  CONFLICT = 409,
  // The server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate),
  // and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate)
  // but was unable to process the contained instructions.
  // Useful for validation errors
  UNPROCESSABLE_ENTITY = 422,
  // Indicates that the server encountered an unexpected condition which prevented it from fulfilling the request
  INTERNAL_SERVER_ERROR = 500,
}
