import React from 'react';
import PropTypes from "prop-types";
import {IonPage} from '@ionic/react';
import PageHeader from "../../components/PageHeader";
import StubPageContent from "../../components/StubPageContent";
import './Versions.css';

export default function Versions({pkState}) {

    const query = '{' +
        '  docSets {' +
        '    id' +
        '    selectors {' +
        '      key' +
        '      value' +
        '    }' +
        '    documents {' +
        '      id' +
        '      book: header(id:"bookCode")' +
        '      title: header(id:"toc")' +
        '    }' +
        '  }' +
        '}';

    return <IonPage>
        <PageHeader title="List Versions" />
        <StubPageContent
            pkState={pkState}
            query={query}
            description="Catalog of DocSets and Documents. It will be possible to pick a Bible version and a book from here"
        />
    </IonPage>
}

Versions.propTypes = {
    pkState: PropTypes.object.isRequired,
};
