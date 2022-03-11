import React, {useState, useEffect} from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow, IonInput} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import parseReferenceString from "./parseReferenceString";

import "./BrowsePassage.css";

export default function BrowsePassage({pkState, navState, setNavState, catalog}) {

    const [reference, setReference] = useState('');
    const [parsedReference, setParsedReference] = useState('');
    const [parseResult, setParseResult] = useState({});

    const verbose=true;

    useEffect(
        () => {
            const pr = parseReferenceString(reference);
            setParseResult(pr);
            if (pr.parsed) {
                setParsedReference(pr.original);
            }
        } ,
        [reference]
    );

    const queryState = useQuery({
        ...pkState,
        query: `{
  docSet(id:"${navState.docSetId}") {
    document(bookCode:"${parsedReference.split(/\s+/)[0]}") {
      cv(chapterVerses:"${parsedReference.split(/\s+/)[1]}") {
        scopeLabels(startsWith:["chapter", "verses"])
        text
      }
    }
  }
}`,
        verbose,
    });

    /*
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
*/

    console.log(parseResult)

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
                                style={{color: parseResult.parsed && parseResult.startVerse ? '#0C0' : '#C00'}}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={1} className="debugLabels">Data</IonCol>
                        <IonCol size={11}><pre className="json">{JSON.stringify(queryState.data, null, 2)}</pre></IonCol>
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
