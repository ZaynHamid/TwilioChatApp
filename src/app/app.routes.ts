import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { InboxComponent } from './inbox/inbox.component';

export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"signup", component: SignupComponent},
    {path:"dashboard", component: DashboardComponent},
    {path:"inbox", component: InboxComponent},
    {path:"chat/:id", component: ChatComponent},
];
