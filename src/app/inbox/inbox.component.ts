import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Friends } from '../chat/friendList';
import { RouterModule } from '@angular/router';
import { FriendListService } from './friend-list.service';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit {
  friendsList: Friends[] = []

  constructor(private friendList: FriendListService){}

  ngOnInit(): void {
    this.friendsList = this.friendList.fetchFriendList()
  }

  

}
