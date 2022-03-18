import React, {useState, useEffect} from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow, IonInput, IonTitle, IonToggle, IonLabel} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import parseReferenceString from "./parseReferenceString";

import "./BrowsePassage.css";

export default function BrowsePassage({pkState, navState, setNavState, catalog}) {

    const [reference, setReference] = useState('3JN 1:1-3');
    const [parsedReference, setParsedReference] = useState('3JN 1:1-3');
    const [parseResult, setParseResult] = useState({});
    const [allDocSets, setAllDocSets] = useState(false);
    const [groupVerses, setGroupVerses] = useState(false);

    const verbose = true;

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
        },
        [reference]
    );

    const queryState = useQuery({
        ...pkState,
        query: `{
    docSets { 
      id
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
    const selectedDocSets = queryState.data.docSets?.filter((ds) => allDocSets || ds.id === navState.docSetId) || [];
    const cvArray = selectedDocSets[0]?.document.cv.map(v => v.scopeLabels) || [];

    const renderAllText = (ds, n) => {
        return <div key={n}>
            <IonRow>
                <IonCol>
                    <IonTitle>
                        {ds.id}
                    </IonTitle>
                </IonCol>
            </IonRow>
            {ds.document?.cv.map(
                (v, n2) => <IonRow key={`${n}-${n2}`}>

                    <IonCol size={2}>
                        {`${sLO(v.scopeLabels)["chapter"]}:${sLO(v.scopeLabels)["verses"]}`}
                    </IonCol>
                    <IonCol size={10}>
                        {v.text}
                    </IonCol>
                </IonRow>
            )
            }
        </div>
    };

    const renderVerses = (cvA) => {
        return cvA.map((cv, n) => <div key={n}>
                <IonRow>
                    <IonCol>
                        <IonTitle>{cv[0].split("/")[1]}:{cv[1].split("/")[1]}</IonTitle>
                    </IonCol>
                </IonRow>
                {selectedDocSets.map((ds, n2) =>
                    <IonRow key={n2}>
                        <IonCol size={2}>
                            {ds.id}
                        </IonCol>
                        <IonCol size={10}>
                            {ds.document.cv[n].text}
                        </IonCol>
                    </IonRow>
                )}
            </div>
        )
    };

    const renderResults = () => {

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
        } else if (selectedDocSets?.filter(ds => ds.document).length === 0) {
            return <IonRow>
                <IonCol>
                    Book not found!
                </IonCol>
            </IonRow>;
        } else if (selectedDocSets?.filter(ds => ds.document?.cv.length > 0).length === 0) {
            return <IonRow>
                <IonCol>
                    Verse not found!
                </IonCol>
            </IonRow>;
        } else {
            return renderResults1()
        }
    };

    const renderResults1 = () => {
        if (!groupVerses) {
            return selectedDocSets?.filter(ds => ds.document).map(renderAllText);
        } else {
            return renderVerses(cvArray);
        }
    }

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
                        <IonCol size={2}>
                            <IonInput
                                value={reference}
                                onIonChange={e => setReference(e.target.value)}
                                debounce={500}
                                style={{color: parseResult.parsed && parseResult.startVerse ? '#0C0' : '#C00'}}
                            />
                        </IonCol>
                        <IonCol size={5}>
                            <IonLabel position="relative">Show all languages:</IonLabel>
                            <IonToggle onIonChange={() => setAllDocSets(!allDocSets)} />
                        </IonCol>
                        <IonCol size={5}>
                            <IonLabel position="relative">Group by verse:</IonLabel>
                            <IonToggle onIonChange={() => setGroupVerses(!groupVerses)} />
                        </IonCol>
                    </IonRow>
                    {renderResults()}
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
