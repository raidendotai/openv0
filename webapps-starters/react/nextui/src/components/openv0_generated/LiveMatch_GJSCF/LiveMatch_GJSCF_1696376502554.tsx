"use client";

import { Badge } from '@nextui-org/react';
import { Card } from '@nextui-org/react';
import { CardBody } from '@nextui-org/react';
import { CardHeader } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import { TableBody } from '@nextui-org/react';
import { TableCell } from '@nextui-org/react';
import { TableColumn } from '@nextui-org/react';
import { TableHeader } from '@nextui-org/react';
import { TableRow } from '@nextui-org/react';
import { AlertTriangle } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Globe } from 'lucide-react';
import { Redo2 } from 'lucide-react';
import { Trophy } from 'lucide-react';

const matchEvents = [
  {
    time: "63'",
    event: "Goal",
    player: "Zinedine Zidane",
    team: "France"
  },
  {
    time: "45'",
    event: "Goal",
    player: "Zinedine Zidane",
    team: "France"
  },
  {
    time: "18'",
    event: "Yellow Card",
    player: "Cafu",
    team: "Brazil"
  },
];

const matchDetails = {
  team1: "France",
  team2: "Brazil",
  team1Logo: "https://upload.wikimedia.org/wikipedia/en/0/0a/Equipe_de_France_de_football_2018.png",
  team2Logo: "https://upload.wikimedia.org/wikipedia/en/8/8f/National_Football_Team_of_Brazil_Logo.png",
  team1Score: 3,
  team2Score: 0,
  live: "Live",
  timeElapsed: "83'"
};

const LiveMatch_GJSCF = () => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader title="1998 World Cup Final">
          <Globe size={20} />
          <Trophy size={20} />
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <Badge className="text-base text-blue-700">
              <Image src={matchDetails.team1Logo} alt={matchDetails.team1} width={50} />
              <span className="ml-3">{matchDetails.team1}</span>
            </Badge>
            <span className="text-4xl font-bold">
              {matchDetails.team1Score} : {matchDetails.team2Score}
            </span>
            <Badge className="text-base text-yellow-500">
              <span className="mr-3">{matchDetails.team2}</span>
              <Image src={matchDetails.team2Logo} alt={matchDetails.team2} width={50} />
            </Badge>
          </div>
          <Divider className="my-3"/>
          <div className="flex items-center justify-between">
            <Badge className="px-3 bg-green-500 text-white"><Bell size={12} /> {matchDetails.live}</Badge>
            <span className="self-center"><Clock size={14} /> {matchDetails.timeElapsed}</span>
            <Badge className="px-3 bg-red-500 text-white"><Redo2 size={14} /> Refresh</Badge>
          </div>
        </CardBody>
      </Card>
      <Table>
        <TableHeader>
          <TableColumn>Time</TableColumn>
          <TableColumn>Event</TableColumn>
          <TableColumn>Player</TableColumn>
          <TableColumn>Team</TableColumn>
        </TableHeader>
        <TableBody items={matchEvents}>
          {(item) => (
            <TableRow key={item.time}>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.event === 'Goal' ? <AlertTriangle size={16} /> : item.event}</TableCell>
              <TableCell>{item.player}</TableCell>
              <TableCell>{item.team}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LiveMatch_GJSCF;