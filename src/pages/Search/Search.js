import React, {useState} from "react";
import PropTypes from "prop-types";
import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonButton } from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import { useSearchForPassages } from "proskomma-react-hooks";

import "./Search.css";

export default function Search({pkState, navState, setNavState, catalog}) {

    const [searchText, setSearchText] = useState('');
    const [displayMode, setDisplayMode] = useState('verse');

    const verbose = true;

    const searchResultRows = (p) => {

        if (!searchText) {
            return <IonRow>
                <IonCol size={12}>Please enter some search text</IonCol>
            </IonRow>;
        } else if (p.length < 1) {
            return <IonRow>
                 <IonCol size={12}>No text found</IonCol>
             </IonRow>;
    } else {
            return p.map((p, n) => <IonRow key={n}>
                <IonCol size={1}>{p.reference}</IonCol>
                <IonCol size={11}>{p.text}</IonCol>
            </IonRow>)
        }
    }

    const toggleSearchDisplayMode = (p) => {
        if (p === 'block') {
           setDisplayMode('verse');
        } else {
           setDisplayMode('block');
       }
    };

    const {
        // stateId: searchStateId,
        // bookCodes,
        passages,
        // passagesBookCodes,
        // dataArray,
        // errors: searchErrors,
    } = useSearchForPassages({
        proskomma: pkState.proskomma,
        stateId: pkState.stateId,
        text: searchText,
        docSetId: navState.docSetId,
        blocks: displayMode === 'block',
        tokens: false,
        verbose,
    });

    const resultRows = searchResultRows(passages);

    return (
        <IonPage>
            <PageHeader
                title="Search"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size={1}>
                            <IonLabel position="floating">Search: </IonLabel>
                        </IonCol>
                        <IonCol size={2}>
                            <IonInput
                                size='small'
                                className='search'
                                text-wrap
                                value={searchText}
                                onIonChange={(e)=>setSearchText(e.target.value)}
                                debounce={500}
                            />
                        </IonCol>
                        <IonCol size={8}>
                            <IonButton
                                size='small'
                                value={displayMode}
                                onClick={(e) => toggleSearchDisplayMode(e.target.value)}
                            >
                                Displaying {displayMode}s
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    {resultRows}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Search.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
