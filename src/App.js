import React, {useState, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact,
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {useProskomma} from 'proskomma-react-hooks';
import {ellipse, square, triangle,} from 'ionicons/icons';
import Tab1 from './pages/Tab1/Tab1';
import Tab2 from './pages/Tab2/Tab2';
import Tab3 from './pages/Tab3/Tab3';
import doFetch from "./lib/doFetch";
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => {
    const verbose = true;
    const pkState = useProskomma({verbose});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        doFetch(pkState.proskomma, setIsLoaded);
    }, [pkState.proskomma]);
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/tab1">
                            <Tab1 pkState={ pkState } isLoaded={ isLoaded } />
                        </Route>
                        <Route exact path="/tab2">
                            <Tab2 pkState={ pkState } isLoaded={ isLoaded } />
                        </Route>
                        <Route path="/tab3">
                            <Tab3 pkState={ pkState } isLoaded={ isLoaded } />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/tab1" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1" data-test-id='tab-bar-button-tab1'>
                            <IonIcon icon={ triangle } />
                            <IonLabel>Tab 1</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2" data-test-id='tab-bar-button-tab2'>
                            <IonIcon icon={ ellipse } />
                            <IonLabel>Tab 2</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3" data-test-id='tab-bar-button-tab3'>
                            <IonIcon icon={ square } />
                            <IonLabel>Tab 3</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );

};

export default App;
