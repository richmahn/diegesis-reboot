export default function (pk, query) {
    return pk.gqlQuerySync(query);
}
