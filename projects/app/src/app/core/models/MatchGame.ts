export class MatchGame {
    public gameMetaData: GameMetaData = new GameMetaData()
    public timers: Timer[] = []
    public counters: Counter[] = []
    public players: Player[] = []
    public settings: Setting[] = []
}

export class GameMetaData {
    public id: String = ""
    public templateId: String = ""
    public userId: String = ""
    public global: Boolean = false
}

export class Timer {
    public title: String = ""
    public seconds: Number = 0
    public mode: TimerMode = TimerMode.INCREMENTING
}

export enum TimerMode {
    INCREMENTING = "INCREMENTING",
    DECREMENTING = "DECREMENTING"
}

export class Counter {
    public title: String = ""
    public value: Number = 0
}

export class Player {
    public title: String = ""
    public name: String = ""
    public counters: Counter[] = []
    public timers: Timer[] = []
}

export enum Setting {
    NOT_SHOW_COUNTERS = "NOT_SHOW_COUNTERS",
    NOT_ADD_COUNTERS = "NOT_ADD_COUNTERS",
    NOT_SHOW_TIMER = "NOT_SHOW_TIMERS",
    NOT_ADD_PLAYER = "NOT_ADD_PLAYER",
    TEAM_MODE = "TEAM_MODE"
}