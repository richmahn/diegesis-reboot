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
        if (navState.docSetId && catalog?.docSets) {
            const doRender = async () => {
                const config = {
                    rendered: [],
                 };
                const findBible = (doc) => doc.id === navState.docSetId;
                const bible = catalog?.docSets.find(findBible);
                const book = bible?.documents.find((doc) => doc.bookCode === navState.bookCode);
                if (book) {
                    const resData = await ScriptureParaModelQuery(
                        pkState.proskomma,
                        [navState.docSetId],
                        [book.id]
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
                }
            };
            doRender().then();
        }
    }, [pkState.stateId, navState.docSetId, navState.bookCode, catalog?.docSets]);
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
