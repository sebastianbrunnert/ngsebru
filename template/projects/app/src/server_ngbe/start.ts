import * as express from 'express';

export function BackendRouter() {
    const router = express.Router()

    const bodyParser = require("body-parser")
    router.use(bodyParser.json())

    const cors = require("cors")
    router.use(cors())

    router.use((req: express.Request, res: express.Response, next: Function) => {
        res.set("Cache-Control", "no-store")
        next()
    })

    router.all("**", (req: express.Request, res: express.Response) => {
        res.status(404).send("Not found")
    })

    return router
}