import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing }  from './dashboard.routing';

import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

import { DashboardService } from './services/dashboard.service';
import { CharacterService } from './services/character.service';
import { UserManagementService } from './services/user.management.service';

import { AuthGuard } from '../auth.guard';
import { CharactersComponent } from './character/characters/characters.component';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';
import { CharacterSearchComponent } from './character/character-search/character-search.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { AddUserDialogComponent } from './user-management/add-user-dialog/add-user-dialog.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { CharacterEventListComponent } from './character/character-event-list/character-event-list.component';
import { CharacterEventService } from './services/character-event.service';
import { AddCharacterToEventDialogComponent } from './events/add-character-to-event-dialog/add-character-to-event-dialog.component';
import { CheckInComponent } from './check-in/check-in.component';
import { CheckInService } from './services/check-in.service';
import { NpcShiftsComponent } from './npc/npc-shifts/npc-shifts.component';
import { NpcShiftService } from './services/npc-shift.service';
import { AllNpcShiftsComponent } from './npc/all-npc-shifts/all-npc-shifts.component';
import { CheckOutService } from './services/check-out.service';
import { PreRegistrationComponent } from './pre-registration/pre-registration.component';
import { PreRegistrationService } from './services/pre-registration.service';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AddPlayerToNpcShiftComponent } from './npc/add-player-to-npc-shift/add-player-to-npc-shift.component';
import { AddPlayerToRegisterComponent } from './pre-registration/add-player-to-register/add-player-to-register.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { HackingSetupComponent } from './hacking-setup/hacking-setup.component';
import { HackingSetupService } from './services/hacking-setup.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    routing,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    LayoutModule
  ],
  declarations: [RootComponent,HomeComponent, SettingsComponent, CharactersComponent, CharacterDetailComponent, CharacterSearchComponent, UserListComponent, UserDetailComponent, AddUserDialogComponent, EventDetailComponent, EventListComponent, CharacterEventListComponent, AddCharacterToEventDialogComponent, CheckInComponent, NpcShiftsComponent, AllNpcShiftsComponent, PreRegistrationComponent, DashboardRootComponent, AddPlayerToNpcShiftComponent, AddPlayerToRegisterComponent, ConfirmationDialogComponent, HackingSetupComponent, LoadingComponent],
  exports:      [ 
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers:    [AuthGuard,DashboardService,CharacterService,UserManagementService,CharacterEventService,CheckInService, NpcShiftService, CheckOutService, PreRegistrationService, HackingSetupService]
})
export class DashboardModule { }