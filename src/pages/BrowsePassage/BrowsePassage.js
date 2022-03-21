import React, {useState, useEffect} from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow, IonInput, IonLabel, IonRadioGroup, IonRadio} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import parseReferenceString from "./parseReferenceString";
import PassageResults from "./PassageResults";
import "./BrowsePassage.css";

export default function BrowsePassage({pkState, navState, setNavState, catalog}) {

    const [reference, setReference] = useState('3JN 1:1-3');
    const [parsedReference, setParsedReference] = useState('3JN 1:1-3');
    const [parseResult, setParseResult] = useState({});
    const displayFlags = {
        versesForOneVersion: {allDocSets: false, groupVerses: false, byBlock: false},
        versesByVersion: {allDocSets: true, groupVerses: false, byBlock: false},
        versesByVerse: {allDocSets: true, groupVerses: true, byBlock: false},
        blocksForOneVersion: {allDocSets: false, groupVerses: false, byBlock: true},
        blocksByVersion: {allDocSets: true, groupVerses: false, byBlock: true},
    };

    const [displayMode, setDisplayMode] = useState("versesForOneVersion");

    const verbose = true;

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

    const query = `{
        docSets { 
          id
          document(bookCode:"${parsedReference.split(/\s+/)[0]}") {
          bookCode: header(id: "bookCode")
          cv(chapterVerses:"${parsedReference.split(/\s+/)[1]}") {
            scopeLabels(startsWith:["chapter", "verses"])
            text
          }
          mainSequence {
              blocks(withScriptureCV:"${parsedReference.split(/\s+/)[1]}") {
                  text (withScriptureCV:"${parsedReference.split(/\s+/)[1]}")
            }
          }
        }
      }
    }`;

    const queryState = useQuery({
        ...pkState,
        query: query,
        verbose,
    });
    const selectedDocSets = queryState.data.docSets?.filter((ds) => displayFlags[displayMode].allDocSets || ds.id === navState.docSetId) || [];

    console.log(query)
    console.log(queryState.data.docSets?.filter((ds) => displayFlags[displayMode].allDocSets || ds.id === navState.docSetId)[0]?.document.mainSequence.blocks.map(b => b.text))
    return (
        <IonPage>
            <PageHeader
                title="Browse Verse"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <IonContent>
                <IonRadioGroup value={displayMode} onIonChange={e => setDisplayMode(e.detail.value)}>
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
                            <IonCol size={2}>
                                <IonLabel>One Version</IonLabel>
                                <IonRadio value="versesForOneVersion" />
                            </IonCol>
                            <IonCol size={2}>
                                <IonLabel>By Version</IonLabel>
                                <IonRadio value="versesByVersion" />
                            </IonCol>
                            <IonCol size={2}>
                               <IonLabel>By Verse</IonLabel>
                               <IonRadio value="versesByVerse" />
                           </IonCol>
                           <IonCol size={2}>
                               <IonLabel>Blocks For One Version</IonLabel>
                               <IonRadio value="blocksForOneVersion" />
                           </IonCol>
                           <IonCol size={2}>
                               <IonLabel>Blocks By Version</IonLabel>
                               <IonRadio value="blocksByVersion" />
                           </IonCol>
                        </IonRow>
                        <PassageResults 
                            reference={reference} 
                            parseResult={parseResult} 
                            docSets={selectedDocSets} 
                            displayFlags={displayFlags[displayMode]} 
                        />
                    </IonGrid>
                </IonRadioGroup>
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
