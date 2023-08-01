import express, { Application, Response, Request } from 'express'
import cors from 'cors'

const app: Application = express()
// cors user
app.use(cors())
// parser user
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
  // console.log("Hello");
})

export default app
