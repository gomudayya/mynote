export default class Memo {
  id = undefined;

  constructor(title, content, order) {
    this.title = title;
    this.content = content;
    this.order = order;
  }
  
  static createEmptyMemo() {
    return new Memo('', '', null);
  }

  static fromJson(json) {
    const obj = JSON.parse(json);
    const memo = new Memo(obj.title, obj.content, obj.order);
    memo.id = obj.id;
    return memo;
  }

  toJson() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      content: this.content,
      order: this.order
    });
  }
}