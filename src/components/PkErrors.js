import React from "react";
import {IonTitle} from '@ionic/react';
import PropTypes from "prop-types";

export default function PkErrors({errors}) {
    return <>
        <IonTitle className="error">Errors</IonTitle>
        <ul>{
            errors.map(
                (e, n) =>
                    <li key={n} className="error">
                        <p>{e.message}</p>
                        <ul>{
                            e.locations.map(
                                (l, n2) =>
                                    <li key={n2}>{`${l.line}:${l.column}`}</li>
                            )
                        }</ul>
                    </li>
            )
        }</ul>
    </>
}

PkErrors.propTypes = {
    errors: PropTypes.array,
};
