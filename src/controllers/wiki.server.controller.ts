import { Request, Response } from 'express'
import Config from '../config/config'
import * as path from 'path'
import * as fs from 'fs'
import * as _ from 'lodash'

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    res.render('index', { title: 'Express' })
  }

  public wiki(req: Request, res: Response): void {
    try {
      let requested_path = req.params['0']
      requested_path = _.trim(requested_path, '/')
      let file_path =
        path.join(Config.baseFolder, 'docs', requested_path) + '.md'
      let file_ = fs.readFileSync(file_path, 'utf8')
      let result = file_
      res.send({ results: result })
    } catch (e) {
      console.error(e)
      res.statusCode = 404
      res.send({ message: 'page node found' })
    }
  }
  public raw(req: Request, res: Response): void {
    try {
      let requested_path = req.params['0']
      requested_path = _.trim(requested_path, '/')
      let file_path =
        path.join(Config.baseFolder, 'docs', requested_path) + '.md'
      let file_ = fs.readFileSync(file_path, 'utf8')
      let result = file_
      res.setHeader('Content-Type', 'text/plain')
      res.send(result)
    } catch (e) {
      console.error(e)
      res.statusCode = 404
      res.send({ message: 'page node found' })
    }
  }
}

export const wikiController = new IndexController()
