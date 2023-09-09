const LINK_REF_PATTERN = /^[a-zA-Z0-9]{3,10}$/

const isValidRef = (ref: string): boolean => LINK_REF_PATTERN.test(ref)

export default isValidRef
