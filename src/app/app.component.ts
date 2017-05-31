import { Component } from '@angular/core';
import {Platform, App, IonicApp, MenuController, NavController, Events} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  private _innerNavCtrl;
  constructor(
    public platform: Platform,
    private _app: App,
    private _ionicApp: IonicApp,
    private _menu: MenuController,
    private ionicApp: IonicApp,
    private menuCtrl: MenuController,
    private _events:Events
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      //this.setupBackButtonBehavior ();
      //this.initializeApp();
      this.platform.ready().then(() => {
        this.setupBackButtonBehavior ();
      })
    });
  }

  private setupBackButtonBehavior () {

    // If on web version (browser)
    if (window.location.protocol !== "file:") {

      // Listen to browser pages
      this._events.subscribe("navController:current", (navCtrlData) => {
        this._innerNavCtrl = navCtrlData[0];
      });

      // Register browser back button action(s)
      window.onpopstate = (evt) => {

        // Close menu if open
        if (this._menu.isOpen()) {
          this._menu.close ();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this._ionicApp._loadingPortal.getActive() ||
          this._ionicApp._modalPortal.getActive() ||
          this._ionicApp._toastPortal.getActive() ||
          this._ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back on main active nav if there's a page loaded
        if (this._app.getActiveNav().canGoBack()){
          this._app.getActiveNav().pop();
        };

        // Navigate back on subloaded nav if notified
        if(this._innerNavCtrl && this._innerNavCtrl.canGoBack()){
          this._innerNavCtrl.pop();
        }

      };

      // Fake browser history on each view enter
      this._app.viewDidEnter.subscribe((app) => {
        history.pushState (null, null, "");
      });

    }
  }


}
