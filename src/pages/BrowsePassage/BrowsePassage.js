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

    const sLO = (sL) => {
        const ret = {};
        sL.forEach(l => {
            const [scopeType, scopeNumber] = l.split("/");
            ret[scopeType] = scopeNumber;
        })
        return ret;
    };

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
      bookCode: header(id: "bookCode")
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
const renderText = (d) => {
    if (reference === '') {
        return <IonRow>
                <IonCol>
                    Please enter a book reference!
                </IonCol>
            </IonRow>;
    } else if (!parseResult.parsed || !parseResult.startVerse) {
        return <IonRow>
                <IonCol>
                    Wrong format!
                </IonCol>
            </IonRow>;
    } else if (d.docSet?.document === null) {
        return <IonRow>
                <IonCol>
                    Book not found!
                </IonCol>
            </IonRow>;
    }  else if (!d.docSet?.document.cv[0]) {
        return <IonRow>
                <IonCol>
                    Verse not found!
                </IonCol>
            </IonRow>;
    }   else { return queryState.data.docSet?.document?.cv.map((v, n) => <IonRow key={n}>
                        <IonCol>
                            {`${queryState.data.docSet?.document?.bookCode} ${sLO(v.scopeLabels)["chapter"]}:${sLO(v.scopeLabels)["verses"]}`}
                        </IonCol>
                        <IonCol>
                            {v.text}
                        </IonCol>
                    </IonRow>)
    }
};


    console.log(queryState.data)
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
                    {renderText(queryState.data)}
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
