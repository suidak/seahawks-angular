import { UserService } from './service/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.router';
import { Routes , RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterOrgComponent } from './user/register-org/register-org.component';
import { ProfileOrgComponent } from './user/profile-org/profile-org.component';
import { ProfileMemberComponent } from './user/profile-member/profile-member.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddressComponent } from './user/address/address.component';
import { PhotoComponent } from './user/photo/photo.component';
import { AccountConfirmationComponent } from './user/account-confirmation/account-confirmation.component';
import { FieldErrorComponent } from './user/field-error/field-error.component';
import { EqualValidator } from './user/Directives/matching-password';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { NgxClickToEditModule } from 'ngx-click-to-edit';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ActivateAccountComponent } from './user/activate-account/activate-account.component';
import { FileUploadModule } from 'primeng/primeng';
//import { FacebookModule } from 'ngx-facebook';
import { AllOrgsComponent } from './user/all-orgs/all-orgs.component';
import { MapsComponent } from './user/maps/maps.component';
import { OrgDetailComponent } from './user/org-detail/org-detail.component';
//Nacira work starts here
import { ChatService } from './service/chat.service';
import { FundraiserService } from './service/fundraiser.service';
import { DonationService } from './service/donation.service';
import { AddfundraiserComponent } from './fundraisers/addfundraiser/addfundraiser.component';
import { ChatComponent } from './fundraisers/chat/chat.component';
import { DonationComponent } from './fundraisers/donation/donation.component';
import { FundraiserComponent } from './fundraisers/fundraiser/fundraiser.component';
import { FundraiserdetailComponent } from './fundraisers/fundraiserdetail/fundraiserdetail.component';
import { TimerComponent } from './fundraisers/timer/timer.component';

// Sejir imports
import { AnimalComponent } from './components/animal/animal.component';
import { AdoptionofferComponent } from './components/adoptionoffer/adoptionoffer.component';
import { AdoptionrequestComponent } from './components/adoptionrequest/adoptionrequest.component';
import { RequestadoptionComponent } from './components/requestadoption/requestadoption.component';
import { UserrequestsComponent } from './components/userrequests/userrequests.component';
import { OfferrequestsComponent } from './components/offerrequests/offerrequests.component';
import { AnimalService } from './service/animalservice/animal.service';
import { AdoptionofferService } from './service/adoptionofferservice/adoptionoffer.service';
import { AdoptionrequestService } from './service/adoptionrequestservice/adoptionrequest.service';
import { AnimalphotoserviceService } from './service/animalphotoservice.service';

import {NgxPaginationModule} from 'ngx-pagination';
import { FacebookModule } from 'ngx-facebook';
import { NgxStripeModule } from 'ngx-stripe';

import { FilterPipe } from './pipes/filter.pipe';
import { TextlimitPipe } from './pipes/textlimit.pipe';
import { TodaysPipe } from './pipes/todays.pipe';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const googleMapsCore = AgmCoreModule.forRoot({
  apiKey : 'AIzaSyBpnUwK8YR7KBgxnVnn0-cts9nDoP0LRIs',
});

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RegisterOrgComponent,
    ProfileOrgComponent,
    ProfileMemberComponent,
    HeaderComponent,
    FooterComponent,
    AddressComponent,
    PhotoComponent,
    AccountConfirmationComponent,
    FieldErrorComponent,
    EqualValidator,
    ChangePasswordComponent,
    ActivateAccountComponent,
    AllOrgsComponent,
    MapsComponent,
    OrgDetailComponent,
    AddfundraiserComponent,
    ChatComponent,
    DonationComponent,
    FundraiserComponent,
    FundraiserdetailComponent,
    TimerComponent,
    FilterPipe,
    TextlimitPipe,
    TodaysPipe,
    AnimalComponent,
    AdoptionofferComponent,
    AdoptionrequestComponent,
    RequestadoptionComponent,
    UserrequestsComponent,
    OfferrequestsComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routes,
    NgxClickToEditModule.forRoot(),
    googleMapsCore,
    //FacebookModule.forRoot()
    FileUploadModule,
    NgxPaginationModule,
    NgxStripeModule.forRoot('pk_test_6pRNASCoBOKtIshFeQd4XMUh'),
    FacebookModule.forRoot()
    //,NgbModule.forRoot()
  ],
  entryComponents: [
  AnimalComponent
],
  providers:[UserService, ChatService, FundraiserService, DonationService, AnimalService, AdoptionofferService, AdoptionrequestService, AnimalphotoserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
