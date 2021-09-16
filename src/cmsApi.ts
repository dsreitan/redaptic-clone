const baseUrl = "https://localhost:5021"

export interface IDocument { _id: string }

export const cmsGet = async <T>(relativeUrl: string) => {
    const response = await fetch(baseUrl + relativeUrl)
    return await cmsResult<T>(response)
}
export const cmsPost = async (relativeUrl: string, body: object) => {
    const response = await fetch(baseUrl + relativeUrl, cmsPayload("POST", body))
    return await cmsResult(response)
}
export const cmsPut = async <T>(relativeUrl: string, body: object) => {
    const response = await fetch(baseUrl + relativeUrl, cmsPayload("PUT", body))
    return await cmsResult<T>(response)
}
export const cmsDelete = async (relativeUrl: string) => {
    const response = await fetch(baseUrl + relativeUrl, { method: "DELETE" })
    if (response.status === 204) return "OK";
    throw Error(await response.text())
}

const cmsPayload = (method: string, body: object) => {
    return { method, body: JSON.stringify(body), headers: { "Content-Type": "application/json" } }
}

const cmsResult = async <T>(response: Response) => {
    if (response.status !== 200) throw Error(await response.text())

    const json = await response.json()

    return json as T
}
