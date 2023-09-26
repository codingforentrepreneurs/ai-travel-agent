import {default as NextLink} from 'next/link'


export default function Link ({className, children, ...props}) {
    const linkCSS = className ? className : "text-emerald-500 hover:text-emerald-900 dark:text-gray-400 dark:hover:text-gray-900"
    return <NextLink className={linkCSS} {...props} >{children}</NextLink>
}