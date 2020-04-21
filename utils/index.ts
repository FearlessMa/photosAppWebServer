import { getFile, getFileName } from './util_File';
import * as fs from 'fs';

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
const isDir = (dirPath: string): boolean => {
  let isDir = false;
  try {
    const stat = fs.statSync(dirPath);
    isDir = stat.isDirectory();
  } catch (err) {
    console.log('err: ', err);
  }
  return isDir;
}

const uuid = () => {  //生成uuid方法
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  let uuid = s.join("");
  return uuid;
}
export {
  getFile,
  getFileName,
  sessionIncludesData,
  isDir,
  uuid
}