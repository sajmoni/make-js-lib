import path from 'node:path'
import fs from 'fs-extra'
import Mustache from 'mustache'

// TODO: Use this file
const createFileFromTemplate = ({ source, destination, options }) => {
  const templateString = fs
    .readFileSync(path.join(__dirname, `/template/${source}`))
    .toString()
  const file = Mustache.render(templateString, options)
  fs.writeFileSync(destination, file)
}

export default createFileFromTemplate
