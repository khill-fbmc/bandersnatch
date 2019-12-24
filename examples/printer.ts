import { program, command } from '../src'
import { blue, bgMagenta } from 'ansi-colors'

// All failures vanish into the void
const failWithMeaning = () => process.exit(42)

// We print errors in blue
const printer = {
  write(str: unknown) {
    str && console.log(str)
  },
  error(error: any) {
    const str = `${bgMagenta('Oh noes!')}\n${blue(error)}`
    console.error(str)
  }
}

program()
  .default(
    command().action(() => {
      throw new Error('Test throwing errors')
    })
  )
  .fail(failWithMeaning)
  .eval()
  .print(printer)
