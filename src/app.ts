import express, { Application, Response, Request, NextFunction } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'
import router from './routes'
import cookieParser from 'cookie-parser'

const app: Application = express()
// cors user
app.use(cors())
// cookie parser
app.use(cookieParser())
// parser user
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/v1', router)

// globalErrorHandler
app.use(globalErrorHandler)

// handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    errorMessages: [
      {
        path: req.url,
        message: 'Not found api',
      },
    ],
  })
  next()
})

export default app
