import React, {useState} from "react";
import PropTypes from "prop-types";
import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonInput, IonLabel } from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import { useSearchForPassages } from "proskomma-react-hooks";

import "./Search.css";

export default function Search({pkState, navState, setNavState, catalog}) {

    const verbose = true;

    const [searchText, setSearchText] = useState('');

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
        blocks: false,
        tokens: false,
        verbose,
    });

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
                        <IonCol size={11}>   
                            <IonInput
                                text-wrap
                                value={searchText}
                                onIonChange={(e)=>setSearchText(e.target.value)}
                                debounce={500}
                            />
                        </IonCol>
                    </IonRow>
                    {passages.map((p, n) => <IonRow key={n}>
                            <IonCol size={1}>{p.reference}</IonCol>
                            <IonCol size={11}>{p.text}</IonCol>
                        </IonRow>)}
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
