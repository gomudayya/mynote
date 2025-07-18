import uuid from 'react-native-uuid'

export default class Memo {
  constructor(id = null, title = '', content = '', isSaved = false, position = 2048) {
    this.id = id || uuid.v4();
    this.title = title;
    this.content = content;
    this.isSaved = isSaved;
    this.position = position;
  }
  
  static createEmptyMemo() {
    return new Memo();
  }
  
  static fromJsonString(jsonString) {
    const obj = JSON.parse(jsonString);
    return new Memo(obj.id, obj.title, obj.content, obj.isSaved, obj.position);
  }
}