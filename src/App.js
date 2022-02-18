import React, {useState, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Axios from 'axios';
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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

const verbose = false;

const App = () => {
    const pkState = useProskomma({verbose});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        const doFetch = async () => {
            console.log("start")
            const axiosInstance = Axios.create({});
            axiosInstance.defaults.headers = {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            };
            await axiosInstance.request(
                {
                    method: "get",
                    responseType: 'arraybuffer',
                    "url": `http://localhost:8099/https://diegesis/cb_eng_cblft_serialized.json`,
                    "validateStatus": false,
                }
            )
                .then(
                    async response => {
                        const data = response.data;
                        if (response.status !== 200) {
                            console.log(`Request returned status code ${response.status}`);
                            console.log(String.fromCharCode.apply(null, new Uint8Array(data)));
                            return;
                        }
                        const decodedText = new TextDecoder().decode(data);
                        pkState.proskomma.loadSuccinctDocSet(JSON.parse(decodedText));
                        setIsLoaded(true);
                        pkState.newStateId();
                    }
                );
        };
        doFetch();
    }, [pkState]);
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/tab1">
                            <Tab1 pkState={ pkState } isLoaded={ isLoaded } />
                        </Route>
                        <Route exact path="/tab2">
                            <Tab2 pkState={ pkState } />
                        </Route>
                        <Route path="/tab3">
                            <Tab3 pkState={ pkState } />
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
