import { ActionState } from "@/lib/utils";
import { useEffect, useRef } from "react";

type FeedbackOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

function useActionFeedback(actionState: ActionState, options: FeedbackOptions) {
  const previousTimeStamp = useRef(actionState.timeStamp);
  const isUpdated = previousTimeStamp.current !== actionState.timeStamp;

  useEffect(() => {
    if (!isUpdated) return;
    if (!actionState.message) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.();
    }

    if (actionState.status === "ERROR") {
      options.onError?.();
    }

    previousTimeStamp.current = actionState.timeStamp;
  }, [actionState, isUpdated, options]);
}

export default useActionFeedback;
