import {
  PrismaClient,
  games,
  player_position_type,
  shirt_size_type,
} from '@prisma/client';
import { PlayerStat } from './types';
import { csvToData } from './csvToData';
import * as path from 'path';

const gameFiles = [
  'game1.csv',
  'game2.csv',
  'game3.csv',
  'game4.csv',
  'game5.csv',
  'game6.csv',
  'playoff1.csv',
  'playoff2.csv',
  'third.csv',
  'championship.csv',
].map((fileName) => path.join(process.cwd(), 'src', 'data', fileName));

const prisma = new PrismaClient();

async function main() {
  // Inserting Players
  const playersData = [
    {
      //player_id:1
      first_name: 'Tule',
      last_name: 'Edwards',
      birthdate: new Date('2008-01-31'),
      height: 76,
      weight: 150,
      sex: 'M',
      position: [player_position_type.PF],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:2
      first_name: 'Grayson',
      last_name: 'Callahan Shively',
      birthdate: new Date('2006-06-18'),
      height: 66,
      weight: 175,
      sex: 'M',
      position: [player_position_type.PG, player_position_type.SG],
      shirt_size: shirt_size_type.M,
    },

    {
      //player_id:3
      first_name: 'Brian',
      last_name: 'Fererro',
      birthdate: new Date('2006-09-28'),
      height: 72.5,
      weight: 200,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SF],
      shirt_size: shirt_size_type.XL,
    },
    {
      //player_id:4
      first_name: 'Ryan',
      last_name: 'Clark',
      birthdate: new Date('2004-03-05'),
      height: 73,
      weight: 170,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SF],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:5
      first_name: 'Michael',
      last_name: 'Angelillo',
      birthdate: new Date('1989-08-18'),
      height: 73,
      weight: 330,
      sex: 'M',
      position: [player_position_type.SF],
      shirt_size: shirt_size_type.XXXL,
    },
    {
      //player_id:6
      first_name: 'Ben',
      last_name: 'Maselli',
      birthdate: new Date('1991-06-19'),
      height: 72,
      weight: 170,
      sex: 'M',
      position: [player_position_type.SF],
      shirt_size: shirt_size_type.L,
    },

    {
      //player_id:7
      first_name: 'Chris',
      last_name: 'Wheeler',
      birthdate: new Date('1990-03-03'),
      height: 66,
      weight: 150,
      sex: 'M',
      position: [player_position_type.SG],
      shirt_size: shirt_size_type.M,
    },

    {
      //player_id:8
      first_name: 'Louie',
      last_name: 'Costanzo',
      birthdate: new Date('1985-09-26'),
      height: 69,
      weight: 160,
      sex: 'M',
      position: [player_position_type.PG],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:9
      first_name: 'Chris',
      last_name: 'Mahurin',
      birthdate: new Date('1972-05-11'),
      height: 72,
      weight: 160,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SF],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:10
      first_name: 'Isaac',
      last_name: 'Van Etten',
      birthdate: new Date('1993-03-31'),
      height: 72,
      weight: 190,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SG],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:11
      first_name: 'Jared',
      last_name: 'Brautigam',
      birthdate: new Date('1983-08-09'),
      height: 72,
      weight: 200,
      sex: 'M',
      position: [
        player_position_type.SG,
        player_position_type.PF,
        player_position_type.C,
      ],
      shirt_size: shirt_size_type.XL,
    },
    {
      //player_id:12
      first_name: 'Jeffrey',
      last_name: 'Tate',
      birthdate: new Date('1988-05-31'),
      height: 72,
      weight: 205,
      sex: 'M',
      position: [player_position_type.PF, player_position_type.C],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:13
      first_name: 'Gabriel',
      last_name: 'Beeson-McArdle',
      birthdate: new Date('1980-11-29'),
      height: 72,
      weight: 185,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SF],
      shirt_size: shirt_size_type.XL,
    },
    {
      //player_id:14
      first_name: 'John',
      last_name: 'Hoyt',
      birthdate: new Date('1988-06-25'),
      height: 73,
      weight: 240,
      sex: 'M',
      position: [player_position_type.PF],
      shirt_size: shirt_size_type.XXXL,
    },
    {
      //player_id:15
      first_name: 'Kenny',
      last_name: 'G',
      birthdate: new Date('1984-08-30'),
      height: 67,
      weight: 160,
      sex: 'M',
      position: [player_position_type.PG],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:16
      first_name: 'Michael',
      last_name: 'White',
      birthdate: new Date('1987-04-18'),
      height: 69,
      weight: 170,
      sex: 'M',
      position: [player_position_type.SF, player_position_type.SG],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:17
      first_name: 'Iain',
      last_name: 'Dooly',
      birthdate: new Date('2002-05-28'),
      height: 73,
      weight: 170,
      sex: 'M',
      position: [
        player_position_type.PG,
        player_position_type.SG,
        player_position_type.SF,
      ],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:18
      first_name: 'Joshua',
      last_name: 'Fisher',
      birthdate: new Date('1982-11-18'),
      height: 72,
      weight: 220,
      sex: 'M',
      position: [
        player_position_type.SG,
        player_position_type.PF,
        player_position_type.C,
      ],
      shirt_size: shirt_size_type.XL,
    },
    {
      //player_id:19
      first_name: 'Tyler',
      last_name: 'Salcedo',
      birthdate: new Date('1991-06-12'),
      height: 79,
      weight: 165,
      sex: 'M',
      position: [player_position_type.PG],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:20
      first_name: 'Gabriel',
      last_name: 'Ramirez',
      birthdate: new Date('1969-05-27'),
      height: 68,
      weight: 175,
      sex: 'M',
      position: [player_position_type.SG],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:21
      first_name: 'Otis',
      last_name: "O'Toole",
      birthdate: new Date('1985-10-13'),
      height: 75,
      weight: 220,
      sex: 'M',
      position: [player_position_type.PF, player_position_type.C],
      shirt_size: shirt_size_type.XXL,
    },
    {
      //player_id:22
      first_name: 'Nick',
      last_name: 'Barry',
      birthdate: new Date('1984-09-03'),
      height: 71,
      weight: 190,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.PG],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:23
      first_name: 'Christian',
      last_name: 'Rotunno',
      birthdate: new Date('1988-11-13'),
      height: 71,
      weight: 185,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SF],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:24
      first_name: 'Evan',
      last_name: 'Portier',
      birthdate: new Date('1988-08-22'),
      height: 69,
      weight: 165,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SF],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:25
      first_name: 'Tarzan',
      last_name: 'Couri',
      birthdate: new Date('1991-12-17'),
      height: 71,
      weight: 185,
      sex: 'M',
      position: [player_position_type.SF, player_position_type.PF],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:26
      first_name: 'Arend',
      last_name: 'Hall',
      birthdate: new Date('1974-11-15'),
      height: 82,
      weight: 220,
      sex: 'M',
      position: [player_position_type.C, player_position_type.PF],
      shirt_size: shirt_size_type.XL,
    },
    {
      //player_id:27
      first_name: 'Jaret',
      last_name: 'Michieli',
      birthdate: new Date('1992-02-07'),
      height: 70,
      weight: 170,
      sex: 'M',
      position: [player_position_type.PG],
      shirt_size: shirt_size_type.XL,
    },
    {
      //player_id:28
      first_name: 'Eric',
      last_name: 'Andreson',
      birthdate: new Date('1992-04-15'),
      height: 70,
      weight: 170,
      sex: 'M',
      position: [
        player_position_type.PG,
        player_position_type.SG,
        player_position_type.SF,
      ],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:29
      first_name: 'Koppa',
      last_name: 'Enos',
      birthdate: new Date('1977-09-23'),
      height: 75,
      weight: 270,
      sex: 'M',
      position: [player_position_type.C, player_position_type.PF],
      shirt_size: shirt_size_type.XXL,
    },

    {
      //player_id:30
      first_name: 'Tomas',
      last_name: 'Armijo',
      birthdate: new Date('2006-12-30'),
      height: 69,
      weight: 156.4,
      sex: 'M',
      position: [player_position_type.SG],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:31
      first_name: 'Dylan',
      last_name: 'Ramirez',
      birthdate: new Date('2008-06-24'),
      height: 68,
      weight: 135,
      sex: 'M',
      position: [player_position_type.SG],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:32
      first_name: 'Cadian',
      last_name: 'Ramirez',
      birthdate: new Date('2006-02-02'),
      height: 68,
      weight: 135,
      sex: 'M',
      position: [player_position_type.SG],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:33
      first_name: 'Miles',
      last_name: 'Allen',
      birthdate: new Date('2008-09-26'),
      height: 70,
      weight: 160,
      sex: 'M',
      position: [player_position_type.SF, player_position_type.PF],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:34
      first_name: 'Owen',
      last_name: 'McIver',
      birthdate: new Date('2006-01-02'),
      height: 76,
      weight: 195,
      sex: 'M',
      position: [player_position_type.SG, player_position_type.SF],
      shirt_size: shirt_size_type.L,
    },
    {
      //player_id:35
      first_name: 'Aiden',
      last_name: 'Panock',
      birthdate: new Date('2007-12-25'),
      height: 63,
      weight: 155,
      sex: 'M',
      position: [player_position_type.PG, player_position_type.SG],
      shirt_size: shirt_size_type.M,
    },
    {
      //player_id:36
      first_name: 'Joom Koppa',
      last_name: 'Enos',
      birthdate: new Date('2006-07-19'),
      height: 73,
      weight: 268.2,
      sex: 'M',
      position: [player_position_type.PF, player_position_type.C],
      shirt_size: shirt_size_type.XXXL,
    },
  ];

  await prisma.players.createMany({ data: playersData as any });

  // Inserting a Season
  await prisma.seasons.create({ data: { start_date: new Date('2023-09-17') } });

  // Inserting Teams
  const teamsData = [
    {
      team_name: "Tule's Titans",
      short_name: 'Titans',
      captain_id: 1,
      season_id: 1,
    },
    {
      team_name: "Grayson's Guards",
      short_name: 'Guards',
      captain_id: 2,
      season_id: 1,
    },
    {
      team_name: "Brian's Grass Valley Royals",
      short_name: 'Royals',
      captain_id: 3,
      season_id: 1,
    },
    {
      team_name: "Ryan's Wos Wangeles Wakers",
      short_name: 'Wakers',
      captain_id: 4,
      season_id: 1,
    },
  ];

  await prisma.teams.createMany({ data: teamsData });

  // Associating Players with Teams
  const teamPlayersData = [
    { team_id: 1, player_id: 1 },
    { team_id: 1, player_id: 6 },
    { team_id: 1, player_id: 9 },
    { team_id: 1, player_id: 14 },
    { team_id: 1, player_id: 22 },
    { team_id: 1, player_id: 23 },
    { team_id: 1, player_id: 26 },
    { team_id: 1, player_id: 30 },
    { team_id: 1, player_id: 31 },
    { team_id: 2, player_id: 10 },
    { team_id: 2, player_id: 11 },
    { team_id: 2, player_id: 12 },
    { team_id: 2, player_id: 13 },
    { team_id: 2, player_id: 14 },
    { team_id: 2, player_id: 15 },
    { team_id: 2, player_id: 16 },
    { team_id: 2, player_id: 17 },
    { team_id: 2, player_id: 18 },
    { team_id: 3, player_id: 19 },
    { team_id: 3, player_id: 20 },
    { team_id: 3, player_id: 21 },
    { team_id: 3, player_id: 22 },
    { team_id: 3, player_id: 23 },
    { team_id: 3, player_id: 24 },
    { team_id: 3, player_id: 25 },
    { team_id: 3, player_id: 26 },
    { team_id: 3, player_id: 27 },
    { team_id: 4, player_id: 28 },
    { team_id: 4, player_id: 29 },
    { team_id: 4, player_id: 30 },
    { team_id: 4, player_id: 31 },
    { team_id: 4, player_id: 32 },
    { team_id: 4, player_id: 33 },
    { team_id: 4, player_id: 34 },
    { team_id: 4, player_id: 35 },
    { team_id: 4, player_id: 36 },
  ];

  await prisma.teamplayers.createMany({ data: teamPlayersData });

  async function seed() {
    console.log('seeding games and players');
    for (let i = 0; i < gameFiles.length; i++) {
      const data = csvToData(gameFiles[i], i + 1); // Assuming gameId starts from 1 and increments
      console.log('data', data);
      // Insert game info
      await prisma.games.create({
        data: data.gameInfo,
      });

      console.log('playerstats:', data.playerStats);

      const playerStatsData: PlayerStat[] = data.playerStats;
      await prisma.playerstats.createMany({
        data: playerStatsData,
      });
    }
  }

  seed().catch((e) => {
    console.error(e);
    process.exit(1);
  });

  console.log('Data seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
