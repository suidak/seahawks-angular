import { ChatComponent } from './fundraisers/chat/chat.component';
import { AddfundraiserComponent } from './fundraisers/addfundraiser/addfundraiser.component';
import { DonationComponent } from './fundraisers/donation/donation.component';
import { FundraiserdetailComponent } from './fundraisers/fundraiserdetail/fundraiserdetail.component';
import { FundraiserComponent } from './fundraisers/fundraiser/fundraiser.component';
import { AllOrgsComponent } from './user/all-orgs/all-orgs.component';
import { MapsComponent } from './user/maps/maps.component';
import { ActivateAccountComponent } from './user/activate-account/activate-account.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { AccountConfirmationComponent } from './user/account-confirmation/account-confirmation.component';
import { PhotoComponent } from './user/photo/photo.component';
import { AddressComponent } from './user/address/address.component';
import { AppComponent } from './app.component';
import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { RegisterComponent } from './user/register/register.component';
import { RegisterOrgComponent } from './user/register-org/register-org.component';
import { ProfileMemberComponent } from './user/profile-member/profile-member.component';
import { ProfileOrgComponent } from './user/profile-org/profile-org.component';
import { LoginComponent } from './user/login/login.component';

// Sejir imports
import { AnimalComponent } from './components/animal/animal.component';
import { AdoptionrequestComponent } from './components/adoptionrequest/adoptionrequest.component';
import { AdoptionofferComponent } from './components/adoptionoffer/adoptionoffer.component';
import { RequestadoptionComponent } from './components/requestadoption/requestadoption.component';
import { UserrequestsComponent } from './components/userrequests/userrequests.component';
import { OfferrequestsComponent } from './components/offerrequests/offerrequests.component';


export const router: Routes =[
    {path:'', component:RegisterComponent,pathMatch:'full'},
    {path:'register-org', component:RegisterOrgComponent},
    {path:'register', component:RegisterComponent},
    {path:'profile-member', component:ProfileMemberComponent},
    {path:'profile-org', component:ProfileOrgComponent},
    {path:'login/:state', component:LoginComponent},
    {path:'address/:id', component:AddressComponent},
    {path:'photo', component:PhotoComponent},
    {path:'confirmation', component:AccountConfirmationComponent},
    {path:'change-password', component:ChangePasswordComponent},
    {path:'activation', component:ActivateAccountComponent},
    {path:'maps', component:MapsComponent},
    {path:'all-org', component:AllOrgsComponent},
    {path:'fundraisers',component:FundraiserComponent},
    {path:'fundraiserdetails',component:FundraiserdetailComponent},
    {path:'donate',component:DonationComponent},
    {path:'addfundraiser',component:AddfundraiserComponent},
    {path:'chat',component:ChatComponent},
    // sejir routes
    { path: 'animals', component: AnimalComponent },
    { path: 'offers', component: AdoptionofferComponent },
    { path: 'myoffers', component: AdoptionrequestComponent },
    { path: 'requests', component: AdoptionrequestComponent },
    { path: 'requestadoption', component: RequestadoptionComponent },
    { path: 'userrequests/:userid', component: UserrequestsComponent },
    { path: 'offerrequests', component: OfferrequestsComponent }
    
    //{path:'**', component:UsersComponent},
];

export const routes : ModuleWithProviders = RouterModule.forRoot(router);