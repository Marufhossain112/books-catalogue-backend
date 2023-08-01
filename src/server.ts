/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`)
    })
  } catch (error) {
    console.log('Something went wrong', error)
  }
}
main()
