import React, { useEffect, useState } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import PropTypes from 'prop-types';
const BookDropDown = ({ navState, setNavState, catalog }) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        if (catalog?.docSets && navState?.docSetId) {
            //find document in catalog using current bible ie navState.docSetId
            const findDoc = (doc) => doc.id === navState.docSetId;
            const bible = catalog?.docSets.find(findDoc);
            setDocuments(bible?.documents ?? []);
        }
    }, [catalog?.docSets]);
    const setBook = (e) => {
        const doc = documents.find((doc) => doc.bookCode === e.detail.value);
        setNavState((prevState) => ({ ...prevState, bookCode: e.detail.value, docId: doc.id }));
    };

    return (
        <IonSelect
            value={navState.bookCode}
            okText="Change"
            cancelText="Cancel"
            onIonChange={(e) => setBook(e)}
        >
            {documents?.map((document) => {
                return (
                    <IonSelectOption value={document.bookCode} key={document.id}>
                        {document.bookCode}
                    </IonSelectOption>
                );
            })}
        </IonSelect>
    );
};

export default BookDropDown;

BookDropDown.propTypes = {
    navState: PropTypes.object.isRequired,
    setNavState: PropTypes.func.isRequired,
    catalog: PropTypes.object.isRequired,
};
