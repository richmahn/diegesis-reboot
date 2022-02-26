import React, {useEffect, useState} from 'react';
import {IonContent, IonGrid, IonPage} from '@ionic/react';

import './Tab3.css';
import PropTypes from "prop-types";
import doQuery from "../../lib/doQuery";
import PageHeader from "../../components/PageHeader";
import PkResultDebugRows from "../../components/PkResultDebugRows";
import LoadStatusRow from "../../components/LoadStatusRow";

export default function Tab3({pkState, isLoaded}) {
    const [result, setResult] = useState({});

    useEffect(
        () => {
            setResult(
                doQuery(
                    pkState.proskomma,
                    '{' +
                    '  docSet(id:"xyz-spa_rv09") {' +
                    '    id' +
                    '    document(bookCode:"GAL") {' +
                    '      id' +
                    '      cv(chapterVerses:"5:1") {' +
                    '        text' +
                    '        tokens {' +
                    '          payload' +
                    '        }' +
                    '        items {' +
                    '          type' +
                    '          subType' +
                    '          payload' +
                    '        }' +
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
            <PageHeader title="Tab 3" />
            <IonContent fullscreen>
                <IonGrid>
                    <LoadStatusRow status={isLoaded} />
                    <PkResultDebugRows result={result} />
                 </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab3.propTypes = {
    pkState: PropTypes.object,
    isLoaded: PropTypes.bool,
};
