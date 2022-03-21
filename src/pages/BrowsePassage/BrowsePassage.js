import React, {useState, useEffect} from "react";
import {useQuery} from "proskomma-react-hooks";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow, IonInput, IonToggle, IonLabel} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import parseReferenceString from "./parseReferenceString";
import PassageResults from "./PassageResults";
import "./BrowsePassage.css";

export default function BrowsePassage({pkState, navState, setNavState, catalog}) {

    const [reference, setReference] = useState('3JN 1:1-3');
    const [parsedReference, setParsedReference] = useState('3JN 1:1-3');
    const [parseResult, setParseResult] = useState({});
    const [allDocSets, setAllDocSets] = useState(false);
    const [groupVerses, setGroupVerses] = useState(false);

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
      mainSequence {
          blocks(withScriptureCV:"1:1") {
              text (withScriptureCV:"1:1")
        }
      }
    }
  }
}`,
        verbose,
    });
    const selectedDocSets = queryState.data.docSets?.filter((ds) => allDocSets || ds.id === navState.docSetId) || [];

    //console.log(queryState.data.selectedDocSets?.document.mainSequence.blocks[0])
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
                    <PassageResults reference={reference} parseResult={parseResult} docSets={selectedDocSets} groupVerses={groupVerses} />
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
