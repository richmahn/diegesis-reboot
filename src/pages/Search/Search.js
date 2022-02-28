import React from 'react';
import PropTypes from "prop-types";
import {IonPage} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";

import './Search.css';

export default function Search({pkState}) {

    const query = '{' +
    '  docSet(id:"xyz-spa_vbl") {' +
    '    id' +
    '    document(bookCode:"GAL") {' +
    '      mainSequence {' +
        '    blocks(withChars:["libertad"]) {' +
        '      scopeLabels(startsWith:["chapter", "verse/"])' +
        '      text' +
        '    }' +
        '  }' +
    '    }' +
    '  }' +
    '}';

    return (
        <IonPage>
            <PageHeader title="Search" />
            <StubPageContent
                pkState={pkState}
                query={query}
                description="Search for verses containing certain words (currently 'libertad' in Galatians)."
            />
        </IonPage>
    );
}

Search.propTypes = {
    pkState: PropTypes.object.isRequired,
};
