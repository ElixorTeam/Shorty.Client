import { useParams } from "react-router-dom";
import { LinkRecordType } from "./shared/LinkRecordType";
import useSWR from "swr";

export const apiURL = 'http://localhost:8082/shorty/api'

const getLinkByUUID = async(ref: string) => {
    return await fetch(`${apiURL}/links/route_ref/${ref}`)
        .then(req => {
            if (!req.ok) throw new Error(`${req.status} ${req.statusText}`)
            return req.json()
        })
}

export default function App() {
    const { ref } = useParams()
    const pattern: RegExp = /^[a-zA-Z0-9]{5}$/
    if(!ref || !pattern.test(ref as string)) return <p>Incorrect in url</p>
    const { data, error } = useSWR<LinkRecordType, Error>(ref, getLinkByUUID,
        { shouldRetryOnError: false })
    if (error) {
        console.log(error)
        return <p>Error</p>
    }
    if (!data) return null
    window.location.assign(data.ref)
    return <p>Redirecting...</p>
}
