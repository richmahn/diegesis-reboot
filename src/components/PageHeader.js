import {IonCol, IonGrid, IonHeader, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar} from "@ionic/react";
import React, {useState} from "react";
import PropTypes from "prop-types";

export default function PageHeader({title, navState}) {
    // To do 1. Add drop down selectors for Bible, Book, Chapter , verse
    // 2. Use navState to show current value
    // 3. Use setNavState to set new value on change
    // 4. Add Next, previous buttons as per the tab ie next chapter /previous chapter on chapters tab
    // 5. Hide Book, chapter, verse dropdown as per tab

    const [color, setColor] = useState("red");

    console.log(navState);
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
                        <IonCol size={3}>
                            <IonSelect
                                value={color}
                                okText="Change"
                                cancelText="Cancel"
                                onIonChange={e => setColor(e.detail.value)}
                            >
                                <IonSelectOption value="brown">Brown</IonSelectOption>
                                <IonSelectOption value="blonde">Blonde</IonSelectOption>
                                <IonSelectOption value="black">Black</IonSelectOption>
                                <IonSelectOption value="red">Red</IonSelectOption>
                            </IonSelect>
                        </IonCol>
                        <IonCol size={3}>{color}</IonCol>
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
};
