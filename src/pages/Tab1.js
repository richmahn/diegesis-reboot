import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar,} from '@ionic/react';


import './Tab1.css';

export default function Tab1({pkState, isLoaded}) {
    const [result, setResult] = useState({});

    useEffect(
        () => {
            const tab1Query = '{ id nDocSets }';
            pkState.proskomma.gqlQuery(tab1Query).then(res => setResult(res));
        },
        [pkState.proskomma, isLoaded]
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
                    <IonRow>
                        <IonCol>{
                                result.errors ?
                                    <pre>{JSON.stringify(result.errors, null, 2)}</pre> :
                                    "No Errors"
                            }</IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab1.propTypes = {
    pkState: PropTypes.shape({
        stateId: PropTypes.string,
        newStateId: PropTypes.func,
        proskomma: PropTypes.object.isRequired,
        errors: PropTypes.arrayOf(
            PropTypes.string,
        ).isRequired,
        verbose: PropTypes.bool,
    }),
    isLoaded: PropTypes.bool,
};
