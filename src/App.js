import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
import { IonReactRouter } from '@ionic/react-router';
import { useProskomma } from 'proskomma-react-hooks';
import {
    albums,
    reader,
    book,
    diamond,
    search,
    print,
} from 'ionicons/icons';
import Versions from './pages/Versions/Versions';
import BrowseBook from './pages/BrowseBook/BrowseBook';
import BrowseChapter from './pages/BrowseChapter/BrowseChapter';
import BrowseVerse from './pages/BrowseVerse/BrowseVerse';
import Search from './pages/Search/Search';
import Print from './pages/Print/Print';
import {nt_2book as frozen, } from 'proskomma-frozen-archives';
import { useCatalog, useQuery } from 'proskomma-react-hooks';
import {thaw} from "proskomma-freeze";

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
import { useState } from 'react';

setupIonicReact();

const App = () => {
    const initialState = {
        docSetId: 'xyz-eng_emtv',
        bookCode: 'GAL',
        chapter: '1',
        chapters:[],
        verse: '1',
    };
    const [navState, setNavState] = useState(initialState);

    const verbose = true;
    const pkState = useProskomma({ verbose });

    const getBBCQuery = (navState) => {
        const query = '{' +
            '  docSet(id:"%docSetId%") {' +
            '    id' +
            '    document(bookCode:"%bookCode%") {' +
            '      cIndexes {chapter}' +
            '    }' +
            '  }' +
            '}';
        return query
            .replace("%docSetId%", navState.docSetId)
            .replace("%bookCode%", navState.bookCode)
      };

    useEffect(() => {
        thaw(pkState.proskomma, frozen)
            .then(() => {
                console.log("thawed");
                pkState.newStateId();
            });
    }, []);

    const queryState = useQuery({
        ...pkState,
        query: getBBCQuery(navState),
        verbose: true,
    });

    const { catalog, error: catalogError } = useCatalog({
        proskomma: pkState.proskomma,
        stateId: pkState.stateId,
        verbose: true,
    });

    useEffect(() => {
    const _chapters =  queryState?.data?.docSet?.document?.cIndexes?.map((a) => a.chapter) || []
    if(!_chapters?.includes(navState.chapter)){
        setNavState((prevState) => ({ ...prevState, chapter: '1', chapters:_chapters }));
    }else(
        setNavState((prevState) => ({ ...prevState, chapters:_chapters }))
    )
    },[queryState, pkState.newStateId])

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/versions">
                            <Versions
                                catalogError={catalogError}
                                catalog={catalog}
                                pkState={pkState}
                                navState={navState}
                                setNavState={setNavState}
                            />
                        </Route>
                        <Route path="/browseBook">
                            <BrowseBook
                                catalog={catalog}
                                navState={navState}
                                setNavState={setNavState}
                                pkState={pkState}
                            />
                        </Route>
                        <Route path="/browseChapter">
                            <BrowseChapter
                                catalog={catalog}
                                pkState={pkState}
                                navState={navState}
                                setNavState={setNavState}
                            />
                        </Route>
                        <Route path="/browseVerse">
                            <BrowseVerse
                                catalog={catalog}
                                pkState={pkState}
                                navState={navState}
                                setNavState={setNavState}
                            />
                        </Route>
                        <Route path="/search">
                            <Search
                                catalog={catalog}
                                pkState={pkState}
                                navState={navState}
                                setNavState={setNavState}
                            />
                        </Route>
                        <Route path="/print">
                            <Print
                                catalog={catalog}
                                navState={navState}
                                setNavState={setNavState}
                                pkState={pkState}
                            />
                        </Route>
                        <Route exact path="/" >
                            <Redirect to="/versions" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton
                            tab="versions"
                            href="/versions"
                            data-test-id="tab-bar-button-tab1"
                        >
                            <IonIcon icon={albums} />
                            <IonLabel>Versions</IonLabel>
                        </IonTabButton>
                        <IonTabButton
                            tab="browseBook"
                            href="/browseBook"
                            data-test-id="tab-bar-button-tab2"
                        >
                            <IonIcon icon={book} />
                            <IonLabel>Book</IonLabel>
                        </IonTabButton>
                        <IonTabButton
                            tab="browseChapter"
                            href="/browseChapter"
                            data-test-id="tab-bar-button-tab3"
                        >
                            <IonIcon icon={reader} />
                            <IonLabel>Chapter</IonLabel>
                        </IonTabButton>
                        <IonTabButton
                            tab="browseVerse"
                            href="/browseVerse"
                            data-test-id="tab-bar-button-tab4"
                        >
                            <IonIcon icon={diamond} />
                            <IonLabel>Verse</IonLabel>
                        </IonTabButton>
                        <IonTabButton
                            tab="search"
                            href="/search"
                            data-test-id="tab-bar-button-tab5"
                            disabled={true}
                        >
                            <IonIcon icon={search} />
                            <IonLabel>Search</IonLabel>
                        </IonTabButton>
                        <IonTabButton
                            tab="print"
                            href="/print"
                            data-test-id="tab-bar-button-tab6"
                        >
                            <IonIcon icon={print} />
                            <IonLabel>Print</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
