import React from "react";
import { IonSelect, IonSelectOption } from '@ionic/react';
import PropTypes from 'prop-types';

const ChapterDropDown = ({ navState, setNavState }) => {

    const setChapter = (e) => {
        setNavState((prevState) => ({ ...prevState, chapter: e.detail.value }));
    };

  return (
    <IonSelect
        value={navState.chapter}
        okText="Change"
        cancelText="Cancel"
        onIonChange={(e) => setChapter(e)}
    >
        {navState.chapters?.map((chapter) => {
            return (
                <IonSelectOption value={chapter} key={chapter}>
                    {chapter}
                </IonSelectOption>
            );
        })}
    </IonSelect>
);
};

export default ChapterDropDown;

ChapterDropDown.propTypes = {
  navState: PropTypes.object.isRequired,
  setNavState: PropTypes.func.isRequired,
};
