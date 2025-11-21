export class APIResponse<T> {
    success: boolean
    message?: string
    data?: T

    constructor(success: boolean, message: string, data: T) {
        this.success = success,
            this.message = message,
            this.data = data
    }

    responseData() {
        if (!this.success) {
            return {
                success: this.success,
                msg: this.message
            }
        }
        return {
            success: this.success,
            data: this.data
        }
    }
    responseBoolean() {
        return {
            success: this.success,
        }
    }

}