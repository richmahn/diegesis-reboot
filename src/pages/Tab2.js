import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from '@ionic/react';
import './Tab2.css';

const Tab2 = ({pkState}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonGrid>
              <IonRow>
                  <IonCol>
                      <IonTitle size="large">Tab 2: {pkState.proskomma.processorId}</IonTitle>
                  </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
