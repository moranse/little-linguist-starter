import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-7a6b6',
        appId: '1:610314459159:web:c21c329ececb84d22f6452',
        storageBucket: 'little-linguist-7a6b6.appspot.com',
        apiKey: 'AIzaSyBmTUk6rx0OL9DoBJuLac_aTAFd9Ytefz0',
        authDomain: 'little-linguist-7a6b6.firebaseapp.com',
        messagingSenderId: '610314459159',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
