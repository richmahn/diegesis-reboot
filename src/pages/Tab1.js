import React from 'react';
import PropTypes from 'prop-types';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';

import { useQuery } from 'proskomma-react-hooks';

import './Tab1.css';

export default function Tab1({ pkState }) {
  const {
    stateId,
    // newStateId,
    proskomma,
    errors: proskommaErrors,
    verbose,
  } = pkState;

  const query = '{ id }';

  const {
    stateId: queryStateId,
    query: queryRun,
    data,
    errors: queryErrors,
  } = useQuery({
    proskomma,
    stateId,
    query,
    verbose,
  });

  const dataStringified = JSON.stringify({
    stateId,
    queryStateId,
    query,
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
              <IonTitle size="large">Tab 1 : pId: {proskomma.processorId}, stateId: {queryStateId} </IonTitle>
              <IonText>
                <span style={{ whiteSpace: 'pre' }}>
                  {dataStringified}
                </span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

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
};
