import { TwilioService } from './twilio.service';
import { Message } from './MessageFormat';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListService } from '../inbox/friend-list.service';
import { ActivatedRoute } from '@angular/router';
import { Friends } from './friendList';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  messages: Message[] = [];
  userEmail = localStorage.getItem('email') ?? '';
  accessToken = localStorage.getItem('access_token') ?? '';
  username = localStorage.getItem('access_token') ?? '';
  typingIndicator = ""

  constructor(private twilioService: TwilioService, private friendsList: FriendListService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    await this.twilioService.initialize(this.accessToken);
    const userId = this.route.snapshot.paramMap.get('id')
    const friendList: Friends[] = this.friendsList.fetchFriendList()
    const targetFriend = userId && +userId;
    const friend = friendList.find(friend => friend.chatId === targetFriend)
    const loggenInUser = localStorage.getItem("username") ?? ''
    this.fetchConversation();
    this.listenForEvents();
    this.twilioService.findExistingConvo(loggenInUser, friend?.name ?? "")
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  async fetchConversation(): Promise<void> {
    try {
      const messages = await this.twilioService.getConvoBySid(
        'CH913011d8520a4e2e8ea7a24213b5ef44'
      );
      this.messages = messages;

      this.scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  sendMessage(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const inpEl = e.target as HTMLInputElement;
      const currentTime = new Date().toLocaleTimeString()
      const time = currentTime.replace(/:\d{2}(?=\s|$)/, '')

      if( inpEl.value.trim() !== "")
      this.twilioService
        .SendMessage('CH913011d8520a4e2e8ea7a24213b5ef44', inpEl.value)
        .then(() => {
          this.messages.push({ message: inpEl.value, author: this.userEmail, time: time });
          this.scrollToBottom();
          inpEl.value = '';
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    } else {
     this.twilioService.client?.getConversationBySid("CH913011d8520a4e2e8ea7a24213b5ef44").then(convo => convo.typing())
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }

  async listenForEvents() {
    const convo = await this.twilioService.client?.getConversationBySid(
      'CH913011d8520a4e2e8ea7a24213b5ef44'
    );

    if (convo) {
      convo.on('messageAdded', (msg) => {
        console.log('new message!');
        if (msg.author !== this.userEmail) {
          const currentTime = new Date().toLocaleTimeString()
          const time = currentTime.replace(/:\d{2}(?=\s|$)/, '')
    
          this.messages.push({
            message: msg.body ?? '',
            author: msg.author ?? '',
            time: time
          });
          this.scrollToBottom();
        }
      });

      convo.on("typingStarted", p => {
        this.typingIndicator = `${p.identity} is typing...`
      })

      convo.on("typingEnded", p => {
        this.typingIndicator = ''
      })
      
    }
  }

  
}
