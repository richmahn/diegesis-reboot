import React, {useEffect, useState} from 'react';
import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar,} from '@ionic/react';

import './Tab1.css';
import PropTypes from "prop-types";

export default function Tab2({pkState, isLoaded}) {
    const [result, setResult] = useState({});

    useEffect(
        () => {
            const tab1Query = '{ docSet(id:"xyz-spa_rv09") { id document(bookCode:"GAL") { mainBlocks { text } } } }';
            pkState.proskomma.gqlQuery(tab1Query).then(res => setResult(res));
        },
        [isLoaded]
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        <IonCol>{
                                isLoaded ?
                                    'Loaded' :
                                    'Not Loaded'
                            }</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>{
                                result.data ?
                                    <pre>{JSON.stringify(result.data, null, 2)}</pre> :
                                    "No Data"
                            }</IonCol>
                    </IonRow>
                    {
                        result.errors && <>
                            <IonRow>
                                <IonCol><IonTitle>Errors</IonTitle></IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol><ul>{result.errors.map(
                                    (e, n) => <li key={n}>{e.message}</li>
                                )}</ul></IonCol>
                            </IonRow>
                            </>
                    }
                 </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab2.propTypes = {
    pkState: PropTypes.object,
    isLoaded: PropTypes.bool,
};
