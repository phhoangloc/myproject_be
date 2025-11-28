
export class ValidateUser {
    private username: string = ""
    private password: string = ""
    private email: string = ""

    public setusername(username: string) {
        this.username = username
        return this
    }
    public setpassword(password: string) {
        this.password = password
        return this

    }
    public setemail(email: string) {
        this.email = email
        return this
    }

    public build() {
        if (this.username && this.username.length < 6) {
            throw new Error("your username must be equal or larger than 6 character")
        }
        if (this.password && this.password.length < 6) {
            throw new Error("your password must be equal or larger than 6 character")
        }
        if (this.email && !/\S+@\S+\.\S+/.test(this.email) && this.email.length != 0) {
            throw new Error("your email is not valid")
        }
        return {
            username: this.username,
            password: this.password,
            email: this.email
        }
    }
}