import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {BourseService} from "../pages/home/bourse.service";
import {DetailsPage} from "../pages/details/details";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        DetailsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        DetailsPage
    ],
    providers: [BourseService]
})
export class AppModule {
}
