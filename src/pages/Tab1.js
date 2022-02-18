import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar,} from '@ionic/react';

import {useQuery} from 'proskomma-react-hooks';

import './Tab1.css';

export default function Tab1({pkState, isLoaded}) {
    const [result, setResult] = useState({});
    const {
        stateId,
        // newStateId,
        proskomma,
        errors: proskommaErrors,
        verbose,
    } = pkState;

    const tab1Query = '{ docSets { id } }';

    const {
        stateId: queryStateId,
        query: queryRun,
        data,
        errors: queryErrors,
    } = useQuery({
        proskomma,
        stateId,
        tab1Query,
        verbose,
    });

    useEffect(
        () => proskomma.gqlQuery(tab1Query).then(res => setResult(res)),
        [proskomma, isLoaded]
    );

    const dataStringified = JSON.stringify({
        stateId,
        queryStateId,
        tab1Query,
        queryRun,
        proskommaErrors,
        queryErrors,
        data,
    }, null, 2);

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
                        <IonCol>
                            <IonTitle size="large">{isLoaded ? "Loaded" : "Not Loaded"} {JSON.stringify(result)}</IonTitle>
                            <IonText>
                <span style={{whiteSpace: 'pre'}}>
                  {dataStringified}
                </span>
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab1.propTypes = {
    pkState: PropTypes.shape({
        stateId: PropTypes.string.isRequired,
        newStateId: PropTypes.func.isRequired,
        proskomma: PropTypes.object.isRequired,
        errors: PropTypes.arrayOf(
            PropTypes.string,
        ).isRequired,
        verbose: PropTypes.bool,
    }),
        isLoaded: PropTypes.bool,
};
