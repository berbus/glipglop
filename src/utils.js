
import { toast } from 'react-hot-toast';


export function itemsListToDict (itemsList) {
    var dstDict = {}

    itemsList.forEach(item => {
        let auxId = item.oid
        delete item.oid
        dstDict[auxId] = item
    })

    return dstDict
};


export function dictToIdedDict (srcDict) {
    // {'oid': 'objId', 'param1': 'someValue'} -> {'objId': {'param1': 'someValue'}}
    var dstDict = {}

    let oid = srcDict['oid']
    delete srcDict['oid']
    dstDict[oid] = srcDict

    return dstDict
};


export function handleActionError (errorObject, toastId) {
    let msg = errorObject.response.status;
    for (var [key, value] of Object.entries(errorObject.response.data)) {
        msg += `\n${key} - ${value}`
    }

    toast.error(msg, {id: toastId});
}
