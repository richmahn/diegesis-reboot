import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from '@ionic/react';
import './Tab3.css';

const Tab3 = ({pkState}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonGrid>
              <IonRow>
                  <IonCol>
                      <IonTitle size="large">Tab 3: {pkState.proskomma.processorId}</IonTitle>
                  </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
