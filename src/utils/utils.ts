import { Response } from "express"

export const errorMessage = (res: Response, message: string): void => {
    res.status(401).send(message)
}