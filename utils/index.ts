import { getFile, getFileName } from './util_File';

type paramTypes = [string, any];
const sessionIncludesData = (list: any[], uid, sessionKey, userName = ''): boolean => {
  let equal: boolean = false;

  Array.isArray(list) && list.forEach(item => {
    if (!item) return equal;
    const sessionValue = JSON.parse(item.sessionValue);
    if (sessionValue.uid == uid && item.sessionKey == sessionKey) {
      equal = userName ? sessionValue.userName == userName : true;
    }
  })
  return equal;
}

export {
  getFile,
  getFileName,
  sessionIncludesData
}