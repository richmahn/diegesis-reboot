import React from 'react';
import PropTypes from "prop-types";
import {IonPage} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";

import './BrowseChapter.css';

export default function BrowseChapter({pkState}) {

    const query = '{' +
    '  docSet(id:"xyz-spa_rv09") {' +
    '    id' +
    '    document(bookCode:"GAL") {' +
    '      id' +
    '      cv(chapter:"5") {' +
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

    return (
        <IonPage>
            <PageHeader title="Tab 3" />
            <StubPageContent pkState={pkState} query={query} />
        </IonPage>
    );
}

BrowseChapter.propTypes = {
    pkState: PropTypes.object.isRequired,
};
