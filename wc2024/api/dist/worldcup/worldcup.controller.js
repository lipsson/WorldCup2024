"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldcupController = void 0;
const common_1 = require("@nestjs/common");
const worldcup_service_1 = require("./worldcup.service");
let WorldcupController = class WorldcupController {
    constructor(worldcupService) {
        this.worldcupService = worldcupService;
    }
    ;
    findAll() {
        return this.worldcupService.findAllCups();
    }
    ;
    findAllTeams(cup) {
        return this.worldcupService.findAllTeams(cup);
    }
    ;
    resetAllScore(cup) {
        return this.worldcupService.resetAllScore(cup);
    }
    ;
    createNewCup(cupData) {
        return this.worldcupService.createNewCup(cupData);
    }
    createNewTeam(cup, teamData) {
        return this.worldcupService.createNewTeam(cup, teamData);
    }
    findTeamDetails(cup, id) {
        return this.worldcupService.findTeamDetails(cup, id);
    }
    updateScore(cup, id) {
        return this.worldcupService.updateScore(cup, id);
    }
    finishMatch(cup, id, opponent) {
        return this.worldcupService.finishMatch(cup, id, opponent);
    }
};
exports.WorldcupController = WorldcupController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':cup'),
    __param(0, (0, common_1.Param)('cup', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "findAllTeams", null);
__decorate([
    (0, common_1.Patch)(':cup'),
    __param(0, (0, common_1.Param)('cup', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "resetAllScore", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "createNewCup", null);
__decorate([
    (0, common_1.Post)(':cup'),
    __param(0, (0, common_1.Param)('cup', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "createNewTeam", null);
__decorate([
    (0, common_1.Get)('/:cup/:id'),
    __param(0, (0, common_1.Param)('cup', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "findTeamDetails", null);
__decorate([
    (0, common_1.Patch)('/:cup/:id'),
    __param(0, (0, common_1.Param)('cup', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "updateScore", null);
__decorate([
    (0, common_1.Patch)('/:cup/:id/:opponent'),
    __param(0, (0, common_1.Param)('cup', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('opponent', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "finishMatch", null);
exports.WorldcupController = WorldcupController = __decorate([
    (0, common_1.Controller)('worldcup'),
    __metadata("design:paramtypes", [worldcup_service_1.WorldcupService])
], WorldcupController);
//# sourceMappingURL=worldcup.controller.js.map