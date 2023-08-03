// // authMiddleware.ts

// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'
// import { config } from './config' // Import your configuration file where you store JWT secret and other settings

// interface DecodedToken {
//   emailId: string
// }

// const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
//   const accessToken = req.headers.authorization?.split(' ')[1] // Assuming the access token is sent in the 'Authorization' header as 'Bearer <token>'
//   if (!accessToken) {
//     return res
//       .status(401)
//       .json({ message: 'Unauthorized - Access token not provided.' })
//   }

//   try {
//     const decodedToken = jwt.verify(
//       accessToken,
//       config.jwt.token,
//     ) as DecodedToken
//     req.authenticatedUser = { emailId: decodedToken.emailId } // Set the authenticated user on the request object
//     next()
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ message: 'Unauthorized - Invalid access token.' })
//   }
// }

// export default authenticateUser
