import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {BourseService} from "./bourse.service";
import {DetailsPage} from "../details/details";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private currentPage: number = 0;
    private totalPages: number = 0;
    private societes = [];

    constructor(public navCtrl: NavController, private bourseService: BourseService) {
        this.loadSocietes(null);
    }

    doInfinite(infiniteScroll) {
        console.log("start infinite" + infiniteScroll);
        this.currentPage++;
        if (this.currentPage == this.totalPages) {
            infiniteScroll.enable(false);
            return;
        }
        this.loadSocietes(infiniteScroll);
    }

    loadSocietes(infiniteScroll) {
        this.bourseService.getSocietes(this.currentPage, 5).subscribe(res => {
            this.societes = this.societes.concat(res);
            this.totalPages = this.bourseService.totalPages;
            console.log(this.totalPages);
            if (infiniteScroll) infiniteScroll.complete();
        })
    }

    goToDetails(societe) {
        console.log("Ge to details"+societe)
        this.navCtrl.push(DetailsPage, {societe: societe});
    }
}
