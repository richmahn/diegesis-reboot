import React from 'react';
import PropTypes from "prop-types";
import {IonContent, IonGrid, IonPage} from '@ionic/react';
import ReactJson from 'react-json-view';

import { useCatalog, useQuery } from 'proskomma-react-hooks';

import PageHeader from "../../components/PageHeader";
import PkResultDebugRows from "../../components/PkResultDebugRows";
import LoadStatusRow from "../../components/LoadStatusRow";
import './Tab3.css';

export default function Tab3({pkState, isLoaded}) {
    const verbose = true;

    const query = '{' +
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
    '}';

    const catalogState = useCatalog({
        ...pkState,
        verbose,
      });
    
      const queryState = useQuery({
        ...pkState,
        query,
        verbose,
      });

    return (
        <IonPage>
            <PageHeader title="Tab 3" />
            <IonContent fullscreen>
                <IonGrid>
                    <LoadStatusRow status={isLoaded} />
                    <ReactJson src={catalogState} theme="monokai" style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }} />
                    <ReactJson src={queryState} theme="monokai" style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }} />
                    <PkResultDebugRows result={{}} />
                 </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab3.propTypes = {
    pkState: PropTypes.object,
    isLoaded: PropTypes.bool,
};
