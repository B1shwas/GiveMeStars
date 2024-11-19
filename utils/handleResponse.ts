import { Response } from "express";

function handleResponse(
  res: Response,
  data?: unknown, // Optional parameter
  statusCode: number = 200, // Default to 200 if not provided
  message: string = "Success" // Default message
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data !== undefined ? data : null, // Set data to null if not provided
  });
}

export { handleResponse };
