import {useParams} from "react-router-dom";
import {LinkRecordType} from "./shared/LinkRecordType";

export const apiURL = 'http://localhost:8082/shorty/api'

function getLinkByUUID(ref: string): Promise<LinkRecordType> {
    return fetch(`${apiURL}/links/route_ref/${ref}`)
        .then(req => req.json())
        .catch(err => console.log(err))
}

export default async function App() {
    const { ref } = useParams();
    const pattern: RegExp = /^[a-zA-Z0-9]{5}$/
    if (ref === undefined || !pattern.test(ref as string)) return <p>Incorrect url: {ref}</p>
    const linkData: LinkRecordType = await getLinkByUUID(ref as string)
    if (linkData != undefined) window.location.assign(linkData.ref)
    return <p>Error</p>
}
