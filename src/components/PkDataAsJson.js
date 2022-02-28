import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";

export default function PkDataAsJson({data}) {
    return <ReactJson src={data} theme="monokai" style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }} />

}

PkDataAsJson.propTypes = {
    data: PropTypes.object,
};
