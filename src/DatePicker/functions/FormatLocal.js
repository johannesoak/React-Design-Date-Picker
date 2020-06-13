export function CreateLocalDateString(date, options, string) {
    if (date && options.Locale) {
        return date.toLocaleDateString(options.Locales)
    } else if (date) {
        return date.toLocaleDateString()
    } else if (!date) {
        return string
    }
}