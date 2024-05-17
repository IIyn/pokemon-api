import { Request, Response } from "express";
import { response } from "@/utils/response";
import { BagService } from "@/domain/services/BagService";
import { JwtPayload } from "@/types/jwt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { ItemService } from "@/domain/services/ItemService";

const bagService = new BagService();
const itemService = new ItemService();

/**
 *  Get a bag by its id
 * @param req
 * @param res
 */
export const getBagById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bag = await bagService.getBagById(id);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: bag,
  });
};

/**
 * Get a bag by user id
 * @param req
 * @param res
 */
export const getBagByTrainerId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bag = await bagService.getBagByTrainerId(id);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: bag,
  });
};

/**
 * Get the bags of the user
 * @param req
 * @param res
 */
export const getSelfBags = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;
  console.log(accessToken);
  const decoded = jwt.decode(accessToken) as JwtPayload;
  console.log(decoded);
  const userId = decoded.userId;
  console.log(userId);
  const bags = await bagService.getBagByTrainerId(userId);
  console.log(bags);
  response(res, {
    statusCode: 200,
    message: "OK",
    data: bags,
  });
};

/**
 *  Add a bag
 * @param req
 * @param res
 */
export const addBag = (req: Request, res: Response) => {
  const { trainerId } = req.body;
  const { accessToken } = req.cookies;
  bagService.addBag(trainerId);
  response(res, {
    statusCode: 201,
    message: "Created",
  });
};

/**
 *  Add an item to a bag
 * @param req
 * @param res
 */
export const addItemToBag = (req: Request, res: Response) => {
  const { bagId, itemId } = req.body;
  bagService.addItemToBag(bagId, itemId);
  response(res, {
    statusCode: 201,
    message: "Created",
  });
};

/**
 * Remove a item from a bag
 * @param req
 * @param res
 */
export const removeItemFromBag = (req: Request, res: Response) => {
  const { bagId, itemId } = req.body;
  bagService.removeItemFromBag(bagId, itemId);
  response(res, {
    statusCode: 200,
    message: "OK",
  });
};

/**
 * Add multiple items to a bag
 * @param req
 * @param res
 */
export const addItemsToBag = (req: Request, res: Response) => {
  const { bagId, itemIds } = req.body;
  bagService.addItemsToBag(bagId, itemIds);
  response(res, {
    statusCode: 201,
    message: "Created",
  });
};
