import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {IonCol, IonContent, IonGrid, IonPage, IonRow} from "@ionic/react";
import PageHeader from "../../components/PageHeader";
import {ScriptureDocSet, ScriptureParaModel, ScriptureParaModelQuery} from "proskomma-render";
import BrowseDocumentModel from "./BrowseDocumentModel";
import "./BrowseBook.css";

export default function BrowseBook({pkState, navState, setNavState}) {
    const [renderedSequence, setRenderedSequence] = useState(null);
    useEffect(
        () => {
            const doRender = async () => {
                const config = {
                    rendered: [],
                    versesCallback: (() => {
                    }),
                    chapter: navState.chapter,
                    verse: navState.verse,
                };
                // KLUDGE!!!
                const docId =
                    Object.keys(pkState.proskomma.documents).length > 0 ?
                        Object.values(pkState.proskomma.documents)
                            .filter((d => d.docSetId === navState.docSetId))[0].id :
                        '';
                // END OF KLUDGE!!!
                const resData = await ScriptureParaModelQuery(
                    pkState.proskomma,
                    [navState.docSetId],
                    [docId]);
                const model = new ScriptureParaModel(resData, config);
                const docSetModel = new ScriptureDocSet(resData, model.context, config);
                docSetModel.addDocumentModel("default", new BrowseDocumentModel(resData, model.context, config));
                model.addDocSetModel('default', docSetModel);
                model.render();
                setRenderedSequence(config.rendered);
            }
            doRender().then();
        },
        [pkState.stateId]
    );
    return (
        <IonPage>
            <PageHeader
                title="Browse Book"
                navState={navState}
                setNavState={setNavState}
            />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {renderedSequence}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

BrowseBook.propTypes = {
    pkState: PropTypes.object.isRequired,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
};
