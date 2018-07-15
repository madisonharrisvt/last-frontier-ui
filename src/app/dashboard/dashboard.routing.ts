import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RootComponent }    from './root/root.component';
import { HomeComponent }    from './home/home.component'; 
import { SettingsComponent }    from './settings/settings.component'; 
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { UserListComponent } from './user-management/user-list/user-list.component';

import { AuthGuard } from '../auth.guard';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';

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
       { path: 'user-list', component: UserListComponent } 
      ]       
    }  
]);