/**
 * Created by chenwenhao on 2017/2/21.
 */

import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MyApp} from "../../app/app.component";
import {ReleasePage} from "./release";
@NgModule({
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    ReleasePage
  ],
  entryComponents: [
    ReleasePage
  ],
  providers: [],
  exports: [IonicModule]
})

export class ReleaseModule {

}
