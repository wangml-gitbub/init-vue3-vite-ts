export namespace Login {
	export interface IRequestLoginForm {
		userName: string
		password: string
	}

	export interface IResponseLogin {
		access_token: string
	}
}
