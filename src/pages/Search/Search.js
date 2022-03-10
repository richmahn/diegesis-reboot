import React, {useState} from "react";
import PropTypes from "prop-types";
import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonInput} from "@ionic/react";
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
                        <IonCol>
                            <IonInput value={searchText} onIonChange={(e)=>setSearchText(e.target.value)} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol><pre>{JSON.stringify(passages, null, 2)}</pre></IonCol>
                    </IonRow>
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
