import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RootComponent }    from './root/root.component';
import { HomeComponent }    from './home/home.component'; 
import { SettingsComponent }    from './settings/settings.component'; 
import { CharactersComponent } from './character/characters/characters.component';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';
import { UserListComponent } from './user-management/user-list/user-list.component';

import { AuthGuard } from '../auth.guard';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { CheckInComponent } from './check-in/check-in.component';
import { AllNpcShiftsComponent } from './npc/all-npc-shifts/all-npc-shifts.component';
import { PreRegistrationComponent } from './pre-registration/pre-registration.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
      path: 'dashboard',
      component: RootComponent, canActivate: [AuthGuard],

      children: [      
       { path: '', component: HomeComponent },
       { path: 'home',  component: HomeComponent },
       { path: 'settings',  component: SettingsComponent },
       { path: 'characters', component: CharactersComponent },
       { path: 'detail/:id', component: CharacterDetailComponent },
       { path: 'detail/new', component: CharacterDetailComponent },
       { path: 'user-detail/:id', component: UserDetailComponent },
       { path: 'user-detail/new', component: UserDetailComponent },
       { path: 'user-list', component: UserListComponent }, 
       { path: 'event-detail/:id', component: EventDetailComponent },
       { path: 'event-detail/new', component: EventDetailComponent },
       { path: 'event-list', component: EventListComponent },
       { path: 'check-in', component: CheckInComponent },
       { path: 'npc-shifts', component: AllNpcShiftsComponent },
       { path: 'pre-registration', component: PreRegistrationComponent }
      ]       
    }  
]);