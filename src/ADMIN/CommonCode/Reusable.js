export const isValidEmail = (email) => {
    if (!email) return false

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email.trim())
}