export default function(reference) {
    // LUK 1 ;  LUK 1:1 ; LUK 1:1-3 ; LUK 1:3-2:4
    const digitRE = /^[1-9][0-9]*$/
    const response = {
        original: reference.trim(),
        parsed: false,
    };
    const bookCV = reference.trim().split(/\s+/)
    if (bookCV.length === 2 && bookCV[0].length === 3) { // Leave loose cost Pk makes up book names!
        response.bookCode = bookCV[0];
        const cv = bookCV[1];
        if (digitRE.test(cv)) { // A number, so chapter only
            response.startChapter = cv;
            response.endChapter = cv;
            response.startVerse = null;
            response.endVerse = null;
            response.parsed = true;
        } else if (!cv.includes('-')) { // c:v or error
            const cvBits = cv.split(':');
            if (cvBits.length === 2 && digitRE.test(cvBits[0]) && digitRE.test(cvBits[1])) {
                response.startChapter = cvBits[0];
                response.endChapter = cvBits[0];
                response.startVerse = cvBits[1];
                response.endVerse = cvBits[1];
                response.parsed = true;
            }
        } else { // c:v-v or c:v-c:v or error
            const fromToBits = cv.split('-');
            if (fromToBits.length === 2) {
                const fromToCV = fromToBits.map(
                    ftb => {
                        const cvBits = ftb.split(":");
                        if (cvBits.length === 2 && digitRE.test(cvBits[0]) && digitRE.test(cvBits[1])) { // c:v
                            return cvBits;
                        } else if (cvBits.length === 1 && digitRE.test(cvBits[0])) { // v
                            return  [cvBits[0]];
                        } else {
                            return null;
                        }
                    }
                ).filter(e => e);
                if (fromToCV.length === 2 && fromToCV[0].length === 2) {
                    response.startChapter = fromToCV[0][0];
                    response.endChapter = fromToCV[1].length === 2 ? fromToCV[1][0] : fromToCV[0][0];
                    response.startVerse = fromToCV[0][1];
                    response.endVerse = fromToCV[1].length === 2 ? fromToCV[1][1] : fromToCV[1][0];
                    response.parsed = true;
                }
            }
        }

    }
    return response;
}
