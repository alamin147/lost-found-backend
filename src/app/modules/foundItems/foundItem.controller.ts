import { StatusCodes } from "http-status-codes";
import sendResponse, { Tmeta } from "../../global/response";
import { Request, Response } from "express";
import { foundItemService } from "./foundItem.service";
import { utils } from "../../utils/utils";

const createFoundItem = async (req: Request, res: Response) => {
  try {
    //   console.log({a:req.body,b:req.user})

    const result = await foundItemService.createFoundItem(
      req.body,
      req.user.id
    );
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Found item reported successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: error?.message,
      data: null,
    });
  }
};

const getFoundItem = async (req: Request, res: Response) => {
  try {
    const meta = await utils.calculateMeta(req.query);

    const result = await foundItemService.getFoundItem(req.query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Found items retrieved successfully",
      meta,
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: error?.message,
      data: null,
    });
  }
};



export const foundItemController = {
  createFoundItem,
  getFoundItem,
  
};
