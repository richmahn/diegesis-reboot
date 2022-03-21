import React from "react";
import PropTypes from "prop-types";
import PassageByVersion from "./PassageByVersion";

export default function PassageByVersions({docSets}) {
   return docSets?.filter(ds => ds.document).map((ds, n) => <PassageByVersion key={n} docSet={ds} keyPrefix={n} />);
}

PassageByVersions.propTypes = {
    docSets: PropTypes.array.isRequired,
};
