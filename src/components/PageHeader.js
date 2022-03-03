import {IonCol, IonGrid, IonHeader, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar} from "@ionic/react";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function PageHeader({title, navState, setNavState, catalog}) {
    // To do 1. Add drop down selectors for Bible, Book, Chapter , verse
    // 2. Use navState to show current value
    // 3. Use setNavState to set new value on change
    // 4. Add Next, previous buttons as per the tab ie next chapter /previous chapter on chapters tab
    // 5. Hide Book, chapter, verse dropdown as per tab
    const [bibles, setBibles] = useState([])

    const setBible = (value) => {
        setNavState((prevState) => ({...prevState, docSetId: value}));
    }

    useEffect(() => {
        if (catalog?.docSets) {
            setBibles(catalog?.docSets ?? []);
        }
    }, [catalog?.docSets]);

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
                                value={navState.docSetId}
                                okText="Change"
                                cancelText="Cancel"
                                onIonChange={e => setBible(e.detail.value)}
                            >
                                {bibles?.map((bible) =>
                                    <IonSelectOption value={bible.id} key={bible.id}>{bible.id}</IonSelectOption>
                                )}
                            </IonSelect>
                        </IonCol>
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
    catalog: PropTypes.object.isRequired
};
