import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {BourseService} from "../home/bourse.service";

/*
 Generated class for the Details page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-details',
    templateUrl: 'details.html'
})
export class DetailsPage {
    private currentPage: number = 0;
    private totalPages: number = 0;
    private societe;
    private ordres = [];
    private infos = [];

    constructor(public navCtrl: NavController, private navParams: NavParams, private bourseServise: BourseService) {
        this.societe = navParams.get('societe');
        this.loadOrdres(null);
    }

    ionViewDidLoad() {
        console.log('Hello DetailsPage Page');
    }

    doInfinite(infiniteScroll) {
        console.log("start infinite" + infiniteScroll);
        this.currentPage++;
        if (this.currentPage == this.totalPages) {
            infiniteScroll.enable(false);
            return;
        }
        this.loadOrdres(infiniteScroll);
    }

    loadOrdres(infiniteScroll) {
        this.bourseServise.getOrdres(this.societe.code, this.currentPage, 10).subscribe(res => {
            this.ordres = this.ordres.concat(res);
            this.totalPages = this.bourseServise.totalOrdrePages;
            console.log(this.totalPages);
            if (infiniteScroll) infiniteScroll.complete();
        });
        this.bourseServise.getInfos(this.societe.code).subscribe( res => {
            this.infos = res;
        })
    }

}
