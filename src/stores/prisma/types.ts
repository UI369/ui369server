export interface PlayerStat {
  player_id: number;
  game_id: number;
  twos_attempted?: number;
  twos_made?: number;
  threes_attempted?: number;
  threes_made?: number;
  freethrows_attempted?: number;
  freethrows_made?: number;
  offensive_rebounds?: number;
  defensive_rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
  points?: number;
  played: boolean;
  home: boolean;
}

export interface GameInfo {
  game_time: Date;
  home_score: number;
  away_score: number;
  location: string;
  season_id: number;
  team_home_id: number;
  team_away_id: number;
  referee1: string;
  referee2: string;
}
