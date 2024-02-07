import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { inject } from '@angular/core';
import { DialogService } from './app/services/dialog.service';

export function initializeDialogService() {
  return () => {
    inject(DialogService);
  };
}
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
