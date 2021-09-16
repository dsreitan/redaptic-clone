export const params = new URLSearchParams(location.search)

export const setParamsAndReplaceHistory = (key: string, value?: string) => {
    value ? params.set(key, value) : params.delete(key)
    history.replaceState({}, '', `${location.pathname}?${params}`)
}