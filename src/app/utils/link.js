import {default as NextLink} from 'next/link'


export default function Link ({className, children, ...props}) {
    const linkCSS = className ? className : ""
    return <NextLink className={linkCSS} {...props} >{children}</NextLink>
}