import React, {useState, useEffect} from "react";
import {usePassage} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow, IonInput} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import parseReferenceString from "./parseReferenceString";

import "./BrowsePassage.css";

export default function BrowsePassage({pkState, navState, setNavState, catalog}) {

    const [reference, setReference] = useState('');
    const [parsedReference, setParsedReference] = useState('3JN 1:1');

    const verbose=true;

    useEffect(
        () => {
            if (parseReferenceString(reference).parsed) {
                setParsedReference(reference);
            }
        } ,
        [reference]
    );

    const {
        // stateId: passageStateId,
        query,
        passages,
        data,
        // errors: passageErrors,
        // reference: passageReference,
    } = usePassage({
        proskomma: pkState.proskomma,
        stateId: pkState.stateId,
        reference: parsedReference,
        verbose,
    });

    return (
        <IonPage>
            <PageHeader
                title="Browse Verse"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonInput
                                value={reference}
                                onIonChange={e => setReference(e.target.value)}
                                debounce={500}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={1} className="debugLabels">Last Parsed Ref</IonCol>
                        <IonCol size={1} className="debugLabels">{parsedReference}</IonCol>
                        <IonCol size={1} className="debugLabels">Current Ref</IonCol>
                        <IonCol size={9}>
                            <pre className="debugLabels">
                                {
                                    JSON.stringify(
                                        parseReferenceString(reference),
                                        null,
                                        2)
                                }
                            </pre>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={1} className="debugLabels">Query</IonCol>
                        <IonCol size={11}><pre className="json">{query}</pre></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={1} className="debugLabels">Data</IonCol>
                        <IonCol size={11}><pre className="json">{JSON.stringify(data, null, 2)}</pre></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={1} className="debugLabels">Passages</IonCol>
                        <IonCol size={11}><pre className="json">{JSON.stringify(passages, null, 2)}</pre></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

BrowsePassage.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
