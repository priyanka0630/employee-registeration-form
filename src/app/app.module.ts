import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule, MatSelectModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatIconModule, MatTooltipModule, MatSnackBarModule, MatBadgeModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTreeModule } from '@angular/material';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './stepper/stepper.component';
import { StepComponent } from './step/step.component';
import { StepDirective } from './step.directive';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './_service';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        appRoutingModule,
        MatChipsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatBadgeModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTreeModule,
//         AngularFireModule,
//   AngularFireAuthModule 
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        StepperComponent,
        StepDirective,
        StepComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        UserService,
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };