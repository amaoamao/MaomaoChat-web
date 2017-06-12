import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../providers/user";

@Pipe({
  name: 'recentPipe',
  pure: false
})
export class RecentChatPipe implements PipeTransform {

  constructor(public user: User) {

  }

  transform(items: [{ sender: string, receiver: { type: number, id: string }, message: { type: number, content: string, time: string } }]): any {
    if (!items) {
      return items;
    }
    return items
      .filter(item =>
        item.sender
      )
      .filter((item, index, array) =>
        ((item.sender == this.user.phone && array.findIndex(value => value.receiver.id == item.receiver.id) == index) ||
        (item.receiver.id == this.user.phone && array.findIndex(value => value.sender == item.sender) == index))
      );
  }
}
