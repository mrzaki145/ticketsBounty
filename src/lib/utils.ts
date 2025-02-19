import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_URL!}`);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ActionState = {
  status: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  timeStamp?: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  status: "SUCCESS",
  message: "",
  fieldErrors: {},
  timeStamp: Date.now(),
};

export function fromErrorToActionState(
  error: unknown,
  payload?: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload,
      timeStamp: Date.now(),
    };
  }
  return {
    status: "ERROR",
    message: "An unknown error occurred",
    fieldErrors: {},
    payload,
    timeStamp: Date.now(),
  };
}

export const toActionState = (
  status: ActionState["status"],
  message: string
): ActionState => {
  return {
    status,
    message,
    fieldErrors: undefined,
    timeStamp: Date.now(),
  };
};
