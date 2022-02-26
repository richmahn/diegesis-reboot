import React from "react";
import PropTypes from "prop-types";

export default function PkDataAsJson({data}) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>
}

PkDataAsJson.propTypes = {
    data: PropTypes.object,
};
