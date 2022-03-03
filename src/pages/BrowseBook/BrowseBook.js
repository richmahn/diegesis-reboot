import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import PageHeader from '../../components/PageHeader';
import { ScriptureDocSet, ScriptureParaModel, ScriptureParaModelQuery } from 'proskomma-render';
import BrowseDocumentModel from './BrowseDocumentModel';
import './BrowseBook.css';

export default function BrowseBook({ pkState, navState, setNavState, catalog }) {
    const [renderedSequence, setRenderedSequence] = useState(null);

    useEffect(() => {
        console.log("In BrowseBook useEffect, docSetId=", navState.docSetId, "docId=", navState.docId)
        if (navState.docId && navState.docSetId) {
            const doRender = async () => {
                console.log("   In doRender, docSetId=", navState.docSetId, "docId=", navState.docId)
                const config = {
                    rendered: [],
                    versesCallback: () => {},
                    chapter: navState.chapter,
                    verse: navState.verse,
                };
                const resData = await ScriptureParaModelQuery(
                    pkState.proskomma,
                    [navState.docSetId],
                    [navState.docId]
                );
                const model = new ScriptureParaModel(resData, config);
                const docSetModel = new ScriptureDocSet(resData, model.context, config);
                docSetModel.addDocumentModel(
                    'default',
                    new BrowseDocumentModel(resData, model.context, config)
                );
                model.addDocSetModel('default', docSetModel);
                model.render();
                setRenderedSequence(config.rendered);
            };
            doRender().then();
        }
    }, [pkState.stateId, navState.docSetId, navState.docId]);
    return (
        <IonPage>
            <PageHeader
                title="Browse Book"
                navState={navState}
                setNavState={setNavState}
                catalog={catalog}
            />
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>{renderedSequence}</IonCol>
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
    catalog: PropTypes.object.isRequired,
};
