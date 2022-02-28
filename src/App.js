import React, { useEffect, useCallback } from 'react';
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
import {square} from 'ionicons/icons';
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

    const onLoaded = useCallback(() => {
        pkState.newStateId();
    }, []);

    useEffect( () => {
        doFetch(pkState.proskomma, onLoaded);
    }, []);

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab3">
                            <Tab3 pkState={ pkState } />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/tab3" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
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
