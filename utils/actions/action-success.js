import actionResponse from "./action-response";

export default function actionSuccess(actionName, additionalData = {}, redirectPath = null) {
    return actionResponse(true, actionName, additionalData, redirectPath);
}
