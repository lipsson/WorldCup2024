import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { WorldcupService } from './worldcup.service';

@Controller('worldcup')
export class WorldcupController {
    constructor(private readonly worldcupService: WorldcupService) { };

    @Get() // get all cups
    findAll() {
        return this.worldcupService.findAllCups();
    };

    @Get(':cup') // get all teams
    findAllTeams(@Param('cup', ParseIntPipe) cup: number) {
        return this.worldcupService.findAllTeams(cup);
    };

    @Patch(':cup') // reset all teams score
    resetAllScore(@Param('cup', ParseIntPipe) cup: number) {
        return this.worldcupService.resetAllScore(cup);
    };

    @Post() // create new team
    createNewCup(@Body() cupData: {}) {
        return this.worldcupService.createNewCup(cupData)
    }

    @Post(':cup') // create new team
    createNewTeam(@Param('cup', ParseIntPipe) cup: number, @Body() teamData: {}) {
        return this.worldcupService.createNewTeam(cup, teamData)
    }

    @Get('/:cup/:id') // get team details
    findTeamDetails(@Param('cup', ParseIntPipe) cup: number, @Param('id', ParseIntPipe) id: number) {
        return this.worldcupService.findTeamDetails(cup, id);
    }

    @Patch('/:cup/:id') // update team score
    updateScore(@Param('cup', ParseIntPipe) cup: number, @Param('id', ParseIntPipe) id: number) {
        return this.worldcupService.updateScore(cup, id);
    }

    @Patch('/:cup/:id/:opponent')
    finishMatch(@Param('cup', ParseIntPipe) cup: number, @Param('id', ParseIntPipe) id: number, @Param('opponent', ParseIntPipe) opponent: number) {
        return this.worldcupService.finishMatch(cup, id, opponent);
    }

    // @Delete('/:cup/:id') // delete team
    // deleteTeam(@Param('cup', ParseIntPipe) cup: number, @Param('id', ParseIntPipe) id: number) {
    //     return { id };
    // }


}
