import React from 'react';
import { IonCol, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

export default function PageHeader({ title, navState, setNavState, catalog }) {
    // To do 1. Add drop down selector for Bible Done
    // 2. Add drop down selector Book dropdown - Done
    // 3. Add drop down selector Chapter dropdown
    // 4. Add drop down selector verse dropdown
    // 5. Use navState to show current value
    // 6. Use setNavState to set new value on change
    // 7. Add Next, previous buttons as per the tab ie next chapter /previous chapter on chapters tab
    // 8. Hide Book, chapter, verse dropdown as per tab

    return (
        <IonHeader>
            <IonToolbar>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonTitle size="large">{title}</IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <Navigation
                            navState={navState}
                            setNavState={setNavState}
                            catalog={catalog}
                        />
                    </IonRow>
                </IonGrid>
            </IonToolbar>
        </IonHeader>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string,
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
