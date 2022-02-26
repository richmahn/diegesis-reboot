import React, {useEffect, useState} from 'react';
import {IonContent, IonGrid, IonPage} from '@ionic/react';

import './Tab2.css';
import PropTypes from "prop-types";
import doQuery from "../../lib/doQuery";
import PageHeader from "../../components/PageHeader";
import PkResultDebugRows from "../../components/PkResultDebugRows";
import LoadStatusRow from "../../components/LoadStatusRow";

export default function Tab2({pkState, isLoaded}) {
    const [result, setResult] = useState({});

    useEffect(
        () => {
            setResult(
                doQuery(
                    pkState.proskomma,
                    '{' +
                    'docSet(id:"xyz-spa_vbl") {' +
                    '  id' +
                    '  document(bookCode:"GAL") {' +
                    '      mainBlocks {' +
                    '        text' +
                    '      }' +
                    '    }' +
                    '  }' +
                    '}',
                )
            );
        },
        [isLoaded, pkState.proskomma]
    );

    return (
        <IonPage>
            <PageHeader title="Tab 2" />
            <IonContent fullscreen>
                <IonGrid>
                    <LoadStatusRow status={isLoaded} />
                    <PkResultDebugRows result={result} />
                 </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab2.propTypes = {
    pkState: PropTypes.object,
    isLoaded: PropTypes.bool,
};
