import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification-service';
import { NotificationComponent } from '../components/notification/notification.component';
import { NumberSelectComponent } from '../components/number-select/number-select.component';
import { MultiplierService } from '../services/multiplier-service';


@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NumberSelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    NotificationService,
    MultiplierService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
