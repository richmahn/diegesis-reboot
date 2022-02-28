import React, {useEffect, useState} from 'react';
import {IonContent, IonGrid, IonPage} from '@ionic/react';

import './Tab1.css';
import PropTypes from "prop-types";
import doQuery from '../../lib/doQuery';
import PageHeader from '../../components/PageHeader';
import PkResultDebugRows from "../../components/PkResultDebugRows";

export default function Tab1({pkState}) {
    const [result, setResult] = useState({});

    useEffect(
        () => {
            setResult(
                doQuery(
                    pkState.proskomma,
                    '{' +
                    '  docSets {' +
                    '    id' +
                    '    documents {' +
                    '      book: header(id:"bookCode")' +
                    '      title: header(id:"toc")' +
                    '    }' +
                    '  }' +
                    '}',
                )
            );
        },
        [pkState.proskomma]
    );

    return (
        <IonPage>
            <PageHeader title="Tab 1" />
            <IonContent fullscreen>
                <IonGrid>
                    <PkResultDebugRows result={result} />
                 </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab1.propTypes = {
    pkState: PropTypes.object,
    isLoaded: PropTypes.bool,
};
