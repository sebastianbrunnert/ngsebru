export class LogOverviewResponse {
    public dates: Map<String, Number> = new Map<String, Number>();
    public clicksToday: Number = 0
    public individualClicksToday: Number = 0
}

export class AuthenticationCredentialsResponse {
    public token: String = ""
    public expire: Number = -1
}