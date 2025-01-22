import { Injectable } from '@angular/core';
import { Friends } from '../chat/friendList';

@Injectable({
  providedIn: 'root'
})
export class FriendListService {
  friendList: Friends[] = [{name: 'him', chatId:9877899},{name:'her', chatId:2344322}, {name: 'User1', chatId:8766788}]

  constructor() { }

  fetchFriendList(): Friends[] {
    return this.friendList;
  }
}
