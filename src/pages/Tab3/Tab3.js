import React from 'react';
import PropTypes from "prop-types";
import {IonContent, IonGrid, IonRow, IonCol, IonPage} from '@ionic/react';

import { useQuery } from 'proskomma-react-hooks';

import PageHeader from "../../components/PageHeader";
import PkResultDebugRows from "../../components/PkResultDebugRows";

import './Tab3.css';

export default function Tab3({pkState}) {

    const verbose = true;

/*
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
 */

    const query = '{docSets {id}}'

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
                    <IonRow>
                        <IonCol>{JSON.stringify(queryState)}</IonCol>
                    </IonRow>
                    <PkResultDebugRows result={{data: queryState.data, errors: queryState.errors}} />
                 </IonGrid>
            </IonContent>
        </IonPage>
    );
}

Tab3.propTypes = {
    pkState: PropTypes.object,
};
